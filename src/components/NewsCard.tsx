"use client";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";
import { createSlug, formatDate } from "@/lib/utils";
import { NewsCardProps } from "@/lib/constants";

export default function NewsCard({ article, onFavouriteToggle }: NewsCardProps) {
  const [isFav, setIsFav] = useState(false);

  const { title, description, urlToImage, publishedAt, source } = article;
  const { theme } = useTheme();

  const formattedDate = formatDate(publishedAt);
  const slug = createSlug(title);

  const rss = <img src={`${theme === "dark" ? "/rss.png" : "/rss-w.png"}`} alt="logo" width={15} height={10} />
  const clock = <img src={`${theme === "dark" ? "/clock-l.png" : "/clock-b.png"}`} alt="logo" className="icon-sm"/>

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
    <div className={`${theme === "dark" ? "bg-white" : "bg-gray-800"} card`}>
      <Link href={`/news/${slug}`} onClick={handleClick}>
        <div className="cd-wimg">
          {urlToImage ? (
            <img
              src={urlToImage}
              alt={title}
              className="nci"
            />
          ) : (
            <div className="ncin">
              <img
                src="/placeholder.png"
                alt="No image available"
                className="cd-mimg"
              />
            </div>
          )}
          <button
            onClick={handleFavourite}
            className="cd-fv"
          >
            <img
              src={isFav ? "/fill-heart.png" : "/heart-b.png"}
              alt={isFav ? "Remove Favorite" : "Add Favorite"}
              width={16}
              height={16}
              className="fv-hv"
            />
          </button>
        </div>
        <div className="card-content">
          <h2 className={`${theme === "dark" ? "text-gray-900" : "dark:text-white"} card-title`}>
            {title}
          </h2>
          <p className={`${theme === "dark" ? "text-gray-600" : "text-gray-400"} card-desc`}>
            {description || "No description available."}
          </p>
          <div className={`card-meta ${theme === "dark" ? "border-gray-700" : "border-gray-100"}`}>
            <div className="cd-img">{rss}
              <span className="truncate max-w-[100%]">{source?.name}</span>
            </div>
            <div className="cd-img gap-1">{clock}
              <span>{formattedDate}</span></div>
          </div>
        </div>
      </Link>
    </div>
  );
};