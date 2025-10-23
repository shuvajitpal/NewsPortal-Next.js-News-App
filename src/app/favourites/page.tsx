"use client";
import NewsCard from "@/components/NewsCard";
import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("favourite-articles");
    if (saved) setFavourites(JSON.parse(saved));
  }, [])

  const removeFav = (articleUrl: string) => {
    const updatedFav = favourites.filter(article => article.url !== articleUrl);
    setFavourites(updatedFav);
    localStorage.setItem("favourite-articles", JSON.stringify(updatedFav));
  }

  const handleBack = () => {
    router.back();
  };

  return (
    <div>
      <h1 className={`text-2xl font-semibold text-center mt-6 ${theme === "dark" ? "text-black" : "text-white"}`}>My Favourites</h1>

      {favourites.length === 0 ? (
        <div>
          <p className="text-center text-gray-500 mt-4 mb-4">
            You haven’t saved any Articles yet.

          </p>
          <button onClick={handleBack} className="mt-2 mx-auto block px-5 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold rounded-full shadow-md hover:scale-105 active:scale-95 transition-all duration-300">
            ← Back to News
          </button>
        </div>
      ) : (
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-1 mb-4 p-4">
          {favourites.map((article, i) => (
            <div key={i} className="relative">
              <NewsCard key={i} article={article} onFavouriteToggle={() => removeFav(article.url)} />
            </div>
          ))}
        </section>
      )}
    </div>
  )
}