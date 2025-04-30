'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

interface UserProfile {
  name: string;
  username: string;
  cover_pic: string;
  profile_pic: string;
  location: string;
  bio: string;
  skills: string[];
  followers: number;
  linkedin: string;
  github: string;
  website: string;
}

export default function ProfilePage() {
  const { username } = useParams();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState("projects");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`https://wooble.io/user/${username}`, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (username) fetchUserDetails();
  }, [username]);

  if (!user) return <div className="p-6 text-center text-gray-600">Loading profile...</div>;
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 font-sans text-gray-800">
      {/* Header */}
      <div className="relative w-full h-52">
        <img
          src={user.cover_pic || '/cover.jpg'}
          alt="Cover"
          className="w-full h-full object-cover rounded-xl"
        />
        <div className="absolute bottom-[-2.5rem] left-6 flex items-center gap-4">
          <img
            src={user.profile_pic}
            alt={user.name}
            className="w-20 h-20 rounded-full border-4 border-white object-cover"
          />
          <div className="pt-8">
            <h1 className="text-2xl font-semibold">{user.name}</h1>
            <p className="text-sm text-gray-600 mt-1">{user.bio}</p>
            <div className="flex items-center gap-2 mt-1 text-gray-500 text-sm">
              <span>Wooble.io</span>
              <span>•</span>
              <span>{user.location || 'Unknown Location'}</span>
            </div>
            <div className="mt-1 text-blue-600 text-sm cursor-pointer">{user.followers} followers</div>
          </div>
        </div>
        <div className="absolute top-4 right-6 flex items-center gap-4 text-gray-600">
          {user.linkedin && <a href={user.linkedin} target="_blank"><i className="bi bi-linkedin text-xl"></i></a>}
          {user.website && <a href={user.website} target="_blank"><i className="bi bi-globe text-xl"></i></a>}
          {user.github && <a href={user.github} target="_blank"><i className="bi bi-github text-xl"></i></a>}
          <button className="text-xl font-bold">+</button>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-16" />

      {/* Settings & Skills */}
      <div className="flex items-center gap-2">
        {(user.skills && user.skills.length > 0) ? (
            user.skills.map((skill, i) => (
            <span key={i} className="bg-yellow-100 text-yellow-800 px-2 py-1 text-xs rounded">{skill}</span>
            ))
        ) : (
            <span>No skills available</span>
        )}
        <button className="text-xl font-bold">+</button>
        </div>

      {/* About */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="font-semibold text-lg mb-2">This is me</h2>
        <p className="text-sm text-gray-700">{user.bio || 'No description available.'}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b pb-2 mb-6">
        {["projects", "timeline", "impact"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`font-medium pb-1 ${
              activeTab === tab ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "projects" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-xl overflow-hidden shadow-sm">
            <img src="/project1.png" alt="Project 1" className="w-full h-40 object-cover" />
            <div className="p-3">
              <h3 className="text-blue-600 font-medium">Lets Resources</h3>
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>0 claps</span>
                <span>IMAGE</span>
              </div>
            </div>
          </div>
          <div className="border rounded-xl overflow-hidden shadow-sm">
            <img src="/project2.png" alt="Project 2" className="w-full h-40 object-cover" />
            <div className="p-3">
              <h3 className="text-blue-600 font-medium">Hello Testing</h3>
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>4 claps</span>
                <span>WORD DOCUMENT</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "timeline" && (
        <div className="text-gray-600 text-sm">Timeline content goes here...</div>
      )}

      {activeTab === "impact" && (
        <div className="text-gray-600 text-sm">Impact Zone content goes here...</div>
      )}
    </div>
  );
}
