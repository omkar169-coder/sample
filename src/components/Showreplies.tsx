import { useState, useEffect } from "react";
import axios from "axios";

interface ReplyButtonProps {
  questionId: number;
}

const ReplyButton: React.FC<ReplyButtonProps> = ({ questionId }) => {
  const [replies, setReplies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const response = await axios.get(
          `https://wooble.io/feed/discussion_api/fetch_replies.php?question_id=${questionId}`
        );
        if (response.data.success) {
          setReplies(response.data.data);
        } else {
          setError("Failed to load replies");
        }
      } catch (err) {
        setError("Error fetching replies");
      } finally {
        setLoading(false);
      }
    };

    fetchReplies();
  }, [questionId]);

  return (
    <div className="mt-2">
      {loading ? (
        <p className="text-gray-500 text-sm">Loading replies...</p>
      ) : error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : (
        <button className="text-blue-500 text-sm font-semibold">
          {replies.length > 0 ? `+${replies.length} Replies` : "No Replies"}
        </button>
      )}
    </div>
  );
};

export default ReplyButton;