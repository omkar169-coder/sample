"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Copy, Trash, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import LikeButton from "@/components/LikeButton";
import ReplyButton from "@/components/ReplyButton";
import ShareButton from "@/components/ShareButton";
import ReplySection from "@/components/ReplySection";

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

interface SinglePostViewProps {
  questionId: number;
  userId: number;
}

const API_FETCH_URL =
  "https://wooble.io/feed/discussion_api/fetch_single_question.php";
const API_DELETE_URL =
  "https://wooble.io/feed/discussion_api/delete_question.php";

const sanitizeMediaUrl = (url: string): string => {
  const fileName = url.split("/").pop() || url;
  return `https://wooble.org/dms/${fileName}`;
};

const SinglePostView: React.FC<SinglePostViewProps> = ({
  questionId,
  userId,
}) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showReplies, setShowReplies] = useState(true);
  const [showFullText, setShowFullText] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const fetchPost = async () => {
    try {
      const response = await axios.get(API_FETCH_URL, {
        params: {
          question_id: questionId,
        },
      });
  
      if (response.data?.question) {
        setPost(response.data.question);
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleDeletePost = async () => {
    if (!post) return;
    setDeleting(true);
    try {
      const formData = new URLSearchParams();
      formData.append("user_id", userId.toString());
      formData.append("question_id", post.question_id.toString());

      const response = await axios.post(API_DELETE_URL, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      if (response.data?.success) {
        alert("Post deleted successfully.");
        setPost(null);
      } else {
        console.error("Delete failed:", response.data);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [questionId]);

  useEffect(() => {
    const el = contentRef.current;
    if (el) {
      setIsOverflowing(el.scrollHeight > el.clientHeight);
    }
  }, [post?.question_text]);

  if (loading) return <p>Loading post...</p>;
  if (!post) return <p>Post not found or has been deleted.</p>;

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm max-w-2xl mx-auto mt-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
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
          />
        </div>
        <div>
          <p className="font-semibold text-sm">
            {post.is_anonymous ? "Anonymous" : post.name}
          </p>
          <p className="text-xs text-gray-500">
            {new Date(post.timestamp).toLocaleString()}
          </p>
        </div>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="ml-auto text-gray-600 hover:text-gray-800"
        >
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Dropdown Menu */}
      {showMenu && (
        <div className="absolute right-4 top-14 bg-white shadow-md rounded-md p-2 w-36 z-10 border border-gray-200">
          <button
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/post/${post.question_id}`
              );
              setShowMenu(false);
            }}
            className="flex gap-2 items-center px-2 py-2 hover:bg-gray-100 w-full rounded"
          >
            <Copy size={16} />
            Copy Link
          </button>
          <button
            onClick={handleDeletePost}
            disabled={deleting}
            className="flex gap-2 items-center px-2 py-2 text-red-500 hover:bg-gray-100 w-full rounded"
          >
            <Trash size={16} />
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      )}

      {/* Text */}
      <div
        ref={contentRef}
        className={`text-sm text-gray-800 whitespace-pre-wrap break-words leading-relaxed transition-all duration-300 ${
          showFullText ? "max-h-full" : "max-h-[150px] overflow-hidden"
        }`}
        dangerouslySetInnerHTML={{ __html: post.question_text }}
      />
      {isOverflowing && (
        <button
          className="text-blue-500 mt-1 text-sm hover:underline"
          onClick={() => setShowFullText(!showFullText)}
        >
          {showFullText ? "See less" : "See full text"}
        </button>
      )}

      {/* Image */}
      {post.media?.[0]?.media_type === "image" && (
        <img
          src={sanitizeMediaUrl(post.media[0].media_url)}
          alt="Post Media"
          className="rounded-xl mt-4 object-contain max-w-full max-h-[500px]"
        />
      )}

      {/* Actions */}
      <div className="flex gap-3 mt-4 text-gray-600 text-sm">
        <LikeButton
          questionId={post.question_id}
          userId={userId}
          initialLikes={post.likes_count}
          initiallyLiked={post.is_liked}
        />
        <ShareButton
          postUrl={`${window.location.origin}/post/${post.question_id}`}
          postTitle={post.question_text}
        />
        <ReplyButton
          questionId={post.question_id}
          userId={userId}
          onClick={() => setShowReplies(!showReplies)}
        />
      </div>

      {/* Replies */}
      {showReplies && (
        <div className="mt-5">
          <ReplySection
            questionId={post.question_id}
            userId={userId}
            onReply={() => fetchPost()}
          />
        </div>
      )}
    </div>
  );
};

export default SinglePostView;
