import React from "react";
import { MoreHorizontal, Copy, Trash } from "lucide-react";
import LikeButton from "@/components/LikeButton";
import ReplyButton from "@/components/ReplyButton";
import ShareButton from "@/components/ShareButton";

interface PostCardProps {
  post: {
    question_id: number;
    asked_by_user_id: number;
    question_text: string;
    is_anonymous: number;
    timestamp: string;
    category: string | null;
    url: string;
    asked_to: string | null;
    channel_id: string | null;
    type: number;
    user_id: number;
    name: string;
    username: string;
    profession: string;
    profile_pic: string;
    reply_count: number;
    likes_count: number;
    replies_count: number;
    comments_count: number;
    is_liked: boolean;
    media: Array<{
      media_url: string;
      media_type: string;
    }>;
  };
  showMenu: number | null;
  setShowMenu: React.Dispatch<React.SetStateAction<number | null>>;
  setPosts: React.Dispatch<React.SetStateAction<any[]>>;
  setSelectedPost: React.Dispatch<React.SetStateAction<any | null>>; // NEW PROP
}

const PostCard: React.FC<PostCardProps> = ({ post, showMenu, setShowMenu, setPosts, setSelectedPost }) => {
  // Function to copy the post link
  const handleCopyLink = (postId: number) => {
    const postLink = `${window.location.origin}/post/${postId}`;
    navigator.clipboard.writeText(postLink)
      .then(() => console.log("Link copied!")) // Changed from alert to console log
      .catch((err) => console.error("Error copying link: ", err));
  };

  // Function to delete the post
  const handleDeletePost = (postId: number) => {
    setPosts(prevPosts => prevPosts.filter(post => post.question_id !== postId));
    setShowMenu(null); // Close menu after deletion
  };

  return (
    <div className="bg-gray-100 p-3 sm:p-4 mb-4 rounded-lg shadow-sm relative">
      <div className="flex items-center gap-3 mb-2 sm:mb-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-400 text-white flex items-center justify-center rounded-full text-xs sm:text-base font-medium">
          {post.name[0]}
        </div>
        <p className="text-xs sm:text-sm font-semibold">{post.name}</p>
        <button
          onClick={() => setShowMenu(showMenu === post.question_id ? null : post.question_id)}
          className="text-gray-600 hover:text-gray-800 ml-auto"
        >
          <MoreHorizontal size={18} />
        </button>

        {showMenu === post.question_id && (
          <div className="absolute right-0 top-0 mt-8 bg-white mt-10 text-black shadow-lg rounded-lg p-2 w-36">
            <button
              onClick={() => handleCopyLink(post.question_id)}
              className="flex items-center gap-1 w-full p-1 rounded-lg hover:bg-gray-200"
            >
              <Copy size={16} />
              <span>Copy Link</span>
            </button>
            <button
              onClick={() => handleDeletePost(post.question_id)}
              className="flex items-center gap-1 w-full p-1 rounded-lg hover:bg-gray-200 text-red-500"
            >
              <Trash size={16} />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>

      <p className="text-xs sm:text-sm md:text-base text-gray-800">{post.question_text}</p>

      {post.media.length > 0 && post.media[0].media_url && (
        <div className="mt-2 cursor-pointer" onClick={() => setSelectedPost(post)}>
          <img src={post.media[0].media_url} alt="Post media" className="w-full h-full object-cover rounded-lg" />
        </div>
      )}

      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-4">
          <LikeButton />
          <ReplyButton />
          <ShareButton />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
