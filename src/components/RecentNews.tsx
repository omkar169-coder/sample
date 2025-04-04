import React, { useState } from "react";
import { RiNewspaperLine } from "react-icons/ri";

const RecentNews = () => {
  const [showAll, setShowAll] = useState(false);

  
  const newsItems = [
    {
      id: 1,
      heading: "Breaking News: Major Event Happened!",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia dui quis dolor hendrerit, et elementum nunc interdum. Morbi sit amet turpis eu ante tempor venenatis.",
    },
    {
      id: 2,
      heading: "Important Update: Global Market Trends",
      content:
        "Sed ac leo eu justo auctor convallis. Quisque mollis nulla non elit iaculis, nec vehicula augue vulputate. Phasellus aliquam ut odio a posuere.",
    },
    {
      id: 3,
      heading: "Tech News: New Breakthrough in AI",
      content:
        "Curabitur tincidunt, lorem sed condimentum maximus, nunc dolor luctus enim, vel feugiat sem nisl eget dui. Donec gravida justo eu mauris dictum tristique.",
    },
  ];

 
  const handleShowMore = () => setShowAll(!showAll);

  return (
    <div className="max-w-xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
   
      <div className="p-4">
        
        <h2 className="text-xl font-bold text-black-600 mb-4">
        <RiNewspaperLine /> Latest News
        </h2>

  
        {newsItems.map((news) => (
          <div key={news.id} className="mb-4">
            
            <h3 className="text-lg font-semibold text-blue-600 mb-2">
              {news.heading}
            </h3>

            
            <p
              className={`text-sm text-gray-800 ${
                !showAll ? "line-clamp-3" : ""
              }`} 
            >
              {news.content}
            </p>
          </div>
        ))}

      
        <button
          onClick={handleShowMore}
          className="text-blue-600 text-sm mt-4"
        >
          {showAll ? "See Less" : "See More"}
        </button>
      </div>
    </div>
  );
};

export default RecentNews;
