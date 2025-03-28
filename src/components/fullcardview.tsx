import React, { useState } from "react";
import LikeButton from "@/components/LikeButton";
import ReplyButton from "@/components/ReplyButton";
import ShareButton from "@/components/ShareButton";

interface FullPostViewProps {
  post: {
    question_id: number;
    question_text: string;
    name: string;
    profile_pic: string;
    timestamp: string;
    media: Array<{ media_url: string; media_type: string }>;
  };
  setSelectedPost: React.Dispatch<React.SetStateAction<any | null>>;
}

const FullPostView: React.FC<FullPostViewProps> = ({ post, setSelectedPost }) => {
  const [replyText, setReplyText] = useState("");

  return (
    <div className="fixed inset-0 bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* Fixed Card Height */}
      <div className="bg-white p-6 rounded-lg max-w-[800px] w-full h-[550px] flex shadow-lg">
        
        {/* Left: Image */}
        <div className="w-1/2 h-full">
          {post.media.length > 0 && (
            <img 
              src={post.media[0].media_url} 
              alt="Post media" 
              className="w-full h-full  object-contain rounded-lg"
            />
          )}
        </div>

        {/* Right: Post Details */}
        <div className="w-1/2 pl-6 flex flex-col justify-between h-full">
          {/* Close button */}
          <button 
            className="self-end text-gray-600 hover:text-gray-800"
            onClick={() => setSelectedPost(null)}
          >
            ✖
          </button>

         {/* User Info */}
        <div className="flex items-center space-x-2">
        <img src={post.profile_pic} alt="User" className="w-8 h-8 rounded-full object-cover" />
        <p className="font-semibold leading-tight">{post.name}</p>
        </div>


          {/* Post Text with Fixed Scrollable Area */}
          <div className="text-gray-800 text-sm h-[200px] overflow-y-auto mt-0">
            <p style={{ whiteSpace: "pre-line" }}>{post.question_text}</p>
          </div>

          {/* Like, Reply, Share Buttons */}
          <div className="flex space-x-4 mt-2">
            <LikeButton />
            <ReplyButton />
            <ShareButton />
          </div>

          {/* Reply Input Field */}
          <div className="mt-2">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write a reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default FullPostView;
