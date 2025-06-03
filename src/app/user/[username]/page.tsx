'use client';

import Navbar from '@/components/navbar';
import Image from 'next/image';
import React from 'react';
import {
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from 'react-icons/fa';
import { FaBriefcase, FaStream, FaChartLine } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import { HiOutlineBan, HiOutlineQuestionMarkCircle } from 'react-icons/hi';
import { FaHandsClapping } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { MdGroups2 } from "react-icons/md";

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
  aboutMe: string;
  socials?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
    [key: string]: string | undefined;
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
  skills: [
    'Leadership skills',
    'Startups founder',
    'Product Developer',
    'Networking',
    'Stratagist',
    'Mentor',
    'Community Builder',
  ],
  aboutMe: `Hi! I am Murala Omkar, a passionate mentor and founder dedicated to building
  tech communities and helping startups thrive. I have extensive experience in
  leadership, product development, and networking. Outside of work, I enjoy sharing knowledge
  and empowering the next generation of innovators.`,
  socials: {
    twitter: 'https://twitter.com/omkarmurala',
    linkedin: 'https://linkedin.com/in/omkarmurala',
    github: 'https://github.com/omkarmurala',
    instagram: 'https://instagram.com/omkarmurala',
    facebook: 'https://facebook.com/omkarmurala',
    youtube: 'https://youtube.com/omkarmurala',
  },
};

// 🔹 Mock Projects data
const mockProjects = [
  {
    id: 1,
    image: '/podcast-cover.jpg',
    title: 'Wooble Nexus Podcast - Connecting industry experts',
    claps: 47,
  },
  {
    id: 2,
    image: '/sample-image.jpg',
    title: 'AI & Innovation - Journey of Modern Tech',
    claps: 32,
  },
  {
    id: 3,
    image: '/sample-image.jpg',
    title: 'Building Scalable Communities',
    claps: 54,
  },
  {
    id: 4,
    image: '/sample-image.jpg',
    title: 'Startup Growth and Mentorship',
    claps: 28,
  },
  {
    id: 5,
    image: '/sample-image.jpg',
    title: 'Decoding Product Development',
    claps: 67,
  },
  {
    id: 6,
    image: '/sample-image.jpg',
    title: 'Tech Leadership Insights',
    claps: 38,
  },
];


export const timeline = [
  {
    id: 3,
    year: 2022,
    dateRange: "Feb 22, 2022 - Ongoing",
    title: "Founder & CEO",
    organization: "Wooble Software Private Limited (wooble.io)",
    logo: "/wooble-logo.png",
    type: "Experience",
    typeColor: "gray", // used for styling tags
    description: "Execution and team building",
  },
  {
    id: 2,
    year: 2022,
    dateRange: "Sep 12, 2022 - Sep 14, 2023",
    title: "Stanford University",
    organization: "Masters",
    logo: "/stanford-logo.png",
    type: "Education",
    typeColor: "red",
    description: "Executive MBA in Entrepreneurship",
  },
  {
    id: 1,
    year: 2016,
    dateRange: "Jul 18, 2016 - May 13, 2020",
    title: "KIIT University",
    organization: "Bachelor in Technology",
    logo: "/kiit-logo.png",
    type: "Education",
    typeColor: "red",
    description: "Computer Science & Communication Engineering",
  },
];


const impactsData = [
  {
    date: '4 May 2025',
    title: 'name event',
    organizer: 'sfs',
    attendees: 5,
    location: 'fxvx',
  },
  {
    date: '12 May 2025',
    title: 'vcbcv',
    organizer: 'gfbgfg',
    attendees: 3,
    location: 'gdxvc',
  },
  {
    date: '5 May 2025',
    title: 'event',
    organizer: 'orga',
    attendees: 5,
    location: 'rd',
  },
  {
    date: '5 May 2025',
    title: 'fddfg',
    organizer: 'orga',
    attendees: 4,
    location: 'fgfg',
  },
];


function Page() {
  const profile = mockProfile;
  const socialCount = Object.values(profile.socials || {}).filter(Boolean).length;
  const iconSizeClass = socialCount <= 3 ? 'w-8 h-8' : 'w-5 h-5';

  // 🧭 State and ref for dropdown menu

  const [isSkillsPopupOpen, setIsSkillsPopupOpen] = useState(false);

  const [activeTab, setActiveTab] = useState('Projects');

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

  // bg-[#fefefe]

  return (
    <div className='min-h-screen bg-gray-100 '>
      {/* 🧭 Navigation Bar */}
      <Navbar />

      {/* 📦 Main Container */}
      <div className='mx-auto w-full max-w-5xl'>
        {/* 🧾 Profile Card */}
        <div className='rounded-t-0 w-full rounded-b-2xl bg-white shadow'>
          {/* 🖼️ Banner Image */}
          <div className='relative h-48 w-full overflow-hidden rounded-t-2xl bg-gray-200 sm:h-60 md:h-72 lg:h-80 xl:h-96 2xl:h-[18rem]'>
            <Image
              src={profile.bannerImage}
              alt='Banner'
              fill
              className='rounded-t-2xl object-cover'
              priority
            />
          </div>

          {/* 👤 Profile Section */}
          <div className='relative p-4'>
            {/* 🖼️ Profile Image */}
            <div className='absolute -top-16 left-4 h-28 w-28 overflow-hidden rounded-full border-4 border-white sm:h-32 sm:w-32 md:h-36 md:w-36 lg:h-40 lg:w-40'>
              <Image src={profile.profileImage} alt='Profile' fill className='object-cover' />
            </div>

            {/* 🔗 Social Media Icons */}
            <div className='flex items-end justify-end'>
              {profile.socials && (
                <div className='mt-6 flex items-center gap-4'>
                  {profile.socials.twitter && (
                    <a href={profile.socials.twitter} target='_blank' rel='noopener noreferrer'>
                      <FaTwitter className={`${iconSizeClass} text-blue-500 hover:text-blue-600`} />
                    </a>
                  )}
                  {profile.socials.linkedin && (
                    <a href={profile.socials.linkedin} target='_blank' rel='noopener noreferrer'>
                      <FaLinkedin
                        className={`${iconSizeClass} text-blue-700 hover:text-blue-800`}
                      />
                    </a>
                  )}
                  {profile.socials.github && (
                    <a href={profile.socials.github} target='_blank' rel='noopener noreferrer'>
                      <FaGithub className={`${iconSizeClass} text-gray-800 hover:text-black`} />
                    </a>
                  )}
                  {profile.socials.facebook && (
                    <a href={profile.socials.facebook} target='_blank' rel='noopener noreferrer'>
                      <FaFacebook
                        className={`${iconSizeClass} text-blue-600 hover:text-blue-700`}
                      />
                    </a>
                  )}
                  {profile.socials.instagram && (
                    <a href={profile.socials.instagram} target='_blank' rel='noopener noreferrer'>
                      <FaInstagram
                        className={`${iconSizeClass} text-pink-600 hover:text-pink-700`}
                      />
                    </a>
                  )}
                  {profile.socials.youtube && (
                    <a href={profile.socials.youtube} target='_blank' rel='noopener noreferrer'>
                      <FaYoutube className={`${iconSizeClass} text-red-600 hover:text-red-700`} />
                    </a>
                  )}
                </div>
              )}
            </div>
            {/* ✅ End Social Media Icons */}

            {/* 📝 Profile Details */}
            <div className='pt-4 sm:pt-6 md:pt-12 lg:pt-12 xl:pt-12 2xl:pt-12'>
              {/* 📛 Name & Role */}
              <div className='flex items-center gap-3'>
                <h1 className='text-2xl font-bold'>{profile.name}</h1>
                {profile.role?.trim() && (
                  <span className='flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600'>
                    🎓 {profile.role}
                  </span>
                )}
              </div>

              {/* 🧾 Short Description */}
              <p className='mt-2 text-base text-gray-700'>{profile.description}</p>

              {/* 🏢 Title & Location */}
              <div className='mt-3 space-y-1 text-sm text-gray-700'>
                <p className='flex items-center gap-2'>💼 {profile.title}</p>
                <p className='flex items-center gap-2'>📍 {profile.location}</p>
              </div>

              {/* 👥 Followers Count */}
              <p className='mt-2 text-sm font-bold text-gray-600'>{profile.followers} followers</p>

              {/* 🎯 Action Buttons & Skills */}
              <div className='mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                {/* 🔘 Buttons */}
                <div className='relative flex items-center justify-start gap-3 sm:justify-start'>
                  <button className='flex items-center gap-2 rounded-full border bg-gray-100 px-5 py-2 text-sm'>
                    👤 Following
                  </button>

                  <div className='relative'>
                    <button
                      className='rounded-full border bg-gray-100 px-4 py-2 text-sm'
                      onClick={() => setDropdownOpen(prev => !prev)}
                    >
                      ⋮
                    </button>

                    {isDropdownOpen && (
                      <div className='absolute left-full top-1.5 z-50 ml-1 w-48 rounded-md border bg-white shadow-lg'>
                        <button className='flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100'>
                          <HiOutlineBan className='h-5 w-5 text-red-500' />
                          Block User
                        </button>
                        <button className='flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100'>
                          <HiOutlineQuestionMarkCircle className='h-5 w-5 text-blue-500' />
                          Ask Question
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                {/* ✅ End Buttons */}

                {/* 🧠 Skills */}
                <div className='flex flex-wrap items-center gap-2'>
                  <span className='font-semibold text-gray-800'>Skills:</span>
                  {profile.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className='rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-gray-900'
                    >
                      {skill}
                    </span>
                  ))}
                  {profile.skills.length > 3 && (
                    <button
                      onClick={() => setIsSkillsPopupOpen(true)}
                      className='rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-gray-800'
                    >
                      +{profile.skills.length - 3} more
                    </button>
                  )}
                </div>
                {/* ✅ End Skills */}

                {/* 🔍 Skills Popup Modal */}
                {isSkillsPopupOpen && (
                  <div className='fixed inset-0 z-50  flex items-center justify-center bg-black/20 transition-all duration-300'>
                    <div className='animate-fade-in relative w-[90%] max-w-lg rounded-2xl bg-white p-6 shadow-2xl md:p-8'>
                      <button
                        onClick={() => setIsSkillsPopupOpen(false)}
                        className='absolute right-4 top-4 text-2xl text-gray-400 hover:text-gray-700 focus:outline-none'
                        aria-label='Close'
                      >
                        &times;
                      </button>

                      <h2 className='mb-5 border-b pb-2 text-xl font-bold text-gray-800'>
                        All Skills
                      </h2>

                      <div className='flex flex-wrap gap-3'>
                        {profile.skills.map((skill, index) => (
                          <span
                            key={index}
                            className='rounded-full bg-orange-200 px-4 py-1.5 text-sm font-medium text-gray-800 shadow-sm transition-colors duration-200 hover:bg-orange-300'
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* ✅ End Buttons & Skills */}
            </div>
            {/* ✅ End Profile Details */}
          </div>
          {/* ✅ End Profile Section */}
        </div>
        {/* ✅ End Profile Card */}
      </div>
      {/* 📝 About Me Section */}
      <div className='mx-auto mt-8 w-full max-w-5xl rounded-2xl bg-white p-6 shadow sm:p-8'>
        <h2 className='mb-4 text-2xl font-semibold text-gray-800'> This Is Me </h2>
        <p className='text-base leading-relaxed text-gray-700'> {mockProfile.aboutMe} </p>
      </div>
      {/* ✅ End Main Container */}

      {/* 📁 Tabbed Section for Projects / Achievements / Experience */}
      <div className='mx-auto mt-8 w-full max-w-5xl rounded-2xl bg-white p-6 shadow sm:p-8'>
      {/* 🧭 Tabs */}
      <div className='mb-6 flex gap-4'>
        {['Projects', 'Timeline', 'Impacts'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 📦 Tab Content */}
      <div className='mt-6 w-full gap-6'>
        {activeTab === 'Projects' && (
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
            {mockProjects.map(project => (
              <div
                key={project.id}
                className='rounded-2xl bg-white p-4 shadow-md transition hover:shadow-lg'
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className='mb-4 h-48 w-full rounded-xl object-cover'
                />
                <h3 className='text-md mb-3 font-semibold leading-snug text-blue-600'>
                  {project.title}
                </h3>
                <div className='flex items-center text-sm font-medium text-gray-700'>
                  <FaHandsClapping />
                  {project.claps} claps
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Timeline' && (
          <div className="relative px-6 py-10">
            {/* Timeline vertical line */}
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-300"></div>

            {[2022, 2016].map((year, i) => (
              <div key={year} className="relative pl-14 mb-12">
                {/* Year Label */}
                <div className="absolute -left-8 top-0 text-lg font-bold text-gray-700 bg-white px-2">
                  {year}
                </div>

                {/* Entries for the year */}
                {year === 2022 && (
                  <>
                    {/* Entry 3 */}
                    <div className="relative mb-10">
                      <div className="absolute -left-[72px] top-8 w-6 h-6 bg-black text-white rounded-full text-xs flex items-center justify-center font-bold shadow">
                        3
                      </div>
                      <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-2xl">
                        <div className="flex items-center mb-2">
                          <img src="/wooble-logo.png" alt="Wooble" className="w-10 h-10 mr-3 rounded" />
                          <div>
                            <p className="text-sm text-gray-500">Feb 22, 2022 - Ongoing</p>
                            <h4 className="text-lg font-semibold text-gray-900">Founder & CEO</h4>
                            <p className="text-sm text-gray-700">
                              Wooble Software Private Limited (wooble.io)
                            </p>
                          </div>
                        </div>
                        <span className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full mb-2">
                          Experience
                        </span>
                        <p className="text-sm text-gray-800">Execution and team building</p>
                      </div>
                    </div>

                    {/* Entry 2 */}
                    <div className="relative mb-10">
                      <div className="absolute -left-[72px] top-8 w-6 h-6 bg-black text-white rounded-full text-xs flex items-center justify-center font-bold shadow">
                        2
                      </div>
                      <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-2xl">
                        <div className="flex items-center mb-2">
                          <img src="/stanford-logo.png" alt="Stanford" className="w-10 h-10 mr-3 rounded" />
                          <div>
                            <p className="text-sm text-gray-500">Sep 12, 2022 - Sep 14, 2023</p>
                            <h4 className="text-lg font-semibold text-gray-900">Stanford University</h4>
                            <p className="text-sm text-gray-700">Masters</p>
                          </div>
                        </div>
                        <span className="inline-block bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full mb-2">
                          Education
                        </span>
                        <p className="text-sm text-gray-800">Executive MBA in Entrepreneurship</p>
                      </div>
                    </div>
                  </>
                )}

                {year === 2016 && (
                  <div className="relative mb-10">
                    <div className="absolute -left-[72px] top-8 w-6 h-6 bg-black text-white rounded-full text-xs flex items-center justify-center font-bold shadow">
                      1
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-2xl">
                      <div className="flex items-center mb-2">
                        <img src="/kiit-logo.png" alt="KIIT" className="w-10 h-10 mr-3 rounded" />
                        <div>
                          <p className="text-sm text-gray-500">Jul 18, 2016 - May 13, 2020</p>
                          <h4 className="text-lg font-semibold text-gray-900">KIIT University</h4>
                          <p className="text-sm text-gray-700">Bachelor in Technology</p>
                        </div>
                      </div>
                      <span className="inline-block bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full mb-2">
                        Education
                      </span>
                      <p className="text-sm text-gray-800">
                        Computer Science & Communication Engineering
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Impacts' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-6">
            {impactsData.map((impact, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200"
              >
                <div className="relative bg-gray-300 h-40 w-full">
                  <span className="absolute top-3 left-3 text-sm font-semibold text-gray-700 bg-white bg-opacity-70 px-2 py-1 rounded">
                    {impact.date}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{impact.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">Organized by {impact.organizer}</p>
                  <div className="flex justify-between text-sm text-gray-500 items-center">
                    <div className="flex items-center gap-1 text-amber-700">
                      <span className="material-symbols-outlined text-base"><MdGroups2 />              </span>
                      <span>{impact.attendees} Attendees</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-700">
                      <span className="material-symbols-outlined text-base"><FaLocationDot />              </span>
                      <span>{impact.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
export default Page;