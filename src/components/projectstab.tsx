"use client";
import React from 'react';

const ProjectCard = ({ title, claps, imageUrl }: { title: string; claps: number; imageUrl: string }) => {
  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-md overflow-hidden">
      <img className="w-full h-48 object-cover rounded-t-2xl" src={imageUrl} alt={title} />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-blue-600">{title}</h3>
        <div className="flex items-center gap-2 mt-2 text-gray-600 font-medium">
          <span className="text-xl">👏</span>
          <span>{claps} claps</span>
        </div>
      </div>
    </div>
  );
};

const Projectstab = () => {
  const projects = [
    {
      id: 1,
      title: 'Wooble Nexus Podcast - Connecting industry experts',
      claps: 143,
      imageUrl: 'https://media.istockphoto.com/id/636757104/vector/public-internet-point-in-airport.jpg?s=612x612&w=0&k=20&c=LLBKrcBxwibgk3maeH_e_SyzBNWdHwF2TSbW1urmrSs=',
    },
  ];

  return (
    <div className="p-10 bg-gray-50 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-7xl h-[80vh] overflow-y-auto custom-scrollbar px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              claps={project.claps}
              imageUrl={project.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projectstab;
