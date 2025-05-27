"use client";

import React, { useState, useEffect, useRef, FC, KeyboardEvent } from "react";
import {
  ImageIcon, Calendar, Info, Lightbulb, Eye, AlignLeft, ListTree,
  BadgeCheck, Users, FileUp, LinkIcon, BarChart2, UsersRound,
  ArrowLeft,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

type ProjectFormData = {
  id: number;
  user_id: number;
  project_title: string;
  project_duration: string;
  technologies_used: string;
  visibility: string;
  project_description: string;
  project_type: string;
  associated_with: string;
  proof_of_work: string;
  github_demo_link: string;
  project_impact: string;
  collaboration_type: string;
  claps: number;
  banner_image: string;
  project_visibility: string;
  skills_used: string[];
  project_link: string;
  collaborators: string;
  role: string;
  other_project_type?: string;
};

type ProjectstabformProps = {
  onSubmit: (data: ProjectFormData) => void;
  projectId: number;
  onBack: () => void;
  defaultValues?: ProjectFormData;
};

const emptyProject: ProjectFormData = {
  id: 0,
  user_id: 0,
  project_title: "",
  project_duration: "",
  technologies_used: "",
  visibility: "",
  project_description: "",
  project_type: "",
  associated_with: "",
  proof_of_work: "",
  github_demo_link: "",
  project_impact: "",
  collaboration_type: "",
  claps: 0,
  banner_image: "",
  project_visibility: "",
  skills_used: [],
  project_link: "",
  collaborators: "",
  role: "",
};

const Projectstabform: FC<ProjectstabformProps> = ({ onSubmit, onBack, defaultValues }) => {
  const [project, setProject] = useState<ProjectFormData>(defaultValues || emptyProject);
  const [error, setError] = useState<string | null>(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [technologies, setTechnologies] = useState<string[]>([]);

  const router = useRouter();

  const handleBackClick = () => {
    router.push('/AccountProfilePage');
  };

  useEffect(() => {
    if (defaultValues) {
      setProject(defaultValues);
    }
  }, [defaultValues?.id]);

  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isEditingTitle]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setProject(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProject(prev => ({
      ...prev,
      project_description: e.target.value,
    }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTitleClick = () => setIsEditingTitle(true);
 
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();

      Object.entries(project).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          formData.append(key, value.join(","));
        } else {
          formData.append(key, value != null ? String(value) : "");
        }
      });

      if (file) {
        formData.append("banner_image", file);
      }

      alert("Project updated successfully!");
      setIsEditingTitle(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to submit form.");
    } finally {
      setLoading(false);
    }
  };

  if (error) return <div className="text-red-600">{error}</div>;

  // Skill input component
  const SkillsInput = ({
    project,
    setProject,
  }: {
    project: ProjectFormData;
    setProject: React.Dispatch<React.SetStateAction<ProjectFormData>>;
  }) => {
    const [inputValue, setInputValue] = useState<string>("");
  
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && inputValue.trim()) {
        e.preventDefault();
        if (!project.skills_used.includes(inputValue.trim())) {
          const newSkills = [...project.skills_used, inputValue.trim()];
          setProject(prev => ({
            ...prev,
            skills_used: newSkills,
          }));
          setInputValue("");
        }
      }
    };
  
    const handleRemove = (skillToRemove: string) => {
      const filtered = project.skills_used.filter((s: string) => s !== skillToRemove);
      setProject(prev => ({
        ...prev,
        skills_used: filtered,
      }));
    };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl w-full mx-auto px-4 py-6 sm:px-6 lg:px-8 bg-white rounded-lg shadow space-y-6">
  
  {/* Header Section */}
  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
    <button
      type="button"
      onClick={handleBackClick}
      className="text-gray-600 hover:text-gray-900"
    >
      <ArrowLeft className="w-5 h-5" />
    </button>

    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
      ADD PROJECT DETAILS
    </h1>
  </div>

  {/* Project Title */}
  <div>
    {isEditingTitle ? (
      <input
        ref={titleInputRef}
        type="text"
        name="project_title"
        value={project.project_title}
        onChange={handleChange}
        placeholder="Enter project title"
        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base sm:text-lg"
      />
    ) : (
      <h2
        onClick={handleTitleClick}
        className="text-xl sm:text-2xl font-light text-gray-700 cursor-pointer hover:underline"
      >
        {project.project_title || "Enter project title"}
      </h2>
    )}
  </div>

  {/* Image Upload Section */}
  <div className="border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center px-4 py-6 sm:p-8 text-center min-h-[300px] sm:min-h-[400px] relative overflow-hidden">
    {!previewUrl ? (
      <>
        <ImageIcon className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
        <p className="text-gray-600 text-sm sm:text-base mt-2">
          Click{" "}
          <span
            className="text-blue-500 cursor-pointer underline"
            onClick={() =>
              document.getElementById("proof-file-input")?.click()
            }
          >
            here
          </span>{" "}
          to upload a new proof image
        </p>
      </>
    ) : (
      <img
        src={previewUrl}
        alt="Uploaded Preview"
        className="w-full h-full object-cover rounded-md"
      />
    )}

    <input
      type="file"
      id="proof-file-input"
      name="proof_file"
      accept="image/*"
      onChange={handleFileChange}
      className="hidden"
    />
  </div>

  <div className="space-y-6">
  <div>
    <label className="flex flex-wrap items-center font-semibold text-gray-800 text-base sm:text-lg">
      <Calendar className="h-4 w-4 mr-2" />
      Project Duration
      <Info className="h-4 w-4 ml-1 text-gray-400 cursor-pointer" />
    </label>
    <input
      type="text"
      name="project_duration"
      placeholder="E.g., 6 months, Jan 2022 - Jun 2022"
      value={project?.project_duration || ""}
      onChange={handleChange}
      className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring focus:ring-blue-200"
    />
  </div>

<div>
      <label className="flex items-center font-semibold text-gray-800 text-base sm:text-lg">
        <Lightbulb className="h-4 w-4 mr-2" />
        Technologies Used
      </label>

      <input
        type="text"
        placeholder="Enter technologies and press Enter"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring focus:ring-blue-200"
      />

      <div className="flex flex-wrap gap-2 mt-3">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full flex items-center"
          >
            {tech}
            <button
              onClick={() => handleRemove(tech)}
              className="ml-2 text-white hover:text-gray-200"
            >
              X
            </button>
          </span>
        ))}
      </div>
      </div>
      

  <div>
    <label className="flex items-center font-semibold text-gray-800 text-base sm:text-lg">
      <Eye className="h-4 w-4 mr-2" />
      Project Visibility
    </label>
    <div className="flex flex-wrap items-center mt-2 gap-x-6 gap-y-2">
      <label className="flex items-center space-x-2 text-gray-700 text-sm sm:text-base">
        <input
          type="radio"
          name="project_visibility"
          value="Public"
          checked={project?.project_visibility === "Public"}
          onChange={handleChange}
          className="accent-blue-600"
        />
        <span>Public</span>
      </label>
      <label className="flex items-center space-x-2 text-gray-700 text-sm sm:text-base">
        <input
          type="radio"
          name="project_visibility"
          value="Private"
          checked={project?.project_visibility === "Private"}
          onChange={handleChange}
          className="accent-blue-600"
        />
        <span>Private</span>
      </label>
    </div>
    <p className="text-sm text-gray-500 mt-1 leading-relaxed">
      <strong>Public:</strong> Your project will be visible to everyone.<br />
      <strong>Private:</strong> Only recruiters will be able to see your project.
    </p>
  </div>

  <div>
    <label className="flex items-center font-semibold text-gray-800 text-base sm:text-lg">
      <AlignLeft className="h-4 w-4 mr-2 text-gray-500" />
      Project Description
    </label>
    <textarea
      name="project_description"
      placeholder="Provide a brief description of your project"
      value={project.project_description}
      onChange={handleChangeTextArea}
      className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring focus:ring-blue-200"
      rows={5}
    />
  </div>
</div>
<div className="w-full">
  <label className="flex items-center font-medium text-gray-700">
    <ListTree className="h-4 w-4 mr-2 text-gray-500" />
    Project Type
  </label>

  <select
    name="project_type"
    value={project.project_type}
    onChange={handleChange}
    className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring focus:ring-blue-200"
  >
    <option value="">Select Project Type</option>
    <option value="personal">Web Development</option>
    <option value="academic">Mobile App</option>
    <option value="professional">Data Science</option>
    <option value="academic">AI/ML</option>
    <option value="professional">Design</option>
    <option value="other">Others</option>
  </select>

  {project.project_type === 'other' && (
    <div className="mt-4">
      <label className="block font-medium text-gray-700 mb-1">Please specify</label>
      <input
        type="text"
        name="other_project_type"
        value={project.other_project_type}
        onChange={handleChange}
        placeholder="Enter project type"
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring focus:ring-blue-200"
      />
    </div>
  )}
</div>

<div className="w-full mt-6">
  <label className="flex items-center font-medium text-gray-700">
    <BadgeCheck className="h-4 w-4 mr-2 text-gray-500" />
    Skills
  </label>
  <input
    type="text"
    name="skills_used"
    placeholder="Enter skills (comma-separated)"
    value={Array.isArray(project?.skills_used) ? project.skills_used.join(", ") : ""}
    onChange={(e) => {
      const skillsArray = e.target.value.split(",").map((skill) => skill.trim());
      setProject((prev) => ({
        ...prev!,
        skills_used: skillsArray,
      }));
    }}
    className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring focus:ring-blue-200"
  />
</div>

<div className="w-full mt-6">
  <label className="flex items-center font-medium text-gray-700">
    <Users className="h-4 w-4 mr-2 text-gray-500" />
    Associated With
  </label>
  <select
    name="associated_with"
    value={project?.associated_with || ""}
    onChange={handleChange}
    className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring focus:ring-blue-200"
  >
    <option value="">Select an option...</option>
    <option value="self">Self</option>
    <option value="university">University</option>
    <option value="company">Company</option>
  </select>
</div>

<div className="w-full mt-6">
  <label className="flex items-center font-medium text-gray-700">
    <FileUp className="h-4 w-4 mr-2 text-gray-500" />
    Proof of Work
  </label>
  <input
    type="file"
    name="proof_of_work"
    accept="application/pdf,image/*"
    onChange={handleFileChange}
    className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring focus:ring-blue-200"
  />
  <p className="text-xs text-gray-500 mt-1">Note: Max file size 5 MB</p>
</div>
<div className="w-full max-w-3xl mx-auto p-4 sm:p-6 md:p-8 space-y-6">
  {/* Project Type */}
  <div>
    <label className="flex items-center font-medium text-gray-700">
      <ListTree className="h-4 w-4 mr-2 text-gray-500" />
      Project Type
    </label>
    <select
      name="project_type"
      value={project.project_type}
      onChange={handleChange}
      className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
    >
      <option value="">Select Project Type</option>
      <option value="personal">Web Development</option>
      <option value="academic">Mobile App</option>
      <option value="professional">Data Science</option>
      <option value="academic">AI/ML</option>
      <option value="professional">Design</option>
      <option value="other">Others</option>
    </select>

    {project.project_type === 'other' && (
      <div className="mt-4">
        <label className="block font-medium text-gray-700 mb-1">Please specify</label>
        <input
          type="text"
          name="other_project_type"
          value={project.other_project_type}
          onChange={handleChange}
          placeholder="Enter project type"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
    )}
  </div>

  {/* Skills */}
  <div>
    <label className="flex items-center font-medium text-gray-700">
      <BadgeCheck className="h-4 w-4 mr-2 text-gray-500" />
      Skills
    </label>
    <input
      type="text"
      name="skills_used"
      placeholder="Enter skills (comma-separated)"
      value={Array.isArray(project?.skills_used) ? project.skills_used.join(", ") : ""}
      onChange={(e) => {
        const skillsArray = e.target.value.split(",").map((skill) => skill.trim());
        setProject((prev) => ({
          ...prev!,
          skills_used: skillsArray,
        }));
      }}
      className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
    />
  </div>

  {/* Associated With */}
  <div>
    <label className="flex items-center font-medium text-gray-700">
      <Users className="h-4 w-4 mr-2 text-gray-500" />
      Associated With
    </label>
    <select
      name="associated_with"
      value={project?.associated_with || ""}
      onChange={handleChange}
      className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
    >
      <option value="">Select an option...</option>
      <option value="self">Self</option>
      <option value="university">University</option>
      <option value="company">Company</option>
    </select>
  </div>

  {/* Proof of Work */}
  <div>
    <label className="flex items-center font-medium text-gray-700">
      <FileUp className="h-4 w-4 mr-2 text-gray-500" />
      Proof of Work
    </label>
    <input
      type="file"
      name="proof_of_work"
      accept="application/pdf,image/*"
      onChange={handleFileChange}
      className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
    />
    <p className="text-xs text-gray-500 mt-1">Note: Max file size 5 MB</p>
  </div>

  {/* Project Link */}
  <div>
    <label className="flex items-center font-medium text-gray-700">
      <LinkIcon className="h-4 w-4 mr-2" />
      Project Link/GitHub Live Link
    </label>
    <input
      type="url"
      name="project_link"
      placeholder="https://yourprojectlink.com"
      value={project?.project_link || ""}
      onChange={handleChange}
      className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
    />
  </div>

  {/* Toggle Advanced Options */}
  <div>
    <button
      type="button"
      onClick={() => setShowAdvanced(!showAdvanced)}
      className="text-blue-500 underline"
    >
      {showAdvanced ? 'Hide Advanced Options' : 'Show Advanced Options'}
    </button>
  </div>

  {/* Advanced Options */}
  {showAdvanced && (
    <div className="space-y-6 mt-4 border-t border-gray-200 pt-4">
      {/* Project Impact */}
      <div>
        <label className="flex items-center font-medium text-gray-700">
          <BarChart2 className="h-4 w-4 mr-2 text-gray-500" />
          Project Impact
        </label>
        <textarea
          name="project_impact"
          placeholder="Explain the impact of your project"
          value={project?.project_impact || ""}
          onChange={handleChange}
          className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Collaboration Type */}
      <div>
        <label className="flex items-center font-medium text-gray-700">
          <UsersRound className="h-4 w-4 mr-2 text-gray-500" />
          Collaboration Type
        </label>
        <select
          name="collaboration_type"
          value={project?.collaboration_type || ""}
          onChange={handleChange}
          className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        >
          <option value="">Select collaboration type</option>
          <option value="solo">Solo Project</option>
          <option value="team">Team Collaboration</option>
        </select>
      </div>

      {/* Show if Team Collaboration */}
      {project?.collaboration_type === "team" && (
        <>
          {/* Collaborators */}
          <div>
            <label className="flex items-center font-medium text-gray-700">
              <Users className="h-4 w-4 mr-2 text-gray-500" />
              Add Collaborators (Name or Username)
            </label>
            <input
              type="text"
              name="collaborators"
              value={project?.collaborators || ""}
              onChange={handleChange}
              placeholder="Enter collaborator names or usernames"
              className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Your Role */}
          <div>
            <label className="flex items-center font-medium text-gray-700">
              <Info className="h-4 w-4 mr-2 text-gray-500" />
              Your Role in the Project
            </label>
            <input
              type="text"
              name="role"
              value={project?.role || ""}
              onChange={handleChange}
              placeholder="E.g., Developer, Designer, Manager"
              className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
        </>
      )}
    </div>
  )}

  {/* Submit Button */}
  <div className="pt-6">
    <button
      type="submit"
      disabled={loading}
      className={`w-full py-3 rounded-lg font-semibold text-center text-white ${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-green-600 hover:bg-green-700"
      }`}
    >
      {loading ? "Updating..." : "Submit Project"}
    </button>
  </div>
</div>
</form>
  );  
};

export default Projectstabform;
