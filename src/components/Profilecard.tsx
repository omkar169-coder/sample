import React from "react";

const ProfileCard = () => {
  return (
    <div className="w-full max-w-sm md:max-w-md bg-gradient-to-r from-blue-500 to-green-400 rounded-2xl shadow-lg flex items-center p-4 sm:p-6 gap-4 mx-auto">
      {/* Profile Icon */}
      <div className="w-14 h-14 bg-gray-300 rounded-full flex items-center justify-center text-lg font-semibold text-gray-800">
        M
      </div>

      {/* User Info */}
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold text-gray-900">Murala Omkar</h2>
        <p className="text-sm text-gray-700">Professional</p>

        {/* Stats */}
        <div className="flex gap-4 text-gray-900 text-sm mt-2">
          <span className="font-semibold">0</span> Posts
          <span className="font-semibold">0</span> Replies
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
