"use client";

import React, { useState, useEffect } from "react";
import {
  AlignLeft,
  BadgeCheck,
  BarChart2,
  FileUp,
  Link as LinkIcon,
  ListTree,
  Users,
  UsersRound,
} from "lucide-react";

interface ProjectData {
  project_description: string;
  project_type: string;
  skills_used: string[];
  associated_with: string;
  proof_of_work?: File | null;
  project_link: string;
  project_impact: string;
  collaboration_type: string;
}

const Projectstabform = () => {
  const [project, setProject] = useState<ProjectData>({
    project_description: "",
    project_type: "",
    skills_used: [],
    associated_with: "",
    proof_of_work: null,
    project_link: "",
    project_impact: "",
    collaboration_type: "",
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setProject((prev) => ({
        ...prev,
        proof_of_work: file,
      }));
    } else {
      alert("File size should be less than 5MB");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("project_description", project.project_description);
      formData.append("project_type", project.project_type);
      formData.append("skills_used", project.skills_used.join(", "));
      formData.append("associated_with", project.associated_with);
      formData.append("project_link", project.project_link);
      formData.append("project_impact", project.project_impact);
      formData.append("collaboration_type", project.collaboration_type);
      if (project.proof_of_work) {
        formData.append("proof_of_work", project.proof_of_work);
      }

      // Replace with your actual API endpoint
      const response = await fetch("/api/projects/update", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Project updated successfully!");
      } else {
        alert(`Error: ${data.message || "Something went wrong"}`);
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("An error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Project Description */}
      <div>
        <label className="flex items-center font-medium text-gray-700">
          <AlignLeft className="h-4 w-4 mr-2 text-gray-500" />
          Project Description
        </label>
        <textarea
          name="project_description"
          placeholder="Provide a brief description of your project"
          value={project.project_description}
          onChange={handleChange}
          className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

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
          <option value="personal">Personal</option>
          <option value="academic">Academic</option>
          <option value="professional">Professional</option>
        </select>
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
          value={project.skills_used.join(", ")}
          onChange={(e) => {
            const skillsArray = e.target.value.split(",").map((skill) => skill.trim());
            setProject((prev) => ({
              ...prev,
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
          value={project.associated_with}
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
          Project Link/github live link
        </label>
        <input
          type="url"
          name="project_link"
          placeholder="https://yourprojectlink.com"
          value={project.project_link}
          onChange={handleChange}
          className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Toggle Advanced */}
      <button
        type="button"
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="text-blue-500 underline"
      >
        {showAdvanced ? "Hide Advanced Options" : "Show Advanced Options"}
      </button>

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
              value={project.project_impact}
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
              value={project.collaboration_type}
              onChange={handleChange}
              className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Select collaboration type</option>
              <option value="solo">Solo Project</option>
              <option value="team">Team Collaboration</option>
            </select>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-end pt-6">
        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-2 rounded-lg text-white font-semibold ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Updating..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default Projectstabform;
