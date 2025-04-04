import { useState } from "react";
import { Heart } from "lucide-react";

interface LikeButtonProps {
  questionId: number;
  userId: number;
  initialLikes: number;
  initiallyLiked: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  questionId,
  userId,
  initialLikes,
  initiallyLiked,
}) => {
  const [liked, setLiked] = useState(initiallyLiked);
  const [likes, setLikes] = useState(initialLikes);

  const handleLikeToggle = async () => {
    try {
      const apiUrl = "https://wooble.io/feed/discussion_api/topic_like_dislike.php";
      const formData = new URLSearchParams();
      formData.append("user_id", userId.toString());
      formData.append("question_id", questionId.toString());

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });

      if (!response.ok) throw new Error(`Failed to toggle like: ${response.status}`);

      const result = await response.json();

      if (result.success) {
        setLiked(!liked);
        setLikes((prev) => (liked ? prev - 1 : prev + 1));
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <button onClick={handleLikeToggle} className="flex items-center space-x-2 focus:outline-none">
      <Heart
        className="transition-all duration-300"
        size={22}
        color={liked ? "#e63946" : "#000"}
        fill={liked ? "#e63946" : "none"}
      />
      <span className="text-sm font-semibold">{likes}</span>
    </button>
  );
};

export default LikeButton;
