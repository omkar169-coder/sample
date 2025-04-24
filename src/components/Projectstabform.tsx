"use client";

import {
  Link as LinkIcon, BarChart2, UsersRound, AlignLeft, ListTree, BadgeCheck,
  Users, FileUp, Info, Eye, Lightbulb, Calendar, Image as ImageIcon, ArrowLeft
} from "lucide-react";

import { useState, useEffect } from "react";



type Project = { id: number; user_id: number; project_title: string; 
  project_duration: string; technologies_used: string; visibility: string; 
  project_description: string; project_type: string; associated_with: string; 
  proof_of_work: string; github_demo_link: string; project_impact: string; 
  collaboration_type: string; claps: number; banner_image: string; 
  project_visibility: string; skills_used: string[]; project_link: string;
};

type ProjectstabformProps = {
  onSubmit: (data: Project) => void;
  projectId: number;
  onBack: () => void;
  defaultValues?: Project;
};


const Projectstabform: React.FC<ProjectstabformProps> = ({ onSubmit, onBack, defaultValues }) => {
  const [project, setProject] = useState<Project | null>(defaultValues || null);
  const [error, setError] = useState<string | null>(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);


  const handleBackClick = () => {
    onBack();
  };

  useEffect(() => {
    const fetchProject = async () => {
      if (!defaultValues?.id) return; // Early return if no ID

      try {
        const formData = new URLSearchParams();
        formData.append("project_id", defaultValues.id.toString());

        const res = await fetch("https://wooble.io/api/project/get_project.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        });

        const data = await res.json();

        if (data.success && data.project) {
          setProject(data.project);
        } else {
          setError(data.message || "Failed to load project");
        }
      } catch (err) {
        setError("Something went wrong while fetching project details.");
      }
    };

    fetchProject();
  }, [defaultValues?.id]);



  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setProject((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };


  const handleChangeTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setProject((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };
  
  
  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };


  
  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setProject((prev) => ({
      ...prev!,
      [name]: value, // Update the respective field in project state
    }));
  };
  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!project) return;

    try {
      setLoading(true);

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

      const res = await fetch("https://wooble.io/api/project/update_project.php", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Failed to update project.");
      } else {
        alert("Project updated successfully!");
        setIsEditingTitle(false);
      }
    } catch (err) {
      setError("Failed to submit the form.");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!project) {
    return <div>Loading project...</div>;
  }


  

  return (
    <form onSubmit={handleSubmit}
      className="w-full max-w-4xl mx-auto bg-white px-4 sm:px-6 md:px-10 py-6 rounded-2xl shadow-md space-y-6"
    >
      {/* Top Form Heading with Arrow */}
      <div className="flex items-center space-x-3">
        <button
          type="button"
          onClick={handleBackClick}
          className="text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl  sm:text-2xl md:text-3xl font-semibold text-gray-800">
          ADD PROJECT DETAILS
        </h1>
      </div>
  
      <div>
        {isEditingTitle ? (
          <div className="flex items-center space-x-3">
            <input
              type="text"
              name="project_title"
              value={project?.project_title || ""}
              onChange={(e) =>
                setProject((prev) => (prev ? { ...prev, project_title: e.target.value } : prev))
              }
              placeholder="Enter project title"
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200 text-lg"
            />
          </div>
        ) : (
          <h2
            onClick={handleTitleClick}
            className="text-2xl font-light text-gray-700 cursor-pointer hover:underline"
          >
            {project?.project_title || "Enter project title"}
          </h2>
        )}
      </div>
  

      <div className="border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center p-6 text-center">
  <ImageIcon className="h-12 w-12 text-gray-400" />
  <p className="text-gray-600 text-sm sm:text-base">
    Click <span className="text-blue-500 cursor-pointer underline">here</span> to upload a new proof image
  </p>
  <input
    type="file"
    name="proof_file"
    onChange={handleFileChange}
    className="hidden"
  />
</div>

<div>
  <label className="flex flex-wrap items-center font-medium text-gray-700">
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
    name="technologies_used"
    placeholder="Enter technologies and press Enter"
    value={project?.technologies_used || ""}
    onChange={handleChange}
    className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
  />
</div>

<div>
  <label className="flex items-center font-medium text-gray-700">
    <Eye className="h-4 w-4 mr-2" />
    Project Visibility
  </label>
  <div className="flex flex-wrap items-center mt-2 space-x-4">
    <label className="flex items-center space-x-2 text-gray-700">
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
    <label className="flex items-center space-x-2 text-gray-700">
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
  <p className="text-sm text-gray-500 mt-1">
    <strong>Public:</strong> Your project will be visible to everyone.
    <br />
    <strong>Private:</strong> Only recruiters will be able to see your project.
  </p>
</div>
  
<div>
      <label className="flex items-center font-medium text-gray-700">
        <AlignLeft className="h-4 w-4 mr-2 text-gray-500" />
        Project Description
      </label>
      <textarea
        name="project_description"
        placeholder="Provide a brief description of your project"
        value={project?.project_description || ""}
        onChange={handleChange}
        className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring focus:ring-blue-200"
      />
    </div>


<div>
  <label className="flex items-center font-medium text-gray-700">
    <ListTree className="h-4 w-4 mr-2 text-gray-500" />
    Project Type
  </label>
  <select
    name="project_type"
    value={project?.project_type || ""}
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
    <BadgeCheck className="h-4 w-4 mr-2 text-gray-500" />
    Skills
  </label>
  <input
    type="text"
    name="skills_used"
    placeholder="Enter skills (comma-separated)"
    value={project?.skills_used.join(", ") || ""}
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

<div>
  <label className="flex items-center font-medium text-gray-700">
    <LinkIcon className="h-4 w-4 mr-2" />
    Project Link/github live link
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


{/* Toggle Button */}
<button
  type="button"
  onClick={() => setShowAdvanced(!showAdvanced)}
  className="text-blue-500 underline"
>
  {showAdvanced ? 'Hide Advanced Options' : 'Show Advanced Options'}
</button>

{showAdvanced && (
  <div className="space-y-6 mt-4 border-t border-gray-200 pt-4">
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