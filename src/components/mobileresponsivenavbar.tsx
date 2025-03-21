"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, Bell, Wrench, Moon, Puzzle, Crown, User } from "lucide-react";

const MobileResponsiveNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <Image src="/wooble_logo_mini.png" alt="Company Logo" width={50} height={25} />

        {/* Icons */}
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

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="bg-white shadow-lg rounded-lg mt-2">
          <div className="space-y-3 p-4">
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
