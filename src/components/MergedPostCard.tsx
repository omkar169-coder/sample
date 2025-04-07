"use client";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { MoreHorizontal, Copy, Trash } from "lucide-react";
import LikeButton from "@/components/LikeButton";
import ReplyButton from "@/components/ReplyButton";
import ShareButton from "@/components/ShareButton";
import Image from "next/image";
import FullCardView from "@/components/FullCardView";

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

const API_DELETE_URL =
  "https://wooble.io/feed/discussion_api/delete_question.php";
const USER_ID = 9168;

const sanitizeMediaUrl = (url: string): string => {
  const fileName = url.split("/").pop() || url;
  return `https://wooble.org/dms/${fileName}`;
};

const sanitizeText = (input: string) => {
  const withoutTags = input.replace(/<\/?[^>]+(>|$)/g, "");
  const textArea = document.createElement("textarea");
  textArea.innerHTML = withoutTags;
  return textArea.value;
};

const truncateText = (text: string, limit: number = 300) => {
  if (text.length <= limit) return text;
  return text.slice(0, limit).trim() + "…";
};

const MergedPostCard: React.FC<MergedPostCardProps> = ({
  post,
  showMenu,
  setShowMenu,
  setPosts,
  setSelectedPost,
}) => {
  const [deleting, setDeleting] = useState(false);
  const [selectedPost, setLocalSelectedPost] = useState<Post | null>(null); 
  const [showFullText, setShowFullText] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (el) {
      setIsOverflowing(el.scrollHeight > el.clientHeight);
    }
  }, [post.question_text]);

  const handleCopyLink = () => {
    const postLink = `${window.location.origin}/post/${post.question_id}`;
    navigator.clipboard.writeText(postLink);
  };

  const handleDeletePost = async () => {
    setDeleting(true);
    try {
      const formData = new URLSearchParams();
      formData.append("user_id", USER_ID.toString());
      formData.append("question_id", post.question_id.toString());

      const response = await axios.post(API_DELETE_URL, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (response.data?.success) {
        setPosts((prevPosts) =>
          prevPosts.filter((p) => p.question_id !== post.question_id)
        );
      } else {
        console.error("Failed to delete post. Response:", response.data);
        if (
          typeof response.data === "string" &&
          response.data.includes("Cannot delete or update a parent row")
        ) {
          alert(
            "This post cannot be deleted because it is linked to existing replies or media."
          );
        }
      }
    } catch (err: any) {
      console.error("Error deleting post:", err);
      alert("Something went wrong while trying to delete the post.");
    } finally {
      setDeleting(false);
      setShowMenu(null);
    }
  };

  return (
    <>
      <div className="bg-white p-4 sm:p-5 mb-5 rounded-xl shadow-md relative border border-gray-200">
        {/* Profile Section */}
        <div className="flex items-center gap-3 mb-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={
                post.profile_pic
                  ? sanitizeMediaUrl(post.profile_pic)
                  : "/default-avatar.png"
              }
              alt="User Avatar"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
          <div>
            <p className="text-sm sm:text-base font-semibold">
              {post.is_anonymous ? "Anonymous" : post.name}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(post.timestamp).toLocaleString()}
            </p>
          </div>
          <button
            onClick={() =>
              setShowMenu(showMenu === post.question_id ? null : post.question_id)
            }
            className="ml-auto text-gray-600 hover:text-gray-800"
          >
            <MoreHorizontal size={20} />
          </button>
        </div>

        {/* Dropdown Menu */}
        {showMenu === post.question_id && (
          <div className="absolute right-4 top-10 bg-white text-black shadow-lg rounded-lg p-2 w-36 border border-gray-200 z-10">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 h-10 w-full p-2 rounded-lg hover:bg-gray-100"
            >
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
        <div
          ref={contentRef}
          className={`text-sm text-gray-800 whitespace-pre-wrap transition-all duration-300 ${
            showFullText ? "max-h-full" : "max-h-[150px] overflow-hidden"
          }`}
          dangerouslySetInnerHTML={{ __html: post.question_text }}
        />
        {isOverflowing && (
          <button
            onClick={() => setShowFullText(!showFullText)}
            className="text-blue-500 mt-2 text-sm hover:underline"
          >
            {showFullText ? "See less" : "See full text"}
          </button>
        )}

        {/* Post Image */}
        {post.media &&
          post.media.length > 0 &&
          post.media[0].media_type === "image" &&
          post.media[0].media_url && (
            <div
              className="relative w-full h-64 mt-3 rounded-xl overflow-hidden border border-gray-300 cursor-pointer"
              onClick={() => {
                if (
                  post.media.length > 0 &&
                  post.media[0].media_type === "image"
                ) {
                  setSelectedPost(post);
                }
              }}
            >
              <img
                src={sanitizeMediaUrl(post.media[0].media_url)}
                alt="Post Image"
                className="w-full h-64 object-cover rounded-xl"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          )}

        {/* Post Actions */}
        <div className="flex gap-2 mt-3 text-gray-600 text-sm">
          <LikeButton
            questionId={post.question_id}
            userId={USER_ID}
            initialLikes={post.likes_count}
            initiallyLiked={post.is_liked}
          />
          <ShareButton
            postUrl={`${window.location.origin}/post/${post.question_id}`}
            postTitle={post.question_text}
          />
          <ReplyButton questionId={post.question_id} userId={USER_ID} />
        </div>
      </div>

      {/* Full Card View Overlay */}
      {post === selectedPost && (
        <FullCardView post={post} onClose={() => setSelectedPost(null)} />
      )}
    </>
  );
};

export default MergedPostCard;
