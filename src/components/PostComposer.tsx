"use client";

import React, { useState } from "react";
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
}

const PostComposer: React.FC<PostComposerProps> = ({
  userId,
  newPost,
  setNewPost,
  setImagePreview,
  isAnonymous,
  setIsAnonymous,
  onPost,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [postType, setPostType] = useState("public");

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

  const handlePost = async () => {
    if (!newPost.trim()) return;
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("user_id", String(userId));
      formData.append("question_text", newPost);
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

  // 🌟 Magic paste cleaner to remove HTML tags
  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    const cleanedText = text.replace(/<[^>]+>/g, ""); // remove HTML tags
    setNewPost((prev) => prev + cleanedText);
  };

  return (
    <div>
      {/* Post Entry Bar */}
      <div className="flex items-center space-x-3 mb-4">
        <Image
          src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex-1 text-left text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200 px-4 py-3"
        >
          What's on your mind?
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Post
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-xl p-5 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-3 text-gray-700">New Topic</h2>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              onPaste={handlePaste} // ✅ handle paste event
              placeholder="Write something here..."
              className="w-full p-3 text-sm rounded-lg border border-gray-300 bg-gray-100 resize-none focus:ring-2 focus:ring-blue-400 outline-none h-32"
            />
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
