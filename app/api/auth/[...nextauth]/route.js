import connectDb from '@/db/connectDb';
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import User from "@/models/User";
import bcrypt from 'bcryptjs';

async function fetchPrivateEmail(accessToken) {
  const response = await fetch("https://api.github.com/user/emails", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch emails from GitHub.");
  }

  const emails = await response.json();
  // Find the primary email (even if it's private)
  const primaryEmail = emails.find((email) => email.primary)?.email;
  return primaryEmail || null;
}

export const authoptions = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: {
          scope: "read:user user:email", 
        },
      },
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name || null,
          email: profile.email || null,
          image: profile.avatar_url || null,
        };
      },
      httpOptions: {
        timeout: 10000, 
      },
    }),
    
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Username or Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDb();
        const { identifier, password } = credentials;
        const user = await User.findOne({
          $or: [{ email: identifier }, { username: identifier }],
        });
        if (!user) {
          throw new Error("User not found");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error("Invalid credentials");
        }
        return {
          id: user.id,
          email: user.email,
          username: user.username,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("SignIn triggered with account:", account);
      await connectDb();
      if (account.provider === "github") {
        // Fetch private email if not directly provided
        let userEmail = email;
        if (!userEmail) {
          try {
            console.log("Fetching private email from GitHub...");
            userEmail = await fetchPrivateEmail(account.access_token);
            console.log("Fetched private email:", userEmail);
          } catch (error) {
            console.error("Error fetching private email:", error);
            return false;
          }
        }
        if (userEmail) {
          const existingUser = await User.findOne({ email: userEmail });
          if (!existingUser) {
            const newUser = new User({
              email: userEmail,
              username: userEmail.split("@")[0],
              name: profile.name || userEmail.split("@")[0],
            });
            await newUser.save();
          }
          return true;
        } else {
          console.error("No email provided or fetched.");
          return false;
        }
      }
      return true;
    },
    async session({ session, user, token }) {
      await connectDb();
      const dbUser = await User.findOne({email:session.user.email})
      session.user.name = dbUser.username
      return session
    },
  },
  pages: {
    signIn: "/userlogin", 
  },
})
export { authoptions as GET, authoptions as POST }