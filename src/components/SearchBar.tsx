"use client";
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SearchBarProps { onSearch: (query: string) => void; }

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const { theme } = useTheme();

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim() != "") onSearch(query.trim());
    }, 500);
    return () => clearTimeout(delay);
  }, [query, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() != "") onSearch(query.trim())
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="sbw"
      initial={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="sb">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search news..."
          className={`sbi ${theme === "dark" ? "sbi-l" : "sbi-b"}`}
        />
        <motion.button
          type="submit"
          className={`sbs`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Search
        </motion.button>
      </div>
    </motion.form>
  )
}
export default SearchBar;