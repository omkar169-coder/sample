"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X, Image as ImageIcon, Trash2 } from "lucide-react";
import { MdPublic } from "react-icons/md";
import { FaUserSecret } from "react-icons/fa";
import axios from "axios";

interface PostComposerProps {
  userId: number;
  newPost: string;
  setNewPost: React.Dispatch<React.SetStateAction<string>>;
  setImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
  isAnonymous: boolean;
  setIsAnonymous: React.Dispatch<React.SetStateAction<boolean>>;
  onPost: () => void;
  userName: string; // Add userName prop
  userProfilePic?: string | null; // Add userProfilePic prop to handle the profile picture
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
          // Add paragraph text followed by double line break
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
    const plainText = editorRef.current?.innerText.trim() || "";
    if (!plainText) return;


    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("user_id", String(userId));
      formData.append("question_text", plainText);
      formData.append("is_anonymous", isAnonymous ? "1" : "0");

      if (selectedFile) {
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
        // if (editorRef.current) editorRef.current.innerHTML = "";
        if (editorRef.current) editorRef.current.innerText = "";

        setIsModalOpen(false);
      } else {
        console.error("API Error:", response.data.message);
      }
    } catch (error: any) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
      } else if (error.request) {
        console.error("No Response from Server. Possibly CORS or Network Issue.");
      } else {
        console.error("Post Error:", error.message);
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className=" mt-10">
      {/* Post Entry Bar */}
      <div className="flex items-center bg-white gap-4 px-4 py-4 mb-4 rounded-lg shadow-md">
        {userProfilePic ? (
          <Image
            src={userProfilePic}
            alt="Profile"
            width={50}
            height={50}
            className="rounded-full"
          />
        ) : (
          <div className="w-12 h-12 flex items-center justify-center bg-gray-300 text-black rounded-full">
           M {userName && userName.charAt(0).toUpperCase()} {/* Added condition to avoid error */}
          </div>
        )}

        
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex-1 text-left text-gray-500  bg-white rounded-lg px-4 py-2"
        >
          What's on your mind?
        </button>
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-white text-black border border-black rounded-r-full rounded-l-full"
        >
          Post
        </button>
      </div>


      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 backdrop-blur-sm">
  <div className="relative left-[-50px] bg-white/90 border border-gray-300 rounded-xl shadow-2xl w-full max-w-2xl p-6">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-3 text-gray-700">New Topic</h2>

            <div className="relative w-full">
              <div
                ref={editorRef}
                contentEditable
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

            <div className="flex items-center space-x-3 mt-3 text-gray-500">
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
                  setIsAnonymous(!isAnonymous);
                  setPostType(postType === "public" ? "anonymous" : "public");
                }}
                className="cursor-pointer hover:text-gray-700"
              >
                {postType === "public" ? <MdPublic size={20} /> : <FaUserSecret size={20} />}
              </button>
            </div>

            {preview && (
              <div className="relative mt-4 w-28 h-28 border rounded-lg overflow-hidden">
                <img src={preview} alt="Selected" className="w-full h-full object-cover" />
                <button
                  onClick={removeImage}
                  className="absolute top-1 right-1 bg-gray-800 text-white rounded-full p-1 hover:bg-black"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}

            <div className="flex justify-between items-center mt-4">
              <p className="text-xs text-gray-400">Anyone can reply and quote</p>
              <button
                onClick={handlePost}
                disabled={uploading}
                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                {uploading ? "Posting..." : "Post"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostComposer;
