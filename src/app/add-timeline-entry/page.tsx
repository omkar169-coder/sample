'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft } from 'lucide-react';



const AddTimelineEntryPage = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    date: '',
    type: '',
    description: '',
    logo: '',
    startDate: '',
    endDate: '',
    ongoing: false,
    media: null as File | null,
  });

  // Load saved form data from localStorage when the component mounts
  useEffect(() => {
    const savedFormData = localStorage.getItem('formData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked, files } = e.target as any;
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      setFormData((prev) => ({ ...prev, media: files?.[0] ?? null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, media: null }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const entry = {
      id: Date.now(),
      ...formData,
      type: selectedOption,
    };

    const existing = JSON.parse(localStorage.getItem('timeline') || '[]');
    localStorage.setItem('timeline', JSON.stringify([entry, ...existing]));

    // Clear form data after submission
    localStorage.removeItem('formData');
    
    router.push(`/AccountProfilePage?tab=${encodeURIComponent('TIMELINE')}&data=${encodeURIComponent(JSON.stringify(formData))}`);
  };

  const renderMediaInput = () => (
    <div
      className="border border-dashed border-gray-400 rounded-md p-4 text-center cursor-pointer hover:bg-gray-50 mb-2"
      onClick={() => fileInputRef.current?.click()} // Trigger file input on click
    >
      {formData.media ? (
        <div className="relative">
          <img
            src={URL.createObjectURL(formData.media)}
            alt="Selected Media"
            className="w-full h-auto mb-2"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-full text-xs"
          >
            x
          </button>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-600">Click to select a file</p>
          <input
            ref={fileInputRef}
            type="file"
            name="media"
            onChange={handleChange}
            className="hidden" // Keep it hidden but clickable
          />
        </>
      )}
    </div>
  );

  const renderForm = () => {
    switch (selectedOption) {
      case 'education':
        return (
          <>
          <h2 className="font-extrabold text-xl mb-4">EDUCATION DETAILS</h2>

            <label> Institution<span className="text-red-500">*</span> </label>
            <input name="title" onChange={handleChange} placeholder="Institution name" className="w-full border rounded-md p-2 mb-4" value={formData.title} />

            <label>Degree<span className="text-red-500">*</span></label>
            <input name="company" onChange={handleChange} placeholder="Degree" className="w-full border rounded-md p-2 mb-4" value={formData.company} />

            <label>Field of Study<span className="text-red-500">*</span></label>
            <input name="description" onChange={handleChange} placeholder="Field of Study" className="w-full border rounded-md p-2 mb-4" value={formData.description} />

            <label>Start Date<span className="text-red-500">*</span></label>
            <input type="date" name="startDate" onChange={handleChange} className="w-full border rounded-md p-2 mb-4" value={formData.startDate} />

            <label>End Date</label>
            <input type="date" name="endDate" onChange={handleChange} className="w-full border rounded-md p-2 mb-2" value={formData.endDate} />

            <label className="flex items-center space-x-2 mb-4">
              <input type="checkbox" name="ongoing" onChange={handleChange} checked={formData.ongoing} />
              <span>Ongoing</span>
            </label>

            <label>Media</label>
            {renderMediaInput()}
            <p className="text-sm text-gray-500 mb-6">Note: Max File Size 5MB.</p>
          </>
        );

      case 'experience':
        return (
          <>
           <h2 className="font-extrabold text-xl mb-4">EXPERIENCE DETAILS</h2>

            <label>Company<span className="text-red-500">*</span></label>
            <input name="company" onChange={handleChange} placeholder="Company name" className="w-full border rounded-md p-2 mb-4" value={formData.company} />

            <label>Role<span className="text-red-500">*</span></label>
            <input name="title" onChange={handleChange} placeholder="Your role" className="w-full border rounded-md p-2 mb-4" value={formData.title} />

            <label>Start Date<span className="text-red-500">*</span></label>
            <input type="date" name="startDate" onChange={handleChange} className="w-full border rounded-md p-2 mb-4" value={formData.startDate} />

            <label>End Date</label>
            <input type="date" name="endDate" onChange={handleChange} className="w-full border rounded-md p-2 mb-2" value={formData.endDate} />

            <label className="flex items-center space-x-2 mb-4">
              <input type="checkbox" name="ongoing" onChange={handleChange} checked={formData.ongoing} />
              <span>Ongoing</span>
            </label>

            <label>Responsibilities</label>
            <textarea name="description" onChange={handleChange} placeholder="Describe Responsibilities" className="w-full border rounded-md p-2 mb-4" value={formData.description} />

            <label>Media</label>
            {renderMediaInput()}
            <p className="text-sm text-gray-500 mb-6">Note: Max File Size 5MB.</p>
          </>
        );

      case 'certificate':
        return (
          <>

          <h2 className="font-extrabold text-xl mb-4">CERTIFICATION DETAILS</h2> 

            <label>Certificate Name<span className="text-red-500">*</span></label>
            <input name="title" onChange={handleChange} placeholder="Certificate name" className="w-full border rounded-md p-2 mb-4" value={formData.title} />

            <label>Issuing organization<span className="text-red-500">*</span></label>
            <input name="company" onChange={handleChange} placeholder="Issuer" className="w-full border rounded-md p-2 mb-4" value={formData.company} />

            <label>Issue Date<span className="text-red-500">*</span></label>
            <input type="date" name="startDate" onChange={handleChange} className="w-full border rounded-md p-2 mb-4" value={formData.startDate} />

            <label>Expiration Date</label>
            <input type="date" name="endDate" onChange={handleChange} className="w-full border rounded-md p-2 mb-2" value={formData.endDate} />

            <label>Media</label>
            {renderMediaInput()}
            <p className="text-sm text-gray-500 mb-6">Note: Max File Size 5MB.</p>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl mx-auto">
      {/* <h1 className="text-2xl font-bold mb-4">Add Timeline</h1>*/}
       <button
        onClick={() => router.push('/account/profile')}
        className="text-gray-600 hover:text-gray-900 focus:outline-none"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>
      <h1 className="text-2xl font-bold">Add Timeline</h1> 

      <label className="block font-medium mb-2">What would you like to add?</label>
      <select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        className="w-full border rounded-md p-2 mb-4"
      >
        <option value="">Select an option</option>
        <option value="education">Education</option>
        <option value="experience">Experience</option>
        <option value="certificate">Certificate</option>
      </select>

      {renderForm()}

      {selectedOption && (
        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md w-full mt-6">
          SAVE DETAILS
        </button>
      )}
    </form>
  );
};

export default AddTimelineEntryPage;