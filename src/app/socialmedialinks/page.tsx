'use client'

import React, { useState } from 'react';
import { 
  FaGithub, FaGitlab, FaBitbucket, FaStackOverflow, FaCodepen, FaDev, FaMedium,
  FaDribbble, FaBehance, FaLinkedin, FaFacebook, FaInstagram, FaYoutube, FaReddit,
  FaDiscord, FaTelegram, FaWhatsapp, FaPinterest, FaTiktok, FaTwitter
} from 'react-icons/fa';
import {
  SiHackerrank, SiLeetcode, SiCodeforces, SiReplit, SiHashnode, SiKaggle,
  SiProducthunt, SiIndiehackers, SiCodechef, SiThreads
} from 'react-icons/si';

const IconMap = {
  GitHub: FaGithub,
  GitLab: FaGitlab,
  Bitbucket: FaBitbucket,
  "Stack Overflow": FaStackOverflow,
  HackerRank: SiHackerrank,
  LeetCode: SiLeetcode,
  Codeforces: SiCodeforces,
  CodePen: FaCodepen,
  Replit: SiReplit,
  "Dev.to": FaDev,
  Hashnode: SiHashnode,
  Medium: FaMedium,
  Kaggle: SiKaggle,
  Dribbble: FaDribbble,
  Behance: FaBehance,
  "Product Hunt": SiProducthunt,
  IndieHackers: SiIndiehackers,
  CodeChef: SiCodechef,
  LinkedIn: FaLinkedin,
  "Twitter / X": FaTwitter,
  Facebook: FaFacebook,
  Instagram: FaInstagram,
  YouTube: FaYoutube,
  Reddit: FaReddit,
  Discord: FaDiscord,
  Telegram: FaTelegram,
  WhatsApp: FaWhatsapp,
  Threads: SiThreads,
  Pinterest: FaPinterest,
  TikTok: FaTiktok,
} as const;

type SocialPlatform = keyof typeof IconMap;

type SocialLink = {
  platform: SocialPlatform;
  url: string;
  show: boolean;
};

export default function SocialMediaLinksPage() {
  const [links, setLinks] = useState<SocialLink[]>([]);

  const addLink = () => {
    const platformList = Object.keys(IconMap) as SocialPlatform[];
    const nextPlatform = platformList.find(
      (p) => !links.some((l) => l.platform === p)
    );
    if (nextPlatform) {
      setLinks([...links, { platform: nextPlatform, url: '', show: true }]);
    }
  };

  const updateUrl = (index: number, newUrl: string) => {
    const updated = [...links];
    updated[index].url = newUrl;
    setLinks(updated);
  };

  const toggleShow = (index: number) => {
    const updated = [...links];
    updated[index].show = !updated[index].show;
    setLinks(updated);
  };

  const removeLink = (index: number) => {
    const updated = [...links];
    updated.splice(index, 1);
    setLinks(updated);
  };

  const saveLinks = () => {
    console.log('Saved Links:', links);
    alert('Links saved to console log!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-2xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Social Media Links</h2>

        {links.map((link, index) => {
          const IconComponent = IconMap[link.platform];
          return (
            <div
              key={index}
              className="flex items-center gap-3 mb-4 border p-3 rounded-md bg-gray-50"
            >
              <IconComponent className="text-2xl text-blue-600" />
              <input
                type="text"
                value={link.url}
                onChange={(e) => updateUrl(index, e.target.value)}
                placeholder={`Enter ${link.platform} URL`}
                className="flex-grow p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={link.show}
                  onChange={() => toggleShow(index)}
                  className="hidden"
                />
                <div
                  className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 duration-300 ${
                    link.show ? 'bg-blue-500' : ''
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                      link.show ? 'translate-x-5' : ''
                    }`}
                  />
                </div>
              </label>
              <button
                onClick={() => removeLink(index)}
                className="text-red-500 hover:text-red-700 text-lg font-bold"
              >
                ×
              </button>
            </div>
          );
        })}

        <button
          onClick={addLink}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mb-4"
        >
          Add New Social Media Link
        </button>

        <button
          onClick={saveLinks}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
        >
          Save Links
        </button>
      </div>
    </div>
  );
}
