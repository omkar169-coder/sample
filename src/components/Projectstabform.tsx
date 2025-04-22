"use client";

import { Info, Eye, Lightbulb, Calendar, Image as ImageIcon } from "lucide-react";
import React, { useState } from "react";

type Project = {
  title: string;
  duration: string;
  technologies: string;
  visibility: string;
  description: string;
  type: string;
  skills: string;
  association: string;
  proof: File | null;
  link: string;
  projectImpact: string;
  collaborationType: string;
};

type ProjectstabformProps = {
  onSubmit: (newProject: Project) => void;
};

const Projectstabform = ({ onSubmit }: { onSubmit: (project: Project) => void }) => {
  const [project, setProject] = useState<Project>({
    title: "",
    duration: "",
    technologies: "",
    visibility: "",
    description: "",
    type: "",
    skills: "",
    association: "",
    proof: null,
    link: "",
    projectImpact: "",
    collaborationType: "",
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProject((prev: Project) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProject((prev: Project) => ({ ...prev, proof: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(project);
  };



  return (
    <form onSubmit={handleSubmit} className="w-full bg-white p-6 rounded-2xl shadow-md space-y-5">
      <div>
        <h2 className="text-2xl font-light text-gray-700">Enter project title</h2>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center p-6">
        <ImageIcon className="h-12 w-12 text-gray-400" />
        <p className="text-gray-600">
          Click <span className="text-blue-500 cursor-pointer underline">here</span> to upload a new proof image
        </p>
        <input type="file" name="proof" onChange={handleFileChange} className="hidden" />
      </div>

      <div>
        <label className="flex items-center font-medium text-gray-700">
          <Calendar className="h-4 w-4 mr-2" />
          Project Duration
          <Info className="h-4 w-4 ml-1 text-gray-400 cursor-pointer" />
        </label>
        <input
          type="text"
          name="duration"
          placeholder="E.g., 6 months, Jan 2022 - Jun 2022"
          value={project.duration}
          onChange={handleChange}
          className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <label className="flex items-center font-medium text-gray-700">
          <Lightbulb className="h-4 w-4 mr-2" />
          Technologies Used
        </label>
        <input
          type="text"
          name="technologies"
          placeholder="Enter technologies and press Enter"
          value={project.technologies}
          onChange={handleChange}
          className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <label className="flex items-center font-medium text-gray-700">
          <Eye className="h-4 w-4 mr-2" />
          Project Visibility
        </label>
        <div className="flex items-center mt-2 space-x-4">
          <label className="flex items-center space-x-2 text-gray-700">
            <input
              type="radio"
              name="visibility"
              value="Public"
              checked={project.visibility === "Public"}
              onChange={handleChange}
              className="accent-blue-600"
            />
            <span>Public</span>
          </label>
          <label className="flex items-center space-x-2 text-gray-700">
            <input
              type="radio"
              name="visibility"
              value="Private"
              checked={project.visibility === "Private"}
              onChange={handleChange}
              className="accent-blue-600"
            />
            <span>Private</span>
          </label>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          <strong>Public:</strong> Your project will be visible to everyone.
          <br />
          <strong>Private:</strong> Only recruiters will be able to see your project.
        </p>
      </div>

      <div>
        <label className="flex items-center font-medium text-gray-700">
          <svg
            className="h-4 w-4 mr-2 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16h8M8 12h8m-8-4h8"
            />
          </svg>
          Project Description
        </label>
        <textarea
          name="description"
          placeholder="Provide a brief description of your project"
          value={project.description}
          onChange={handleChange}
          className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <label className="flex items-center font-medium text-gray-700">
          <svg
            className="h-4 w-4 mr-2 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6M9 16h6M9 8h6" />
          </svg>
          Project Type
        </label>
        <select
          name="type"
          value={project.type}
          onChange={handleChange}
          className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        >
          <option value="">Select Project Type</option>
          <option value="personal">Personal</option>
          <option value="academic">Academic</option>
          <option value="professional">Professional</option>
        </select>
      </div>

      <div>
        <label className="flex items-center font-medium text-gray-700">
          <svg
            className="h-4 w-4 mr-2 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Skills
        </label>
        <input
          name="skills"
          placeholder="Enter skills and press Enter"
          value={project.skills}
          onChange={handleChange}
          className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div>
        <label className="flex items-center font-medium text-gray-700">
          <svg
            className="h-4 w-4 mr-2 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 01-8 0" />
          </svg>
          Associated With
        </label>
        <select
          name="association"
          value={project.association}
          onChange={handleChange}
          className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        >
          <option value="">Select an option...</option>
          <option value="self">Self</option>
          <option value="university">University</option>
          <option value="company">Company</option>
        </select>
      </div>

      <div>
        <label className="flex items-center font-medium text-gray-700">
          <svg
            className="h-4 w-4 mr-2 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12h.01M12 15h.01M9 12h.01M12 9h.01M12 12h.01M12 3v3m6 0a6 6 0 11-12 0" />
          </svg>
          Proof of Work
        </label>
        <input
          type="file"
          name="proof"
          accept="application/pdf,image/*"
          onChange={handleFileChange}
          className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
        <p className="text-xs text-gray-500 mt-1">Note: Max file size 5 MB</p>
      </div>

      <div>
        <label className="flex items-center font-medium text-gray-700">
          <svg
            className="h-4 w-4 mr-2 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m2 4v-4m-3 4h1v-4h1m4 4h-1v-4h-1" />
          </svg>
          GitHub / Live Link
        </label>
        <input
          name="link"
          placeholder="Add GitHub or live demo link"
          value={project.link}
          onChange={handleChange}
          className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="text-blue-500 underline"
        >
        {showAdvanced ? 'Hide Advanced Options' : 'Show Advanced Options'}
        </button>


      {showAdvanced && (
        <>
          <div>
            <label className="flex items-center font-medium text-gray-700">
              <svg
                className="h-4 w-4 mr-2 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Project Impact
            </label>
            <textarea
              name="projectImpact"
              placeholder="Describe the impact of the project"
              value={project.projectImpact}
              onChange={handleChange}
              className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              rows={3}
            />
          </div>

          <div>
            <label className="flex items-center font-medium text-gray-700">
              <svg
                className="h-4 w-4 mr-2 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
              </svg>
              Collaboration Type
            </label>
            <select
              name="collaborationType"
              value={project.collaborationType}
              onChange={handleChange}
              className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="Individual">Individual</option>
              <option value="Team">Team</option>
            </select>
            </div>
        </>
        )}


      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-3 rounded-md font-semibold hover:bg-green-600"
      >
        SAVE PROJECT
      </button>
    </form>
  );
};

export default Projectstabform;
