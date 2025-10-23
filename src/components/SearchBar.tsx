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
      className="sbw"
    >
      <div className="sb">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search news..."
          className={`sbi ${theme === "dark" ? "sbi-l" : "sbi-b"}`}
        />
        <button
          type="submit"
          className={`sbs`}
        >
          Search
        </button>
      </div>
    </form>
  )
}
export default SearchBar;