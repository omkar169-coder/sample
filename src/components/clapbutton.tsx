// src/components/ClapButton/clapbutton.tsx

"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandsClapping } from "@fortawesome/free-solid-svg-icons";

const ClapButton = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked); // Toggle the state on click
  };

  return (
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      <FontAwesomeIcon
        icon={faHandsClapping}
        color={isClicked ? "blue" : "gray"} // Change color based on state
        size="2x" // Set the icon size (you can adjust it as needed)
      />
    </div>
  );
};

export default ClapButton;
















// "use client";


// import { useState, useEffect } from "react";

// import {
//   Link as LinkIcon,
//   BarChart2,
//   UsersRound,
//   AlignLeft,
//   ListTree,
//   BadgeCheck,
//   Users,
//   FileUp,
//   Info,
//   Eye,
//   Lightbulb,
//   Calendar,
//   Image as ImageIcon,
//   ArrowLeft
// } from "lucide-react";

// import { useState } from "react";

// type Project = {
//   id: number;
//   user_id: number;
//   project_title: string;
//   project_duration: string;
//   technologies_used: string;
//   visibility: string;
//   project_description: string;
//   project_type: string;
//   associated_with: string;
//   skills: string;
//   proof_of_work: string;
//   github_demo_link: string;
//   project_impact: string;
//   collaboration_type: string;
//   banner_image: string;
// };




// useEffect(() => {
//   if (defaultValues) {
//     setProject({
//       duration: defaultValues.project_duration || "",
//       technologies: defaultValues.technologies_used || "",
//       visibility: defaultValues.visibility || "",
//       description: defaultValues.project_description || "",
//       type: defaultValues.project_type || "",
//       skills: defaultValues.skills || "",
//       association: defaultValues.associated_with || "",
//       proof: null, // Proof is a file input, not handled from API
//       link: defaultValues.github_demo_link || "",
//       projectImpact: defaultValues.project_impact || "",
//       collaborationType: defaultValues.collaboration_type || "",
//     });
//     setProjectTitle(defaultValues.project_title || "");
//   }
// }, [defaultValues]);


// type APIProject = {
//   project_title: string;
//   project_duration: string;
//   technologies_used: string;
//   visibility: string;
//   project_description: string;
//   project_type: string;
//   associated_with: string;
//   skills: string;
//   proof_of_work: string;
//   github_demo_link: string;
//   project_impact: string;
//   collaboration_type: string;
//   banner_image: string;
// };



// type ProjectstabformProps = {
//   onSubmit: (data: Omit<Project, "id" | "user_id" | "banner_image">) => void;
//   onBack: () => void;
//   defaultValues?: APIProject;
// };







// type ProjectstabformProps = {
//   onSubmit: (data: Omit<Project, "id" | "claps" | "imageUrl">) => void;
//   onBack: () => void;
//   defaultValues?: Omit<Project, "id" | "claps" | "imageUrl">;
// };

// const Projectstabform = ({ onSubmit, onBack, defaultValues }: ProjectstabformProps) => {
//   const [isEditingTitle, setIsEditingTitle] = useState(false);
//   const [projectTitle, setProjectTitle] = useState('');
//   const [showAdvanced, setShowAdvanced] = useState(false);

//   const [project, setProject] = useState<Omit<Project, "id" | "claps" | "imageUrl">>({
//     title: "",
//     duration: "",
//     technologies: "",
//     visibility: "",
//     description: "",
//     type: "",
//     skills: "",
//     association: "",
//     proof: null,
//     link: "",
//     projectImpact: "",
//     collaborationType: "",
//   });
  

//   const handleTitleClick = () => setIsEditingTitle(true);

//   const handleBackClick = () => {
//     setIsEditingTitle(false);
//     onBack(); 
//   };  

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setProject((prev) => ({ ...prev, [name]: value }));
//   };
  
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setProject((prev) => ({ ...prev, proof: e.target.files![0] }));
//     }
//   };
  
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit({ ...project, title: projectTitle });
//   };

