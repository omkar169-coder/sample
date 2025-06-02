"use client";

import React, { useState, useEffect, useRef, FC } from "react";
import { useRouter } from "next/navigation";
import {
  ImageIcon, Calendar, Info, Lightbulb, Eye, AlignLeft, ListTree,
  BadgeCheck, Users, FileUp, LinkIcon, BarChart2, UsersRound, ArrowLeft,
} from "lucide-react";
import Navbar from "@/components/navbar";

type ProjectFormData = {
  // id: number;
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

const Projectstabform: FC<ProjectstabformProps> = ({ onSubmit, onBack, defaultValues }) => {
  const router = useRouter();

  const initialProjectUserData = {
    user_id: 9168,
    user_email: "omkar@wooble.org",
    user_name: "Murala Omkar",
    user_username: "muralaomkar2",
  };

  const emptyProject: ProjectFormData = {
    user_id: 9168,
    project_title: "Test Project",           // static data
    project_duration: "1 month",                             // cleared
    technologies_used: "React, Next.js, Tailwind",   // static data
    visibility: "public",
    banner_image: "",
    proof_of_work: "",
    project_description: "This is a sample project description.",  // static data
    project_type: "",
    associated_with: "",
    skills_used: ["React", "Next.js", "Tailwind"],   // static data as array of strings
    github_demo_link: "",
    project_impact: "",
    collaboration_type: "",
    collaborators: "",
    role: "",
    claps: 0,
    project_visibility: "public",
    project_link: "",
  };
  
  const [project, setProject] = useState<ProjectFormData>(defaultValues || emptyProject);
  const [error, setError] = useState<string | null>(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [skillsInput, setSkillsInput] = useState<string>("");


  // Initialize session storage once
useEffect(() => {
  const hasAnySessionData =
    sessionStorage.getItem("projectUserData") ||
    sessionStorage.getItem("user_id") ||
    sessionStorage.getItem("user_email") ||
    sessionStorage.getItem("user_name");

  if (!hasAnySessionData) {
    sessionStorage.setItem("projectUserData", JSON.stringify(initialProjectUserData));
    sessionStorage.setItem("user_id", initialProjectUserData.user_id.toString());
    sessionStorage.setItem("user_email", initialProjectUserData.user_email);
    sessionStorage.setItem("user_name", initialProjectUserData.user_name);
  }
}, []);

// Get user data from session storage helper
const getProjectUserData = () => {
  const data = sessionStorage.getItem("projectUserData");
  return data ? JSON.parse(data) : {};
};

// Set user data field in session storage helper
const setProjectUserField = (field: string, value: any) => {
  const currentData = getProjectUserData();
  const updatedData = { ...currentData, [field]: value };
  sessionStorage.setItem("projectUserData", JSON.stringify(updatedData));
  if (field === "user_id") sessionStorage.setItem("user_id", value.toString());
  if (field === "user_email") sessionStorage.setItem("user_email", value);
  if (field === "user_name") sessionStorage.setItem("user_name", value);
};

  // Update project state if defaultValues change
  useEffect(() => {
    if (defaultValues) {
      setProject({
        ...defaultValues,
        user_id: defaultValues.user_id || 9168,
        project_visibility: defaultValues.project_visibility === "private" ? "private" : "public",
      });
    }
  }, [defaultValues]);

  // Focus title input when editing starts
  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isEditingTitle]);

  // Back button handler
  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      router.push("/AccountProfilePage");
    }
  };

  // Handle input changes (inputs, selects)
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    if (name === "project_visibility" && value !== "private") {
      setProject(prev => ({ ...prev, [name]: "public" }));
    } else {
      setProject(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle textarea specifically
  const handleChangeTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setProject(prev => ({ ...prev, [name]: value }));
  };

  // Handle file input and preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Start editing title
  const handleTitleClick = () => setIsEditingTitle(true);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Form submission handler
  // const handleSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const payload = new URLSearchParams();
  //     payload.append("user_id", String(project.user_id || 9168));
  //     payload.append("project_title", project.project_title);
  //     payload.append("project_duration", project.project_duration);
  //     payload.append("associated_with", project.associated_with);
  //     payload.append("collaboration_type", project.collaboration_type || "");
  //     payload.append("collaborators", project.collaborators || "");
  //     payload.append("github_demo_link", project.github_demo_link || "");
  //     payload.append("project_description", project.project_description || "");
  //     payload.append("project_impact", project.project_impact || "");
  //     payload.append("project_type", project.project_type);
  //     payload.append("role", project.role || "");
  //     payload.append("skills", project.skills_used?.join(",") || "");
  //     payload.append("technologies_used", project.technologies_used || "");
  //     payload.append("visibility", project.visibility);
  //     payload.append("project_visibility", project.project_visibility === "private" ? "private" : "public");

  //     const response = await fetch("https://wooble.io/api/project/add_project_new.php", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //         Accept: "application/json",
  //       },
  //       body: payload.toString(),
  //     });

  //     const text = await response.text();
  //     console.log("🔴 Raw server response:", text);

  //     let result;
  //     try {
  //       result = JSON.parse(text);
  //     } catch (err) {
  //       console.error("❌ Invalid JSON response from server:", text);
  //       throw new Error("Server returned invalid JSON: " + text);
  //     }

  //     if (!response.ok) {
  //       throw new Error(result?.message || "Submission failed");
  //     }
      
  //     alert("Project submitted successfully!");
  //     setIsEditingTitle(false);
  //     onSubmit && onSubmit(project);
      
  //     } catch (e: any) {
  //       console.error("❌ Fetch error:", e);
  //       setError(e instanceof Error ? e.message : "Failed to submit form.");
  //     } finally {
  //       setLoading(false);
  //     }      
  // };


//////////////////////////////////////////////////////////////////////////////////////////////////////////
// const handleSubmit = async (event: React.FormEvent) => {
//   event.preventDefault();
//   setLoading(true);
//   setError(null);

//   try {
//     const payload = new URLSearchParams();
//     payload.append("user_id", String(project.user_id || 9168));
//     payload.append("project_title", project.project_title || "Untitled Project");
//     payload.append("project_duration", project.project_duration || "N/A");
//     payload.append("technologies_used", project.technologies_used || "N/A");
//     payload.append("visibility", project.visibility || "public");
//     payload.append("banner_image", project.banner_image || ""); // Must be a URL or string
//     payload.append("proof_of_work", project.proof_of_work || ""); // Must be a URL or string
//     payload.append("project_description", project.project_description || "");
//     payload.append("project_type", project.project_type || "");
//     payload.append("associated_with", project.associated_with || "");
//     payload.append("skills", project.skills_used?.join(",") || "");
//     payload.append("github_demo_link", project.github_demo_link || "");
//     payload.append("project_impact", project.project_impact || "");
//     payload.append("collaboration_type", project.collaboration_type || "");
//     payload.append("collaborators", project.collaborators || "");
//     payload.append("role", project.role || "");
//     payload.append(
//       "project_visibility",
//       project.project_visibility === "private" ? "private" : "public"
//     );

//     const response = await fetch("https://wooble.io/api/project/add_project_new.php", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         Accept: "application/json",
//       },      
//       body: payload.toString(),
//     });

//     const text = await response.text();
//     console.log("🔴 Raw server response:", text);

//     let result;
//     try {
//       if (!text || text.trim() === "") {
//         throw new Error("Empty response from server.");
//       }

//       result = JSON.parse(text);
//     } catch (err) {
//       console.error("❌ Failed to parse JSON:", text);
//       throw new Error("Server returned invalid JSON: " + text.slice(0, 200));
//     }

//     if (!response.ok || !result) {
//       throw new Error(result?.message || "Something went wrong");
//     }

//     alert("Project submitted successfully!");
//     setIsEditingTitle?.(false);
//     onSubmit?.(project);

//   } catch (e: any) {
//     console.error("❌ Fetch error:", e);
//     setError(e instanceof Error ? e.message : "Failed to submit form.");
//   } finally {
//     setLoading(false);
//   }
// };

const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();
  setLoading(true);
  setError(null);

  try {
    // Basic validation example (add your own)
    if (!project.project_title) throw new Error("Project title is required");
    if (!project.project_description) throw new Error("Project description is required");
    if (!project.project_type) throw new Error("Project type is required");

    // Prepare URLSearchParams payload
    const payload = new URLSearchParams();
    payload.append("user_id", String(project.user_id || 9168));
    payload.append("project_title", project.project_title || "Untitled Project");
    payload.append("project_duration", project.project_duration || "N/A");
    payload.append("technologies_used", project.technologies_used || "N/A");
    payload.append("visibility", project.visibility || "public");

    // If banner_image and proof_of_work are URLs, send them. 
    // If you have file uploads, handle separately (not here)
    payload.append("banner_image", project.banner_image || "");
    payload.append("proof_of_work", project.proof_of_work || "");

    payload.append("project_description", project.project_description || "");
    payload.append("project_type", project.project_type || "");
    payload.append("associated_with", project.associated_with || "");
    payload.append("skills", project.skills_used?.join(",") || "");
    payload.append("github_demo_link", project.github_demo_link || "");
    payload.append("project_impact", project.project_impact || "");
    payload.append("collaboration_type", project.collaboration_type || "");
    payload.append("collaborators", project.collaborators || "");
    payload.append("role", project.role || "");
    payload.append("project_visibility", project.project_visibility === "private" ? "private" : "public");

    // Send POST request
    const response = await fetch("https://wooble.io/api/project/add_project_new.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: payload.toString(),
    });

    const text = await response.text();
    console.log("🔴 Raw server response:", text);

    // Try parse JSON
    let result;
    try {
      if (!text || text.trim() === "") {
        throw new Error("Empty response from server.");
      }
      result = JSON.parse(text);
    } catch (err) {
      // Log full error response for debugging
      console.error("❌ Failed to parse JSON:", text);
      throw new Error("Server returned invalid JSON: " + text.slice(0, 500)); // show longer snippet
    }

    if (!response.ok) {
      // If response is 500 or other error code, throw message if exists
      throw new Error(result?.message || `Server error: ${response.status}`);
    }

    alert("Project submitted successfully!");
    setIsEditingTitle(false);
    onSubmit && onSubmit(project);

  } catch (e: any) {
    console.error("❌ Fetch error:", e);
    setError(e instanceof Error ? e.message : "Failed to submit form.");
  } finally {
    setLoading(false);
  }
};




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // for formdata method

  // const handleSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();
  //   setLoading(true);
  //   setError(null);
  
  //   try {
  //     const formData = new FormData();
  //     formData.append("user_id", String(project.user_id || 9168));
  //     formData.append("project_title", project.project_title || "");
  //     formData.append("project_duration", project.project_duration || "");
  //     formData.append("technologies_used", project.technologies_used || "");
  //     formData.append("visibility", project.visibility || "public");
  
  //     if (file) {
  //       formData.append("banner_image", file);
  //     } else {
  //       formData.append("banner_image", project.banner_image || "");
  //     }
  
  //     formData.append("proof_of_work", project.proof_of_work || "");
  //     formData.append("project_description", project.project_description || "");
  //     formData.append("project_type", project.project_type || "");
  //     formData.append("associated_with", project.associated_with || "");
  //     formData.append("skills", project.skills_used?.join(",") || "");
  //     formData.append("github_demo_link", project.github_demo_link || "");
  //     formData.append("project_impact", project.project_impact || "");
  //     formData.append("collaboration_type", project.collaboration_type || "");
  //     formData.append("collaborators", project.collaborators || "");
  //     formData.append("role", project.role || "");
  //     formData.append("project_visibility", project.project_visibility === "private" ? "private" : "public");
  
  //     const response = await fetch("https://wooble.io/api/project/add_project_new.php", {
  //       method: "POST",
  //       body: formData,
  //     });
  
  //     const text = await response.text();
  //     console.log("🔴 Raw server response:", text);
  
  //     let result;
  //     try {
  //       if (!text || text.trim() === "") {
  //         throw new Error("Empty response from server.");
  //       }
  //       result = JSON.parse(text);
  //     } catch (err) {
  //       console.error("❌ Failed to parse JSON:", text);
  //       throw new Error("Server returned invalid JSON: " + text.slice(0, 200));
  //     }
  
  //     if (!response.ok || !result) {
  //       throw new Error(result?.message || "Something went wrong");
  //     }
  
  //     alert("Project submitted successfully!");
  //     setIsEditingTitle(false);
  //     onSubmit && onSubmit(project);
  
  //   } catch (e: any) {
  //     console.error("❌ Fetch error:", e);
  //     setError(e instanceof Error ? e.message : "Failed to submit form.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  if (error) return <div className="text-red-600">{error}</div>;

return (
  <>
    <Navbar /> 
    <form onSubmit={handleSubmit} className="max-w-5xl mt-6 w-full mx-auto px-4 py-6 sm:px-6 lg:px-8 bg-white rounded-lg shadow space-y-6">
          
        {/* Header Section */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleBackClick}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Add Project Details
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
            <>
              <img
                src={previewUrl}
                alt="Uploaded Preview"
                className="w-full h-full object-cover rounded-md"
              />
              <button
                onClick={() => setPreviewUrl(null)}
                className="absolute top-2 right-2 bg-red-500  rounded-full p-1 shadow hover:bg-red-500 hover:text-white transition"
                aria-label="Remove image"
              >
                ✕
              </button>
            </>
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

    
        {/* Project Duration */}
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
          </div>
    
          {/* Technologies Used */}
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
              onKeyDown={(e) => {
                if (e.key === "Enter" && inputValue.trim()) {
                  e.preventDefault();
                  if (!technologies.includes(inputValue.trim())) {
                    setTechnologies([...technologies, inputValue.trim()]);
                    setInputValue("");
                  }
                }
              }}
              className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring focus:ring-blue-200"
            />
    
            <div className="flex flex-wrap gap-2 mt-3">
            {technologies.map((tech: string, index: number) => (
                <span
                  key={index}
                  className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full flex items-center"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() =>
                      setTechnologies(technologies.filter((t) => t !== tech))
                    }
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
              <strong>Public:</strong> Your project will be visible to everyone.
              <br />
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

          {project.project_type === "other" && (
            <div className="mt-4">
              <label className="block font-medium text-gray-700 mb-1">
                Please specify
              </label>
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
            placeholder="Enter skills and press Enter"
            value={skillsInput}
            onChange={(e) => setSkillsInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && skillsInput.trim()) {
                e.preventDefault();
                const newSkill = skillsInput.trim();

                if (!project.skills_used.includes(newSkill)) {
                  setProject((prev) => ({
                    ...prev!,
                    skills_used: [...prev!.skills_used, newSkill],
                  }));
                }

                setSkillsInput("");
              }
            }}
            className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring focus:ring-blue-200"
          />

          <div className="flex flex-wrap gap-2 mt-3">
            {project.skills_used.map((skill, index) => (
              <span
                key={index}
                className="bg-green-600 text-white text-sm px-3 py-1 rounded-full flex items-center"
              >
                {skill}
                <button
                  type="button"
                  onClick={() =>
                    setProject((prev) => ({
                      ...prev!,
                      skills_used: prev!.skills_used.filter((s) => s !== skill),
                    }))
                  }
                  className="ml-2 text-white hover:text-gray-200"
                >
                  X
                </button>
              </span>
            ))}
          </div>
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

        {/* proof of work */}
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

        {/* Project Link */}
        <div className="w-full mt-6">
          <label className="flex items-center font-medium text-gray-700">
            <LinkIcon className="h-4 w-4 mr-2 text-gray-500" />
            Project Link/GitHub Live Link
          </label>
          <input
            type="url"
            name="project_link"
            placeholder="https://yourprojectlink.com"
            value={project?.project_link || ""}
            onChange={handleChange}
            className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Toggle Advanced Options */}
        <div className="w-full mt-6">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-blue-500 underline"
          >
            {showAdvanced ? "Hide Advanced Options" : "Show Advanced Options"}
          </button>
        </div>

        {/* Advanced Options */}
        {showAdvanced && (
          <div className="w-full space-y-6 mt-4 border-t border-gray-200 pt-4">
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
                className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 resize-none text-sm sm:text-base focus:outline-none focus:ring focus:ring-blue-200"
                rows={4}
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
                className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring focus:ring-blue-200"
              >
                <option value="">Select collaboration type</option>
                <option value="solo">Individual</option>
                <option value="team">Team Collaboration</option>
              </select>
            </div>
          </div>
        )}

        {/* Show if Team Collaboration */}
        {project?.collaboration_type === "team" && (
          <>
            {/* Collaborators */}
            <div className="w-full mt-6">
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
                className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            {/* Your Role */}
            <div className="w-full mt-6">
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
                className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
          </>
        )}

        {/* Submit Button */}
          <div className="w-full pt-6">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-center text-white text-sm sm:text-base ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Updating..." : "Submit Project"}
            </button>
          </div>
    </form>
    </>
  );
};

export default Projectstabform;
