import { connectToDatabase } from "@/lib/mongodb/mongoose";
import Post from "@/lib/models/postModel";
import User from "@/lib/models/userModel";
import { currentUser } from "@clerk/nextjs/server";

export const DELETE = async (req) => {
  const user = await currentUser();
  await connectToDatabase();
  try {
    const data = await req.json();
    const existingUser = await User.findOne({ clerkId: user.id });
    if (!existingUser || !user) {
      return new Response(JSON.stringify({ error: "UN AUTHORIZED" }), {
        status: 404,
      });
    }

    const post = await Post.findById(data.postId);
    if (!post) {
      return new Response(JSON.stringify({ error: "Post not found" }), {
        status: 404,
      });
    }
    if (post.user.toString() !== existingUser._id.toString()) {
      return new Response(
        JSON.stringify({
          error:
            "Unauthorized, You Don't have permission to delete any post not your's",
        }),
        {
          status: 403,
        }
      );
    }
    await Post.deleteOne({ _id: data.postId });
    return new Response(
      JSON.stringify({ message: "Post deleted successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error deleting post:", error);
  }
};
