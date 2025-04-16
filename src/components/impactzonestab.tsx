"use client";
import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaMedal } from "react-icons/fa";

const ImpactZonesTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 place-items-center">
      {/* Card 1 */}
      <div className="w-[350px] h-[350px] bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
        <div className="relative h-[200px] w-full flex-shrink-0">
          <img
            src="https://wooble.org/dms/aW1wYWN0LXBpY182NzIxMWJlNGUwYTJiNi45MDcyMjAzOC53ZWJw"
            alt="Wooble Career Summit"
            className="w-full h-full object-cover"
          />
          <span className="absolute top-3 left-3 bg-black bg-opacity-60 text-white text-sm px-2 py-1 rounded">
            26 Jul 2024
          </span>
        </div>
        <div className="flex-grow p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Wooble Career Summit
            </h2>
            <p className="text-sm text-gray-600 mb-3">Organized by Wooble</p>
          </div>
          <div className="flex justify-between text-sm text-gray-700">
            <div className="flex items-center gap-1">
              <FaUserFriends className="text-yellow-500" />
              350 Attendees
            </div>
            <div className="flex items-center gap-1">
              <GoLocation className="text-yellow-500" />
              Bhubaneswar
            </div>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="w-[350px] h-[350px] bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
        <div className="relative h-[200px] w-full flex-shrink-0">
          <img
            src="https://wooble.org/dms/aW1wYWN0LXBpY182N2NkNTgxOTUyNTEzNS4wNDU1Mjc0Mi53ZWJw"
            alt="15 Young Entrepreneurs"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-full shadow">
            🏆
          </div>
        </div>
        <div className="flex-grow p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              15 young entrepreneurs to look out for 2022
            </h2>
            <p className="text-sm text-gray-600 mb-3">
              Presented by Outlook India
            </p>
          </div>
          <div className="flex justify-between text-sm text-gray-700">
            <div className="flex items-center gap-1">
              <FaRegCalendarAlt className="text-gray-600" />
              Awarded: 9 Nov 2022
            </div>
            <div className="flex items-center gap-1">
              <FaMedal className="text-yellow-500" />
              National Level
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactZonesTab;
