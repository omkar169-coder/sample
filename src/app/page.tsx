"use client";

import { useState, useEffect, ReactNode } from "react";
import Navbar from "@/components/navbar";
import Mobileresponsivenavbar from "@/components/mobileresponsivenavbar";
import Profilecard from "@/components/Profilecard";
import ImportantLinks from "@/components/ImportantLinks";
import ChannelsCard from "@/components/ChannelsCard";
import ProfileSuggestions from "@/components/ProfileSuggestions";
import UpgradeCard from "@/components/UpgradeCard";
import SearchBar from "@/components/SearchBar";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile === null) return null;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      {isMobile ? <Mobileresponsivenavbar /> : <Navbar />}

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row mt-4 px-4 sm:px-8 lg:px-12 justify-between gap-6">
        {/* Left Section */}
        <div className="hidden lg:flex flex-col w-full max-w-[250px] space-y-4">
          <Profilecard />
          <ImportantLinks />
          <ChannelsCard />
        </div>

        {/* Center Section - Search Bar */}
        <div className="w-full flex justify-center lg:justify-start">
          <SearchBar />
        </div>

        {/* Right Section */}
        <div className="hidden md:flex flex-col w-full max-w-full md:max-w-[220px] lg:max-w-[250px] space-y-4 sm:space-y-6 overflow-x-auto">
          <ProfileSuggestions />
          <UpgradeCard />
        </div>


      </div>

      {/* Dynamic Page Content */}
      <div className="flex-grow px-4 sm:px-8">{children}</div>
    </div>
  );
}
