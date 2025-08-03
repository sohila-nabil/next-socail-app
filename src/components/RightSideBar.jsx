"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import New from "./New";

const RightSideBar = () => {
  const [input, setInput] = useState("");
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    router.push(`/search/${input}`);
    setInput("");
  };
  return (
    <>
      <div className="sticky top-0 bg-white py-2">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-gray-100 border border-gray-200 rounded-3xl text-sm w-full px-4 py-2"
          />
        </form>
      </div>
      <New/>
    </>
  );
};

export default RightSideBar;
