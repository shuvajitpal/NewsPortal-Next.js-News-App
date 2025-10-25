"use client";
import { useParams } from "next/navigation";
import Header from "@/components/Layout/Header";
import NewsCard from "@/components/NewsCard";
import CategoryList from "@/components/CategoryList";
import useFetchNews from "@/hooks/useFetchNews";
import Pagination from "@/components/Pagination";
import { useEffect, useState } from "react";
import StatusMessage from "@/components/StatusMessage";
import { motion } from "framer-motion";
import SearchBar from "@/components/SearchBar";

export default function CategoryPage() {
  const params = useParams();
  const categoryParam = params.categoryName;
  const category = Array.isArray(categoryParam) ? categoryParam[0] : categoryParam;
  const formattedCategory = category?.toLowerCase();

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const { articles, loading, error, totalResults } = useFetchNews(query, formattedCategory, page);

  useEffect(() => {
    setPage(1);
  }, [formattedCategory, query])

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    console.log("Current category:", formattedCategory);
    console.log("Articles:", articles);
  }, [formattedCategory, articles])

  const itemVariants = {hidden: { y: 20, opacity: 0 }, visible: {y: 0, opacity: 1, transition: {duration: 0.5}}};

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <motion.div variants={itemVariants}>
        <SearchBar onSearch={(q) => setQuery(q)} />
      </motion.div>
      <CategoryList selectedCategory={category} />

      {category && (
        <div className="text-center mt-6">
          <h1 className=" animated-rainbow-text ct-h">
            {category} News
          </h1>
        </div>
      )}

      {loading && <StatusMessage type="loading" />}
      {error && <StatusMessage type="error" message={error} />}

      {!loading && !error && (
        <section className="ct-ns">
          {articles.length > 0 ? (
            articles.map((article, i) => <NewsCard key={i} article={article} />)
          ) : (
            <p className="ct-nn">No news found.</p>
          )}
        </section>
      )}
      {!loading && !error && totalResults > 10 && (
        <Pagination
          currentPage={page}
          totalResults={totalResults}
          pageSize={9}
          onPageChange={handlePageChange}
          currentArticlesCount={articles.length}
        />
      )}
    </motion.div>
  );
}