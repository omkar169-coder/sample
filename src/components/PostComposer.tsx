"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X, Image as ImageIcon, Trash2 } from "lucide-react";
import { MdPublic } from "react-icons/md";
import { FaUserSecret } from "react-icons/fa";
import axios from "axios";
 import { IoPersonSharp } from "react-icons/io5";

interface PostComposerProps {
  userId: number;
  newPost: string;
  setNewPost: React.Dispatch<React.SetStateAction<string>>;
  setImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
  isAnonymous: boolean;
  setIsAnonymous: React.Dispatch<React.SetStateAction<boolean>>;
  onPost: () => void;
  userName: string; 
  userProfilePic?: string | null;
}

const PostComposer: React.FC<PostComposerProps> = ({
  userId,
  newPost,
  setNewPost,
  setImagePreview,
  isAnonymous,
  setIsAnonymous,
  onPost,
  userName,
  userProfilePic, // Accept userProfilePic as a prop
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [postType, setPostType] = useState("public");
  const [isEditorEmpty, setIsEditorEmpty] = useState(true);
  const editorRef = useRef<HTMLDivElement>(null);
  const [showPrivacyDialog, setShowPrivacyDialog] = useState(false);
  const [pendingPostType, setPendingPostType] = useState<"public" | "anonymous">(postType as "public" | "anonymous");


  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      const text = e.clipboardData?.getData("text/plain");
      if (text && editorRef.current) {
        document.execCommand("insertText", false, text);
      }
    };
  
    const editor = editorRef.current;
    editor?.addEventListener("paste", handlePaste);
  
    return () => {
      editor?.removeEventListener("paste", handlePaste);
    };
  }, []);
  

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreview(base64);
        setImagePreview(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPreview(null);
    setSelectedFile(null);
    setImagePreview(null);
  };

  const sanitizeHTML = (dirtyHtml: string): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(dirtyHtml, "text/html");
  
    let result = "";
  
    const traverse = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        result += node.textContent;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
  
        if (el.tagName === "BR") {
          result += "\n";
        } else if (el.tagName === "P") {
          Array.from(el.childNodes).forEach(traverse);
          result += "\n\n";
        } else {
          Array.from(el.childNodes).forEach(traverse);
        }
      }
    };
  
    doc.body.childNodes.forEach(traverse);
  
    // Clean up excessive newlines at the end
    return result.trim().replace(/\n{3,}/g, "\n\n");
  };
  
  const handlePost = async () => {
    const editor = editorRef.current;
    if (!editor) return;
  
    const plainText = editor.textContent?.trim() || "";
    if (!plainText) return;
  
    setUploading(true);
  
    try {
      const formData = new FormData();
      formData.append("user_id", String(userId));
      formData.append("question_text", editor.innerHTML); // safely use after null check
      formData.append("is_anonymous", isAnonymous ? "1" : "0");
  
      if (selectedFile && selectedFile instanceof File) {
        formData.append("media[]", selectedFile);
      }
  
      const response = await axios.post(
        "https://wooble.io/feed/discussion_api/create_question.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
          withCredentials: false,
        }
      );
  
      if (response.data.success) {
        onPost();
        setNewPost("");
        removeImage();
        editor.innerHTML = ""; // safe now
        setIsModalOpen(false);
      } else {
        console.error("API Error:", response.data.message || "Unknown error from API.");
      }
    } catch (error: any) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
      } else if (error.request) {
        console.error("No Response from Server. Possibly CORS or Network Issue.");
        console.warn("Request details:", error.request);
      } else {
        console.error("Post Error:", error.message);
      }
    } finally {
      setUploading(false);
    }
  };
  
  
  

  return (
    <div className="mt-6 px-4 sm:px-6 lg:px-8">
      {/* Post Entry Bar */}
      <div className="flex items-center bg-white gap-3 px-3 py-3 sm:px-4 sm:py-4 mb-4 rounded-lg shadow-md">
        {userProfilePic ? (
          <Image
            src={userProfilePic}
            alt="Profile"
            width={48}
            height={48}
            className="rounded-full"
          />
        ) : (
          <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-gray-300 text-black rounded-full text-lg font-medium">
            {userName && userName.charAt(0).toUpperCase()}
          </div>
        )}
  
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex-1 text-left text-sm sm:text-base text-gray-500 bg-white rounded-lg px-3 py-2"
        >
          What's on your mind?
        </button>
  
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 text-sm sm:text-base bg-white text-black border border-black rounded-full"
        >
          Post
        </button>
      </div>
  
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-2 sm:px-0">
          <div className="relative bg-white/90 border border-gray-300 rounded-xl shadow-2xl w-full max-w-xl p-4 sm:p-6">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            >
              <X size={20} />
            </button>
  
            <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-700">
              New Topic
            </h2>
  
            <div className="relative w-full">
              <div
                ref={editorRef}
                contentEditable
                onInput={() => {
                  const text = editorRef.current?.innerText.trim() || "";
                  setIsEditorEmpty(text === "");
                }}
                className="w-full p-3 text-sm rounded-lg border border-gray-300 bg-gray-100 resize-none focus:ring-2 focus:ring-blue-400 outline-none h-32 overflow-y-auto"
                style={{
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              />
              {isEditorEmpty && (
                <p className="absolute top-3 left-3 text-sm text-gray-400 pointer-events-none">
                  Write something here...
                </p>
              )}
            </div>
  
            {/* Image Upload & Type Toggle */}
            <div className="flex items-center space-x-4 mt-4 text-gray-500">
              <label htmlFor="imageUpload" className="cursor-pointer hover:text-gray-700">
                <ImageIcon size={20} />
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <button
                onClick={() => {
                  setPendingPostType(postType === "public" ? "anonymous" : "public");
                  setShowPrivacyDialog(true);
                }}
                className="cursor-pointer hover:text-gray-700"
              >
                {postType === "public" ? <MdPublic size={20} /> : <FaUserSecret size={20} />}
              </button>
            </div>
  
            {/* Preview */}
            {preview && (
              <div className="relative mt-4 w-24 h-24 sm:w-28 sm:h-28 border rounded-lg overflow-hidden">
                <img src={preview} alt="Selected" className="w-full h-full object-cover" />
                <button
                  onClick={removeImage}
                  className="absolute top-1 right-1 bg-gray-800 text-white rounded-full p-1 hover:bg-black"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
  
            {/* Bottom Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-2">
              <p className="text-xs text-gray-400">Anyone can reply and quote</p>
              <button
                onClick={handlePost}
                disabled={uploading}
                className="px-4 py-2 text-sm sm:text-base text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-60"
              >
                {uploading ? "Posting..." : "Post"}
              </button>
            </div>
          </div>
        </div>
      )}
  
      {/* Privacy Dialog */}
      {showPrivacyDialog && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl border border-gray-100 relative">
            <h2 className="text-xl font-semibold mb-2 text-gray-900">POST AS YOU WANT TO</h2>
            <p className="text-sm text-gray-600 mb-5">How do you want to post?</p>

            <div className="space-y-4">
              {/* Public Option */}
              <div
                onClick={() => setPendingPostType("public")}
                className={`flex items-center p-4 rounded-xl cursor-pointer transition border-2 ${
                  pendingPostType === "public"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div
                  className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 mt-0.5 ${
                    pendingPostType === "public" ? "border-blue-500 bg-blue-500" : "border-gray-400"
                  }`}
                >
                  {pendingPostType === "public" && (
                    <div className="w-2.5 h-2.5 bg-white rounded-full" />
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <MdPublic className="text-gray-700" />
                  <div>
                    <p className="font-medium text-gray-900">Post as Myself</p>
                    <p className="text-sm text-gray-500">Your name and profile will be visible.</p>
                  </div>
                </div>
              </div>

              {/* Anonymous Option */}
              <div
                onClick={() => setPendingPostType("anonymous")}
                className={`flex items-center p-4 rounded-xl cursor-pointer transition border-2 ${
                  pendingPostType === "anonymous"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div
                  className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 mt-0.5 ${
                    pendingPostType === "anonymous" ? "border-blue-500 bg-blue-500" : "border-gray-400"
                  }`}
                >
                  {pendingPostType === "anonymous" && (
                    <div className="w-2.5 h-2.5 bg-white rounded-full" />
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <FaUserSecret className="text-gray-700" />
                  <div>
                    <p className="font-medium text-gray-900">Post Anonymously</p>
                    <p className="text-sm text-gray-500">Your identity will be hidden.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowPrivacyDialog(false)}
                className="text-sm text-gray-500 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setPostType(pendingPostType);
                  setIsAnonymous(pendingPostType === "anonymous");
                  setShowPrivacyDialog(false);
                }}
                className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
  export default PostComposer;  
