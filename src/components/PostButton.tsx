// PostButton.tsx

import React from "react";

interface PostButtonProps {
  onClick: () => void; // Make sure this prop is defined here
}

const PostButton: React.FC<PostButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="w-full p-3 text-left bg-gray-100 rounded-lg text-gray-500 hover:bg-gray-200 transition">
      What's on your mind?
    </button>
  );
};

export default PostButton;
