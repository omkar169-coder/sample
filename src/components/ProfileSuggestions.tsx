import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";
import Link from "next/link";

const ProfileSuggestions = () => {
  const router = useRouter(); 

  const [profiles, setProfiles] = useState([
    { name: "Bob Smith", role: "Career Counselor" },
    { name: "Bismayadit Sahoo", role: "Btech (Mech) Student" },
  ]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchProfiles = async () => {
      const fetchedProfiles = [
        { name: "Alice Johnson", role: "Software Engineer" },
        { name: "John Doe", role: "Product Manager" },
        { name: "Sarah Lee", role: "Data Scientist" },
        { name: "Michael Brown", role: "UX Designer" },
        { name: "Olivia White", role: "Data Analyst" },
      ];
      setProfiles(fetchedProfiles);
    };

    fetchProfiles();
  }, []);

  const displayedProfiles = showMore ? profiles : profiles.slice(0, 3);

  return (
    <div className="w-full mx-auto bg-white shadow-lg rounded-2xl p-6 mr-10 border border-gray-200 mb-20 sm:mb-8 md:mb-10 max-w-3xl">
      <h2 className="text-sm font-semibold flex items-center gap-3 text-gray-900 mb-6">
        <span role="img" aria-label="profile" className="text-xl">👤</span>
        <span>More Profiles for You</span>
      </h2>

      <div className="space-y-3">
        {displayedProfiles.map((profile, index) => (
          <div key={index} className="flex items-center justify-between space-x-2 py-1">
            <div className="w-10 h-10 bg-gray-400 text-white flex items-center justify-center rounded-full text-base font-medium">
              {profile.name[0]}
            </div>

            <div className="flex-1">
              <p className="font-semibold text-gray-800 text-sm">{profile.name}</p>
              <p className="text-xs text-gray-600">{profile.role}</p>
            </div>

            <button className="flex items-center gap-2 text-black px-4 py-1.5 rounded-full border border-black text-xs font-medium hover:bg-blue-300 transition">
              <UserPlus size={16} />
              <span>Follow</span>
            </button>
          </div>
        ))}
      </div>

        <Link
          href="/SeeMoreProfiles"
          className="mt-4 text-xs text-blue-600 cursor-pointer hover:underline text-right"
        >
          See More
        </Link>
    </div>
  );
};

export default ProfileSuggestions;