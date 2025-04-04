"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Media {
  media_url: string;
  media_type: string;
}

interface Reply {
  answer_id: number;
  question_id: number;
  answer_text: string;
  timestamp: string;
  is_anonymous: number;
  user_id: number;
  username: string;
  profession: string;
  user_avatar: string;
  userlink: string;
  question_url: string;
  like_count: number;
  media: Media[];
}

interface ReplySectionProps {
  questionId?: number; // Optional questionId for fetching replies
  replies?: Reply[]; // Optional replies prop passed directly
}

const ReplySection: React.FC<ReplySectionProps> = ({ questionId, replies: propReplies }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState<Reply[]>(propReplies || []); // Initialize with propReplies if available
  const toggleReplies = () => setShowReplies((prev) => !prev);

  useEffect(() => {
    if (questionId && propReplies?.length === 0) { // Only fetch if questionId is provided and no replies are passed
      const fetchReplies = async () => {
        try {
          const response = await axios.get(
            `https://wooble.io/feed/discussion_api/fetch_replies.php?question_id=${questionId}`
          );

          if (response.data.success) {
            setReplies(response.data.data); // Update replies
          } else {
            console.error("Failed to fetch replies");
          }
        } catch (error) {
          console.error("Error fetching replies:", error);
        }
      };

      fetchReplies();
    }
  }, [questionId, propReplies]);

  return (
    <div className="max-w-2xl mx-auto bg-white p-4 rounded-lg shadow-sm">
      <input
        type="checkbox"
        id="toggle-replies"
        className="hidden"
        checked={showReplies}
        onChange={toggleReplies}
      />
      <label
        htmlFor="toggle-replies"
        className="text-sm text-blue-600 font-semibold cursor-pointer mb-2 block"
      >
        {replies.length > 0 ? `+${replies.length} Replies` : "No Replies"}
      </label>

      <div
        className={`${
          showReplies ? "max-h-96" : "max-h-0"
        } overflow-hidden transition-all duration-300`}
      >
        {replies.length === 0 ? (
          <p>No replies yet.</p>
        ) : (
          replies.map((reply) => (
            <div key={reply.answer_id} className="flex gap-3 border-t pt-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0">
                {reply.user_avatar && (
                  <img
                    src={`https://wooble.io/uploads/profile_pictures/${reply.user_avatar}`}
                    alt={reply.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm mb-2">
                  {reply.is_anonymous ? "Anonymous" : reply.username}
                </div>

                <div
                  className="relative"
                  dangerouslySetInnerHTML={{
                    __html: reply.answer_text,
                  }}
                />

                <div className="flex gap-5 mt-2">
                  <button className="text-gray-600 text-sm">Like</button>
                  <button className="text-gray-600 text-sm">Comment</button>
                </div>

                {reply.media &&
                  reply.media.length > 0 &&
                  reply.media[0].media_type === "image" && (
                    <div className="w-full mt-3 rounded-lg overflow-hidden">
                      <img
                        src={`https://wooble.io/uploads/media/${reply.media[0].media_url}`}
                        alt="Reply visual"
                        className="w-full rounded-lg"
                      />
                    </div>
                  )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReplySection;
