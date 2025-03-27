"use client";

import { useState } from "react";
import { UserPlus, UserMinus, Check, X } from "lucide-react";

// Define the profile type
interface Profile {
  id: number;
  name: string;
  role: string;
  isRequest: boolean;
  isFollowing?: boolean; // Optional property for follow/unfollow
}

const SeeMoreProfiles = () => {
  // Sample data for profiles (including both friend requests and suggestions)
  const initialProfiles: Profile[] = [
    ...Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      role: "Software Engineer", // Example role for Friend Requests
      isRequest: true,
    })),
    ...Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      role: "Product Manager", // Example role for Suggested Profiles
      isRequest: false,
      isFollowing: false, // Initialize isFollowing for suggested profiles
    })),
    ...Array.from({ length: 8 }, (_, i) => ({
      id: i + 21,
      name: `User ${i + 21}`,
      role: "UX Designer", // Example role for Friend Requests
      isRequest: true,
    })),
  ];

  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles);
  const [activeTab, setActiveTab] = useState<"requests" | "suggestions">("requests");

  const handleAccept = (id: number) => {
    setProfiles(profiles.filter((profile) => profile.id !== id));
  };

  const handleIgnore = (id: number) => {
    setProfiles(profiles.filter((profile) => profile.id !== id));
  };

  const handleFollow = (id: number) => {
    setProfiles(
      profiles.map((profile) =>
        profile.id === id ? { ...profile, isFollowing: !profile.isFollowing } : profile
      )
    );
  };

  const filteredProfiles = profiles.filter(
    (profile) => (activeTab === "requests" && profile.isRequest) || (activeTab === "suggestions" && !profile.isRequest)
  );

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 border h-[100vh] mt-5 flex flex-col">
      
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setActiveTab("requests")}
          className={`px-6 py-2 text-sm font-medium rounded-t-lg ${
            activeTab === "requests" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
          } hover:bg-blue-700 transition`}
        >
          Friend Requests
        </button>
        <button
          onClick={() => setActiveTab("suggestions")}
          className={`px-6 py-2 text-sm font-medium rounded-t-lg ${
            activeTab === "suggestions" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
          } hover:bg-blue-700 transition`}
        >
          Suggested Profiles
        </button>
      </div>

      <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">
        {activeTab === "requests" ? "Friend Requests" : "Suggested Profiles"}
      </h2>

      {/* The scrollable container for the profiles */}
      <div className="flex-1 overflow-y-auto space-y-3" style={{ maxHeight: "calc(100vh - 180px)" }}>
        {/* Adjusting maxHeight based on the screen height to ensure it fits within the card */}
        {filteredProfiles.map((profile) => (
          <div
            key={profile.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm border hover:bg-gray-100 transition"
          >
            {/* Profile Avatar */}
            <div className="w-12 h-12 bg-gray-400 text-white flex items-center justify-center rounded-full text-lg font-medium">
              {profile.name[0]}
            </div>

            {/* Profile Details */}
            <div className="flex-1 ml-3">
              <p className="font-semibold text-gray-800 text-sm">{profile.name}</p>
              <p className="text-xs text-gray-600">{profile.role}</p>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              {profile.isRequest ? (
                <>
                  <button
                    onClick={() => handleAccept(profile.id)}
                    className="flex items-center gap-1 bg-green-500 text-white px-3 py-1.5 rounded-full text-xs hover:bg-green-600 transition"
                  >
                    <Check size={14} />
                    Accept
                  </button>
                  <button
                    onClick={() => handleIgnore(profile.id)}
                    className="flex items-center gap-1 bg-gray-300 text-black px-3 py-1.5 rounded-full text-xs hover:bg-gray-400 transition"
                  >
                    <X size={14} />
                    Ignore
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleFollow(profile.id)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs transition ${
                    profile.isFollowing
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {profile.isFollowing ? <UserMinus size={14} /> : <UserPlus size={14} />}
                  {profile.isFollowing ? "Unfollow" : "Follow"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeeMoreProfiles;
