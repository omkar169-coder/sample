'use client';

import Navbar from '@/components/navbar';
import Image from 'next/image';
import React from 'react';
import { FaTwitter, FaLinkedin, FaGithub, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import { HiOutlineBan, HiOutlineQuestionMarkCircle } from 'react-icons/hi';

/*  Interface defining the structure of the user profile data  */
interface UserProfile {
  name: string;
  role?: string;
  description: string;
  title: string;
  location: string;
  followers: number;
  bannerImage: string;
  profileImage: string;
  skills: string[];
  socials?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
    [key: string]: string | undefined; // for flexibility
  };
}

// 🌟 Mock data for demonstration purposes (can be replaced with real API data later)
const mockProfile: UserProfile = {
  name: 'Murala Omkar',
  role: 'Mentor',
  description: 'Passionate about building tech communities and startups.',
  title: 'Founder & CEO at Figgus78 Innovation Pvt. Ltd.',
  location: 'Chennai, India',
  followers: 120859,
  bannerImage: '/banner.jpeg',
  profileImage: '/murala omkar profile image.jpeg',
  skills: ['Leadership skills', 'Startups founder', 'Product Developer', 'Networking'],
  socials: {
    twitter: 'https://twitter.com/omkarmurala',
    linkedin: 'https://linkedin.com/in/omkarmurala',
    github: 'https://github.com/omkarmurala',
    instagram: 'https://instagram.com/omkarmurala',
    facebook: 'https://facebook.com/omkarmurala',
    youtube: 'https://youtube.com/omkarmurala',
  },
};

function Page() {
  const profile = mockProfile;
  const socialCount = Object.values(profile.socials || {}).filter(Boolean).length;
  const iconSizeClass = socialCount <= 3 ? 'w-8 h-8' : 'w-5 h-5';

  // Dropdown menu state and ref
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  return (
    <div className="min-h-screen bg-[#fefefe]">
      {/* 🧭 Navigation Bar */}
      <Navbar />

      {/* 📦 Main Container */}
      <div className="max-w-5xl mx-auto w-full">
        {/* 🧾 Profile Card */}
        <div className="bg-white w-full rounded-t-0 rounded-b-2xl shadow">
          
          {/* 🖼️ Banner Image */}
          <div className="w-full bg-gray-200 relative rounded-t-2xl overflow-hidden h-48 sm:h-60 md:h-72 lg:h-80 xl:h-96 2xl:h-[18rem]">
            <Image
              src={profile.bannerImage}
              alt="Banner"
              fill
              className="object-cover rounded-t-2xl"
              priority
            />
          </div>

          {/* 👤 Profile Section */}
          <div className="p-4 relative">
            {/* 🖼️ Profile Image */}
            <div className="absolute -top-16 left-4 border-4 border-white rounded-full overflow-hidden w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40">
              <Image
                src={profile.profileImage}
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>

            {/* 🔗 Social Media Icons */}
            <div className="flex justify-end items-end">
              {profile.socials && (
                <div className="mt-6 flex gap-4 items-center">
                  {profile.socials.twitter && (
                    <a href={profile.socials.twitter} target="_blank" rel="noopener noreferrer">
                      <FaTwitter className={`${iconSizeClass} text-blue-500 hover:text-blue-600`} />
                    </a>
                  )}
                  {profile.socials.linkedin && (
                    <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer">
                      <FaLinkedin className={`${iconSizeClass} text-blue-700 hover:text-blue-800`} />
                    </a>
                  )}
                  {profile.socials.github && (
                    <a href={profile.socials.github} target="_blank" rel="noopener noreferrer">
                      <FaGithub className={`${iconSizeClass} text-gray-800 hover:text-black`} />
                    </a>
                  )}
                  {profile.socials.facebook && (
                    <a href={profile.socials.facebook} target="_blank" rel="noopener noreferrer">
                      <FaFacebook className={`${iconSizeClass} text-blue-600 hover:text-blue-700`} />
                    </a>
                  )}
                  {profile.socials.instagram && (
                    <a href={profile.socials.instagram} target="_blank" rel="noopener noreferrer">
                      <FaInstagram className={`${iconSizeClass} text-pink-600 hover:text-pink-700`} />
                    </a>
                  )}
                  {profile.socials.youtube && (
                    <a href={profile.socials.youtube} target="_blank" rel="noopener noreferrer">
                      <FaYoutube className={`${iconSizeClass} text-red-600 hover:text-red-700`} />
                    </a>
                  )}
                </div>
              )}
            </div>
            {/* ✅ End Social Media Icons */}

            {/* 📝 Profile Details */}
            <div className="pt-4 sm:pt-6 md:pt-12 lg:pt-12 xl:pt-12 2xl:pt-12">
              {/* 📛 Name & Role */}
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold">{profile.name}</h1>
                {profile.role?.trim() && (
                  <span className="text-blue-600 bg-blue-100 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    🎓 {profile.role}
                  </span>
                )}
              </div>

              {/* 🧾 Short Description */}
              <p className="text-gray-700 mt-2 text-base">{profile.description}</p>

              {/* 🏢 Title & Location */}
              <div className="mt-3 text-sm text-gray-700 space-y-1">
                <p className="flex items-center gap-2">💼 {profile.title}</p>
                <p className="flex items-center gap-2">📍 {profile.location}</p>
              </div>

              {/* 👥 Followers Count */}
              <p className="text-gray-600 font-bold mt-2 text-sm">{profile.followers} followers</p>

              {/* 🎯 Action Buttons & Skills */}
              <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                
               {/* 🔘 Buttons */}
                <div className="relative flex items-center gap-3 justify-start sm:justify-start">
                  <button className="bg-gray-100 border rounded-full px-5 py-2 text-sm flex items-center gap-2">
                    👤 Following
                  </button>

                  <div className="relative">
                    <button
                      className="bg-gray-100 border rounded-full px-4 py-2 text-sm"
                      onClick={() => setDropdownOpen((prev) => !prev)}
                    >
                      ⋮
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute left-full top-1.5 ml-1 w-48 bg-white border rounded-md shadow-lg z-50">
                        <button className="w-full px-4 py-2 flex items-center gap-2 hover:bg-gray-100 text-sm">
                          <HiOutlineBan className="text-red-500 w-5 h-5" />
                          Block User
                        </button>
                        <button className="w-full px-4 py-2 flex items-center gap-2 hover:bg-gray-100 text-sm">
                          <HiOutlineQuestionMarkCircle className="text-blue-500 w-5 h-5" />
                          Ask Question
                        </button>
                      </div>
                    )}
                  </div>
                </div>

              {/* ✅ End Buttons */}

                {/* 🧠 Skills */}
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="font-semibold text-gray-800">Skills:</span>
                  {profile.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="bg-orange-100 text-gray-800 font-medium text-sm px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {profile.skills.length > 3 && (
                    <span className="bg-orange-100 text-gray-800 font-medium text-sm px-3 py-1 rounded-full">
                      +{profile.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>
              {/* ✅ End Buttons & Skills */}
            </div>
            {/* ✅ End Profile Details */}
          </div>
          {/* ✅ End Profile Section */}
        </div>
        {/* ✅ End Profile Card */}
      </div>
      {/* ✅ End Main Container */}
    </div>
  );
}

export default Page;
