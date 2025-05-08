"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaRegCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { Plus } from "lucide-react";
import axios from "axios";
import { FaUserFriends, FaDollarSign } from "react-icons/fa";
import { GoCalendar } from "react-icons/go";

const email = "omkar@wooble.org";
const user_id = 9168;
const encodedData = encodeURIComponent(
  JSON.stringify({
    email: "omkar@wooble.org",
    user_id: 9168,
  })
);

const sanitizeMediaUrl = (encodedPath: string): string => {
  return `https://wooble.org/dms/${encodedPath}`;
};

// Moved hooks inside the functional component
const ImpactZonesTab = () => {
  const router = useRouter();
  const [impacts, setImpacts] = useState<any[]>([]); // Hook moved inside component
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<string>(""); // Hook moved inside component

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

  // Handle image URL change (from form input or another source)
  const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
  };

  useEffect(() => {
    axios
      .get("https://wooble.io/portfolio/editor?tab=impact")
      .then((res) => {
        console.log("Editor tab request successful:", res.status);
      })
      .catch((err) => {
        console.error("Editor tab request failed:", err);
      });
  }, []);

  useEffect(() => {
    // Trigger the editor tab GET request
    axios
      .get("https://wooble.io/portfolio/editor?tab=impact")
      .then((res) => {
        console.log("Editor tab request successful:", res.status);
      })
      .catch((err) => {
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
                {/* Image */}
                <div className="relative h-[200px] w-full flex-shrink-0">
                  <img
                    src={item.image || imageUrl || "https://wooble.org/dms/default-image.jpg"} // Replace the fallback URL if necessary
                    alt={item.title}
                    className="w-full h-full object-cover rounded-t-2xl"
                  />
                  {item.date && (
                    <span className="absolute top-3 left-3 bg-black bg-opacity-60 text-white text-sm px-2 py-1 rounded">
                      {item.date}
                    </span>
                  )}
                </div>

              {/* Card Content */}
              <div className="flex-grow p-4 flex flex-col justify-between text-sm text-gray-700">
                <div>
                  {/* Title */}
                  <h2 className="text-xl font-semibold text-gray-800">{item.title || item.name}</h2>
          
                  {/* Description */}
                  {item.description && (
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  )}
          
                  {/* Hustle Specific */}
                  {item.impact_type === "hustle" && (
                  <>
                    <div className="flex justify-between items-center text-xs text-gray-700 mb-2">
                      <div className="flex items-center gap-1">
                        <FaUserFriends className="text-yellow-500" />
                        <span>{item.users}</span>
                        <span>Users</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaDollarSign className="text-yellow-500" />
                        <span>{item.revenue}</span>
                        <span>Revenue</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GoCalendar className="text-yellow-500" />
                        <span>
                          {item.date
                            ? new Date(item.date).toLocaleDateString("en-GB")
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                    {Array.isArray(item.tools) && item.tools.length > 0 && (
                      <div className="text-sm mt-2">
                        <span className="font-medium">Tools:</span> {item.tools.join(", ")}
                      </div>
                    )}
                  </>
                )}

                
                  {/* Event Specific */}

                  {item.impact_type === "event" && (
                    <>
                      <div className="flex justify-between items-center text-xs text-gray-700 mb-2">
                        {/* Attendees */}
                        <div className="flex items-center gap-1">
                          <FaUserFriends className="text-yellow-500" />
                          <span>{item.users}</span>
                          <span>Attendees</span>
                        </div>

                        {/* Event Date */}
                        <div className="flex items-center gap-1">
                          <GoCalendar className="text-yellow-500" />
                          <span>
                            {item.date
                              ? new Date(item.date).toLocaleDateString("en-GB")
                              : "N/A"}
                          </span>
                        </div>

                        {/* Event Location */}
                        <div className="flex items-center gap-1">
                          <FaMapMarkerAlt className="text-yellow-500" />
                          <span>{item.eventLocation || item.location || "N/A"}</span>
                        </div>
                      </div>

                      {/* Additional Event Info */}
                      {item.eventName && (
                        <div className="text-sm mt-2">
                          <span className="font-medium">Event Name:</span> {item.eventName}
                        </div>
                      )}
                      {item.eventDescription && (
                        <div className="text-sm mt-2">
                          <span className="font-medium">Event Description:</span> {item.eventDescription}
                        </div>
                      )}
                      {item.organizer && (
                        <div className="text-sm mt-2">
                          <span className="font-medium">Organizer:</span> {item.organizer}
                        </div>
                      )}
                    </>
                  )}
          
                  {/* Award Specific */}
                  {item.impact_type === "award" && (
                    <>
                      <p className="text-sm mb-1">Organization: {item.awardName}</p>
                      <p className="text-sm mb-1">Users: {item.awardUsers}</p>
                    </>
                  )}
          
                  {/* Research Specific */}
                  {item.impact_type === "research" && (
                    <>
                      <p className="text-sm mb-1">Affiliation: {item.researchAffiliation}</p>
                      <p className="text-sm mb-1">Citation: {item.researchCitation}</p>
                      <p className="text-sm mb-1">DOI: {item.researchDOI}</p>
                      {item.researchImpact && (
                        <p className="text-sm mb-1">Impact: {item.researchImpact}</p>
                      )}
                    </>
                  )}
          
                  {/* Tools */}
                  {Array.isArray(item.tools) && item.tools.length > 0 && (
                    <div className="text-sm mt-2">
                      <span className="font-medium">Tools:</span> {item.tools.join(", ")}
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
