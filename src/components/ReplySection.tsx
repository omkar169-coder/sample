"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import LikeButton from "@/components/LikeButton";
import ReplyButton from "@/components/ReplyButton";

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
  questionId: number;
  userId: number;
  onReply: (newReply: Reply) => void;
}

const ReplySection: React.FC<ReplySectionProps> = ({ questionId, userId, onReply }) => {
  const [allReplies, setAllReplies] = useState<Reply[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loadingReplies, setLoadingReplies] = useState(false);
  const [showReplySection, setShowReplySection] = useState(false);
  const [expandedReplies, setExpandedReplies] = useState<number[]>([]);
  const editorRef = useRef<HTMLDivElement>(null);
  const [isEditorEmpty, setIsEditorEmpty] = useState(true);
  const [posting, setPosting] = useState(false);

  const visibleReplies = showAll ? allReplies : allReplies.slice(0, 2);

  useEffect(() => {
    if (!showReplySection) return;

    const fetchReplies = async () => {
      setLoadingReplies(true);
      try {
        const res = await axios.get(
          `https://wooble.io/feed/discussion_api/fetch_replies.php?question_id=${questionId}`
        );
        if (res.data.success && res.data.data) {
          setAllReplies(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching replies:", error);
      } finally {
        setLoadingReplies(false);
      }
    };

    fetchReplies();
  }, [questionId, showReplySection]);

  const handleInput = () => {
    const text = editorRef.current?.innerText || "";
    setIsEditorEmpty(text.trim().length === 0);
  };

  const handlePostReply = async () => {
    const content = editorRef.current?.innerHTML.trim();
    if (!content || isEditorEmpty) return;

    setPosting(true);
    const formData = new URLSearchParams();
    formData.append("question_id", questionId.toString());
    formData.append("user_id", userId.toString());
    formData.append("answer_text", content);
    formData.append("is_anonymous", "0");

    try {
      const response = await axios.post(
        "https://wooble.io/feed/discussion_api/submit_reply.php",
        formData,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      if (response.data.success && response.data.data) {
        const newReply = response.data.data;
        setAllReplies((prev) => [newReply, ...prev]);
        onReply(newReply);
        if (editorRef.current) editorRef.current.innerHTML = "";
        setIsEditorEmpty(true);
      }
    } catch (error) {
      console.error("Failed to post reply:", error);
    } finally {
      setPosting(false);
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedReplies((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const truncateHtml = (html: string, length = 300) => {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    const text = temp.innerText;
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  return (
    <div className="mt-4 space-y-4 max-w-3xl">
      {!showReplySection ? (
        <button
          onClick={() => setShowReplySection(true)}
          className="text-sm text-blue-500 hover:underline"
        >
          View replies
        </button>
      ) : (
        <>
          {/* Reply Composer */}
          <div className="relative w-full">
            <div
              ref={editorRef}
              contentEditable
              onInput={handleInput}
              className="w-full p-3 text-sm rounded-lg border border-gray-300 bg-gray-100 resize-none focus:ring-2 focus:ring-blue-400 outline-none h-14 overflow-y-auto"
              style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
            />
            {isEditorEmpty && (
              <p className="absolute top-3 left-3 text-sm text-gray-400 pointer-events-none">
                Give your comment here...
              </p>
            )}
            <button
              disabled={isEditorEmpty || posting}
              onClick={handlePostReply}
              className="mt-3 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
            >
              {posting ? "Posting..." : "Post"}
            </button>
          </div>

          {/* Replies */}
          {loadingReplies ? (
            <p className="text-sm text-gray-400">Loading replies...</p>
          ) : (
            visibleReplies.map((reply) => {
              const isExpanded = expandedReplies.includes(reply.answer_id);
              const content = isExpanded
                ? reply.answer_text
                : truncateHtml(reply.answer_text);
              const isLong = reply.answer_text.length > 300;

              return (
                <div
                  key={reply.answer_id}
                  className="flex items-start gap-4 p-4 border border-gray-200 bg-white rounded-xl shadow-sm"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    {reply.user_avatar && (
                      <img
                        src={`https://wooble.io/uploads/profile_pictures/${reply.user_avatar}`}
                        alt={reply.username}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-800">
                      {reply.is_anonymous ? "Anonymous" : reply.username}
                    </div>
                    <div
                      className="text-sm mt-1 text-gray-700 whitespace-pre-line"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                    {isLong && (
                      <button
                        className="text-sm text-blue-500 hover:underline mt-1"
                        onClick={() => toggleExpand(reply.answer_id)}
                      >
                        {isExpanded ? "See less" : "See more"}
                      </button>
                    )}
                    {reply.media?.length > 0 &&
                      reply.media[0].media_type === "image" && (
                        <div className="mt-3 rounded-lg overflow-hidden">
                          <img
                            src={`https://wooble.io/uploads/media/${reply.media[0].media_url}`}
                            alt="Reply Media"
                            className="w-full rounded-lg"
                          />
                        </div>
                      )}
                   <div className="flex gap-4 mt-3 text-sm text-gray-500">
                    <LikeButton
                      questionId={reply.answer_id}
                      userId={userId}
                      initialLikes={reply.like_count}
                      initiallyLiked={false} // Set to true if you can determine if this user liked the reply
                      isReply // Optional prop if you're handling replies differently inside LikeButton
                    />
                    <ReplyButton
                      questionId={reply.answer_id}
                      userId={userId}
                    />
                  </div>

                  </div>
                </div>
              );
            })
          )}

          {/* See More Replies */}
          {!showAll && allReplies.length > 2 && (
            <button
              onClick={() => setShowAll(true)}
              className="text-sm text-blue-500 hover:underline mt-2"
            >
              See more replies
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ReplySection;
