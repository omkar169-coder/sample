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
    <div className="flex justify-center px-4 py-10 bg-gray-50 min-h-[20vh]">
      <div className="relative w-full max-w-5xl">
        {/* Vertical line */}
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-black"></div>
  
        {sorted.map((item) => {
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
                <img
                  src={item.logo}
                  alt={item.title}
                  className="w-20 h-20 md:w-28 md:h-28 object-contain"
                />
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
}  

export default TimelineTab;
