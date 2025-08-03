import React from "react";
import {
  HiOutlineChat,
  HiOutlineHeart,
  HiOutlineTrash,
  HiHeart,
} from "react-icons/hi";
const Icons = () => {
  return (
    <div className="flex justify-start gap-5 p-2 text-gray-500">
      <div className="flex items-center">
        <HiOutlineChat className="h-8 w-8 cursor-pointer rounded-full  transition duration-500 ease-in-out p-2 hover:text-sky-500 hover:bg-sky-100" />
      </div>
      <HiHeart
        // onClick={likePost}
        className="h-8 w-8 cursor-pointer rounded-full  transition duration-500 ease-in-out p-2 text-red-600 hover:text-red-500 hover:bg-red-100"
      />
      <HiOutlineTrash
        //  onClick={deletePost}
        className="h-8 w-8 cursor-pointer rounded-full  transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100"
      />
    </div>
  );
};

export default Icons;

//  <div className="flex items-center">
//          {isLiked ? (
//            <HiHeart
//              onClick={likePost}
//              className="h-8 w-8 cursor-pointer rounded-full  transition duration-500 ease-in-out p-2 text-red-600 hover:text-red-500 hover:bg-red-100"
//            />
//          ) : (
//            <HiOutlineHeart
//              onClick={likePost}
//              className="h-8 w-8 cursor-pointer rounded-full  transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100"
//            />
//          )}
//          {/* {likes.length > 0 && (
//            <span className={`text-xs ${isLiked && "text-red-600"}`}>
//              {likes.length}
//            </span>
//          )} */}
//        </div>

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
