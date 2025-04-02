import React, { useState } from "react";
import axios from "axios";
import { MoreHorizontal, Copy, Trash } from "lucide-react";
import LikeButton from "@/components/LikeButton";
import ReplyButton from "@/components/ReplyButton";
import ShareButton from "@/components/ShareButton";

interface Media {
  media_url: string;
  media_type: string;
}

interface Post {
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
  profile_pic: string | null;
  reply_count: number;
  likes_count: number;
  replies_count: number;
  comments_count: number;
  is_liked: boolean;
  media: Media[];
}

interface MergedPostCardProps {
  post: Post;
  showMenu: number | null;
  setShowMenu: React.Dispatch<React.SetStateAction<number | null>>;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
}

const API_DELETE_URL = "https://wooble.io/feed/discussion_api/delete_question.php";
const USER_ID = 9168;

const MergedPostCard: React.FC<MergedPostCardProps> = ({
  post,
  showMenu,
  setShowMenu,
  setPosts,
  setSelectedPost,
}) => {
  const [deleting, setDeleting] = useState(false);

  const handleCopyLink = () => {
    const postLink = `${window.location.origin}/post/${post.question_id}`;
    navigator.clipboard.writeText(postLink);
  };

  const handleDeletePost = async () => {
    setDeleting(true);
    try {
      const response = await axios.post(
        API_DELETE_URL,
        { user_id: USER_ID, question_id: post.question_id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setPosts((prevPosts) => prevPosts.filter((p) => p.question_id !== post.question_id));
      } else {
        console.error("Failed to delete post.", response.data);
      }
    } catch (err) {
      console.error("Error deleting post:", err);
    } finally {
      setDeleting(false);
      setShowMenu(null);
    }
  };

  return (
    <div className="bg-white p-4 sm:p-5 mb-5 rounded-xl shadow-md relative border border-gray-200">
      {/* Profile Section */}
      <div className="flex items-center gap-3 mb-3">
      <img 
        src={post.profile_pic ? `https://wooble.io/uploads/profile_pictures/${post.profile_pic}` : "/default-avatar.png"}
        alt="User Avatar" 
    />



        <div>
          <p className="text-sm sm:text-base font-semibold">{post.is_anonymous ? "Anonymous" : post.name}</p>
          <p className="text-xs text-gray-500">{new Date(post.timestamp).toLocaleString()}</p>
        </div>
        <button onClick={() => setShowMenu(post.question_id)} className="ml-auto text-gray-600 hover:text-gray-800">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Dropdown Menu */}
      {showMenu === post.question_id && (
        <div className="absolute right-4 top-10 bg-white text-black shadow-lg rounded-lg p-2 w-36 border border-gray-200">
          <button onClick={handleCopyLink} className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-gray-100">
            <Copy size={16} />
            <span>Copy Link</span>
          </button>
          <button
            onClick={handleDeletePost}
            disabled={deleting}
            className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-gray-100 text-red-500"
          >
            <Trash size={16} />
            <span>{deleting ? "Deleting..." : "Delete"}</span>
          </button>
        </div>
      )}

      {/* Post Text */}
      <p className="text-gray-800 text-sm sm:text-base mt-2">{post.question_text}</p>

 
      {/* Post Image */}
      {post.media && post.media.length > 0 && (
        <div className="mt-3">
            {post.media.map((media, index) => (
            media.media_type === "image" && (
                <img
                key={index}
                src={`https://wooble.io/uploads/media/${media.media_url}`} // Removed proxy
                alt="Post Media"
                className="w-full rounded-lg border border-gray-300 mt-2"
                onError={(e) => (e.currentTarget.style.display = "none")} // Hide if broken
                />
            )
            ))}
        </div>
        )}


      {/* Post Actions */}
      <div className="flex gap-2 mt-3 text-gray-600 text-sm">
        <LikeButton />
        <ReplyButton />
        <ShareButton />
      </div>
    </div>
  );
};

export default MergedPostCard;