"use client";
import { useEffect, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = "https://newsapi.org/v2/top-headlines?country=us&apiKey=7b8e895fc19e42eb81433287a8566bc5";

interface Article{
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
  source: {
    name: string;
  }
}

export default function useFetchNews(query?: string, category?: string){
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        let url = BASE_URL;
        if (query) url = `https://newsapi.org/v2/everything?q=${query}&apiKey=7b8e895fc19e42eb81433287a8566bc5`;
        if (category) {
          url += `&category=${category}`;
        }
        const res = await fetch(url);
        const data = await res.json();

        if (data.status === "ok") setArticles(data.articles);
        else throw new Error(data.message || "Failed to fetch news");
      } catch (error) {
        setError("Failed to fetch news");
        setLoading(false);
      }
    };
    fetchNews();
  }, [query, category]);

  return { articles, loading, error };
}