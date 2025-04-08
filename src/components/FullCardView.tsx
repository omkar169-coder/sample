import React, { useState, useEffect } from "react";
import LikeButton from "@/components/LikeButton";
import ShareButton from "@/components/ShareButton";
import ReplyButton from "@/components/ReplyButton";
import ReplySection from "./ReplySection";
import { X } from "lucide-react";

interface Media {
  media_url: string;
  media_type: string;
}

interface Post {
  question_id: number;
  question_text: string;
  user_id: number;
  name: string;
  username: string;
  profession: string;
  profile_pic: string | null;
  media: Media[];
  is_liked: boolean;
  likes_count: number;
  replies_count: number;
  timestamp: string;
}

interface FullCardViewProps {
  post: Post;
  onClose: () => void;
}

const FullCardView: React.FC<FullCardViewProps> = ({ post, onClose }) => {
  const [showMore, setShowMore] = useState(false);
  const [replyInput, setReplyInput] = useState("");
  const [showFullText, setShowFullText] = useState(false);

  const toggleShowMore = () => setShowMore(!showMore);

  const handleReply = () => {
    console.log("Reply:", replyInput);
    setReplyInput("");
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[3px] bg-opacity-60 flex items-center justify-center p-2">
      <div className="relative w-full max-w-6xl max-h-[95vh] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-50"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        {/* Left: Image */}
        <div className="w-full md:w-1/2 h-[250px] md:h-auto bg-black flex items-center justify-center overflow-hidden">
          {post.media[0]?.media_type === "image" && (
            <img
              src={post.media[0].media_url}
              alt="Post"
              className="w-full h-full object-cover object-center md:rounded-l-2xl"
            />
          )}
        </div>

        {/* Right: Info and Actions */}
        <div className="w-full md:w-1/2 h-full max-h-[95vh] overflow-y-auto p-4 sm:p-6 space-y-4 flex flex-col">
          {/* User Info */}
          <div className="flex items-center space-x-4">
            <img
              src={post.profile_pic || "/default-avatar.png"}
              alt="User"
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <h2 className="text-lg font-semibold">{post.name}</h2>
              <p className="text-sm text-gray-500">{post.profession}</p>
            </div>
          </div>

          {/* Post Content with See More */}
          <div className="max-h-40 overflow-hidden overflow-y-auto pr-1">
            <div className="text-gray-800 whitespace-pre-wrap text-sm">
              {showFullText ? (
                <div dangerouslySetInnerHTML={{ __html: post.question_text }} />
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      post.question_text.length > 300
                        ? post.question_text.slice(0, 300) + "..."
                        : post.question_text,
                  }}
                />
              )}

              {post.question_text.length > 300 && (
                <button
                  className="text-blue-500 mt-1 text-sm hover:underline"
                  onClick={() => setShowFullText(!showFullText)}
                >
                  {showFullText ? "See less" : "See full text"}
                </button>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6 border-t border-gray-200 pt-4">
            <LikeButton
              questionId={post.question_id}
              userId={post.user_id}
              initiallyLiked={post.is_liked}
              initialLikes={post.likes_count}
            />
            <ShareButton
              postUrl={`${window.location.origin}/post/${post.question_id}`}
              postTitle={post.question_text}
            />
            <ReplyButton questionId={post.question_id} userId={post.user_id} />
          </div>

          {/* Reply Box */}
          <div className="mt-4">
            <textarea
              placeholder="Write a comment..."
              className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              value={replyInput}
              onChange={(e) => setReplyInput(e.target.value)}
            />
            <button
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
              onClick={handleReply}
            >
              Post Reply
            </button>
          </div>

          {/* Replies */}
          <div className="mt-4">
            <ReplySection
              questionId={post.question_id}
              userId={post.user_id}
              onReply={handleReply}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullCardView;