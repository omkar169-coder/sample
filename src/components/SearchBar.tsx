"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import axios from "axios";

interface Profile {
  user_id: number;
  name: string;
  profession: string | null;
  email: string;
  username: string;
  profile_pic: string;
}

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    const fetchProfiles = async () => {
      if (query.trim() === "") {
        setProfiles([]);
        setIsDropdownVisible(false);
        return;
      }

      try {
        const response = await axios.get(`https://wooble.io/api/search.php?q=${encodeURIComponent(query)}`);
        if (response.data && response.data.profiles) {
          setProfiles(response.data.profiles);
          setIsDropdownVisible(true);
        } else {
          setProfiles([]);
          setIsDropdownVisible(false);
        }
      } catch (error) {
        console.error("Error fetching profiles:", error);
        setProfiles([]);
        setIsDropdownVisible(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchProfiles();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const sanitizeMediaUrl = (url: string): string => {
    const fileName = url.split("/").pop() || url;
    const encodedFileName = encodeURIComponent(fileName);
    return `https://wooble.org/dms/${encodedFileName}`;
  };

  return (
    <div className="relative">
      <div className="flex items-center border border-gray-300 rounded-lg">
        <Search className="w-15 h-5 ml-2 text-gray-500" />
        <input
          type="text"
          className="w-full p-2 pr-2 text-sm text-gray-700 bg-white border-none rounded-lg focus:outline-none"
          placeholder="Search profiles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {isDropdownVisible && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
          {profiles.map((profile) => (
            <a
              key={profile.user_id}
              href={`https://wooble.io/user/${profile.username}`}
              className="flex items-center p-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <img
                src={sanitizeMediaUrl(profile.profile_pic)}
                alt={profile.name}
                className="w-8 h-8 mr-2 rounded-full"
              />
              <div>
                <div className="font-semibold">{profile.name}</div>
                <div className="text-xs text-gray-500">{profile.profession}</div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
