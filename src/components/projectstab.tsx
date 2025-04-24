"use client";

import React, { useState } from "react";
import {
  Eye, FileText, MoreVertical, Plus, Image as ImageIcon, Video, Music, FileCode, FileArchive, FileSpreadsheet, FileAudio, FileSignature, FilePlus, FileInput,
} from "lucide-react";
import Projectstabform from "@/components/Projectstabform";
import ClapButton from "@/components/clapbutton";

type Project = {
  id: number;
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
  claps: number;
  imageUrl: string;
};

const getFileExtension = (fileName: string): string => {
  return fileName.split(".").pop()?.toLowerCase() || "";
};

const renderFileIcon = (file: File | null) => {
  if (!file) return null;
  const ext = getFileExtension(file.name);

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

const ProjectCard = ({
  project,
  onEdit,
  onDelete,
}: {
  project: Project;
  onEdit: (p: Project) => void;
  onDelete: (id: number) => void;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-md overflow-hidden relative">
      <img
        className="w-full h-48 object-cover rounded-t-2xl"
        src={project.imageUrl}
        alt={project.title}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-blue-600">{project.title}</h3>

        <div className="flex items-center justify-between mt-2 text-gray-600 font-medium text-sm">
          <div className="flex items-center gap-3">
            <ClapButton />
            <span>{project.claps} claps</span>
          </div>

          {project.proof && (
            <div className="flex items-center gap-1">
              {renderFileIcon(project.proof)}
              <span className="capitalize">{getFileExtension(project.proof.name)}</span>
            </div>
          )}
        </div>

        <div className="absolute top-3 right-3">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1 rounded hover:bg-gray-100"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-28 bg-white shadow-md rounded-md z-10">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onEdit(project);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onDelete(project.id);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Projectstab = () => {
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleAddProject = (
    data: Omit<Project, "id" | "claps" | "imageUrl">,
    isEdit = false
  ) => {
    if (isEdit && editingProject) {
      setProjects((prev) =>
        prev.map((proj) =>
          proj.id === editingProject.id
            ? { ...proj, ...data }
            : proj
        )
      );
    } else {
      const newProject: Project = {
        ...data,
        id: Date.now(),
        claps: 0,
        imageUrl: "https://source.unsplash.com/random/400x200?project",
      };
      setProjects((prev) => [newProject, ...prev]);
    }

    setEditingProject(null);
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    setProjects((prev) => prev.filter((proj) => proj.id !== id));
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen flex flex-col items-center">
      <div className="flex justify-end w-full max-w-7xl px-4">
        {!showForm && (
          <button
            onClick={() => {
              setEditingProject(null);
              setShowForm(true);
            }}
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 shadow"
          >
            <Plus className="h-5 w-5 text-gray-600" />
          </button>
        )}
      </div>

      {showForm ? (
        <div className="w-full max-w-4xl mt-6">
          <Projectstabform
            onSubmit={(data) =>
              handleAddProject(data, editingProject !== null)
            }
            onBack={() => {
              setEditingProject(null);
              setShowForm(false);
            }}
            defaultValues={editingProject || undefined}
          />
        </div>
      ) : projects.length === 0 ? (
        <div className="mt-4 w-full max-w-7xl bg-white rounded-2xl shadow-md p-6 space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Showcase Your Real Work
            </h2>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Eye className="w-4 h-4 mr-1" />
              Private to you
            </div>
          </div>
          <div className="flex items-start text-gray-700 text-sm">
            <FileText className="w-5 h-5 mt-1 mr-2 text-gray-500" />
            <p>
              Upload projects with tangible proofs—images, videos, or
              links—that capture your passion and creativity. Let your work
              speak volumes about your dedication!
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-8 w-full max-w-7xl h-[70vh] overflow-y-auto custom-scrollbar px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Projectstab;
