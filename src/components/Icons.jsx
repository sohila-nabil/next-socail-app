"use client";
import React, { useState, useEffect } from "react";
import {
  HiOutlineChat,
  HiOutlineHeart,
  HiOutlineTrash,
  HiHeart,
} from "react-icons/hi";
import { useUser } from "@clerk/nextjs";
const Icons = ({ post,id }) => {
  const { user } = useUser();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState([]);

  const likeOrUnlickePost = async (postId) => {
    if (!user) {
      return;
    }
    setIsLiked(!isLiked);
    try {
      const response = await fetch(`/api/post/like`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId }),
      });
      const updatedPost = await response.json();
      setLikes(updatedPost.likes);
    } catch (error) {
      console.error("Error liking/unliking post:", error);
    }
  };

  const deletePost = async (postId) => {
    if (!user) {
      return;
    }
    try {
      const response = await fetch(`/api/post/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId }),
      });
      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
      const result = await response.json();
      console.log("Post deleted:", result);
      location.reload();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(()=>{
    if (post.likes.includes(post.user)) {
      setIsLiked(true);
    }else {
      setIsLiked(false);
    }
    setLikes(post.likes);
  },[user,likes])

  return (
    <div className="flex justify-start gap-5 p-2 text-gray-500">
      <div className="flex items-center">
        <HiOutlineChat className="h-8 w-8 cursor-pointer rounded-full  transition duration-500 ease-in-out p-2 hover:text-sky-500 hover:bg-sky-100" />
      </div>
      <div className="flex items-center">
        {isLiked ? (
          <HiHeart
            onClick={() => likeOrUnlickePost(post._id)}
            className="h-8 w-8 cursor-pointer rounded-full  transition duration-500 ease-in-out p-2 text-red-600 hover:text-red-500 hover:bg-red-100"
          />
        ) : (
          <HiOutlineHeart
            onClick={() => likeOrUnlickePost(post._id)}
            className="h-8 w-8 cursor-pointer rounded-full  transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100"
          />
        )}
        {likes.length > 0 && (
          <span className={`text-xs ${isLiked && "text-red-600"}`}>
            {likes.length}
          </span>
        )}
      </div>
      <HiOutlineTrash
         onClick={() => deletePost(post._id)}
        className="h-8 w-8 cursor-pointer rounded-full  transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100"
      />
    </div>
  );
};

export default Icons;

//  <HiOutlineChat
//    className="h-8 w-8 cursor-pointer rounded-full  transition duration-500 ease-in-out p-2 hover:text-sky-500 hover:bg-sky-100"
//    onClick={() => {
//      if (!user) {
//        router.push("/sign-in");
//      } else {
//        setOpen(!open);
//        setPostId(post._id);
//      }
//    }}
//  />;
//  {
//    post.comments.length > 0 && (
//      <span className="text-xs">{post.comments.length}</span>
//    );
//  }
