"use client";

import { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="w-full flex justify-center items-center my-6 px-4 mb-[850px]">
      <div className="flex items-center bg-white border border-gray-300 rounded-full py-3 px-3 md:px-4 shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition-all w-full max-w-4xl sm:w-[500px] md:w-[600px] lg:w-[700px] xl:w-[800px]">
        
        <input
          type="text"
          placeholder="Search for questions, topics, or experts..."
          className="w-full text-gray-700 bg-transparent outline-none text-base md:text-lg"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        
        <Search className="text-gray-500 w-6 h-6 ml-2" />
      </div>
    </div>
  );
};

export default SearchBar;
