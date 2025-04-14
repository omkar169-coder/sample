"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import axios from "axios";

interface LikeButtonProps {
  questionId?: number; // optional for replies
  answerId?: number;   // optional for questions
  userId: number;
  initialLikes: number;
  initiallyLiked: boolean;
  isReply?: boolean; 
}

const LikeButton: React.FC<LikeButtonProps> = ({
  questionId,
  answerId,
  userId,
  initialLikes,
  initiallyLiked,
  isReply = false,
}) => {
  const [liked, setLiked] = useState(initiallyLiked);
  const [likes, setLikes] = useState(initialLikes);
  const [loading, setLoading] = useState(false);

  const handleLikeToggle = async () => {
    if (!userId || (isReply ? !answerId : !questionId)) return;
    setLoading(true);

    try {
      const formData = new URLSearchParams();
      formData.append("user_id", userId.toString());

      if (isReply && answerId) {
        formData.append("answer_id", answerId.toString());
      } else if (questionId) {
        formData.append("question_id", questionId.toString());
      }

      const res = await axios.post(
        "https://wooble.io/feed/discussion_api/topic_like_dislike.php",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (res.data.success) {
        const action = res.data.action;
        setLiked(action === "liked");
        setLikes((prev) => (action === "liked" ? prev + 1 : prev - 1));
      } else {
        console.error("API error:", res.data);
      }
    } catch (err) {
      console.error("Like toggle error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLikeToggle}
      disabled={loading}
      className="flex items-center space-x-2 focus:outline-none"
    >
      <Heart
        className={`transition-all duration-300 ${liked ? "text-red-500" : "text-gray-600"}`}
        size={22}
        color={liked ? "#e63946" : "#000"}
        fill={liked ? "#e63946" : "none"}
      />
      <span className="text-sm font-semibold">{likes}</span>
    </button>
  );
};

export default LikeButton;
