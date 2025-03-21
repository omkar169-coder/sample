import { useState, useEffect } from "react";
import { UserPlus } from "lucide-react";

const ProfileSuggestions = () => {
  // Dynamic profiles data (this i will be fetched from an API in the future)
  const [profiles, setProfiles] = useState([
    { name: "Bob Smith", role: "Career Counselor" },
    { name: "Bismayadit Sahoo", role: "Btech (Mech) Student" },
  ]);

  // Simulate an API call to fetch profiles (i can replace this with a real API call)
  useEffect(() => {
    const fetchProfiles = async () => {
      // Here i would make an API request
    
      const fetchedProfiles = [
        { name: "Alice Johnson", role: "Software Engineer" },
        { name: "John Doe", role: "Product Manager" },
        { name: "Sarah Lee", role: "Data Scientist" },
      ];
      setProfiles(fetchedProfiles);
    };

    fetchProfiles();
  }, []); // Empty dependency array means this runs once on mount

  return (
    // <div className="bg-white shadow-md rounded-xl p-5 w-full max-w-[650px] min-h-[300px] md:min-h-[350px] lg:min-h-[300px] border border-gray-200 mx-auto sm:mr-6 mr-30"> 
    <div className="bg-white shadow-md rounded-xl p-5 w-full max-w-[650px] min-h-[300px] md:min-h-[350px] lg:min-h-[300px] border border-gray-200 mx-auto sm:mr-6 mr-[30px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px]">
      {/* Title */}
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <span role="img" aria-label="profile">👤</span> More Profiles for You
      </h2>

      {/* Profile List */}
      <div className="mt-4 space-y-4">
        {profiles.map((profile, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-400 text-white flex items-center justify-center rounded-full text-lg font-medium">
                {profile.name[0]} 
              </div>
              <div>
                <p className="font-medium">{profile.name}</p>
                <p className="text-sm text-gray-500">{profile.role}</p>
              </div>
            </div>

            <button className="flex items-center gap-2 border px-4 py-2 rounded-full text-sm hover:bg-gray-100 transition">
              <UserPlus size={18} />
              <span>Follow</span>
            </button>
          </div>
        ))}
      </div>

      {/* See More Link */}
      <div className="mt-4 text-sm text-blue-600 cursor-pointer hover:underline">
        See More
      </div>
    </div>
  );
};

export default ProfileSuggestions;
