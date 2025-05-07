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

}));

 const url = `/impactzonestab?data=${encodedData}`;


type Event = {
  id: number;
  title: string;
  organizer: string;
  date: string;
  location: string;
  image: string;
  attendees: number;
  type: "event";
};

type Hustle = {
  id: number;
  title: string;
  description: string;
  users: string;
  revenue: string;
  date: string;
  image: string;
  tools: string[];
  type: "hustle";
};

type Award = {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
  description: string;
  type: "award";
};

type Research = {
  id: number;
  title: string;
  field: string;
  date: string;
  paperUrl: string;
  image: string;
  collaborators: string[];
  type: "research";
};

type ImpactItem = Event | Hustle | Award | Research;

const ImpactZonesTab = () => {
  const router = useRouter();
  const [impacts, setImpacts] = useState([]);
  const [loading, setLoading] = useState(true);


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
      fetchImpacts(); // Refetch impacts after saving
    } catch (error) {
      console.error("Error during save or fetch:", error);
    }
  };

  
  // const handleSave = async () => {
  //   try {
  //     const user_id = sessionStorage.getItem("user_id");

  //     // Save form data
  //     await axios.post("https://wooble.io/api/portfolio/save_impact.php", {
  //       ...formData,
  //       user_id,
  //     });

  //     // Fetch the saved data after saving
  //     const fetchResponse = await axios.post("https://wooble.io/api/portfolio/fetch_impacts.php", {
  //       user_id,
  //     });

  //     // Update impacts with fetched data
  //     setImpacts(fetchResponse.data.impacts);
  //     console.log("Fetched impact data:", fetchResponse.data);
  //   } catch (error) {
  //     console.error("Error during save or fetch:", error);
  //   }
  // };

  useEffect(() => {
    axios.get("https://wooble.io/portfolio/editor?tab=impact")
      .then(res => {
        console.log("Editor tab request successful:", res.status);
      })
      .catch(err => {
        console.error("Editor tab request failed:", err);
      });
  }, []);
  

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
  
  const fetchImpacts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://wooble.io/api/portfolio/fetch_impacts.php?user_id=${user_id}`
      );
      if (response.data.success) {
        setImpacts(response.data.impacts);
      } else {
        console.warn("No impacts data.");
        setImpacts([]);
      }
    } catch (error) {
      console.error("Error fetching impacts:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    const fetchImpacts = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://wooble.io/api/portfolio/fetch_impacts.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ user_id: "9168" }),
        });

        const data = await res.json();
        console.log("API response:", data);

        if (data.success) {
          setImpacts(data.impacts || []);
        } else {
          setImpacts([]);
        }
      } catch (error) {
        console.error("Error fetching impacts:", error);
        setImpacts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchImpacts();
  }, []);


  // useEffect(() => {
  //   sessionStorage.setItem("email", email);
  //   sessionStorage.setItem("user_id", user_id.toString());
  
  //   const fetchImpacts = async () => {
  //     setLoading(true);
  //     try {
  //       const formData = new URLSearchParams();
  //       formData.append("user_id", user_id.toString());
  
  //       const response = await axios.post(
  //         "https://wooble.io/api/portfolio/fetch_impacts.php",
  //         formData,
  //         {
  //           headers: {
  //             "Content-Type": "application/x-www-form-urlencoded",
  //           },
  //         }
  //       );
  
  //       if (response.data.success) {
  //         const impactsData = response.data.impacts
  //           .map((impact: any): ImpactItem | null => {
  //             if (impact.type === "event") {
  //               return {
  //                 id: impact.id,
  //                 title: impact.title,
  //                 organizer: impact.organizer || "Unknown Organizer",
  //                 date: impact.date,
  //                 location: impact.location || "Unknown Location",
  //                 image: `https://wooble.io/upload/${impact.image_url}`,
  //                 attendees: impact.participants || 0,
  //                 type: "event",
  //               };
  //             } else if (impact.type === "hustle") {
  //               return {
  //                 id: impact.id,
  //                 title: impact.title,
  //                 description: impact.description,
  //                 users: impact.users?.toString() || "0",
  //                 revenue: `$${impact.revenue || "0"}`,
  //                 date: impact.date,
  //                 image: `https://wooble.io/upload/${impact.image_url}`,
  //                 tools: impact.tools_used ? impact.tools_used.split(",") : [],
  //                 type: "hustle",
  //               };
  //             } else if (impact.type === "award") {
  //               return {
  //                 id: impact.id,
  //                 title: impact.title,
  //                 issuer: impact.award_by || "Unknown Issuer",
  //                 date: impact.date,
  //                 image: `https://wooble.io/upload/${impact.image_url}`,
  //                 description: impact.description || "",
  //                 type: "award",
  //               };
  //             } else if (impact.type === "research") {
  //               return {
  //                 id: impact.id,
  //                 title: impact.title,
  //                 field: impact.field || "Unknown Field",
  //                 date: impact.date,
  //                 paperUrl: impact.paper_url || "",
  //                 image: `https://wooble.io/upload/${impact.image_url}`,
  //                 collaborators: impact.collaborators ? impact.collaborators.split(",") : [],
  //                 type: "research",
  //               };
  //             }
  //             return null;
  //           })
  //           .filter((impact: ImpactItem | null): impact is ImpactItem => impact !== null);
  
  //         setImpacts(impactsData);
  //       } else {
  //         console.warn("No impact data received, using mock fallback.");
  //         setImpacts([]);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching impacts:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  
  //   fetchImpacts();
  // }, []);
  
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
          impacts.map((item: any) => (
            <div
              key={item.id}
              className="w-full max-w-xs bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
            >
              <div className="relative h-[200px] w-full flex-shrink-0">
                <img
                  src={item.image || "/default-image.jpg"}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-t-2xl"
                />
                {item.date && (
                  <span className="absolute top-3 left-3 bg-black bg-opacity-60 text-white text-sm px-2 py-1 rounded">
                    {item.date}
                  </span>
                )}
              </div>

              <div className="flex-grow p-4 flex flex-col justify-between text-sm text-gray-700">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>

                  {item.description && (
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  )}

                  {item.impact_type === "event" ? (
                    <p className="text-sm text-gray-600 mb-2">{item.organizer}</p>
                  ) : item.impact_type === "hustle" ? (
                    <div className="flex justify-between text-xs mb-2">
                      <span>{item.users}</span>
                      <span className="text-green-600 font-medium">{item.revenue}</span>
                      <span>{item.date}</span>
                    </div>
                  ) : null}

                  {Array.isArray(item.tools) && item.tools.length > 0 && (
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
