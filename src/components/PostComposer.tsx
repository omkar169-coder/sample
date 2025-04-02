"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Image as ImageIcon, Users, Trash2 } from "lucide-react";
import { MdPublic } from "react-icons/md";
import { FaUserSecret } from "react-icons/fa";
import axios from "axios"; // Import Axios for API requests

// Define the expected props for PostComposer
interface PostComposerProps {
  newPost: string;
  setNewPost: React.Dispatch<React.SetStateAction<string>>;
  setImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
  isAnonymous: boolean;
  setIsAnonymous: React.Dispatch<React.SetStateAction<boolean>>;
  onPost: () => void;
}

const PostComposer: React.FC<PostComposerProps> = ({
  newPost,
  setNewPost,
  setImagePreview,
  isAnonymous,
  setIsAnonymous,
  onPost,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [postType, setPostType] = useState("public");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false); // Track upload state

  // Handle image selection and preview
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreview(reader.result as string); // Set Base64 preview
        setImagePreview(reader.result as string); // Store for API
      };
      reader.readAsDataURL(selectedFile); // Convert file to Base64
    }
  };

  // Remove selected image
  const removeImage = () => {
    setPreview(null);
    setImagePreview(null);
  };

  // Toggle visibility of post type selection dialog
  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  // Handle post submission with API request
  const handlePost = async () => {
    if (!newPost.trim()) return; // Prevent empty posts

    setUploading(true);
    try {
      // Define API endpoint
      const API_URL = ""; // 🔴 Add API URL here

      // Prepare payload
      const payload = {
        user_id: 9168, // Change this if dynamic
        question_text: newPost,
        is_anonymous: isAnonymous ? 1 : 0,
        media: preview ? [{ media_url: preview, media_type: "image" }] : [],
      };

      // Send API request
      const response = await axios.post(API_URL, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR_ACCESS_TOKEN", // Replace with actual token
        },
      });

      // Handle response
      if (response.data.success) {
        onPost(); // Update UI with new post
        setNewPost(""); // Clear input field
        setPreview(null); // Remove image preview
        setIsModalOpen(false); // Close modal
      }
    } catch (error) {
      console.error("Error posting:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {/* Main Post Button */}
      <div className="flex items-center space-x-3">
        <Image 
          src="/profile.jpg"
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full"
        />
        <button onClick={() => setIsModalOpen(true)} className="flex-1 text-left text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200 transition px-4 py-3 w-[85%]">
          What's on your mind?
        </button>
        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Post
        </button>
      </div>

      {/* Modal for Post Creation */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-lg shadow-lg w-[700px] p-4 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
            <h2 className="text-gray-600 text-lg font-semibold mb-2">New Topic</h2>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Write something here..."
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 text-sm resize-none focus:ring-2 focus:ring-blue-400 outline-none h-[150px] bg-gray-100"
            />
            <div className="flex items-center space-x-3 text-gray-500 border-width-2px mt-2">
              <label htmlFor="imageUpload" className="cursor-pointer hover:text-gray-700">
                <ImageIcon size={20} />
              </label>
              <input id="imageUpload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              <button onClick={toggleDialog} className="cursor-pointer hover:text-gray-700">
                {postType === "public" ? <MdPublic size={20} /> : <FaUserSecret size={20} />}
              </button>
            </div>
            {preview && (
              <div className="relative mt-3 w-24 h-24 border border-gray-300 rounded-lg overflow-hidden">
                <img src={preview} alt="Selected" className="w-full h-full object-cover" />
                <button onClick={removeImage} className="absolute top-1 right-1 bg-gray-700 text-white rounded-full p-1 hover:bg-gray-900">
                  <Trash2 size={16} />
                </button>
              </div>
            )}
            <div className="flex justify-between items-center mt-2">
              <p className="text-gray-500 text-xs">Anyone can reply and quote</p>
              <button onClick={handlePost} disabled={uploading} className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
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
