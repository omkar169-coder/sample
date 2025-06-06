"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  MoreVertical,
  FileText,
  Image as ImageIcon,
  Video,
  Music,
  FileCode,
  FileArchive,
  FileSpreadsheet,
  FileAudio,
  FileSignature,
  FilePlus,
  FileInput,
} from "lucide-react";
import ClapButton from "@/components/clapbutton";

interface Project {
  id: number;
  title: string;
  duration: string;
  technologies: string;
  visibility: string;
  description: string;
  type: string;
  skills: string;
  association: string;
  proof: File | string | null;
  link: string;
  projectImpact: string;
  collaborationType: string;
  claps: number;
  imageUrl: string;
}

export default function ProjectsTab() {
  const router = useRouter();
  // const [projects, setProjects] = useState<any[]>([]);
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: "Sample Project",
      duration: "3 months",
      technologies: "React, Node.js",
      visibility: "public",
      description: "A mock project for testing",
      type: "Academic",
      skills: "JavaScript, HTML, CSS",
      association: "College",
      proof: null,
      link: "https://example.com",
      projectImpact: "Improved user experience",
      collaborationType: "Team",
      claps: 10,
      imageUrl: "/",
    },
  ]);
  
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const username = "muralaomkar2";

  const toggleDropdown = (id: number) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };
    
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("https://wooble.io/api/project/fetchProject_from_username.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ username: "muralaomkar2" }),
        });
  
        const data = await res.json();

        console.log("API response murala:", data);
  
        if (data.success) {

          const projectsFromApi = data.data.projects;
          const mappedProjects = projectsFromApi.map((p: any) => ({
            id: p.project_id,
            title: p.title,
            duration: p.duration,
            technologies: p.technologies,
            visibility: p.visibility,
            description: p.description,
            type: p.type,
            skills: p.skills,
            association: p.association,
            proof: p.proof,
            link: p.link,
            projectImpact: p.project_impact,
            collaborationType: p.collaboration_type,
            claps: p.claps,
            imageUrl: p.image_url || "/",
          }));
          setProjects(mappedProjects);
        
        } else {
          console.error("Failed to fetch projects:", data.message);
        }
      } catch (error) {
        console.error("Failed to fetch projects", error);
      }
    };
  
    fetchProjects();
  }, []);
  
  const handleAddProject = () => {
    router.push("/add-projects");
  };

  const handleEdit = (project: Project) => {
    console.log("Edit project", project);
  };

  const handleDelete = (id: number) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    localStorage.setItem("projects", JSON.stringify(updated));
  };

  const getFileExtension = (fileName: string): string => {
    return fileName.split(".").pop()?.toLowerCase() || "";
  };

  const renderFileIcon = (file: File | string | null) => {
    if (!file) return null;
    const fileName = typeof file === "string" ? file : file.name;
    const ext = getFileExtension(fileName);

    const docTypes = ["pdf", "doc", "docx", "rtf", "odt", "txt", "md"];
    const imageTypes = ["png", "jpg", "jpeg", "gif", "bmp", "webp", "svg", "tiff", "heic"];
    const videoTypes = ["mp4", "mov", "webm", "avi", "mkv", "flv", "wmv"];
    const audioTypes = ["mp3", "wav", "aac", "ogg", "flac", "m4a"];
    const codeTypes = ["html", "js", "ts", "tsx", "css", "scss", "json", "py", "java", "cpp", "c", "cs", "xml", "php", "sql", "rb", "go", "rs"];
    const archiveTypes = ["zip", "rar", "7z", "tar", "gz", "bz2"];
    const spreadsheetTypes = ["xls", "xlsx", "csv", "ods"];
    const signatureTypes = ["sig", "p7s"];
    const formTypes = ["form", "input", "output"];
    const genericTypes = ["apk", "exe", "dmg", "iso"];

    if (docTypes.includes(ext)) return <FileText className="w-5 h-5 text-gray-500" />;
    if (imageTypes.includes(ext)) return <ImageIcon className="w-5 h-5 text-gray-500" />;
    if (videoTypes.includes(ext)) return <Video className="w-5 h-5 text-gray-500" />;
    if (audioTypes.includes(ext)) return <Music className="w-5 h-5 text-gray-500" />;
    if (codeTypes.includes(ext)) return <FileCode className="w-5 h-5 text-gray-500" />;
    if (archiveTypes.includes(ext)) return <FileArchive className="w-5 h-5 text-gray-500" />;
    if (spreadsheetTypes.includes(ext)) return <FileSpreadsheet className="w-5 h-5 text-gray-500" />;
    if (signatureTypes.includes(ext)) return <FileSignature className="w-5 h-5 text-gray-500" />;
    if (formTypes.includes(ext)) return <FileInput className="w-5 h-5 text-gray-500" />;
    if (genericTypes.includes(ext)) return <FilePlus className="w-5 h-5 text-gray-500" />;

    return <FileText className="w-5 h-5 text-gray-500" />;
  };

  return (
    <div className="w-full px-4 py-6">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddProject}
          className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 shadow-sm"
        >
          <Plus className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Conditionally show introduction */}
      {projects.length === 0 && (
        <div className="rounded-3xl shadow-md border bg-white p-6 flex flex-col gap-3 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900">Showcase Your Real Work</h2>

          <div className="flex items-center text-sm text-gray-500 gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="w-4 h-4">
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM8 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm1 3.002H7v5h2v-5z" />
            </svg>
            <span>Private to you</span>
          </div>

          <div className="flex items-start gap-3 text-gray-800 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="w-5 h-5 mt-1">
              <path d="M4 0h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zM3 3v10h10V3H3z" />
            </svg>
            <p>
              Upload projects with tangible proofs—images, videos, or links—that capture your passion and creativity. Let
              your work speak volumes about your dedication!
            </p>
          </div>
        </div>
      )}

      {/* Show project cards if available */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
      {projects.map((project) => (
        <div key={project.id} className="w-full max-w-sm bg-white rounded-2xl shadow-md overflow-hidden relative">
          <img
            className="w-full h-48 object-cover rounded-t-2xl"
            src={project.imageUrl || "/"}
            alt={project.title}
          />

          <div className="p-4">
            <h3 className="text-lg font-semibold text-blue-600">{project.title}</h3>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{project.description}</p>

            <div className="flex items-center justify-between mt-2 text-gray-600 font-medium text-sm">
              <div className="flex items-center gap-3">
                <ClapButton />
                <span>{project.claps} claps</span>
              </div>

              {project.proof && (
                <div className="flex items-center gap-1">
                  {renderFileIcon(project.proof)}
                  <span className="capitalize">
                    {typeof project.proof === "string"
                      ? getFileExtension(project.proof)
                      : getFileExtension(project.proof.name)}
                  </span>
                </div>
              )}
            </div>

            <div className="absolute top-3 right-3">
              <button onClick={() => toggleDropdown(project.id)} className="p-1 rounded hover:bg-gray-100">
                <MoreVertical className="w-5 h-5" />
              </button>
              {activeDropdown === project.id && (
                <div className="absolute right-0 mt-2 w-28 bg-white shadow-md rounded-md z-10">
                  <button onClick={() => handleEdit(project)} className="w-full text-left px-4 py-2 hover:bg-gray-100">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}
