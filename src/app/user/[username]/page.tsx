'use client';

// import Navbar from '@/components/navbar';
const Navbar = React.lazy(() => import('@/components/navbar'));
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
import { useState, useRef, useEffect } from 'react';
import { HiOutlineBan, HiOutlineQuestionMarkCircle } from 'react-icons/hi';
import { FaHandsClapping } from 'react-icons/fa6';
import { FaLocationDot } from 'react-icons/fa6';
import { MdGroups2 } from 'react-icons/md';

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
  description: 'Co-Founder and product leader driving startup success through engineering excellence and vibrant community engagement.',
  title: 'Co-Founder @ Infomatic Labs || Founding Eng @ Figgus78 || Product & Eng Manager @ Let\'s Code || FS Dev Intern @ Wooble || Ex-Intern @ Let\'s Code, Leoland, Vyomni',
  location: 'Bhubaneshwar, India',
  followers: 120859,
  bannerImage: '/banner.jpeg',
  profileImage: '/murala omkar profile image.jpeg',
  skills: [
    'Startup Strategy',
    'Fundraising',
    'Pitching to Investors',
    'Product Management',
    'Product-Led Growth',
    'Team Leadership',
    'Community Building',
    'Public Speaking',
    'Agile Methodologies',
    'Full Stack Web Development',
    'React.js',
    'Node.js',
    'REST APIs',
    'Git & GitHub',
    'MongoDB',
    'Cloud Hosting (Vercel/Netlify)',
    'Developer Relations (DevRel)'
  ],  
  aboutMe: `I’m Murala Omkar — a visionary product leader and passionate co-founder dedicated to empowering startups and developers worldwide. With a rare blend of engineering mastery and community-driven leadership, I drive innovation and growth by turning bold ideas into impactful products. My journey spans building high-performing teams, leading product strategies, and fostering thriving tech communities — all fueled by a relentless commitment to excellence and collaboration. Whether it’s fundraising, pitching to investors, or scaling product-led growth, I bring clarity, energy, and results to every challenge. Based in Bhubaneshwar, India, I’m on a mission to inspire, connect, and elevate the next wave of tech leaders.`,
  socials: {
    twitter: 'https://twitter.com/omkarmurala',
    linkedin: 'https://linkedin.com/in/omkarmurala',
    github: 'https://github.com/omkarmurala',
    instagram: 'https://instagram.com/omkarmurala',
    facebook: 'https://facebook.com/omkarmurala',
    youtube: 'https://youtube.com/omkarmurala',
  },
};

const mockProjects = [
  {
    id: 1,
    image: '/nexus.png',
    title: 'Wooble Nexus Podcast - Connecting industry experts',
    claps: 47,
  },
  {
    id: 2,
    image: '/ai image of project.jpeg',
    title: 'AI & Innovation - Journey of Modern Tech',
    claps: 32,
  },
  {
    id: 3,
    image: '/img02.jpg',
    title: 'Building Scalable Communities',
    claps: 54,
  },
  {
    id: 4,
    image: '/startup mentorship.jpg',
    title: 'Startup Growth and Mentorship',
    claps: 28,
  },
  {
    id: 5,
    image: '/ProductDevelopment.png',
    title: 'Decoding Product Development',
    claps: 67,
  },
  {
    id: 6,
    image: '/techleadership.jpeg',
    title: 'Tech Leadership Insights',
    claps: 38,
  },
];

export const timeline = [
  {
    id: 12,
    year: 2025,
    dateRange: '2025 - Present',
    title: 'Full Stack Developer Intern',
    organization: 'WOOBLE',
    logo: '/wooble_logo_mini.png',
    type: 'Experience',
    typeColor: 'gray',
    description: 'Wooble is a career acceleration platform empowering students and early professionals to build proof-of-work portfolios through real-world challenges and mentorship.',
  },
  {
    id: 11,
    year: 2025,
    dateRange: '2025 - Present',
    title: 'Figgus78',
    organization: 'Founding Engineer',
    logo: '/figgus.png',
    type: 'Experience',
    typeColor: 'gray',
    description: 'Leading engineering at a healthcare startup creating doctor-backed solutions for men’s sexual wellness.',
  },
  {
    id: 10,
    year: 2024,
    dateRange: '2024',
    title: 'Leoland',
    organization: 'Full Stack Developer Intern',
    logo: '/logo.png',
    type: 'Experience',
    typeColor: 'gray',
    description: 'Contributed to full-stack development projects, enhancing web applications using modern frameworks and best practices.',
  },
  {
    id: 9,
    year: 2023,
    dateRange: '2023',
    title: 'Let\'s Code',
    organization: 'Full Stack Developer Intern',
    logo: '/lets code.webp',
    type: 'Experience',
    typeColor: 'gray',
    description: 'Developed full-stack features for edtech web apps using React and Node.js.',
  },
  {
    id: 8,
    year: 2023,
    dateRange: '2023',
    title: 'Vyomni LLC',
    organization: 'Web Developer',
    logo: '/saciva.png',
    type: 'Experience',
    typeColor: 'gray',
    description: 'Empowering students to connect, collaborate, and grow through a safe, vibrant, and purpose-driven community platform.',
  },
  {
    id: 7,
    year: 2023,
    dateRange: '2023 - Present',
    title: 'Let\'s Code',
    organization: 'Product & Engineering Manager',
    logo: '/lets code.webp',
    type: 'Experience',
    typeColor: 'gray',
    description: 'Leading cross-functional teams to deliver scalable tech solutions and edtech products.',
  },
  {
    id: 6,
    year: 2022,
    dateRange: '2022 - 2025',
    title: 'C. V. Raman Global University',
    organization: 'B.Tech in Computer Science & Information Technology',
    logo: '/global.jpeg',
    type: 'Education',
    typeColor: 'blue-200',
    description: 'Pursued B.Tech in CSE & IT with a focus on full-stack development and product innovation.',
  },
  {
    id: 5,
    year: 2022,
    dateRange: '2022',
    title: 'India Skills — National Level Medalist',
    organization: 'India Skill Competition',
    logo: '/world skills.jpg',
    type: 'Certification',
    typeColor: 'gray',
    description: 'Represented Odisha at the national level in India Skills competition under the ("IT Software Solutions & Business")  category.',
  },
  {
    id: 4,
    year: 2021,
    dateRange: '2021',
    title: 'India Skills — Regional Level silver medalist',
    organization: 'Odisha Skill Competition',
    logo: '/india skills.png',
    type: 'Certification',
    typeColor: 'gray',
    description: 'Awarded for outstanding performance in ("IT Software Solutions & Business") at the state-level skills competition.',
  },
  {
    id: 3,
    year: 2021,
    dateRange: '2021',
    title: 'Odisha Skills — State level Silver Medalist',
    organization: 'Odisha Skill Competition',
    logo: '/skilled in odisha.jpeg',
    type: 'Certification',
    typeColor: 'gray',
    description: 'Recognized as one of the top finalists in the state-wide Odisha Skills competition for ("IT Software Solutions & Business").',
  },
  {
    id: 2,
    year: 2021,
    dateRange: '2021 - Present',
    title: 'Infomatic Labs',
    organization: 'Co-Founder & Product Leader',
    logo: '/infomatic labs.png',
    type: 'Experience',
    typeColor: 'gray',
    description: 'Building B2B SaaS products and empowering students through tech-driven project solutions in their careers.',
  },
  {
    id: 1,
    year: 2019,
    dateRange: '2019 - 2022',
    title: 'C. V Raman Polytechnic',
    organization: 'Diploma in Computer Science Engineering',
    logo: '/images.jpeg',
    type: 'Education',
    typeColor: 'blue-200',
    description: 'Completed Diploma in Computer Science Engineering with strong fundamentals in software development.',
  }
];

const groupedTimeline = timeline.reduce((acc: Record<number, typeof timeline>, item) => {
  if (!acc[item.year]) {
    acc[item.year] = [];
  }
  acc[item.year].push(item);
  return acc;
}, {});

const sortedYears = Object.keys(groupedTimeline)
  .map(Number)
  .sort((a, b) => b - a);

const impactsData = [
  {
    date: '4 May 2025',
    image: '/great impact-1.jpeg',
    organizer: 'Sexuloon',
    attendees: 25,
    location: 'Chennai',
  },
  {
    date: '12 May 2025',
    image: '/impact-2.jpeg',
    organizer: 'wooble',
    attendees: 15,
    location: 'Bhubaneshwar',
  },
  {
    date: '5 May 2025',
    image: '/impact-3.jpeg',
    organizer: 'Informatic labs',
    attendees: 6,
    location: 'India',
  },
  {
    date: '5 May 2025',
    image: '/impact-4.jpg',
    organizer: 'Lets Code',
    attendees: 10,
    location: 'Delhi',
  },
];

function Page() {
  const profile = mockProfile;
  const socialCount = Object.values(profile.socials || {}).filter(Boolean).length;
  const iconSizeClass = socialCount <= 3 ? 'w-8 h-8' : 'w-5 h-5';

  // 🧭 State and ref for dropdown men
  const [isSkillsPopupOpen, setIsSkillsPopupOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Projects');
  // follow and unfollow button const
  const [isFollowing, setIsFollowing] = useState(false);
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
    <div className='min-h-screen bg-gray-100 '>
      {/* 🧭 Navigation Bar */}
      <React.Suspense fallback={null}>
        <Navbar />
      </React.Suspense>

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
                  {/* Follow/Following Button */}
                  <button
                    className={`flex items-center gap-2 rounded-full border px-5 py-2 text-sm transition-all duration-200 ${
                      isFollowing ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'
                    }`}
                    onClick={() => setIsFollowing(prev => !prev)}
                  >
                    {isFollowing ? '✅ Following' : '👤 Follow'}
                  </button>

                  {/* Dropdown */}
                  <div className='relative'>
                    <button
                      className='rounded-full border bg-gray-100 px-4 py-2 text-sm'
                      onClick={() => setDropdownOpen(prev => !prev)}
                    >
                      ⋮
                    </button>

                    {isDropdownOpen && (
                      <div className='absolute left-full top-1.5 z-50 ml-1 
                      w-40 sm:w-44 md:w-48 lg:w-52 xl:w-56 2xl:w-60 
                      max-w-[90vw]
                      rounded-md border bg-white shadow-lg'>
                        <button className='flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100'>
                          <HiOutlineBan className='h-5 w-5 text-red-500' />
                          Block User
                        </button>
                        <button className='flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100'>
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

        {/* 📦 Tab Content start of projects */}
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

          {/* 📅 Timeline Section */}

          {activeTab === 'Timeline' && (
            <div className='relative px-4 py-10 sm:px-6 md:px-8 lg:px-10 xl:px-16 2xl:px-20'>
              {/* Timeline vertical line */}
              <div className='absolute left-6 sm:left-8 md:left-10 lg:left-[2.75rem] xl:left-[3rem] 2xl:left-[3.5rem] top-0 bottom-0 w-0.5 bg-gray-300'></div>

              {sortedYears.map((year) => (
                <div key={year} className='relative mb-12 pl-12 sm:pl-16 md:pl-20 lg:pl-24'>
                  {/* Year Label */}
                  <div className='absolute -left-3 top-0 bg-white px-2 text-base font-bold text-gray-700 sm:-left-6 sm:text-lg'>
                    {year}
                  </div>

                  {/* Entries for the year */}
                  {groupedTimeline[year].map((entry) => (
                    <div key={entry.id} className='relative mb-10'>
                      {/* Dot with ID */}
                      <div className='absolute top-8 -left-10 sm:-left-14 md:-left-18 lg:-left-[5.75rem] xl:-left-[7rem] 2xl:-left-[7.5rem]
                                  -translate-x-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-black text-xs font-bold text-white shadow'
                      >
                        {entry.id}
                      </div>
                      {/* Card */}
                      <div className='w-full rounded-xl bg-white p-4 shadow-md sm:max-w-full md:max-w-2xl'>
                        <div className='mb-2 flex flex-col sm:flex-row sm:items-center sm:gap-4'>
                          {/* Logo */}
                          <img
                            src={entry.logo}
                            alt={entry.title}
                            className='mb-2 h-20 w-auto rounded object-contain sm:mb-0 sm:h-16 sm:w-28'
                          />
                          {/* Text Info */}
                          <div className='flex-1'>
                            <p className='text-xs text-gray-500 sm:text-sm'>{entry.dateRange}</p>
                            <h4 className='text-base font-semibold text-gray-900 sm:text-lg'>
                              {entry.title}
                            </h4>
                            <p className='text-sm text-gray-700'>{entry.organization}</p>
                          </div>
                        </div>

                        {/* Type Badge + Description */}
                        <div className='mt-2 space-y-1 sm:ml-0 pl-2 md:pl-32'>
                          <span
                            className={`inline-block rounded-full px-2 py-1 text-xs ${
                              entry.typeColor === 'red'
                                ? 'bg-red-100 text-red-600'
                                : entry.typeColor === 'blue-200'
                                ? 'bg-blue-200 text-blue-800'
                                : 'bg-gray-300 text-gray-800'
                            }`}
                          >
                            {entry.type}
                          </span>
                          <p className='text-sm text-gray-800'>{entry.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* start of impacts */}

          {activeTab === 'Impacts' && (
            <div className='grid grid-cols-1 gap-6 px-4 py-6 sm:grid-cols-2 lg:grid-cols-3'>
              {impactsData.map((impact, index) => (
                <div
                  key={index}
                  className='overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md'
                >
                  {/* 🖼️ Image section */}
                  <div className='relative h-40 w-full'>
                    <Image
                      src={impact.image}
                      alt='Impact event'
                      fill
                      className='object-cover'
                    />
                    <span className='absolute left-3 top-3 rounded bg-white bg-opacity-70 px-2 py-1 text-sm font-semibold text-gray-700'>
                      {impact.date}
                    </span>
                  </div>

                  {/* 📋 Details */}
                  <div className='p-4'>
                    <p className='mb-3 text-sm text-gray-600'>Organized by {impact.organizer}</p>
                    <div className='flex items-center justify-between text-sm text-gray-500'>
                      <div className='flex items-center gap-1 text-amber-700'>
                        <MdGroups2 className='text-base' />
                        <span>{impact.attendees} Attendees</span>
                      </div>
                      <div className='flex items-center gap-1 text-amber-700'>
                        <FaLocationDot className='text-base' />
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

