import React, { useState } from "react";
import { X, Image as ImageIcon, Users, Trash2 } from "lucide-react";
import { MdPublic } from "react-icons/md";
import { FaUserSecret } from "react-icons/fa";

interface TextAreaWithDialogProps {
  newPost: string;
  setNewPost: React.Dispatch<React.SetStateAction<string>>;
  setImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
  isAnonymous: boolean; // ✅ Add this
  setIsAnonymous: React.Dispatch<React.SetStateAction<boolean>>; // ✅ Add this
  onPost: () => void;
  onClose: () => void;
}

const TextAreaWithDialog: React.FC<TextAreaWithDialogProps> = ({
  newPost,
  setNewPost,
  setImagePreview,
  onPost,
  onClose,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [postType, setPostType] = useState("public");

  // Handle Image Selection
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreview(imageUrl);
      setImagePreview(imageUrl); 
    }
  };

  // Remove Selected Image
  const removeImage = () => {
    setPreview(null);
    setImagePreview(null);
  };

  // Toggle Post Type Dialog
  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-lg shadow-lg w-[700px] p-4 relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>

        {/* Header */}
        <h2 className="text-gray-600 text-lg font-semibold mb-2">New Topic</h2>

        {/* Text Area */}
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Write something here..."
          className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 text-sm resize-none focus:ring-2 focus:ring-blue-400 outline-none h-[150px] bg-gray-100"
        />

        {/* Image Upload & Post Type */}
        <div className="flex items-center space-x-3 text-gray-500 mt-2">
          <label htmlFor="imageUpload" className="cursor-pointer hover:text-gray-700">
            <ImageIcon size={20} />
          </label>
          <input id="imageUpload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />

          {/* Post Type Selector */}
          <button onClick={toggleDialog} className="cursor-pointer hover:text-gray-700">
            {postType === "public" ? <MdPublic size={20} /> : <FaUserSecret size={20} />}
          </button>
        </div>

        {/* Image Preview */}
        {preview && (
          <div className="relative mt-3 w-24 h-24 border border-gray-300 rounded-lg overflow-hidden">
            <img src={preview} alt="Selected" className="w-full h-full object-cover" />
            <button onClick={removeImage} className="absolute top-1 right-1 bg-gray-700 text-white rounded-full p-1 hover:bg-gray-900">
              <Trash2 size={16} />
            </button>
          </div>
        )}

        {/* Footer with Post Button */}
        <div className="flex justify-between items-center mt-2">
          <p className="text-gray-500 text-xs">Anyone can reply and quote</p>
          <button onClick={onPost} className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
            Post
          </button>
        </div>
      </div>

      {/* Post Type Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-[300px]">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Select Post Type</h3>
            <button
              onClick={() => {
                setPostType("public");
                setIsDialogOpen(false);
              }}
              className="w-full p-2 text-left flex items-center space-x-2 hover:bg-gray-100 rounded-lg"
            >
              <MdPublic size={20} /> <span>Post as Myself</span>
            </button>
            <button
              onClick={() => {
                setPostType("anonymous");
                setIsDialogOpen(false);
              }}
              className="w-full p-2 text-left flex items-center space-x-2 hover:bg-gray-100 rounded-lg mt-2"
            >
              <FaUserSecret size={20} /> <span>Post Anonymously</span>
            </button>
            <button onClick={toggleDialog} className="w-full mt-3 p-2 text-gray-600 hover:bg-gray-200 rounded-lg">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextAreaWithDialog;
