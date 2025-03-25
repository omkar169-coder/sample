"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, Bell, Wrench, Moon, Puzzle, Crown, User, X } from "lucide-react"; // Import close icon (X)

const MobileResponsiveNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        
        <Image src="/wooble_logo_mini.png" alt="Company Logo" width={50} height={25} />

   
        <div className="flex items-center gap-4">
          <button className="relative text-gray-600 hover:text-blue-600 transition">
            <Bell className="w-6 h-6" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              3
            </span>
          </button>

          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-blue-600 transition">
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </div>

     
      {isOpen && (
        <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50">
         
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-gray-600 hover:text-blue-600 transition"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="space-y-3 p-4 mt-8">
            <button className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition">
              <Wrench className="w-5 h-5" />
              <span>Tools</span>
            </button>

            <button className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition">
              <Moon className="w-5 h-5" />
              <span>Change Theme</span>
            </button>

            <button className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition">
              <Puzzle className="w-5 h-5" />
              <span>Challenges</span>
            </button>

            <button className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition">
              <Crown className="w-5 h-5" />
              <span>Plan</span>
            </button>

            <hr className="border-gray-300" />

            <div className="flex items-center gap-3 text-gray-700 font-semibold">
              <User className="w-6 h-6" />
              <span>Profile Name</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MobileResponsiveNavbar;
