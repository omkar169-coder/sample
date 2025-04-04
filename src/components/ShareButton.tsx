import React from "react";
import { IoIosShareAlt } from "react-icons/io";

interface ShareButtonProps {
  postUrl: string;
  postTitle: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ postUrl, postTitle }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: postTitle,
          url: postUrl,
        });
        console.log("Post shared successfully");
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          console.log("Share action was canceled by the user."); // ✅ No error thrown
        } else {
          console.error("Error sharing:", error); // Only log real errors
        }
      }
    } else {
      console.warn("Web Share API not supported in this browser.");
    }
  };

  return (
    <button onClick={handleShare} className="focus:outline-none">
      <IoIosShareAlt className="transition-all duration-300" size={22} color="#000" />
    </button>
  );
};

export default ShareButton;
