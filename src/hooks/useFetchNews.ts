"use client";
import { useEffect, useState } from "react";
import { newsApi } from "@/lib/api";
import { Article } from "@/lib/constants";

export default function useFetchNews(query?: string, category?: string, page: number = 1) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await newsApi.fetchNews(query, category, page);
        setArticles(data.articles);
        setTotalResults(data.totalResults);
      } catch (error) {
        setError("Failed to fetch news");
        setArticles([]);
        setTotalResults(0);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [query, category, page]);

  return { articles, loading, error, totalResults };
}