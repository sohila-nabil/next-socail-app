import { connectToDatabase } from "@/lib/mongodb/mongoose";
import User from "@/lib/models/userModel";

export const POST = async (req) => {
  try {
    await connectToDatabase();
    const data = await req.json();
    const user = await User.findOne({ username: data.username });
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response('Failed to fetch the user data', { status: 500 });
  }
};