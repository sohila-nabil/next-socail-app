import { connectToDatabase } from "@/lib/mongodb/mongoose";
import Post from "@/lib/models/postModel";


export const POST = async (req) => {
  try {
    await connectToDatabase();
    const data = await req.json();
    const post = await Post.findById(data.postId);
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.log('Error getting post:', error);
    return new Response('Error getting post', { status: 500 });
  }
};