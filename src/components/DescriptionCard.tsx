"use client";
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Props {
  description: string;
  onClose: () => void;
  onSubmit: (newDescription: string) => void;
}

const DescriptionCard: React.FC<Props> = ({ description, onClose, onSubmit }) => {
  const [inputValue, setInputValue] = useState(description);

  useEffect(() => {
    setInputValue(description);
  }, [description]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-[800px] h-[80vh] max-h-[400px] relative flex flex-col justify-between">

      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-black hover:text-gray-700"
      >
        <X size={24} />
      </button>


      <h1 className="text-xl md:text-2xl font-bold text-black">Description</h1>


      <div className="flex-1 mt-4">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full h-full p-4 rounded-lg bg-gray-200 text-gray-700 resize-none"
        />
      </div>


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



