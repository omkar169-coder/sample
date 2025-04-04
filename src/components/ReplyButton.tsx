import { useEffect, useState } from "react";

interface ReplyButtonProps {
  questionId: number;
}

const ReplyButton: React.FC<ReplyButtonProps> = ({ questionId }) => {
  const [replyCount, setReplyCount] = useState<number>(0);

  // useEffect(() => {
  //   const fetchReplies = async () => {
  //     try {
  //       const formData = new FormData();
  //       formData.append("question_id", questionId.toString());

  //       const response = await fetch("https://wooble.io/feed/discussion_api/fetch_replies.php", {
  //         method: "POST",
  //         body: formData,
  //       });

  //       const data = await response.json();
  //       if (data.success) {
  //         setReplyCount(data.data.length);
  //       } else {
  //         console.error("Reply fetch error:", data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching replies:", error);
  //     }
  //   };

  //   fetchReplies();
  // }, [questionId]);

  return (
    <button className="text-sm text-gray-800 focus:outline-none">
      +{replyCount} replies
    </button>
  );
};

export default ReplyButton;
