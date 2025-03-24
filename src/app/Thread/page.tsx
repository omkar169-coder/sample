"use client";

import { useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import Navbar from "@/components/navbar";
import Mobileresponsivenavbar from "@/components/mobileresponsivenavbar";
import Profilecard from "@/components/Profilecard";
import ImportantLinks from "@/components/ImportantLinks";
import ChannelsCard from "@/components/ChannelsCard";
import UpgradeCard from "@/components/UpgradeCard";
import SearchBar from "@/components/SearchBar";
import PostSection from "@/components/PostSection";
import RecentNews from "@/components/RecentNews";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [currentPageId, setCurrentPageId] = useState<string | null>(null);
  const router = useRouter(); // Initialize useRouter to access router information

  useEffect(() => {
    // Check window size on mount
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);

    // Get current page id from query parameters on mount
    const queryParams = new URLSearchParams(window.location.search);
    setCurrentPageId(queryParams.get("id"));

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures this runs only on mount

  if (isMobile === null) return null;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {isMobile ? <Mobileresponsivenavbar /> : <Navbar />}

      <div className="flex flex-col lg:flex-row mt-4 px-4 sm:px-6 lg:px-8 gap-3 overflow-hidden overflow-x-hidden justify-center">
        {/* Left Column - Adjusted for Closeness */}
        <div className="hidden lg:flex flex-col w-full max-w-[220px] space-y-3 overflow-hidden overflow-x-hidden">
          <ImportantLinks />
          <ChannelsCard />
          <RecentNews />
        </div>

        {/* Middle Column */}
        <div className="flex-grow px-2 max-w-[750px] sm:px-4 my-2 lg:my-0 overflow-hidden overflow-x-hidden">
          <div className="mb-2">
            <SearchBar />
          </div>

          {/* If we're on a thread page, render thread-specific content */}
          {currentPageId ? (
            <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 md:p-8">
              <h1 className="text-lg font-semibold">Thread #{currentPageId}</h1>
              {/* You can render thread-specific content based on the `id` here */}
              {/* For example, fetch and display the specific post and its comments */}
              <PostSection threadId={currentPageId} />
            </div>
          ) : (
            <PostSection />
          )}
        </div>

        {/* Right Column */}
        <div className="hidden lg:flex flex-col w-full max-w-[300px] space-y-3 overflow-hidden overflow-x-hidden">
          <Profilecard />
          <UpgradeCard />
        </div>
      </div>
    </div>
  );
}
