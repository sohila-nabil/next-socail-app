import { connectToDatabase } from "@/lib/mongodb/mongoose";
import Post from "@/lib/models/postModel.js";
import User from "@/lib/models/userModel";

export const POST = async (req) => {
  try {
    await connectToDatabase();
    const feedPosts = await Post.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify(feedPosts), {
      status: 200,
    });
  } catch (error) {
    console.log("Error getting posts:", error);
    return new Response("Error getting posts", {
      status: 500,
    });
  }
};