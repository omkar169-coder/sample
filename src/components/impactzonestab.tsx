"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserFriends, FaRegCalendarAlt, FaMedal } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { Plus } from "lucide-react";
import axios from "axios";

interface HustleItem {
  id: string;
  title: string;
  organizer: string;
  date: string;
  location: string;
  image: string;
  attendees?: number;
  level?: string;
  type: "event" | "hustle" | "award" | "research";
}

const ImpactZonesTab = () => {
  const router = useRouter();
  const [hustles, setHustles] = useState<HustleItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchImpacts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/impact"); // Assume same API that handles hustle
        setHustles(response.data.impacts || []);
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center">
        {loading ? (
          <p className="text-center text-gray-500 col-span-2">Loading impacts...</p>
        ) : hustles.length === 0 ? (
          <p className="text-center text-gray-500 col-span-2">No impacts added yet.</p>
        ) : (
          hustles.map((item) => (
            <div
              key={item.id}
              className="w-[350px] h-[350px] bg-white rounded-2xl shadow-md overflow-hidden flex flex-col"
            >
              <div className="relative h-[200px] w-full flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-black bg-opacity-60 text-white text-sm px-2 py-1 rounded">
                  {item.date}
                </span>
              </div>
              <div className="flex-grow p-4 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-3">
                    {item.organizer}
                  </p>
                </div>
                <div className="flex justify-between text-sm text-gray-700">
                  {item.attendees && (
                    <div className="flex items-center gap-1">
                      <FaUserFriends className="text-yellow-500" />
                      {item.attendees} Attendees
                    </div>
                  )}
                  {item.location && (
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
