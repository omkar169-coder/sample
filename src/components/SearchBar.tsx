"use client";

import { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="w-full mx-auto flex justify-center items-center my-6 px-4  sm:mt-1">
      
      <div className="flex items-center bg-white border border-gray-300 rounded-full py-2 px-3 md:px-4 shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition-all w-full sm:w-[200px] md:w-[400px] lg:w-[500px] xl:w-[600px]">
        <input
          type="text"
          placeholder="Search for questions, topics, or experts..."
          className="w-full text-gray-700 bg-transparent outline-none text-sm md:text-base"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Search className="text-gray-500 w-6 h-6 ml-2" />
      </div>
    </div>
  );
};

export default SearchBar;
