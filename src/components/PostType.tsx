import React, { useState } from "react";
import { MdPublic } from "react-icons/md";
import { FaUserSecret } from "react-icons/fa";
import { X } from "lucide-react";

const PostType: React.FC<{ selectedType: string; setSelectedType: (type: string) => void }> = ({
  selectedType,
  setSelectedType,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Icon Button */}
      <button onClick={() => setIsOpen(true)}>
        {selectedType === "myself" ? <MdPublic size={20} /> : <FaUserSecret size={20} />}
      </button>

      {/* Dialog Box */}
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-lg shadow-lg w-[400px] p-4 relative">
            {/* Close Button */}
            <button onClick={() => setIsOpen(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>

            {/* Header */}
            <h2 className="text-gray-700 text-lg font-semibold mb-2">Choose Post Privacy</h2>
            <p className="text-gray-500 text-sm mb-4">Select how you want to post:</p>

            {/* Options */}
            <div className="space-y-3">
              <div
                className={`flex items-center space-x-2 p-3 border rounded-lg cursor-pointer ${
                  selectedType === "myself" ? "border-blue-500 bg-blue-100" : "border-gray-300"
                }`}
                onClick={() => setSelectedType("myself")}
              >
                <MdPublic size={20} className="text-gray-700" />
                <div>
                  <p className="font-semibold text-gray-700">Post as Myself</p>
                  <p className="text-sm text-gray-500">Your name and profile will be visible.</p>
                </div>
              </div>

              <div
                className={`flex items-center space-x-2 p-3 border rounded-lg cursor-pointer ${
                  selectedType === "anonymous" ? "border-blue-500 bg-blue-100" : "border-gray-300"
                }`}
                onClick={() => setSelectedType("anonymous")}
              >
                <FaUserSecret size={20} className="text-gray-700" />
                <div>
                  <p className="font-semibold text-gray-700">Post Anonymously</p>
                  <p className="text-sm text-gray-500">Your identity will remain hidden.</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostType;
