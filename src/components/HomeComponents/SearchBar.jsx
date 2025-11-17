import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  // Debounce the search input to reduce API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(query);
    }, 500);

    return () => clearTimeout(handler);
  }, [query, onSearch]);

  return (
    <div className="flex items-center bg-gray-100 px-4 py-3 rounded-md w-full max-w-4xl mx-auto">
      <FiSearch className="text-gray-500 mr-3" />
      <input
        type="text"
        placeholder="Search for news, topics..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-transparent outline-none w-full text-sm placeholder-gray-500"
      />
    </div>
  );
}
