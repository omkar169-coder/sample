"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserFriends, FaRegCalendarAlt } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { Plus } from "lucide-react";
import axios from "axios";

const email = "omkar@wooble.org";
const user_id = 9168;
const encodedData = encodeURIComponent(JSON.stringify({
  email: "omkar@wooble.org",
  user_id: 9168,
  name: "omkar",
  description: "description",
  users: "2",
  revenue: "10",
  impact: "5",
  eventDate: "",
  awardBy: "",
  researchTopic: "",
  tools: ["react", "html"]
}));

const url = `/impactzonestab?data=${encodedData}`;


interface EventItem {
  id: string;
  title: string;
  organizer: string;
  date: string;
  location: string;
  image: string;
  attendees: number;
  type: "event";
}

interface HustleItem {
  id: string;
  title: string;
  description: string;
  users: string;
  revenue: string;
  date: string;
  image: string;
  tools: string[];
  type: "hustle";
}

type ImpactItem = EventItem | HustleItem;

const ImpactZonesTab = () => {
  const router = useRouter();
  const [impacts, setImpacts] = useState<ImpactItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const user_id = sessionStorage.getItem("user_id");

      // Save form data
      await axios.post("https://wooble.io/api/portfolio/save_impact.php", {
        ...formData,
        user_id,
      });

      // Fetch the saved data after saving
      const fetchResponse = await axios.post("https://wooble.io/api/portfolio/fetch_impacts.php", {
        user_id,
      });

      // Update impacts with fetched data
      setImpacts(fetchResponse.data.impacts);
      console.log("Fetched impact data:", fetchResponse.data);
    } catch (error) {
      console.error("Error during save or fetch:", error);
    }
  };

  useEffect(() => {
    // Trigger the editor tab GET request
    axios.get("https://wooble.io/portfolio/editor?tab=impact")
      .then(res => {
        console.log("Editor tab request successful:", res.status);
      })
      .catch(err => {
        console.error("Editor tab request failed:", err);
      });
  }, []);
  

  useEffect(() => {
    const stored = sessionStorage.getItem("impactFormData");
    if (stored) {
      const data = JSON.parse(stored);
      console.log("Received form data:", data);
      // use it however you like
    }
  }, []);
  

  useEffect(() => {
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("user_id", user_id.toString());

    const fetchImpacts = async () => {
      setLoading(true);
      try {
        // Prepare form data using URLSearchParams
        const formData = new URLSearchParams();
        formData.append("user_id", user_id.toString());

        // POST request to fetch impacts
        const response = await axios.post(
          "https://wooble.io/api/portfolio/fetch_impacts.php",
          formData, // Sending the form data
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded", // Set form data content type
            },
          }
        );
    
        if (response.data.success) {
          // Assuming the API response format
          const impactsData = response.data.impacts
            .map((impact: any): ImpactItem | null => { // Explicitly typing as ImpactItem | null
              if (impact.type === "event") {
                return {
                  id: impact.id,
                  title: impact.title,
                  organizer: impact.organizer,
                  date: impact.date,
                  location: impact.location,
                  image: impact.image_url,
                  attendees: impact.participants || 0,
                  type: "event",
                };
              } else if (impact.type === "hustle") {
                return {
                  id: impact.id,
                  title: impact.title,
                  description: impact.description,
                  users: impact.users || "0",
                  revenue: impact.revenue || "$0",
                  date: impact.date,
                  image: impact.image_url,
                  tools: impact.tools_used ? impact.tools_used.split(",") : [],
                  type: "hustle",
                };
              }
              return null;
            })
            .filter((impact: ImpactItem | null): impact is ImpactItem => impact !== null); // Explicitly declare impact type here
    
          setImpacts(impactsData);
        } else {
          // Fallback to mock data if the response does not contain impacts
          const mockResponse = {
            data: {
              impacts: [
                {
                  id: "1",
                  title: "Event 1",
                  organizer: "Organizer 1",
                  date: "2025-05-01",
                  location: "Location 1 bbsr",
                  image: "https://images.seeklogo.com/logo-png/27/1/sequelize-logo-png_seeklogo-273892.png",
                  attendees: 100,
                  type: "event",
                } as EventItem,
                {
                  id: "2",
                  title: "Hustle 1 title",
                  description: "Building a custom CMS from scratch using modern tools.",
                  users: "12",
                  revenue: "$120",
                  date: "26 Apr 2024",
                  image: "https://static-00.iconduck.com/assets.00/sequelize-icon-443x512-zt3ku70k.png",
                  tools: ["Figma", "React", "Node.js"],
                  type: "hustle",
                } as HustleItem,
              ],
            },
          };
    
          setImpacts(mockResponse.data.impacts || []);
        }
      } catch (error) {
        console.error("Error fetching impacts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImpacts();
  }, []);

  return (
    <div className="relative p-6">
      {/* Plus Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => router.push("/add-impact")}
          className="p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 shadow transition"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-center text-gray-500 col-span-3">Loading impacts...</p>
        ) : impacts.length === 0 ? (
          <p className="text-center text-gray-500 col-span-3">No impacts added yet.</p>
        ) : (
          impacts.map((item) => (
            <div
              key={item.id}
              className="w-full max-w-xs bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
            >
              <div className="relative h-[200px] w-full flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-t-2xl"
                />
                <span className="absolute top-3 left-3 bg-black bg-opacity-60 text-white text-sm px-2 py-1 rounded">
                  {item.date}
                </span>
              </div>
          
              <div className="flex-grow p-4 flex flex-col justify-between text-sm text-gray-700">
                {/* Common Title */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
          
                  {/* Description if Hustle */}
                  {"description" in item && (
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  )}
          
                  {/* Organizer (Event) or Users/Revenue/Date Row (Hustle) */}
                  {"organizer" in item ? (
                    <p className="text-sm text-gray-600 mb-2">{item.organizer}</p>
                  ) : (
                    <div className="flex justify-between text-xs mb-2">
                      <span>{item.users}</span>
                      <span className="text-green-600 font-medium">{item.revenue}</span>
                      <span>{item.date}</span>
                    </div>
                  )}
          
                  {/* Tools (Hustle only) */}
                  {"tools" in item && (
                    <div className="flex items-center gap-1 text-sm mt-2">
                      <span>{item.tools.join(", ")}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between text-sm text-gray-700 flex-wrap gap-2">
                  {"attendees" in item && (
                    <div className="flex items-center gap-1">
                      <FaUserFriends className="text-yellow-500" />
                      {item.attendees} Attendees
                    </div>
                  )}
                  {"location" in item && (
                    <div className="flex items-center gap-1">
                      <GoLocation className="text-yellow-500" />
                      {item.location}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ImpactZonesTab;