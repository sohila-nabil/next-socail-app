import { currentUser } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/mongodb/mongoose";
import Post from "@/lib/models/postModel.js";
import User from "@/lib/models/userModel";


export const POST = async (req) => {
  const user = await currentUser();
  try {
    await connectToDatabase();
    const data = await req.json();
    console.log(data)
    const existedUser = await User.findOne({
      clerkId: user.id,
    });

    if (!existedUser || !user ) {
     return new Response("Unauthorized", {
       status: 401,
     });
    }

    const newPost = await Post.create({
      user: existedUser._id,
      name: data.name,
      username: data.username,
      text: data.text,
      profileImg: data.profileImg,
      image: data.image,
    });
    await newPost.save();
    return new Response(JSON.stringify(newPost), {
      status: 200,
    });
  } catch (error) {
    console.log("Error creating post:", error);
    return new Response("Error creating post", {
      status: 500,
    });
  }
};