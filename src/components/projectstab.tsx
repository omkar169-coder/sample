// "use client";
// import React from 'react';

// const ProjectCard = ({ title, claps, imageUrl }: { title: string; claps: number; imageUrl: string }) => {
//   return (
//     <div className="w-full max-w-sm bg-white rounded-2xl shadow-md overflow-hidden">
//       <img className="w-full h-48 object-cover rounded-t-2xl" src={imageUrl} alt={title} />
//       <div className="p-4">
//         <h3 className="text-lg font-semibold text-blue-600">{title}</h3>
//         <div className="flex items-center gap-2 mt-2 text-gray-600 font-medium">
//           <span className="text-xl">👏</span>
//           <span>{claps} claps</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Projectstab = () => {
//   const projects = [
//     {
//       id: 1,
//       title: 'Wooble Nexus Podcast - Connecting industry experts',
//       claps: 143,
//       imageUrl: 'https://media.istockphoto.com/id/636757104/vector/public-internet-point-in-airport.jpg?s=612x612&w=0&k=20&c=LLBKrcBxwibgk3maeH_e_SyzBNWdHwF2TSbW1urmrSs=',
//     },
//   ];

//   return (
//     <div className="p-10 bg-gray-50 min-h-screen flex flex-col items-center">
//       <div className="w-full max-w-7xl h-[80vh] overflow-y-auto custom-scrollbar px-4">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
//           {projects.map((project) => (
//             <ProjectCard
//               key={project.id}
//               title={project.title}
//               claps={project.claps}
//               imageUrl={project.imageUrl}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Projectstab;
import React, { useState } from "react";
import { Eye, FileText, Plus } from "lucide-react";
import Projectstabform from "@/components/Projectstabform";

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

const Projectstab = () => {
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  const handleAddProject = (newProject: Project) => {
    setProjects((prev) => [newProject, ...prev]);
    setShowForm(false);
  };

  return (
    <div className="w-full p-4 bg-gray-100 rounded-md">

      {!showForm && (
        <>
          <div className="flex justify-end">
            <button
              onClick={() => setShowForm(true)}
              className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 shadow"
            >
              <Plus className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          <div className="mt-4 w-full bg-white rounded-2xl shadow-md p-6 space-y-4">
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
                Upload projects with tangible proofs—images, videos, or links—that
                capture your passion and creativity. Let your work speak volumes
                about your dedication!
              </p>
            </div>
          </div>
        </>
      )}

      {showForm && (
        <div className="mt-4">
          <Projectstabform onSubmit={handleAddProject} />
        </div>
      )}
    </div>
  );
};

export default Projectstab;
