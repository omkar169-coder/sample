import { useEffect, useState } from "react";
import ReplySection from "./ReplySection";

interface ReplyButtonProps {
  questionId: number;
  userId: number;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode; // ✅ Add this line
}


const ReplyButton: React.FC<ReplyButtonProps> = ({ questionId, userId }) => {
  const [replyCount, setReplyCount] = useState<number>(0);
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const [replies, setReplies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  

  const fetchReplies = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://wooble.io/feed/discussion_api/fetch_replies.php?question_id=${questionId}`,
        { method: "GET" }
      );

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();

      if (data.success) {
        const repliesData = Array.isArray(data.data) ? data.data : [];
        setReplyCount(repliesData.length);
        setReplies(repliesData);
      } else if (data.message === "No answers found") {
        setReplyCount(0);
        setReplies([]);
      } else {
        setError("Failed to fetch replies. Please try again.");
      }
    } catch (error: any) {
      setError(`Error fetching replies: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReplies();
  }, [questionId]);

  const handleToggleReplies = () => {
    if (!showReplies && replies.length === 0) {
      fetchReplies();
    }
    setShowReplies((prev) => !prev);
  };

  const handleNewReply = (newReply: any) => {
    setReplies((prev) => [newReply, ...prev]);
    setReplyCount((prev) => prev + 1);
  };

  return (
    <div>
      <button className="text-sm text-gray-800 focus:outline-none" onClick={handleToggleReplies}>
        +{replyCount} replies
      </button>

      {error && <div className="text-red-600 mt-1">{error}</div>}
      {loading && <div className="text-sm text-gray-500 mt-1">Loading replies...</div>}

      {showReplies && (
        <ReplySection
          questionId={questionId}
          
          onReply={handleNewReply}
          userId={userId}
        />
      )}
    </div>
  );
};

export default ReplyButton;
