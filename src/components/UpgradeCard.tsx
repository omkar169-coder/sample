"use client";

import React from "react";
import Image from "next/image";

const UpgradeCard = () => {
  return (
    <div className="bg-gradient-to-r from-green-300 to-blue-400 rounded-2xl p-6 shadow-lg w-full max-w-sm mx-auto text-center">
      <div className="flex flex-col items-center">
        {/* Crown Icon */}
        <Image
          src="/crown.png"
          alt="Crown Icon"
          width={80}
          height={80}
          priority
          className="mb-3"
        />

        {/* Upgrade Text */}
        <p className="text-lg font-semibold text-black">
          Boost your career growth with
        </p>

        {/* Company Logo */}
        <Image
          src="/wooble_black_logo.png"
          alt="Company Icon"
          width={140}
          height={50}
          priority
          className="my-2"
        />

        {/* Upgrade Button */}
        <button className="mt-4 bg-white px-5 py-2 rounded-lg text-blue-600 font-bold text-lg shadow-md hover:bg-gray-100 transition">
          Upgrade Now
        </button>
      </div>
    </div>
  );
};

export default UpgradeCard;
