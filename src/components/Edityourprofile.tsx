"use client";
import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface Props {
  onClose: () => void;
  currentValues: {
    name: string;
    company: string;
    description: string;  
    location: string;
  };
  onSave: (data: {
    name: string;
    company: string;
    description: string;  
    location: string;
  }) => void;
}

const Edityourprofile: React.FC<Props> = ({ onClose, currentValues, onSave }) => {
  const [name, setName] = useState(currentValues.name);
  const [company, setCompany] = useState(currentValues.company);
  const [description, setDescription] = useState(currentValues.description);  
  const [location, setLocation] = useState(currentValues.location);

  
  useEffect(() => {
    setName(currentValues.name);
    setCompany(currentValues.company);
    setDescription(currentValues.description);  
    setLocation(currentValues.location);
  }, [currentValues]);

  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleSave = () => {
    onSave({
      name,
      company,
      description,  
      location,
    });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/40">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] h-[550px] relative">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-black">Edit Your Profile</h1>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 w-full gap-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />

            <label htmlFor="company" className="block text-sm font-medium text-gray-600 mt-4">
              College/Company
            </label>
            <input
              id="company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your Profession"
            />

            <label htmlFor="description" className="block text-sm font-medium text-gray-600 mt-4">
              About
            </label>
            <textarea
              id="description"  
              rows={4}
              value={description}  
              onChange={(e) => setDescription(e.target.value)} 
              className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Tell Something About Yourself"
            />

            <label htmlFor="location" className="block text-sm font-medium text-gray-600 mt-4">
              Location
            </label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your Location"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edityourprofile;
