import { connectToDatabase } from "@/lib/mongodb/mongoose";
import Post from "@/lib/models/postModel";
import User from "@/lib/models/userModel";
import { currentUser } from "@clerk/nextjs/server";


export const POST = async (req) => {
  try {
    await connectToDatabase();

    const data = await req.json();

    const posts = await Post.find({ user: data.userId }).sort({
      createdAt: -1,
    });

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response('Failed to fetch the post data', { status: 500 });
  }
};