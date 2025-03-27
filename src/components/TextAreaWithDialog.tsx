import React from "react";
import { X } from "lucide-react";

interface TextAreaWithDialogProps {
  newPost: string;
  setNewPost: React.Dispatch<React.SetStateAction<string>>;
  setImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
  onPost: () => void;
  onClose: () => void;
}

const TextAreaWithDialog: React.FC<TextAreaWithDialogProps> = ({
  newPost,
  setNewPost,
  onPost,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white  rounded-lg shadow-lg  w-[700px] h-[400px] p-4 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <h2 className="text-gray-600 text-lg font-semibold mb-2">New Topic</h2>

        {/* User Info */}
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-10 h-10 bg-gray-500 text-white flex items-center justify-center rounded-full text-lg font-semibold">
            M
          </div>
          <span className="text-gray-700 font-medium">Murala Omkar</span>
        </div>

        {/* Text Area */}
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Write something here..."
          className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 text-sm resize-none focus:ring-2 focus:ring-blue-400 outline-none h-[200px] bg-gray-100"
        />

        {/* Icons & Post Button */}
        <div className="flex justify-between items-center mt-2">
          <div className="flex space-x-3 text-gray-500">
            <button className="hover:text-gray-700">
              <i className="fas fa-image" />
            </button>
            <button className="hover:text-gray-700">
              <i className="fas fa-user" />
            </button>
          </div>
          <button
            onClick={onPost}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextAreaWithDialog;
