'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/navbar';
import { Briefcase, List, LineChart, Plus, MapPin, Pencil } from 'lucide-react';
import FooterLinks from '@/components/footerlinks';
import ProjectsTab from '@/components/projectstab';
import TimelineTab from '@/components/timelinetab';
import ImpactZoneTab from '@/components/impactzonestab';
import UrlInputModal from '@/components/urlinputmodal';
import Edityourprofile from '@/components/Edityourprofile';
import DescriptionCard from '@/components/DescriptionCard';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('Projects');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
  const [isDescriptionEditOpen, setIsDescriptionEditOpen] = useState(false);
  const [descriptionInput, setDescriptionInput] = useState('');

  useEffect(() => {
    const savedImage = localStorage.getItem('profileCoverImage');
    if (savedImage) {
      setImageUrl(savedImage);
    }
  }, []);

  const [profileData, setProfileData] = useState({
    name: 'Murala Omkar',
    description: 'Passionate web developer eager to level up and build applications that address current market issues and challenges.',
    company: 'Wooble.io',
    location: 'Bhubaneshwar, Odisha, India',
    about: 'Be real—share your journey, your passions, and the moments that define you. Your unique story sparks genuine connections!',
  });

  useEffect(() => {
    // Load description from localStorage if it exists
    const savedDescription = localStorage.getItem('userDescription');
    if (savedDescription) {
      setDescriptionInput(savedDescription);
      setProfileData((prev) => ({ ...prev, about: savedDescription }));
    }
  }, []);

  const handleDescriptionSubmit = (newDescription: string) => {
    // Save the updated description in localStorage
    localStorage.setItem('userDescription', newDescription);
    setDescriptionInput(newDescription);
    setProfileData((prev) => ({ ...prev, about: newDescription }));
  };

  const tabs = [
    { name: 'Projects', icon: <Briefcase className="w-5 h-5 mr-2" /> },
    { name: 'Timeline', icon: <List className="w-5 h-5 mr-2" /> },
    { name: 'Impact Zone', icon: <LineChart className="w-5 h-5 mr-2" /> },
  ];

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
        const base64Url = reader.result as string;
        setImageUrl(base64Url);
        localStorage.setItem('profileCoverImage', base64Url);
      };
      reader.readAsDataURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-6xl mx-auto mt-4 space-y-6">

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
                className="h-full w-full"
              />
            )}
          </div>

          <div className="relative px-6 pb-6">
            <div className="absolute -top-20 left-6 w-34 h-34 rounded-full bg-[#6154A4] border-4 border-white shadow-md flex items-center justify-center text-white text-4xl font-medium">
              M
            </div>
              {/* plus - 1 */}
            <div className="absolute right-3 mt-5 top-0 cursor-pointer">
              <button className="text-blue-500 hover:text-blue-700 transition font-bold">
                <Plus className="w-4.5 h-4.5 stroke-[6]" />
              </button>
            </div>

            <div className="pt-16">
              <h1 className="text-4xl font-semibold text-gray-900 flex items-center gap-2">
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
            <div className="flex justify-end mt-4 text-sm text-gray-700 items-center gap-2">
              <span className="font-semibold">Skills</span>
              <span className="text-gray-400">No skills available</span>
              <button className="text-blue-500 hover:text-blue-700 transition font-bold">
                <Plus className="w-4.5 h-4.5 stroke-[6]" />
              </button>
            </div>
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
        <div className="bg-white shadow-md rounded-3xl p-6">
          <div className="flex space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center px-6 py-3 font-semibold rounded-lg transition ${
                  activeTab === tab.name
                    ? 'bg-gradient-to-r from-teal-400 to-blue-500 text-white'
                    : 'text-gray-700'
                }`}
              >
                {tab.icon}
                {tab.name.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="mt-8 text-lg text-gray-700">
            {activeTab === 'Projects' && <ProjectsTab />}
            {activeTab === 'Timeline' && <TimelineTab />}
            {activeTab === 'Impact Zone' && <ImpactZoneTab />}
          </div>
        </div>
      </div>

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
          onClose={() => setIsProfileEditOpen(false)}
          currentValues={profileData}
          onSave={(updatedData) => {
            setProfileData({
              ...updatedData,
              about: updatedData.description || '',
            });
            setIsProfileEditOpen(false);
          }}
        />
      )}

      {isDescriptionEditOpen && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
          <DescriptionCard
            description={descriptionInput}
            onClose={() => setIsDescriptionEditOpen(false)}
            onSubmit={(newDescription) => {
              setProfileData((prev) => ({ ...prev, about: newDescription }));
              setIsDescriptionEditOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
