'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/navbar';
import { Briefcase, List, LineChart, Plus, MapPin, Pencil } from 'lucide-react';
import FooterLinks from '@/components/footerlinks';
import MobileResponsiveNavbar from '@/components/mobileresponsivenavbar';
import ProjectsTab from '@/components/projectstab';
import AddSkills from '@/components/addskills';
// import TimelineTab from '@/components/timelinetab';
// import ImpactZoneTab from '@/components/impactzonestab';
import UrlInputModal from '@/components/urlinputmodal';
import Edityourprofile from '@/components/Edityourprofile';
import DescriptionCard from '@/components/DescriptionCard';
import SocialMediaIcons from '@/components/socialmediaicons';
import { FaGithub, FaGitlab, FaBitbucket, FaStackOverflow, FaCodepen, FaDev, FaMedium,
  FaDribbble, FaBehance, FaLinkedin, FaFacebook, FaInstagram, FaYoutube, FaReddit,
  FaDiscord, FaTelegram, FaWhatsapp, FaPinterest, FaTiktok, FaTwitter } from 'react-icons/fa';
import {
  SiHackerrank, SiLeetcode, SiCodeforces, SiReplit, SiHashnode, SiKaggle,
  SiProducthunt, SiIndiehackers, SiCodechef, SiThreads
} from 'react-icons/si';

const IconMap = {

  GitHub: FaGithub,
  GitLab: FaGitlab,
  Bitbucket: FaBitbucket,
  "Stack Overflow": FaStackOverflow,
  CodePen: FaCodepen,
  "Dev.to": FaDev,
  Medium: FaMedium,
  Dribbble: FaDribbble,
  Behance: FaBehance,
  LinkedIn: FaLinkedin,
  Twitter: FaTwitter,
  Facebook: FaFacebook,
  Instagram: FaInstagram,
  YouTube: FaYoutube,
  Reddit: FaReddit,
  Discord: FaDiscord,
  Telegram: FaTelegram,
  WhatsApp: FaWhatsapp,
  Pinterest: FaPinterest,
  TikTok: FaTiktok,

  HackerRank: SiHackerrank,
  LeetCode: SiLeetcode,
  Codeforces: SiCodeforces,
  Replit: SiReplit,
  Hashnode: SiHashnode,
  Kaggle: SiKaggle,
  "Product Hunt": SiProducthunt,
  IndieHackers: SiIndiehackers,
  CodeChef: SiCodechef,
  Threads: SiThreads,

  Briefcase,
  List,
  LineChart,
  Plus,
  MapPin,
  Pencil
};


export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('Projects');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
  const [isDescriptionEditOpen, setIsDescriptionEditOpen] = useState(false);
  const [descriptionInput, setDescriptionInput] = useState('');
  const [socialLinks, setSocialLinks] = useState<{ platform: string; url: string; show: boolean }[]>([]);
  const [isSocialMediaModalOpen, setIsSocialMediaModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [showAddSkills, setShowAddSkills] = useState(false);
  const [savedSkills, setSavedSkills] = useState<{ skill: string; source: string }[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("accountPageSkills");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });


  const [profileData, setProfileData] = useState({
    name: 'Murala Omkar',
    description: 'Passionate web developer eager to level up and build applications that address current market issues and challenges.',
    company: 'Wooble.io',
    location: 'Bhubaneshwar, Odisha, India',
    about: 'Be real—share your journey, your passions, and the moments that define you. Your unique story sparks genuine connections!',
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024); // Mobile size threshold
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const savedImage = localStorage.getItem('profileCoverImage');
    if (savedImage) {
      setImageUrl(savedImage);
    }
  }, []);

  useEffect(() => {
    const savedLinks = localStorage.getItem('socialLinks');
    if (savedLinks) {
      const parsedLinks = JSON.parse(savedLinks);
      // Ensure every link has the 'show' property
      const linksWithShow = parsedLinks.map((link: { platform: string; url: string; show: boolean }) => ({
        ...link,
        show: true,  // Add 'show' property here
      }));
      setSocialLinks(linksWithShow);
    }
  }, []);

////////////////////////////////////
  const handleSaveSkills = (skills: { skill: string; source: string }[]) => {
    setSavedSkills(skills);
    localStorage.setItem("accountPageSkills", JSON.stringify(skills));
    setShowAddSkills(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("accountPageSkills", JSON.stringify(savedSkills));
    }
  }, [savedSkills]);

  useEffect(() => {
    const storedSkills = localStorage.getItem("accountPageSkills");
    if (storedSkills) {
      setSavedSkills(JSON.parse(storedSkills));
    }
  }, []);

  //////////////////////////
  

  const handleSaveUrl = (url: string | File | null) => {
    if (url === null) {
      setImageUrl(null);
      localStorage.removeItem('profileCoverImage');
    } else if (typeof url === 'string') {
      setImageUrl(url);
      localStorage.setItem('profileCoverImage', url);
    } else {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const scale = Math.min(800 / img.width, 800 / img.height, 1); 
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;
  
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7); 
            setImageUrl(compressedBase64);
            localStorage.setItem('profileCoverImage', compressedBase64);
          }
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(url);
    }
  };

  const handleSaveSocialLinks = (updatedLinks: Record<string, string>) => {
    // Map only the links you want to display
    const formattedLinks = Object.entries(updatedLinks).map(([platform, url]) => ({
      platform,
      url,
      show: false,  // Always true because the onSave only passes shown links
    }));
  

    const uniqueLinksMap = new Map<string, { platform: string; url: string; show: boolean }>();
  
    [...socialLinks, ...formattedLinks].forEach(link => {
    
      if (uniqueLinksMap.has(link.platform)) {
        const existing = uniqueLinksMap.get(link.platform)!;
        uniqueLinksMap.set(link.platform, { ...existing, url: link.url });
      } else {
        uniqueLinksMap.set(link.platform, link);
      }
    });
  
    const uniqueLinks = Array.from(uniqueLinksMap.values());
  
    setSocialLinks(uniqueLinks);
    localStorage.setItem('socialLinks', JSON.stringify(uniqueLinks));
    setIsSocialMediaModalOpen(false);
  };
  

  const handleToggleShow = (platform: string) => {
    const updatedLinks = socialLinks.map(link =>
      link.platform === platform ? { ...link, show: !link.show } : link
    );
    setSocialLinks(updatedLinks);
    localStorage.setItem('socialLinks', JSON.stringify(updatedLinks));
  };
  
  useEffect(() => {
    const savedDescription = localStorage.getItem('userDescription');
    if (savedDescription) {
      setDescriptionInput(savedDescription);
      setProfileData((prev) => ({ ...prev, about: savedDescription }));
    }
  }, []);

  const handleDescriptionSubmit = (newDescription: string) => {
    localStorage.setItem('userDescription', newDescription);
    setDescriptionInput(newDescription);
    setProfileData((prev) => ({ ...prev, about: newDescription }));
  };

  const tabs = [
    { name: 'Projects', icon: <Briefcase className="w-5 h-5 mr-2" /> },
    { name: 'Timeline', icon: <List className="w-5 h-5 mr-2" /> },
    { name: 'Impact Zone', icon: <LineChart className="w-5 h-5 mr-2" /> },
  ];


  

  if (isMobile === null) return null; 

  return (
    <div className="min-h-screen bg-gray-100">
      {/* <Navbar /> */}
      <div className="max-w-6xl mx-auto mt-4 space-y-6 px-4 sm:px-6 md:px-8">
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div
            className="h-70 bg-gradient-to-r from-orange-200 via-yellow-300 to-blue-400 relative cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Custom background"
                className="h-full w-full "
              />
            )}
          </div>
  
          <div className="relative px-6 pb-6">
            <div className="absolute -top-20 left-6 w-34 h-34 rounded-full bg-[#6154A4] border-4 border-white shadow-md flex items-center justify-center text-white text-4xl font-medium">
              M
            </div>


            {/* plus - 1 */}
            <div className="absolute right-3 mt-5 top-0 flex items-center space-x-2">
              {socialLinks
                .filter(link => link.show)
                .map((link, index) => {
                  const IconComponent = IconMap[link.platform as keyof typeof IconMap];
                  return (
                    <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800" title={link.platform}>
                      {IconComponent && <IconComponent className="w-5 h-5" />}
                    </a>
                  );
                })}
              <button
                className="text-blue-500 hover:text-blue-700 transition font-bold"
                onClick={() => setIsSocialMediaModalOpen(true)}
              >
                <Plus className="w-4.5 h-4.5 stroke-[6]" />
              </button>
            </div>

            {isSocialMediaModalOpen && (
              <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/40 bg-opacity-50">
                <div className="bg-white rounded-lg shadow-md max-w-md w-full p-4">
                  <SocialMediaIcons
                    showCard={isSocialMediaModalOpen}
                    setShowCard={setIsSocialMediaModalOpen}
                    onSave={handleSaveSocialLinks}
                    onToggleShow={handleToggleShow}
                    existingLinks={socialLinks}
                  />
                </div>
              </div>
            )}

  
            <div className="pt-16">
              <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 flex items-center gap-2">
                {profileData.name}
                <button
                  className="text-gray-500 hover:text-gray-700 transition"
                  onClick={() => setIsProfileEditOpen(true)}
                >
                  <Pencil className="w-4 h-4" />
                </button>
              </h1>
  
              <p className="text-gray-700 mt-1">{profileData.description}</p>
  
              <div className="flex items-center gap-2 mt-4 text-sm text-gray-700">
                <Briefcase className="w-4 h-4 text-gray-700" />
                <span className="font-medium">{profileData.company}</span>
              </div>
  
              <div className="flex items-center gap-2 text-sm mt-2 text-gray-700">
                <MapPin className="w-4 h-4 text-gray-700" />
                <span className="font-medium">{profileData.location}</span>
              </div>
  
              <div className="mt-8 flex gap-3">
                <button className="flex items-center gap-2 px-5 py-2 bg-black text-white rounded-full shadow hover:opacity-90 transition">
                  Follow
                </button>
                <button className="border border-black text-black px-5 py-2 rounded-full hover:bg-gray-100 transition">
                  Ask Question
                </button>
              </div>
            </div>
  
            {/* plus -2 */}
            <div className='flex justify-end'>
            <div className="flex justify-between items-start mt-4 text-sm text-gray-700">
              <div className="flex items-center mr-2 gap-2 flex-shrink-0">
                <span className="font-semibold ml-6">Skills</span>
              </div>

              <div className="flex-1 min-w-0 mx-4">
                {savedSkills.length === 0 ? (
                  <span className="text-gray-400">No skills available</span>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {savedSkills.map((item, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 border border-blue-200 rounded-full px-3 py-1 text-sm whitespace-nowrap"
                      >
                        {item.skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <button
                className="text-blue-500 hover:text-blue-700 transition font-bold flex-shrink-0"
                onClick={() => setShowAddSkills(true)}
              >
                <Plus className="w-4.5 h-4.5 stroke-[6]" />
              </button>
            </div>
            </div>

            {showAddSkills && (
              <AddSkills
                handleClose={() => setShowAddSkills(false)}
                onSaveSkills={handleSaveSkills}
              />
            )}
          </div>
        </div>
  
        {/* Description Display Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">This is me</h2>
            <p className="text-gray-700 mt-1">{profileData.about}</p>
          </div>
          <button
            className="text-gray-700 hover:text-gray-900 transition"
            onClick={() => {
              setDescriptionInput(profileData.about);
              setIsDescriptionEditOpen(true);
            }}
          >
            <Pencil className="w-4 h-4" />
          </button>
        </div>
  
        {/* Tabs Section */}
        <div className="bg-white shadow-md rounded-3xl p-6 w-full overflow-hidden">
          {/* Scrollable Tabs Container */}
          <div
            className="flex overflow-x-auto space-x-4 scrollbar-hide"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex-shrink-0 flex items-center px-6 py-3 font-semibold rounded-lg transition whitespace-nowrap ${
                  activeTab === tab.name
                    ? 'bg-gradient-to-r from-teal-400 to-blue-500 text-white'
                    : 'text-gray-700 bg-gray-100'
                }`}
              >
                {tab.icon}
                <span className="ml-2">{tab.name.toUpperCase()}</span>
              </button>
            ))}
          </div>

          {/* ////////////////////////////////// */}
  
          {/* Tab Content */}
          <div className="mt-8 text-lg text-gray-700 w-full">
            {activeTab === 'Projects' && <ProjectsTab />}
            {/* {activeTab === 'Timeline' && <TimelineTab />} */}
            {/* {activeTab === 'Impact Zone' && <ImpactZoneTab />} */}
          </div>
        </div>
                {/* /////////////////////////////////// */}
        <div className="mt-40">
          <FooterLinks />
        </div>
  
          {/* Modals */}
          {isModalOpen && (
            <UrlInputModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSave={handleSaveUrl}
            />
          )}
          {isProfileEditOpen && (
          <Edityourprofile
            currentValues={profileData}
            onClose={() => setIsProfileEditOpen(false)}
            onSave={(updatedData) => {
              setProfileData(prev => ({
                ...prev,
                name: updatedData.name,
                company: updatedData.company,
                description: updatedData.description,
                location: updatedData.location
              }));
              setIsProfileEditOpen(false);
            }}
          />
        )}
        {/* Conditional rendering of AddSkills */}
        {isDescriptionEditOpen && (
          <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
            <DescriptionCard
              description={profileData.about}
              onClose={() => setIsDescriptionEditOpen(false)}
              onSubmit={(newDescription) => {
                setProfileData(prev => ({
                  ...prev,
                  about: newDescription // <-- only updates the "This is me" text
                }));
                setIsDescriptionEditOpen(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  ); 
}
