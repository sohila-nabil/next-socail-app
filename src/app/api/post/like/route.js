import { connectToDatabase } from "@/lib/mongodb/mongoose";
import Post from "@/lib/models/postModel";
import User from "@/lib/models/userModel";
import { currentUser } from "@clerk/nextjs/server";

export const PUT = async (req) => {
  try {
    const user = await currentUser();
    await connectToDatabase();

    const data = await req.json();
    const existingUser = await User.findOne({ clerkId: user.id });
    if (!existingUser || !user) {
      return new Response(JSON.stringify({ error: "UN AUTHERIZED" }), {
        status: 404,
      });
    }

    console.log(data);

    const post = await Post.findById(data.postId);
    if (!post) {
      return new Response(JSON.stringify({ error: "Post not found" }), {
        status: 404,
      });
    }
    console.log("Post found:", post);

    if (post.likes.includes(existingUser._id)) {
      post.likes = post.likes.filter(
        (like) => like.toString() !== existingUser._id.toString()
      );
    } else {
      post.likes.push(existingUser._id);
    }
    await post.save();
    return new Response(JSON.stringify(post), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
};
