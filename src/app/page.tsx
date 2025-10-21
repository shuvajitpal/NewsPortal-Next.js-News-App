"use client";
import Header from "@/components/Layout/Header";
import SearchBar from "@/components/SearchBar";
import NewsCard from "@/components/NewsCard";
import useFetchNews from "@/hooks/useFetchNews";
import Pagination from "@/components/Pagination";
import { useEffect, useState } from "react";

export default function HomePage(){
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() =>{
    setPage(1);
  },[query])
  const { articles, totalResults , loading, error } = useFetchNews(query, undefined, page);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({top: 0, behavior:'smooth'})
  };

  return(
    <div>
      <Header />
      <SearchBar onSearch={(q) => setQuery(q)} />
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6 p-4">
        {articles.length > 0 ? (
          articles.map((article, i) => (
            <NewsCard key={i} article={article} />
          ))
        ) : (
          !loading && <p className="text-center text-gray-500">No news found.</p>
        )}
      </section>
      <Pagination 
      currentPage={page}
      totalResults={totalResults}
      pageSize={10}
      onPageChange={handlePageChange}
      />
    </div>
  )
}