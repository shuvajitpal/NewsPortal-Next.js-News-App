"use client";
import NewsCard from "@/components/NewsCard";
import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

interface Article {
  source: { name: string; }
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export default function FavouritePage() {
  const [favourites, setFavourites] = useState<Article[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    const saved = localStorage.getItem("favourite-articles");
    if (saved) setFavourites(JSON.parse(saved));
  }, [])

  const removeFav = (articleUrl: string) => {
    const updatedFav = favourites.filter(article => article.url !== articleUrl);
    setFavourites(updatedFav);
    localStorage.setItem("favourite-articles", JSON.stringify(updatedFav));
  }

  return (
    <div>
      <h1 className={`text-2xl font-semibold text-center mt-6 ${theme === "dark" ? "text-black" : "text-white"}`}>My Favourites</h1>

      {favourites.length === 0 ? (
        <p className="text-center text-gray-500 mt-4 mb-4">
          You haven’t saved any Articles yet.
        </p>
      ) : (
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-1 mb-4 p-4">
          {favourites.map((article, i) => (
            <div key={i} className="relative">
              <NewsCard key={i} article={article} onFavouriteToggle={() => removeFav(article.url)}/>
            </div>
          ))}
        </section>
      )}
    </div>
  )
}