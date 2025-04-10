"use client";

import { useEffect, useRef, useState } from "react";
import { MoreHorizontal, Copy, Trash } from "lucide-react";
import LikeButton from "@/components/LikeButton";
import ReplyButton from "@/components/ReplyButton";
import ShareButton from "@/components/ShareButton";
import ReplySection from "@/components/ReplySection";
import axios from "axios";


interface MediaItem {
    media_type: string;
    media_url: string;
  }

  

interface Props {
  slug: string;
}

const API_DELETE_URL =
  "https://wooble.io/feed/discussion_api/delete_question.php";

// Sanitize Wooble Media URL to new format
const sanitizeMediaUrl = (url: string): string => {
  const fileName = url.split("/").pop() || url;
  return `https://wooble.org/dms/${fileName}`;
};

const SinglePostReplies = ({ slug }: Props) => {
  const [data, setData] = useState<any>(null);
  const [showMenu, setShowMenu] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const params = new URLSearchParams();
        params.append("slug", slug);

        const res = await fetch(
          `https://wooble.io/feed/discussion_api/fetch_questionData.php?${params.toString()}`
        );

        const json = await res.json();
        if (json.success) setData(json.data);
      } catch (err) {
        console.error("Failed to fetch replies", err);
      }
    };

    fetchPostData();
  }, [slug]);

  useEffect(() => {
    if (data?.question?.question_text && contentRef.current) {
      const el = contentRef.current;
      setIsOverflowing(el.scrollHeight > el.clientHeight);
    }
  }, [data?.question?.question_text]);

  const handleCopyLink = () => {
    const postLink = `${window.location.origin}/post/${data.question.question_id}`;
    navigator.clipboard.writeText(postLink);
  };

  const handleDeletePost = async () => {
    setDeleting(true);
    try {
      const formData = new URLSearchParams();
      const userId = data.question.user_id;
      formData.append("user_id", userId.toString());
      formData.append("question_id", data.question.question_id.toString());

      const response = await axios.post(API_DELETE_URL, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (response.data?.success) {
        alert("Post deleted successfully.");
        setData(null);
      } else {
        console.error("Failed to delete post. Response:", response.data);
        if (
          typeof response.data === "string" &&
          response.data.includes("Cannot delete or update a parent row")
        ) {
          alert(
            "This post cannot be deleted because it is linked to existing replies or media."
          );
        }
      }
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Something went wrong while trying to delete the post.");
    } finally {
      setDeleting(false);
      setShowMenu(null);
    }
  };

  if (!data) return <div className="text-center py-10">Loading...</div>;

  const { question, answers } = data;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* --- Question Card --- */}
      <div className="bg-white p-4 sm:p-5 mb-6 rounded-xl relative border border-gray-200">
        {/* User Info */}
        <div className="flex items-center mb-3">
          <img
            src={question.user_profile_photo || "/default-avatar.png"}
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
          <div>
            <p className="font-medium text-gray-900">
              {question.is_anonymous === "1"
                ? "Anonymous"
                : question.user_full_name}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(question.created_at).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Question Text */}
        <div className="text-gray-800 whitespace-pre-wrap text-sm sm:text-base">
          <div dangerouslySetInnerHTML={{ __html: question.question_text }} />
        </div>

        {/* Post Images */}
        {question.media && question.media.length > 0 && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {question.media.map((mediaItem: MediaItem, index: number) => (
  mediaItem.media_type === "image" && (
    <img
      key={index}
      src={`https://wooble.io/feed-pics/${mediaItem.media_url}`}
      alt={`Post Image ${index + 1}`}
      className="w-full rounded-lg object-cover max-h-96"
    />
  )
))}

          </div>
        )}

        {/* Post Actions */}
        <div className="flex gap-2 mt-3 text-gray-600 text-sm">
          <LikeButton
            userId={question.asked_by_user_id}
            questionId={question.question_id}
            initialLikes={question.likes_count}
            initiallyLiked={question.is_liked}
          />
          <ShareButton
            postUrl={`${window.location.origin}/post/${question.question_id}`}
            postTitle={question.question_text}
          />
          <ReplyButton
            questionId={question.question_id}
            onClick={() => setShowReplies(!showReplies)}
          />
        </div>

        {/* Reply Section */}
        {showReplies && (
          <div className="mt-2">
            <ReplySection
              questionId={question.question_id}
              onReply={() => {}}
              isFullPage={true}
              slug={question.url ?? ""}
            />
          </div>
        )}
      </div>

      {/* --- All Answers --- */}
      <div className="space-y-6">
        {answers?.map((answer: any) => (
          <div
            key={answer.answer_id}
            className="p-4 border rounded-lg shadow-sm bg-white"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full overflow-hidden relative">
                {answer.answerer?.avatar ? (
                  <img
                    src={sanitizeMediaUrl(answer.answerer.avatar)}
                    alt={answer.answerer?.name || "User"}
                    className="object-cover rounded-full w-full h-full"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="bg-gray-200 w-full h-full flex items-center justify-center text-sm font-semibold text-gray-600">
                    {answer.answerer?.name
                      ? answer.answerer.name.charAt(0).toUpperCase()
                      : "?"}
                  </div>
                )}
              </div>
              <div>
                <div className="font-semibold">{answer.answerer.name}</div>
                <div className="text-sm text-gray-500">
                  {answer.answerer.profession}
                </div>
              </div>
            </div>

            {/* Answer Text */}
            <div
              className="text-sm text-gray-800 whitespace-pre-wrap break-words"
              dangerouslySetInnerHTML={{ __html: answer.answer_text }}
            />

            {/* Answer Media */}
            {answer.media?.[0]?.media_type === "image" &&
              answer.media[0].media_url && (
                <div className="relative mt-3 w-fit max-w-full">
                  <img
                    src={sanitizeMediaUrl(answer.media[0].media_url)}
                    alt="Answer Image"
                    className="rounded-xl object-contain max-w-full h-auto"
                    style={{ maxHeight: "400px" }}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SinglePostReplies;
