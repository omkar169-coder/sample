"use client";

import { useState } from "react";
import { Send, Heart, Share2, MessageSquare } from "lucide-react";
import { useRouter } from 'next/navigation';

interface PostSectionProps {
  threadId?: string; // Make the threadId prop optional
}

const PostSection = ({ threadId }: PostSectionProps) => {
  const router = useRouter();
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "A",
      content: "Had a great day at the park!",
      date: "2025-03-24 10:30",
      likes: 0,
      shares: 0,
      comments: ["Looks fun!", "Wish I was there!"],
    },
    {
      id: 2,
      author: "B",
      content: "Learning React today! It’s amazing!",
      date: "2025-03-23 14:15",
      likes: 0,
      shares: 0,
      comments: ["React is great!", "I love it!"],
    },
  ]);

  const [newPost, setNewPost] = useState("");

  const handlePostCreation = () => {
    const newPostData = {
      id: posts.length + 1,
      author: "A",
      content: newPost,
      date: new Date().toISOString(),
      likes: 0,
      shares: 0,
      comments: [],
    };

    setPosts([...posts, newPostData]);
    setNewPost(""); // Clear input field after posting
  };

  const handleLike = (postId: number) => {
    setPosts(posts.map((post) =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleShare = (postId: number) => {
    setPosts(posts.map((post) =>
      post.id === postId ? { ...post, shares: post.shares + 1 } : post
    ));
  };

  const handleViewComments = (postId: number) => {
    router.push(`/Thread/page?id=${postId}`);
  };

  const formatContent = (content: string) => {
    const regex = /(#\w+|@\w+)/g;
    return content.split(" ").map((word, index) => {
      if (word.match(regex)) {
        return (
          <span key={index} className="text-blue-500 font-medium">
            {word}{" "}
          </span>
        );
      }
      return word + " ";
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white shadow-md rounded-xl p-4 sm:p-6 md:p-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-400 text-white flex items-center justify-center rounded-full text-sm sm:text-base font-medium">
          A
        </div>

        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What's new...?"
          className="flex-grow p-2 sm:p-3 border border-gray-300 rounded-lg text-gray-700 text-sm sm:text-base outline-none resize-none focus:ring-2 focus:ring-blue-400"
        />

        <button onClick={handlePostCreation} className="bg-blue-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition text-sm sm:text-base">
          <Send size={16} />
          <span>Post</span>
        </button>
      </div>

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

            <p className="text-xs sm:text-sm md:text-base text-gray-800">
              {post.content}
            </p>

            <div className="mt-2">
              {formatContent(post.content)}
            </div>

            <div className="flex items-center gap-4 mt-4">
              <button onClick={() => handleLike(post.id)} className="text-gray-600 hover:text-red-600 transition flex items-center gap-1">
                <Heart size={16} />
                <span>{post.likes}</span>
              </button>

              <button onClick={() => handleShare(post.id)} className="text-gray-600 hover:text-blue-600 transition flex items-center gap-1">
                <Share2 size={16} />
                <span>{post.shares}</span>
              </button>

              <button onClick={() => handleViewComments(post.id)} className="text-gray-600 hover:text-green-600 transition flex items-center gap-1">
                <MessageSquare size={16} />
                <span>{post.comments.length}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostSection;
