import connectDb from '@/db/connectDb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function GET() {
  return new Response("GET method is not supported on this endpoint", { status: 405 });
}

export async function POST(req) {
  try {
    await connectDb();
    const { identifier, password } = await req.json();

    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response("Invalid credentials", { status: 401 });
    }

    return new Response(JSON.stringify({ message: "Login successful" }), { status: 200 });
  } 
  catch (error) {
    console.error(error);
    return new Response("Server error", { status: 500 });
  }
}