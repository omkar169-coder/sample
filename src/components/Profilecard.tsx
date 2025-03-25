"use client";
import React from "react";

const ProfileCard = () => {
  return (
    <div className="w-full max-w-sm md:max-w-md bg-gradient-to-r from-blue-500 to-green-400 rounded-2xl shadow-lg flex items-center p-3 sm:p-4 gap-3 mx-0">
   
      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-lg font-semibold text-gray-800">
        M
      </div>

      
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold text-gray-900 leading-tight">Murala Omkar</h2>
        <p className="text-sm text-gray-700 leading-none">Professional</p>

        
        <div className="flex gap-2 text-gray-900 text-sm mt-1">
          <span className="font-semibold">0</span> Posts
          <span className="font-semibold">0</span> Replies
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
