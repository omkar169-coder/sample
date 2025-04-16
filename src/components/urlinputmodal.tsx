'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface UrlInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (url: string | File | null) => void; // Allow null here
}

export default function UrlInputModal({
  isOpen,
  onClose,
  onSave,
}: UrlInputModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedBanner, setSelectedBanner] = useState<string | null>(null);

  // Load from localStorage on mount or open
  useEffect(() => {
    if (isOpen) {
      const savedImage = localStorage.getItem('savedBannerImage');
      const savedBanner = localStorage.getItem('selectedBanner');

      if (savedImage) {
        setPreviewUrl(savedImage);
        setSelectedBanner(null);
      } else if (savedBanner) {
        setSelectedBanner(savedBanner);
        setPreviewUrl(null);
      }
    }
  }, [isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setSelectedBanner(null);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDelete = () => {
    localStorage.removeItem('savedBannerImage');
    localStorage.removeItem('selectedBanner');
    setSelectedFile(null);
    setSelectedBanner(null);
    setPreviewUrl(null);
    onSave(null); // Notify parent to remove banner
  };

  const handleSave = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const base64 = e.target?.result as string;
        localStorage.setItem('savedBannerImage', base64);
        localStorage.removeItem('selectedBanner');
        setPreviewUrl(base64);
        onSave(selectedFile); // Notify parent with file
        cleanup();
      };
      reader.readAsDataURL(selectedFile);
    } else if (selectedBanner) {
      localStorage.setItem('selectedBanner', selectedBanner);
      localStorage.removeItem('savedBannerImage');
      setPreviewUrl(null);
      onSave(selectedBanner); // Notify parent with banner string
      cleanup();
    } else {
      onSave(null); // Let parent clear any old image
      cleanup();
    }
  };

  const cleanup = () => {
    setSelectedFile(null);
    setSelectedBanner(null);
    onClose();
  };

  // Optional: render modal UI here (if needed)

  // Return the modal only if isOpen is true
  if (!isOpen) {
    return null;
  }


  return !isOpen ? null : (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[600px] max-w-[95%] relative shadow-lg">
        {/* Close Icon */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">
          <X size={24} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-6">Manage Banner Image</h2>

        {/* Preview Box */}
        <div className="w-full h-40 bg-gray-100 rounded-xl flex items-center justify-center mb-6 border border-gray-200">
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-xl" />
          ) : (
            <div className="flex flex-col items-center text-gray-400">
              <img src="/placeholder-image-icon.svg" alt="placeholder" className="w-12 h-12 mb-2" />
              <span className="text-sm">No image selected</span>
            </div>
          )}
        </div>

        {/* Delete Button - if preview is shown */}
        {previewUrl && (
          <div className="flex justify-center mb-6">
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-600 transition"
            >
              DELETE BANNER IMAGE
            </button>
          </div>
        )}

        {/* Predefined Banners */}
        <p className="text-center text-gray-700 mb-3">Select from our predefined banners:</p>
        <div className="flex justify-center gap-4 mb-6">
          {['WORKSPACES', 'TECH & INNOVATION', 'NATURE'].map((label) => (
            <button
              key={label}
              onClick={() => {
                setSelectedBanner(label);
                setSelectedFile(null);
                setPreviewUrl(null);
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium border ${
                selectedBanner === label ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* File Upload */}
        <p className="text-center text-gray-700 mb-2">Or Upload Your Own Image</p>
        <div className="flex justify-center mb-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border rounded px-3 py-2 w-full max-w-md"
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            SAVE CHANGES
          </button>
        </div>
      </div>
    </div>
  );
}
