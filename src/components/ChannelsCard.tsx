import React from "react";
import { FaRocket, FaPalette, FaCode, FaBullhorn, FaFileAlt } from "react-icons/fa";

const ChannelsCard = () => {
  return (
    <div className="w-full max-w-xs bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl shadow-md p-4 ">
      
    
      <h2 className="text-lg font-semibold text-white flex items-center mb-3">
        <span className="mr-2">⚙️</span> Channels
      </h2>

      <div className="space-y-3 text-white">
        {[
          { icon: <FaRocket />, name: "Startup Sphere" },
          { icon: <FaPalette />, name: "Ui-Ux Universe" },
          { icon: <FaCode />, name: "Coding Ninja" },
          { icon: <FaBullhorn />, name: "Marketing Mastery" },
          { icon: <FaFileAlt />, name: "Resume Brilliance" },
        ].map((channel, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            {channel.icon} {channel.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChannelsCard;
