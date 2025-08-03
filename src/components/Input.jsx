"use client";

import { useUser } from "@clerk/nextjs";
import { HiOutlinePhotograph } from "react-icons/hi";
import { useRef, useState } from "react";

const Input = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [text, setText] = useState("");
  const imagePickRef = useRef(null);

  if (!isLoaded || !isSignedIn) return null; // Ensure user is loaded and signed in

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImageFileUrl(URL.createObjectURL(file)); // creates a temporary preview URL
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my_unsigned_preset"); // replace with your preset
    formData.append("cloud_name", "dsu12ofq9"); // replace with your Cloudinary cloud name

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dsu12ofq9/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return { secure_url: data.secure_url, public_id: data.public_id };
  };

  const handleAddPost = async () => {
    if (!text && !selectedFile) return;
    setIsUploading(true); // start loading

    let imageData = null;

    if (selectedFile) {
      imageData = await uploadImageToCloudinary(selectedFile); // upload and get { secure_url, public_id }
    }

    const postData = {
      text,
      image: imageData, // 👈 send both secure_url + public_id to backend
      name: user.fullName,
      username: user.username,
      profileImg: user.imageUrl,
    };

    try {
      const response = await fetch("/api/post/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      if (!response.ok) throw new Error("Failed to create post");

      const newPost = await response.json();
      console.log("Post created:", newPost);

      setText("");
      setImageFileUrl(null);
      setSelectedFile(null);
      location.reload();
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsUploading(false); // stop loading
    }
  };

  return (
    <div className="flex border-b border-gray-200 p-3 space-x-3 w-full">
      <img
        src={user?.imageUrl}
        alt="user-img"
        className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95 object-cover"
      />
      <div className="w-full divide-y divide-gray-200">
        <textarea
          className="w-full border-none outline-none tracking-wide min-h-[50px] text-gray-700"
          placeholder="What's happening?"
          rows="2"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        {/* Preview selected image */}
        {selectedFile && (
          <img
            src={imageFileUrl}
            alt="selected-img"
            className={`w-full max-h-[250px] object-cover cursor-pointer mt-2 rounded-lg ${
              isUploading ? "animate-pulse" : ""
            }`}
            onLoad={() => setIsUploading(false)}
            onClick={() => {
              setImageFileUrl(null);
              setSelectedFile(null);
            }}
          />
        )}

        <div className="flex items-center justify-between pt-2.5">
          <HiOutlinePhotograph
            onClick={() => imagePickRef.current.click()}
            className="h-10 w-10 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer"
          />
          <input
            type="file"
            accept="image/*"
            hidden
            ref={imagePickRef}
            onChange={handleImageChange}
          />
          <button
            onClick={handleAddPost}
            className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold cursor-pointer shadow-md hover:brightness-95 disabled:opacity-50"
            disabled={!text && !imageFileUrl}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
