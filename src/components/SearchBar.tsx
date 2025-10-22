"use client";
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";

interface SearchBarProps { onSearch: (query: string) => void; }

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const { theme } = useTheme();

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim() != "") onSearch(query.trim());
    }, 500);
    return () => clearTimeout(delay);
  },[query, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() != "") onSearch(query.trim())
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex items-center justify-center mt-4  transition-all duration-500"
    >
      <div className="flex w-full md:w-1/2 shadow-md rounded-lg overflow-hidden transition-all duration-500">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search news..."
          className={`flex-1 p-3 pl-4 border  focus:ring-indigo-500 focus:border-indigo-500 transition-shadow outline-none ${theme === "dark" ? "border-gray-300 bg-gray-100" : "border-gray-700 bg-gray-700 text-white transition-all duration-500"}`}
        />
        <button
          type="submit"
          className={`px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-500 font-medium whitespace-nowrap`}
        >
          Search
        </button>
      </div>
    </form>
  )
}
export default SearchBar;