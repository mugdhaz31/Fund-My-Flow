import connectDb from '@/db/connectDb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    await connectDb();
    const { email, password, name, username } = await req.json();

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, name, username, password: hashedPassword });

    await newUser.save();

    return new Response(JSON.stringify({ message: "Signup successful" }), { status: 201 });
  } 
  catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Signup failed" }), { status: 500 });
  }
}
