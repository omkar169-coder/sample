"use client";

import LikeButton from "@/components/LikeButton";
import ReplySection from "@/components/ReplySection";
import ShareButton from "@/components/ShareButton";
import axios from "axios";
import { Copy, MoreHorizontal, Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Props {
  slug: string;
}

const API_FETCH_URL = "https://wooble.io/feed/discussion_api/fetch_questionData.php";
const API_DELETE_URL = "https://wooble.io/feed/discussion_api/delete_question.php";

// Encode file name with btoa
const encodeFileName = (filename: string): string => {
  try {
    return btoa(filename);
  } catch {
    return filename;
  }
};

const sanitizeMediaUrl = (url: string): string => {
  const fileName = url.split("/").pop() || url;
  return `https://wooble.org/dms/${encodeFileName(fileName)}`;
};

const handleDelete = (answerId: string) => {
  if (confirm("Are you sure you want to delete this answer?")) {
    // Call delete API or update state
    console.log("Deleting answer with ID:", answerId);
  }
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
        const res = await axios.get(`${API_FETCH_URL}?slug=${encodeURIComponent(slug)}`);
        if (res.data.success) setData(res.data.data);
      } catch (err) {
        console.error("Failed to fetch post data", err);
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
  
   // const [currentUserId, setCurrentUserId] = useState<number | null>(null);
   const [currentUserId, setCurrentUserId] = useState<number | undefined>(undefined);


useEffect(() => {
  const storedUserId = localStorage.getItem("user_id");
  if (storedUserId) setCurrentUserId(parseInt(storedUserId));
}, []);

  const handleDeletePost = async () => {
    setDeleting(true);
    try {
      const formData = new URLSearchParams();
      formData.append("user_id", data.question.user_id);
      formData.append("question_id", data.question.question_id);

      const res = await axios.post(API_DELETE_URL, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      if (res.data?.success) {
        alert("Post deleted successfully.");
        setData(null);
      } else {
        alert("Failed to delete post.");
        console.error("Delete failed:", res.data);
      }
    } catch (err) {
      alert("Error deleting post.");
      console.error(err);
    } finally {
      setDeleting(false);
      setShowMenu(null);
    }
  };

  if (!data) return <div className="text-center py-10">Loading...</div>;

  const { question, answers } = data;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
  {/* Full Card */}
  <div className="bg-white p-5 mb-6 rounded-xl border border-gray-200 relative space-y-6">

    {/* --- Post Content Section --- */}
    <div>
      {/* User Info */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={
              question.questioner?.avatar
                ? sanitizeMediaUrl(question.questioner.avatar)
                : "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
            }
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-base font-semibold text-gray-900">
              {question.questioner?.user_id === null ||
              question.questioner?.name === "Anonymous"
                ? "Anonymous"
                : question.questioner?.name || "PostName"}
            </p>
            <p className="text-sm text-gray-600">
              {question.questioner?.profession}
            </p>
          </div>
        </div>
        <div className="relative">
          <MoreHorizontal
            className="cursor-pointer"
            onClick={() =>
              setShowMenu((prev) =>
                prev === question.question_id ? null : question.question_id
              )
            }
          />
          {showMenu === question.question_id && (
            <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg z-10">
              <button
                className="w-full px-4 py-2 text-sm hover:bg-gray-100 flex items-center"
                onClick={handleCopyLink}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Link
              </button>
              <button
                className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                onClick={handleDeletePost}
                disabled={deleting}
              >
                <Trash className="w-4 h-4 mr-2" />
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Post Text */}
      <div
        ref={contentRef}
        className={`text-gray-800 whitespace-pre-wrap text-sm sm:text-base ${
          isOverflowing && !showFullText ? "max-h-40 overflow-hidden" : ""
        }`}
      >
        <div dangerouslySetInnerHTML={{ __html: question.question_text }} />
      </div>

      {isOverflowing && (
        <button
          className="text-blue-500 text-sm mt-2"
          onClick={() => setShowFullText(!showFullText)}
        >
          {showFullText ? "Show less" : "Read more"}
        </button>
      )}

      {/* Post Media */}
      {question.media?.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-3 mt-4">
          {question.media.map((item: any, index: number) => (
            <div key={index}>
              {item.media_type === "video" ? (
                <video
                  src={sanitizeMediaUrl(item.media_url)}
                  controls
                  className="w-full rounded-lg"
                />
              ) : (
                <img
                  src={sanitizeMediaUrl(item.media_url)}
                  alt="Post Media"
                  className="w-full rounded-lg"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Like & Share Buttons */}
      <div className="flex gap-2 mt-4">
      <LikeButton
        userId={currentUserId!} // Dynamically pass current user's ID
        questionId={question.question_id} // Question ID for liking the question
        //answerId={undefined} // Leave this as undefined for question likes
        //answerId={answer.answer_id} // Pass the answer_id for replie
        initialLikes={question.likes_count} // Initial like count for the question
        initiallyLiked={question.is_liked} // Whether the question is liked by the user or not
      />
        <ShareButton
          postTitle={question.question_text}
          postUrl={`${window.location.origin}/post/${question.question_id}`}
        />
      </div>

      {/* Reply Section */}
      {showReplies && (
        <ReplySection
          questionId={question.question_id}
          slug={slug}
          onReply={() => {
            setShowReplies(false);
            setShowReplies(true);
          }}
          isFullPage={true}
        />
      )}
    </div>

    {/* --- Divider and Answers Section --- */}
    {answers?.length > 0 && (
      <>
        <hr className="border-gray-300" />
        <p className="text-left text-sm font-medium text-gray-500">ANSWERS</p>

        <div className="space-y-6">
        {answers?.map((answer: any) => (
            <div
              key={answer.answer_id}
              className="relative p-4 border rounded-lg shadow-sm bg-white"
            >
              {/* Action buttons */}
              <div className="absolute top-2 right-2">
                <MoreHorizontal
                  className="cursor-pointer"
                  onClick={() =>
                    setShowMenu((prev) =>
                      prev === answer.answer_id ? null : answer.answer_id
                    )
                  }
                />
                {showMenu === answer.answer_id && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg z-10">
                    <button
                      className="w-full px-4 py-2 text-sm hover:bg-gray-100 flex items-center"
                      onClick={() => {
                        navigator.clipboard.writeText(answer.answer_text);
                        setShowMenu(null);
                      }}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Text
                    </button>
                    <button
                      className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                      onClick={() => {
                        handleDelete(answer.answer_id);
                        setShowMenu(null);
                      }}
                    >
                      <Trash className="w-4 h-4 mr-2" />
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {/* User Info */}
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={
                    answer.answerer?.avatar
                      ? sanitizeMediaUrl(answer.answerer.avatar)
                      : "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                  }
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {answer.answerer?.name ?? "Anonymous"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {answer.answerer?.profession ?? ""}
                  </p>
                </div>
              </div>

              {/* Answer Text */}
              <div
                className="text-sm text-gray-700 whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: answer.answer_text }}
              />
              {/* Like & Share Buttons */}
              <div className="flex gap-2 mt-4">
              <LikeButton
                userId={currentUserId!}
                questionId={question.question_id}
                answerId={answer.answer_id}
                initialLikes={answer.like_count}
                initiallyLiked={answer.is_liked} 
                isReply={true}
              />
                  <ShareButton
                    postTitle={question.question_text}
                    postUrl={`${window.location.origin}/post/${question.question_id}`}
                  />
                </div>

                {/* Reply Section */}
                {showReplies && (
                  <ReplySection
                    questionId={question.question_id}
                    slug={slug}
                    onReply={() => {
                      setShowReplies(false);
                      setShowReplies(true);
                    }}
                    isFullPage={true}
                  />
                )}
            </div>
          ))}
        </div>
      </>
    )}
  </div>
</div>

  );
};

export default SinglePostReplies;
