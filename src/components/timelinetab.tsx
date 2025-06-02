'use client';
import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

type TimelineItemType = {
  id: number;
  // email: string;
  title: string;
  company: string;
  date: string;
  type: 'Experience' | 'Education' | 'Certification';
  description: string;
  logo: string;
};

const TimelineTab = () => {
  const router = useRouter();
  
  const [timeline, setTimeline] = React.useState<TimelineItemType[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchTimeline = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const response = await fetch("https://wooble.io/api/portfolio/fetch_timeline.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            user_id: "9168",
            email: "omkar@wooble.org",
            username: "muralaomkar2",
          }),
        });
  
        const json = await response.json();
        console.log("Timeline API response:", json);
  
        if (!json.success) {
          throw new Error(json.message || "API returned an error");
        }
  
        const formatDateRange = (start: string, end: string): string => {
          if (start && end) return `${start} - ${end}`;
          if (start) return start;
          if (end) return end;
          return "";
        };
  
        const mappedItems: TimelineItemType[] = [];
        const data = json.data;
  
        if (data.education) {
          Object.values(data.education).forEach((entry: any) => {
            mappedItems.push({
              id: parseInt(entry.entry_id) || Date.now(),
              // email: "omkar@wooble.org",
              title: entry.title || "",
              company: entry.subtitle || "",
              date: formatDateRange(entry.start_date, entry.end_date),
              type: "Education",
              description: entry.description || "",
              logo: entry.img || "",
            });
          });
        }
  
        if (Array.isArray(data.experience)) {
          data.experience.forEach((entry: any) => {
            mappedItems.push({
              id: parseInt(entry.entry_id) || Date.now(),
              // email: "omkar@wooble.org",
              title: entry.title || "",
              company: entry.subtitle || "",
              date: formatDateRange(entry.start_date, entry.end_date),
              type: "Experience",
              description: entry.description || "",
              logo: entry.img || "",
            });
          });
        }
  
        if (Array.isArray(data.certifications)) {
          data.certifications.forEach((entry: any) => {
            mappedItems.push({
              id: parseInt(entry.entry_id) || Date.now(),
              // email: "omkar@wooble.org",
              title: entry.title || "",
              company: entry.subtitle || "",
              date: formatDateRange(entry.start_date, entry.end_date),
              type: "Certification",
              description: entry.description || "",
              logo: entry.img || "",
            });
          });
        }

        console.log("Mapped timeline items:", mappedItems); 
        
        setTimeline(mappedItems);
      } catch (err: any) {
        console.error("Error fetching timeline:", err);
        setError(err.message || "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };
  
    fetchTimeline();
  }, []);  

  const getYear = (date: string): number =>
    new Date(date.split('-')[0].trim()).getFullYear();

  const sorted = [...timeline].sort((a, b) => b.id - a.id);
  let lastYear: number | null = null;

  return (
    <div className="flex justify-center px-4 py-10 bg-gray-50 min-h-[20vh]">
      <div className="relative w-full max-w-5xl">
        {/* Plus Button */}
        <div className="absolute top-0 right-0 mt-2 mr-2">
          <button
            className="bg-gray-200 hover:bg-gray-300 p-2 rounded-sm shadow-md"
            onClick={() => router.push('/add-timeline-entry')}
            aria-label="Add timeline entry"
          >
            <FiPlus className="text-black text-lg" />
          </button>
        </div>

        {/* Vertical line */}
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-black"></div>

        {loading && (
          <p className="text-center text-gray-500 mt-20">Loading timeline entries...</p>
        )}

        {error && (
          <p className="text-center text-red-500 mt-20">Error: {error}</p>
          
        )}

        {!loading && !error && sorted.length === 0 && (
          <p className="text-center text-gray-500 mt-20">No timeline entries yet. Add one!</p>
        )}

        {!loading && !error && sorted.map((item) => {
          const currentYear = getYear(item.date);
          const showYear = currentYear !== lastYear;
          lastYear = currentYear;

          return (
            <div key={item.id} className="relative flex flex-col items-start mt-10 mb-14">
              {/* Year label */}
              {showYear && (
                <div className="flex items-start mb-6 mt-3 relative">
                  <div className="absolute left-4 md:left-8 top-[-2rem] w-0.5 h-[2rem] bg-gray-50 z-10"></div>
                  <div className="text-xl md:text-2xl font-bold bg-gray-50 absolute -left-2 md:-left-3.5 -top-8 z-20 whitespace-nowrap">
                    {currentYear}
                  </div>
                </div>
              )}

              {/* Dot */}
              <div className="absolute ml-4 md:ml-8 -left-4 md:-left-4 top-10 w-6 h-6 md:w-8 md:h-8 rounded-full bg-black text-white flex items-center justify-center text-xs md:text-sm font-semibold z-20">
                {item.id}
              </div>

              {/* Timeline Card */}
              <div className="ml-16 md:ml-24 p-4 md:p-6 bg-white shadow-md rounded-lg flex flex-col md:flex-row items-start gap-4 relative z-10
                w-[90%] max-w-[700px] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[50%]">
                {item.logo ? (
                  <img
                    src={item.logo}
                    alt={item.title}
                    className="w-20 h-20 md:w-28 md:h-28 object-contain"
                  />
                ) : (
                  <div className="w-20 h-20 md:w-28 md:h-28 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                    No Logo
                  </div>
                )}
                <div>
                  <div className="text-xs md:text-sm text-gray-500">{item.date}</div>
                  <h3 className="font-semibold text-base md:text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-700">{item.company}</p>
                  <span
                    className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
                      item.type === 'Education'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {item.type}
                  </span>
                  <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimelineTab;

