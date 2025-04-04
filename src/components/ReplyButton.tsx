import { useEffect, useState } from "react";
import ReplySection from "./ReplySection"; // Import ReplySection to show the replies

interface ReplyButtonProps {
  questionId: number;
}

const ReplyButton: React.FC<ReplyButtonProps> = ({ questionId }) => {
  const [replyCount, setReplyCount] = useState<number>(0);
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const [replies, setReplies] = useState<any[]>([]); // Store the actual replies
  const [error, setError] = useState<string>("");

  const toggleReplies = () => setShowReplies((prev) => !prev);

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const response = await fetch(
          `https://wooble.io/feed/discussion_api/fetch_replies.php?question_id=${questionId}`,
          {
            method: "GET", // Using GET to fetch replies
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success) {
          setReplyCount(data.data.length); // Update the reply count correctly
          setReplies(data.data); // Store the replies in state
        } else {
          console.error("Failed to fetch replies: ", data.message);
          setError("Failed to fetch replies. Please try again.");
        }
      } catch (error: any) {
        console.error("Error fetching replies:", error);
        setError(`Error fetching replies: ${error.message}`);
      }
    };

    fetchReplies();
  }, [questionId]);

  return (
    <div>
      {/* Reply button to toggle replies */}
      <button
        className="text-sm text-gray-800 focus:outline-none"
        onClick={toggleReplies}
      >
        +{replyCount} replies
      </button>

      {/* Display error message if any */}
      {error && <div className="text-red-600">{error}</div>}

      {/* Display the ReplySection if showReplies is true */}
      {showReplies && <ReplySection replies={replies} />} {/* Pass the replies to ReplySection */}
    </div>
  );
};

export default ReplyButton;
