"use client";

import { useState } from "react";
import { Send } from "lucide-react";

const PostSection = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Ayush singh",
      content: "Had a great day at the park! #outdoors #fun",
      date: "2025-03-24 10:30",
    },
    {
      id: 2,
      author: "bikash jayant",
      content: "Learning React today! It’s amazing! #coding #react",
      date: "2025-03-23 14:15",
    },
  ]);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white shadow-md rounded-xl p-4 sm:p-6 md:p-8">
      
      {/* Post Input Section */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-400 text-white flex items-center justify-center rounded-full text-sm sm:text-base font-medium">
          A
        </div>

        <textarea
          placeholder="What's new...?"
          className="flex-grow p-2 sm:p-3 border border-gray-300 rounded-lg text-gray-700 text-sm sm:text-base outline-none resize-none focus:ring-2 focus:ring-blue-400"
        />

        <button className="bg-blue-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition text-sm sm:text-base">
          <Send size={16} />
          <span>Post</span>
        </button>
      </div>

      {/* Sample Posts Section */}
      <div>
        {posts.map((post) => (
          <div key={post.id} className="bg-gray-100 p-3 sm:p-4 mb-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-2 sm:mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-400 text-white flex items-center justify-center rounded-full text-xs sm:text-base font-medium">
                {post.author}
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold">{post.author}</p>
                <p className="text-[10px] sm:text-xs text-gray-500">{post.date}</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-gray-800">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostSection;
