"use client";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";
import { createSlug, formatDate } from "@/lib/utils";
import { NewsCardProps } from "@/lib/constants";

export default function NewsCard({ article, onFavouriteToggle }: NewsCardProps) {
  const { title, description, url, urlToImage, publishedAt, source } = article;
  const { theme } = useTheme();
  const [isFav, setIsFav] = useState(false);

  const formattedDate = formatDate(publishedAt);
  const slug = createSlug(title);

  const rss = <img src={`${theme === "dark" ? "/rss.png" : "/rss-w.png"}`} alt="logo" width={15} height={10} />
  const clock = <img src={`${theme === "dark" ? "/clock-l.png" : "/clock-b.png"}`} alt="logo" width={12} />

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favourite-articles") || "[]");
    setIsFav(favs.some((a: any) => a.url === article.url));
  }, [article.url]);

  const handleFavourite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const favs = JSON.parse(localStorage.getItem("favourite-articles") || "[]");
    let updated;
    if (isFav) {
      updated = favs.filter((a: any) => a.url !== article.url);
      if (onFavouriteToggle) onFavouriteToggle();
    }
    else updated = [...favs, article];

    localStorage.setItem("favourite-articles", JSON.stringify(updated));
    setIsFav(!isFav);
    window.dispatchEvent(new Event('favouritesUpdated'));
  };

  const handleClick = () => {
    localStorage.setItem(`article_${slug}`, JSON.stringify(article));
  };

  return (
    <div className={`${theme === "dark" ? "bg-white" : "bg-gray-800"} rounded-lg shadow-lg hover:shadow-lg hover:scale-105 transition-all duration-500 overflow-hidden flex flex-col h-full`}>
      <Link href={`/news/${slug}`} onClick={handleClick}>
        <div className="relative sm:h-40 hover:scale-102 transition-all duration-200">
          {urlToImage ? (
            <img
              src={urlToImage}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <img
                src="/placeholder.png"
                alt="No image available"
                className="max-w-20 max-h-20 object-contain opacity-50"
              />
            </div>
          )}
          <button
            onClick={handleFavourite}
            className="absolute top-1 right-1 p-2 bg-black/20 rounded-full backdrop-blur-sm transition-colors shadow-lg"
          >
            <img
              src={isFav ? "/fill-heart.png" : "/heart-b.png"}
              alt={isFav ? "Remove Favorite" : "Add Favorite"}
              width={16}
              height={16}
              className="hover:scale-120 active:scale-90 transition-all duration-300"
            />
          </button>
        </div>
        <div className="p-4 flex flex-col flex-grow cursor-pointer -mt-2">
          <h2 className={`text-lg font-semibold ${theme === "dark" ? "text-gray-900" : "dark:text-white"} mb-2 leading-tight line-clamp-2 hover:scale-102 transition-all duration-200`}>
            {title}
          </h2>
          <p className={`text-sm ${theme === "dark" ? "text-gray-600" : "text-gray-400"} line-clamp-2 mb-2 hover:scale-101 transition-all duration-200`}>
            {description || "No description available."}
          </p>
          <div className={`flex justify-between items-center text-xs mt-auto text-gray-500 pt-2 border-t ${theme === "dark" ? "border-gray-700" : "border-gray-100"}`}>
            <div className="flex  hover:scale-102 transition-all duration-200">{rss}
              <span className="truncate max-w-[100%]">{source?.name}</span>
            </div>
            <div className="flex items-center gap-1 hover:scale-102 transition-all duration-200">{clock}
              <span>{formattedDate}</span></div>
          </div>
        </div>
      </Link>
    </div>
  );
};