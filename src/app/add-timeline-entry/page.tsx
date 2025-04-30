"use client";

import React, { useState } from "react";

const TimelineForm = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const renderForm = () => {
    switch (selectedOption) {
      case "education":
        return (
          <div className="space-y-4 mt-6">
            <h3 className="font-semibold text-lg mb-2">Education Details</h3>

            <label className="block mb-1">Institution<span className="text-red-500">*</span></label>
            <input type="text" placeholder="Enter institution name" className="w-full border rounded-md p-2 mb-4" />

            <label className="block mb-1">Degree<span className="text-red-500">*</span></label>
            <input type="text" placeholder="Enter degree name" className="w-full border rounded-md p-2 mb-4" />

            <label className="block mb-1">Field of Study<span className="text-red-500">*</span></label>
            <input type="text" placeholder="Enter field of study" className="w-full border rounded-md p-2 mb-4" />

            <label className="block mb-1">Start Date<span className="text-red-500">*</span></label>
            <input type="date" className="w-full border rounded-md p-2 mb-4" />

            <label className="block mb-1">End Date</label>
            <input type="date" className="w-full border rounded-md p-2 mb-2" />

            <label className="flex items-center space-x-2 mb-4">
              <input type="checkbox" />
              <span>Ongoing</span>
            </label>

            <label className="block mb-1">Media</label>
            <input type="file" className="mb-2" />
            <p className="text-sm text-gray-500 mb-6">Note: Max File Size 5MB.</p>
          </div>
        );

      case "experience":
        return (
          <div className="space-y-4 mt-6">
            <h3 className="font-semibold text-lg mb-2">Experience Details</h3>

            <label className="block mb-1">Company<span className="text-red-500">*</span></label>
            <input type="text" placeholder="Enter company name" className="w-full border rounded-md p-2 mb-4" />

            <label className="block mb-1">Role<span className="text-red-500">*</span></label>
            <input type="text" placeholder="Enter your role" className="w-full border rounded-md p-2 mb-4" />

            <label className="block mb-1">Description</label>
            <input type="text" placeholder="Short description" className="w-full border rounded-md p-2 mb-4" />

            <label className="block mb-1">Start Date<span className="text-red-500">*</span></label>
            <input type="date" className="w-full border rounded-md p-2 mb-4" />

            <label className="block mb-1">End Date</label>
            <input type="date" className="w-full border rounded-md p-2 mb-2" />

            <label className="flex items-center space-x-2 mb-4">
              <input type="checkbox" />
              <span>Ongoing</span>
            </label>

            <label className="block mb-1">Media</label>
            <input type="file" className="mb-2" />
            <p className="text-sm text-gray-500 mb-6">Note: Max File Size 5MB.</p>
          </div>
        );

      case "certificate":
        return (
          <div className="space-y-4 mt-6">
            <h3 className="font-semibold text-lg mb-2">Certification Details</h3>

            <label className="block mb-1">Certificate Name<span className="text-red-500">*</span></label>
            <input type="text" placeholder="Enter certificate title" className="w-full border rounded-md p-2 mb-4" />

            <label className="block mb-1">Issued By<span className="text-red-500">*</span></label>
            <input type="text" placeholder="Enter issuing authority" className="w-full border rounded-md p-2 mb-4" />

            <label className="block mb-1">Issued Date<span className="text-red-500">*</span></label>
            <input type="date" className="w-full border rounded-md p-2 mb-4" />

            <label className="block mb-1">Expiration Date</label>
            <input type="date" className="w-full border rounded-md p-2 mb-2" />

            <label className="flex items-center space-x-2 mb-4">
              <input type="checkbox" />
              <span>No Expiry</span>
            </label>

            <label className="block mb-1">Media</label>
            <input type="file" className="mb-2" />
            <p className="text-sm text-gray-500 mb-6">Note: Max File Size 5MB.</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Timeline</h1>

      <label className="block font-medium mb-2">What would you like to add?</label>
      <select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        className="w-full border rounded-md p-2"
      >
        <option value="">Select an option</option>
        <option value="education">Education</option>
        <option value="experience">Experience</option>
        <option value="certificate">Certificate</option>
      </select>

      {renderForm()}

      {selectedOption && (
        <button className="bg-green-500 text-white py-2 px-4 rounded-md w-full mt-6">
          SAVE DETAILS
        </button>
      )}
    </div>
  );
};

export default TimelineForm;
