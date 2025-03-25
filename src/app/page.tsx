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
import PostSection from "@/components/PostSection";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile === null) return null;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {isMobile ? <Mobileresponsivenavbar /> : <Navbar />}

      <div className="flex flex-col lg:flex-row mt-4 px-4 sm:px-6 lg:px-8 gap-3 overflow-hidden overflow-x-hidden justify-center">
        
        <div className="hidden lg:flex flex-col w-full max-w-[220px] space-y-3 overflow-hidden overflow-x-hidden">
          <Profilecard />
          <ImportantLinks />
          <ChannelsCard />
        </div>

        <div className="flex-grow px-2 max-w-[750px] sm:px-4 my-2 lg:my-0 overflow-hidden overflow-x-hidden">
          <div className="mb-2">
            <SearchBar />
          </div>
          <PostSection />
        </div>

   
        <div className="hidden lg:flex flex-col w-full max-w-[300px] space-y-3 overflow-hidden overflow-x-hidden">
          <ProfileSuggestions />
          <UpgradeCard />
        </div>
      </div>
    </div>
  );
}
