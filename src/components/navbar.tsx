"use client";

import Link from "next/link";
import { Bell, PlusCircle, UserCircle } from "lucide-react";
import Image from "next/image";
import UserDropdown from "@/components/userdropdown";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-full mx-auto flex justify-evenly gap-140 items-center w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-3">
        
        <Link href="/">
          <Image 
            src="/wooble_logo_mini.png" 
            alt="Company Logo" 
            width={60} 
            height={30} 
            className="cursor-pointer"
          />
        </Link>

        <div className="flex items-center gap-4">
          
          <button className="flex items-center text-gray-700 border border-gray-300 rounded-lg px-3 py-2 text-sm transition hover:bg-gray-100">
            <PlusCircle className="w-5 h-5 mr-2" />
            Add Post
          </button>

          <div className="relative">
            <Bell className="w-6 h-6 text-gray-600 hover:text-blue-600 cursor-pointer" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              3
            </span>
          </div>

          {/* ✅ Wrap UserCircle in UserDropdown */}
          <UserDropdown
            trigger={
              <UserCircle className="w-8 h-8 text-gray-600 hover:text-blue-600 cursor-pointer" />
            }
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
