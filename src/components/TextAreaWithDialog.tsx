"use client";

import { useState, useRef } from "react";
import { FaImages } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { MdOutlinePerson, MdOutlineVisibilityOff } from "react-icons/md";
import { GiSpiderMask } from "react-icons/gi";  

const TextAreaWithDialog = () => {
  const [newPost, setNewPost] = useState<string>(""); 
  const [imagePreview, setImagePreview] = useState<string | null>(null); 
  const [imageCaption, setImageCaption] = useState<string>(""); 
  const [showDialog, setShowDialog] = useState(false);
  const [showPrivacyDialog, setShowPrivacyDialog] = useState(false);
  const [postPrivacy, setPostPrivacy] = useState<"myself" | "anonymous">("myself");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleTextAreaClick = () => {
    setShowDialog(true);
  };


  interface TextAreaWithDialogProps {
    setNewPost: React.Dispatch<React.SetStateAction<string>>;
    setImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
    setImageCaption: React.Dispatch<React.SetStateAction<string>>;
  }
  
  const TextAreaWithDialog = ({
    setNewPost,
    setImagePreview,
    setImageCaption,
  }: TextAreaWithDialogProps) => {
    const [text, setText] = useState("");  // Text state for the post content
    const [caption, setCaption] = useState("");  // Text state for the image caption
    const [image, setImage] = useState<File | null>(null);  // State for the uploaded image
    const [showDialog, setShowDialog] = useState(false); 
  };

  const closeDialog = () => {
    setShowDialog(false);
    resetImage(); // Reset image and caption on close
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        setImagePreview(base64Image);
        setNewPost(""); // Clear any existing text
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrivacyClick = () => {
    setShowPrivacyDialog(true);
  };

  const confirmPrivacySelection = () => {
    setShowPrivacyDialog(false);
  };

  const resetImage = () => {
    setImagePreview(null);
    setImageCaption("");
  };

  const handlePostSubmit = () => {
    
    if (newPost.trim() === "" && !imagePreview) {
      alert("Post cannot be empty");
      return;
    }

    const postDetails = {
      content: newPost,
      image: imagePreview, 
      imageCaption: imageCaption,
      privacy: postPrivacy,
      username: postPrivacy === "myself" ? "Murala Omkar" : "Anonymous",
    };

    
    console.log("Posting:", postDetails);

    
    setNewPost("");
    resetImage();
    setShowDialog(false);  // Close the dialog after posting
  };

  return (
    <>
      {/* Textarea */}
      <textarea
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        placeholder="What's new...?"
        onClick={handleTextAreaClick}
        className="flex-grow p-2 sm:p-3 border border-gray-300 rounded-lg text-gray-700 text-sm sm:text-base outline-none resize-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Main Post Dialog */}
      {showDialog && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-opacity-50"
          style={{
            backdropFilter: "blur(3.5px)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 mb-40">
            <h2 className="text-gray-700 text-lg font-semibold mb-2">New Topic</h2>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold">
                M
              </div>
              <span className="text-gray-700 font-medium">Murala Omkar</span>
            </div>

            <textarea
                value={imageCaption}
                onChange={(e) => setImageCaption(e.target.value)}
                placeholder="Add a caption..."
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 text-sm resize-none focus:ring-2 focus:ring-blue-400 outline-none"    
            />  

            {/* Image Preview */}
            {imagePreview && (
              <div className="mb-4">
                <img src={imagePreview} alt="Uploaded" className="w-full my-4" />
              </div>
            )}

            

            {/* Buttons */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-3">
                {/* Image Upload Button */}
                <button
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                  onClick={handleImageClick}
                >
                  <FaImages className="text-gray-600" />
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />

                {/* Privacy Button */}
                <button
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                  onClick={handlePrivacyClick}
                >
                  {postPrivacy === "anonymous" ? (
                    <GiSpiderMask className="text-gray-600" />
                  ) : (
                    <IoPerson className="text-gray-600" />
                  )}
                </button>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={closeDialog}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                >
                  Close
                </button>
                <button
                  onClick={handlePostSubmit}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Selection Dialog */}
      {showPrivacyDialog && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-opacity-50"
          style={{
            backdropFilter: "blur(3.5px)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-gray-800 text-lg font-semibold">Choose Post Privacy</h2>
              <button onClick={() => setShowPrivacyDialog(false)} className="text-gray-500">
                <IoClose size={20} />
              </button>
            </div>

            <p className="text-gray-600 mb-4">Select how you want to post:</p>

            <div
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
                postPrivacy === "myself" ? "border-2 border-blue-500 bg-blue-100" : "border border-gray-300"
              }`}
              onClick={() => setPostPrivacy("myself")}
            >
              <MdOutlinePerson className="text-gray-700 text-lg" />
              <div>
                <p className="font-medium text-gray-800">Post as Myself</p>
                <p className="text-gray-500 text-sm">Your name and profile will be visible.</p>
              </div>
            </div>

            <div
              className={`flex items-center space-x-3 p-3 mt-3 rounded-lg cursor-pointer ${
                postPrivacy === "anonymous" ? "border-2 border-blue-500 bg-blue-100" : "border border-gray-300"
              }`}
              onClick={() => setPostPrivacy("anonymous")}
            >
              <MdOutlineVisibilityOff className="text-gray-700 text-lg" />
              <div>
                <p className="font-medium text-gray-800">Post Anonymously</p>
                <p className="text-gray-500 text-sm">Your identity will remain hidden.</p>
              </div>
            </div>

            <div className="flex justify-end mt-4 space-x-3">
              <button
                onClick={() => setShowPrivacyDialog(false)}
                className="text-gray-600 px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={confirmPrivacySelection}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TextAreaWithDialog;
