'use client';
import React from 'react';

const TimelineTab = () => {
  const timeline = [
    {
      id: 4,
      title: "Founder & CEO",
      company: "Wooble Software Private Limited (wooble.io)",
      date: "Feb 22, 2022 - Ongoing",
      type: "Experience",
      description: "Execution and team building",
      logo: "https://wooble.org/dms/dGltZWxpbmUtcGljXzY3Y2FhNWIxN2IxZjM5LjMxODU0OTMwLndlYnA="
    },
    {
      id: 3,
      title: "Founder & CEO",
      company: "Wooble",
      date: "Feb 17, 2022 - Feb 15, 2024",
      type: "Experience",
      description: "On-Site",
      logo: "https://wooble.org/dms/dGltZWxpbmUtcGljXzY3MzFhNGZmMzg4MjkyLjg2NDcyMzEzLndlYnA="
    },
    {
      id: 2,
      title: "Stanford University",
      company: "Masters",
      date: "Sep 12, 2022 - Sep 14, 2023",
      type: "Education",
      description: "Executive MBA in Entrepreneurship",
      logo: "https://wooble.org/dms/dGltZWxpbmUtcGljXzY3YmVmNDIwZWM2YTA1LjAzNjEzNjk4LndlYnA="
    },
    {
      id: 1,
      title: "KIIT University",
      company: "Bachelor in Technology",
      date: "Jul 18, 2016 - May 13, 2020",
      type: "Education",
      description: "Computer Science & Communication Engineering",
      logo: "https://wooble.org/dms/dGltZWxpbmUtcGljXzY3M2YyZWM3MTQ4NzI0LjI5MzI5Mzc2LndlYnA="
    }
  ];

  const getYear = (date: string): number =>
    new Date(date.split('-')[0].trim()).getFullYear();

  const sorted = timeline.sort((a, b) => b.id - a.id);
  let lastYear: number | null = null;

  return (
    <div className="flex p-18 bg-gray-50 min-h-[20vh]">
      <div className="relative ml-12">
        {/* Main vertical timeline line aligned to the left */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-black"></div>
  
        {sorted.map((item) => {
          const currentYear = getYear(item.date);
          const showYear = currentYear !== lastYear;
          lastYear = currentYear;
  
          return (
            <div key={item.id} className="relative flex flex-col items-start mt-10 mb-14">
  
              {showYear && (
                <div className="flex items-start mb-6 mt-3 relative">
                  {/* Gap in the line behind the year */}
                  <div className="absolute left-4 top-[-2rem] w-0.5 h-[2rem] bg-gray-50 z-10"></div>
  
                  {/* Year label - aligned to the left of the line */}
                  <div className="text-2xl font-bold bg-gray-50 absolute -left-3.9 -top-8 z-20 whitespace-nowrap">
                    {currentYear}
                  </div>
                </div>
              )}
  
              {/* Dot on the vertical line */}
              <div className="absolute mt-10 ml-4 -left-4 top-10 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold z-20">
                {item.id}
              </div>
  
              {/* Card aligned left of the timeline */}
              <div className="ml-20 p-5 w-[600px] bg-white shadow-md rounded-lg flex items-start gap-4 relative z-10">
                <img src={item.logo} alt={item.title} className="w-30 h-30 object-contain" />
                <div>
                  <div className="text-sm text-gray-500">{item.date}</div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-700">{item.company}</p>
                  <span className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
                    item.type === 'Education'
                      ? 'bg-red-100 text-red-600'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
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
