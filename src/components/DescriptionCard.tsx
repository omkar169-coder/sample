"use client";
import React from 'react';
import { X } from 'lucide-react'; 

interface Props {
  description: string;
  onClose: () => void;
  onSubmit: (newDescription: string) => void;
}

const DescriptionCard: React.FC<Props> = ({ description, onClose, onSubmit }) => {
  const [inputValue, setInputValue] = React.useState(description);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-2xl w-[800px] h-[400px] relative flex flex-col justify-between">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-black hover:text-gray-700"
      >
        <X size={24} />
      </button>

      {/* Title */}
      <h1 className="text-2xl font-bold text-black">Description</h1>

      {/* Description Box */}
      <div className="flex-1 mt-4">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full h-full p-4 rounded-lg bg-gray-200 text-gray-700 overflow-auto"
        />
      </div>

      {/* Submit Button */}
      <button
        className="mt-6 bg-[#4267B2] text-white py-3 rounded-md hover:bg-[#365899] transition-all"
        onClick={() => onSubmit(inputValue)}
      >
        Submit
      </button>
    </div>
  );
};

export default DescriptionCard;
