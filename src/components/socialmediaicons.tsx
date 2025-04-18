'use client'

import React, { useState, useEffect } from 'react';
import {
  FaGithub, FaGitlab, FaBitbucket, FaStackOverflow, FaCodepen, FaDev, FaMedium,
  FaDribbble, FaBehance, FaLinkedin, FaFacebook, FaInstagram, FaYoutube, FaReddit,
  FaDiscord, FaTelegram, FaWhatsapp, FaPinterest, FaTiktok, FaTwitter
} from 'react-icons/fa';
import {
  SiHackerrank, SiLeetcode, SiCodeforces, SiReplit, SiHashnode, SiKaggle,
  SiProducthunt, SiIndiehackers, SiCodechef, SiThreads
} from 'react-icons/si';

const DomainToPlatform: Record<string, keyof typeof IconMap> = {
  'github.com': 'GitHub',
  'gitlab.com': 'GitLab',
  'bitbucket.org': 'Bitbucket',
  'stackoverflow.com': 'Stack Overflow',
  'hackerrank.com': 'HackerRank',
  'leetcode.com': 'LeetCode',
  'codeforces.com': 'Codeforces',
  'codepen.io': 'CodePen',
  'replit.com': 'Replit',
  'dev.to': 'Dev.to',
  'hashnode.com': 'Hashnode',
  'medium.com': 'Medium',
  'kaggle.com': 'Kaggle',
  'dribbble.com': 'Dribbble',
  'behance.net': 'Behance',
  'producthunt.com': 'Product Hunt',
  'indiehackers.com': 'IndieHackers',
  'codechef.com': 'CodeChef',
  'linkedin.com': 'LinkedIn',
  'x.com': 'Twitter / X',
  'twitter.com': 'Twitter / X',
  'facebook.com': 'Facebook',
  'instagram.com': 'Instagram',
  'youtube.com': 'YouTube',
  'reddit.com': 'Reddit',
  'discord.com': 'Discord',
  'telegram.me': 'Telegram',
  't.me': 'Telegram',
  'whatsapp.com': 'WhatsApp',
  'threads.net': 'Threads',
  'pinterest.com': 'Pinterest',
  'tiktok.com': 'TikTok',
};

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
  platform: SocialPlatform | null;
  url: string;
  show: boolean;
};

interface SocialMediaIconsProps {
  showCard: boolean;
  setShowCard: React.Dispatch<React.SetStateAction<boolean>>;
  onSave: (updatedLinks: Record<string, string>) => void; // <- Add this
}

const SocialMediaIcons: React.FC<SocialMediaIconsProps> = ({ showCard, setShowCard, onSave } ) => {
  const [links, setLinks] = useState<SocialLink[]>([]);

  // Load links from localStorage
  useEffect(() => {
    const savedLinks = localStorage.getItem('socialLinks');
    if (savedLinks) {
      setLinks(JSON.parse(savedLinks));
    } else {
      setLinks([{ platform: null, url: '', show: true }]); // Default empty link if nothing is saved
    }
  }, []);

  // Save links to localStorage whenever they change
  useEffect(() => {
    if (links.length > 0) {
      localStorage.setItem('socialLinks', JSON.stringify(links));
    }
  }, [links]);

  const detectPlatform = (url: string): SocialPlatform | null => {
    try {
      const parsed = new URL(url);
      const domain = parsed.hostname.replace('www.', '');
      return DomainToPlatform[domain] || null;
    } catch {
      return null;
    }
  };

  const updateUrl = (index: number, newUrl: string) => {
    const cleanedUrl = newUrl.trim().toLowerCase();
  
    // Basic URL pattern: starts with http(s) or www
    const urlPattern = /^(https?:\/\/|www\.)[^\s]+$/;
  
    if (!urlPattern.test(cleanedUrl)) {
      const updated = [...links];
      updated[index].url = "";
      updated[index].platform = null;
      updated[index].show = false;
      setLinks(updated);
      return;
    }
  
    // Allow reuse if the existing one is hidden (show = false)
    // const isDuplicate = links.some((link, i) =>
    //   i !== index && link.url.trim().toLowerCase() === cleanedUrl && link.show
    // );
  
    // if (isDuplicate) {
    //   alert("You're already using this URL.");
    //   return;
    // }
  
    const updated = [...links];
    updated[index].url = newUrl;
    updated[index].platform = detectPlatform(newUrl);
    updated[index].show = updated[index].platform !== null;
    setLinks(updated);
  };
  
  const toggleShow = (index: number) => {
    const updated = [...links];
    updated[index].show = !updated[index].show;
    setLinks(updated);
  };
  


  const handlePlatformChange = (index: number, platform: SocialPlatform) => {
    const updated = [...links];
    updated[index].platform = platform;
    setLinks(updated);
  };
  const handleUrlChange = (index: number, url: string) => {
    const updated = [...links];
    updated[index].url = url;
    setLinks(updated);
  };
  const handleShowChange = (index: number, show: boolean) => {
    const updated = [...links];   
    updated[index].show = show;
    setLinks(updated);
  };


  const removeLink = (index: number) => {
    const updated = [...links];
    updated.splice(index, 1);
    setLinks(updated.length > 0 ? updated : [{ platform: null, url: '', show: false }]);
  };

  const addLink = () => {
    setLinks([...links, { platform: null, url: '', show: true }]);
  };

  // const saveLinks = () => {
  //   const formatted = links
  //     .filter(link => link.platform && link.url && link.show)
  //     .reduce((acc, curr) => {
  //       if (curr.platform) {
  //         acc[curr.platform] = curr.url;
  //       }
  //       return acc;
  //     }, {} as Record<string, string>);
      
  //     localStorage.setItem('socialLinks', JSON.stringify(
  //       links.filter(link => link.platform && link.url && link.show) 
  //     ));

  //   onSave(formatted); 
  // };



  const saveLinks = () => {
    // Save all links, including show status
    localStorage.setItem('socialLinks', JSON.stringify(links));
  
    // Filter for those that should be shown and prepare for parent
    const formatted = links
      .filter(link => link.platform && link.url && link.show)
      .reduce((acc, curr) => {
        if (curr.platform) {
          acc[curr.platform] = curr.url;
        }
        return acc;
      }, {} as Record<string, string>);
  
    onSave(formatted);
  };
  
  

  return (
    <div className="relative bg-white shadow-2xl rounded-2xl w-full max-w-2xl p-6">
      {/* Close Button */}
      <button
        onClick={() => setShowCard(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl font-bold focus:outline-none"
      >
        ×
      </button>
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Social Media Links</h2>

      {links.map((link, index) => {
        const IconComponent = link.platform ? IconMap[link.platform] : null;
        return (
          <div
            key={index}
            className="flex items-center gap-3 mb-4 border border-gray-200 p-3 rounded-lg bg-gray-50 transition-all"
          >
            {IconComponent && (
              <IconComponent className="text-2xl text-gray-500 shrink-0" />
            )}
            <input
              type="text"
              value={link.url}
              onChange={(e) => updateUrl(index, e.target.value)}
              placeholder="Paste your social media URL"
              className="flex-grow p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
 
            <label className="flex items-center cursor-pointer ml-2">
              <input
                type="checkbox"
                checked={!!link.show}  // force boolean
                onChange={() => toggleShow(index)}
                className="hidden"
              />
              <div
                className={`w-10 h-5 flex items-center rounded-full p-1 duration-300 ${
                  link.show ? 'bg-blue-500' : 'bg-gray-300'
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
              className="text-red-500 hover:text-red-700 text-xl font-bold ml-2"
              title="Remove link"
            >
              ×
            </button>
          </div>
        );
      })}
      <div className="flex flex-col gap-3 mt-6">
        <button
          onClick={addLink}
          className="w-full text-blue-500 py-2 rounded-lg transition"
        >
            +  ADD SOCIAL MEDIA LINK
        </button>

        <button
          onClick={saveLinks}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
        >
          SAVE LINKS
        </button>
      </div>
    </div>
  );
};

export default SocialMediaIcons;