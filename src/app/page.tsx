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
    <div>
      <Header />
      <SearchBar onSearch={(q) => setQuery(q)} />
      <CategoryList />
      <div className="hhw">
        <h1 className={`hh ${theme === "dark" ? "text-gray-800" : "dark:text-white"}`}>
          Top Headlines
        </h1>
      </div>

      {loading && <StatusMessage type="loading" />}
      {error && <StatusMessage type="error" message={error} />}

      {!loading && !error && (
        <section className="ha">
          {articles.length > 0 ? (
            articles.map((article, i) => (
              <NewsCard key={i} article={article} />
            ))
          ) : (
            <p className="hn">No news found.</p>
          )}
        </section>
      )}
      {!loading && !error && totalResults > 10 && (
        <Pagination
          currentPage={page}
          totalResults={totalResults}
          pageSize={9}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}