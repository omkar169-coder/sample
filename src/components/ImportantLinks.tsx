import React from "react";
import { FaBriefcase, FaClock, FaQuestionCircle } from "react-icons/fa";

const ImportantLinks = () => {
  const links = [
    { icon: <FaBriefcase className="text-blue-500" />, label: "Career News" },
    { icon: <FaClock className="text-blue-500" />, label: "Contact Us" },
    { icon: <FaQuestionCircle className="text-blue-500" />, label: "Support" },
  ];

  return (
    <div className="w-full max-w-sm bg-white shadow-md rounded-xl p-5 border border-gray-200">
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <span role="img" aria-label="link">🔗</span> Important Links
      </h2>

      {/* Links List */}
      <ul className="mt-3 space-y-3">
        {links.map((link, index) => (
          <li
            key={index}
            className="flex items-center gap-3 text-gray-800 hover:text-blue-600 transition-all cursor-pointer"
          >
            {link.icon} <span className="font-medium">{link.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImportantLinks;
