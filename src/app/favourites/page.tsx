"use client";
import NewsCard from "@/components/NewsCard";
import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";
import StatusMessage from "@/components/StatusMessage";
import { motion } from "framer-motion";

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
  const [error] = useState<string | null>(null);

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

  if (error) return <StatusMessage type="error" message={error} />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className={`fv-h ${theme === "dark" ? "text-black" : "text-white"}`}>My Favourites</h1>

      {favourites.length === 0 ? (
        <div>
          <p className="fv-n">
            You haven’t saved any Articles yet.

          </p>
          <button onClick={handleBack} className="fb-bk">
            ← Back to News
          </button>
        </div>
      ) : (
        <section className="fv-s">
          {favourites.map((article, i) => (
            <div key={i} className="relative">
              <NewsCard key={i} article={article} onFavouriteToggle={() => removeFav(article.url)} />
            </div>
          ))}
        </section>
      )}
    </motion.div>
  )
}