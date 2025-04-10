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
  slug: string;
  onReply: (newReply: Reply) => void;
  isFullPage?: boolean;
}

const ReplySection: React.FC<ReplySectionProps> = ({
  questionId,
  slug,
  onReply,
  isFullPage = false,
}) => {
  const [allReplies, setAllReplies] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedReplies, setExpandedReplies] = useState<number[]>([]);
  const [showAllReplies, setShowAllReplies] = useState(false);
  const [posting, setPosting] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const [isEditorEmpty, setIsEditorEmpty] = useState(true);

  useEffect(() => {
    const fetchReplies = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://wooble.io/feed/discussion_api/fetch_replies.php?question_id=${questionId}`
        );
        if (res.data.success && Array.isArray(res.data.data)) {
          setAllReplies(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching replies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReplies();
  }, [questionId]);

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
    let text = temp.innerText;
    text = text.replace(/\n\s*\n/g, "\n").replace(/\s{2,}/g, " ").trim();
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  const encodeFileName = (filename: string) => {
    try {
      return btoa(filename);
    } catch {
      return filename;
    }
  };

  const visibleReplies = showAllReplies ? allReplies : allReplies.slice(0, 2);
  const remainingReplies = allReplies.length - visibleReplies.length;

  return (
    <div className="mt-0 bg-white max-w-3xl mx-auto space-y-4">
      {loading ? (
        <p className="text-sm text-gray-400">Loading replies...</p>
      ) : (
        <>
          {visibleReplies.map((reply) => {
            const isExpanded = expandedReplies.includes(reply.answer_id);
            const content = isExpanded
              ? reply.answer_text
              : truncateHtml(reply.answer_text);
            const isLong = reply.answer_text.length > 300;

            const avatarSrc = reply.is_anonymous
              ? "/default-avatar.png"
              : reply.user_avatar
              ? `https://wooble.org/dms/${encodeFileName(reply.user_avatar)}`
              : "";

            const mediaSrc =
              reply.media?.length > 0 &&
              reply.media[0].media_type === "image"
                ? `https://wooble.org/dms/${encodeFileName(reply.media[0].media_url)}`
                : "";

            return (
              <div
                key={reply.answer_id}
                className="flex items-start gap-4 mt-6 p-4 border border-gray-200 bg-gray-50 rounded-lg"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  {avatarSrc && (
                    <img
                      src={avatarSrc}
                      alt={reply.is_anonymous ? "Anonymous" : reply.username}
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
                  {mediaSrc && (
                    <div className="mt-3 rounded-lg overflow-hidden">
                      <img
                        src={mediaSrc}
                        alt="Reply Media"
                        className="w-full rounded-lg"
                      />
                    </div>
                  )}
                  <div className="flex gap-4 mt-3 text-sm text-gray-500">
                    <LikeButton
                      questionId={reply.answer_id}
                      userId={reply.user_id}
                      initialLikes={reply.like_count}
                      initiallyLiked={false}
                      isReply
                    />
                    <ReplyButton questionId={reply.answer_id} />
                  </div>
                </div>
              </div>
            );
          })}

          {!showAllReplies && remainingReplies > 0 && (
            <button
              onClick={() => setShowAllReplies(true)}
              className="text-sm text-blue-500 hover:underline"
            >
              +{remainingReplies} more repl{remainingReplies === 1 ? "y" : "ies"}
            </button>
          )}
        </>
      )}

      {/* Composer */}
      <div className="flex gap-3 items-start pt-4 border-t border-gray-200">
        <div className="flex-1 relative w-full">
          <div
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            className="w-full p-3 text-sm rounded-lg border border-gray-300 bg-gray-100 resize-none focus:ring-2 focus:ring-blue-400 outline-none min-h-[56px] overflow-y-auto"
            style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
          />
          {isEditorEmpty && (
            <p className="absolute top-3 left-3 text-sm text-gray-400 pointer-events-none">
              Give your comment here...
            </p>
          )}
        </div>
        <button
          disabled={isEditorEmpty || posting}
          onClick={handlePostReply}
          className="px-4 py-2 h-fit mt-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
        >
          {posting ? "Posting..." : "Post"}
        </button>
      </div>

      {!isFullPage && allReplies.length > 0 && (
        <div className="mt-3">
          <a
            href={`/seeAllreplies?slug=${slug}`}
            className="text-blue-500 text-sm hover:underline"
          >
            See All Replies
          </a>
        </div>
      )}
    </div>
  );
};

export default ReplySection;
