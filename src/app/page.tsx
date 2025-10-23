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
      <div className="text-center mt-8 -mb-6">
        <h1 className={`text-2xl font-bold ${theme === "dark" ? "text-gray-800" : "dark:text-white"}`}>
          Top Headlines
        </h1>
      </div>

      {loading && <StatusMessage type="loading" />}
      {error && <StatusMessage type="error" message={error} />}

      {!loading && !error && (
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6 p-4">
          {articles.length > 0 ? (
            articles.map((article, i) => (
              <NewsCard key={i} article={article} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">No news found.</p>
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