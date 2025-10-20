"use client";
import Header from "@/components/Layout/Header";
import NewsCard from "@/components/NewsCard";
import useFetchNews from "@/hooks/useFetchNews";
import { useState } from "react";

export default function HomePage(){
  const { articles, loading } = useFetchNews();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  return(
    <div>
      <Header />
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6 p-4">
        {articles.length > 0 ? (
          articles.map((article, i) => (
            <NewsCard key={i} article={article} />
          ))
        ) : (
          !loading && <p className="text-center text-gray-500">No news found.</p>
        )}
      </section>
    </div>
  )
}