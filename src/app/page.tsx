"use client";
import Header from "@/components/Layout/Header";
import SearchBar from "@/components/SearchBar";
import NewsCard from "@/components/NewsCard";
import useFetchNews from "@/hooks/useFetchNews";
import Pagination from "@/components/Pagination";
import { useEffect, useState } from "react";
import CategoryList from "@/components/CategoryList";
import { useTheme } from "@/context/ThemeContext";
import StatusMessage from "@/components/StatusMessage";
import { motion } from "framer-motion";

const containerVariants = {hidden: { opacity: 0 }, visible: {opacity: 1, transition: {staggerChildren: 0.1}}};
const itemVariants = {hidden: { y: 20, opacity: 0 }, visible: {y: 0, opacity: 1, transition: {duration: 0.5}}};

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const { theme } = useTheme();

  useEffect(() => {
    setPage(1);
  }, [query])

  const { articles, totalResults, loading, error } = useFetchNews(query, undefined, page);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' })
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Header />
      <motion.div variants={itemVariants}>
        <SearchBar onSearch={(q) => setQuery(q)} />
      </motion.div>
      <motion.div variants={itemVariants}>
        <CategoryList />
      </motion.div>
      
      <motion.div className="hhw" variants={itemVariants}>
        <h1 className={`hh ${theme === "dark" ? "text-gray-800" : "dark:text-white"}`}>
          Top Headlines
        </h1>
      </motion.div>

      {loading && <StatusMessage type="loading" />}
      {error && <StatusMessage type="error" message={error} />}

      {!loading && !error && (
        <motion.section 
          className="ha"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {articles.length > 0 ? (
            articles.map((article, i) => (
              <motion.div key={i} variants={itemVariants}>
                <NewsCard article={article} />
              </motion.div>
            ))
          ) : (
            <motion.p className="hn" variants={itemVariants}>
              No news found.
            </motion.p>
          )}
        </motion.section>
      )}
      {!loading && !error && totalResults > 10 && (
          <Pagination
            currentPage={page}
            totalResults={totalResults}
            pageSize={9}
            onPageChange={handlePageChange}
          />
      )}
    </motion.div>
  )
}