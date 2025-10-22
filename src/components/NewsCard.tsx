"use client";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

interface NewsCardProps {
  article: {
    source: { name: string; }
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
  }
}

export default function NewsCard({ article }: NewsCardProps) {
  const { title, description, url, urlToImage, publishedAt, source } = article;
  const { theme } = useTheme();
  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  const rss = <img src={`${theme === "dark" ? "/rss.png" : "/rss-w.png"}`} alt="logo" width={15} height={10} />
  const clock = <img src={`${theme === "dark" ? "/clock-l.png" : "/clock-b.png"}`} alt="logo" width={12} />

  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 100);
  };

  const slug = createSlug(title);

  const handleClick = () => {
  console.log("Storing article with slug:", slug);
  console.log("Article data:", article);
  localStorage.setItem(`article_${slug}`, JSON.stringify(article));
  
  const stored = localStorage.getItem(`article_${slug}`);
  console.log("Storage test - retrieved:", !!stored);
};

  return (
    <div className={`${theme === "dark" ? "bg-white" : "bg-gray-800"} rounded-lg shadow-lg hover:shadow-lg hover:scale-105 transition-all duration-500 overflow-hidden flex flex-col h-full`}>
      <Link href={`/news/${slug}`} onClick={handleClick}>
        <div className="relative sm:h-40 hover:scale-102 transition-all duration-200">
          <img
            src={urlToImage || "/placeholder.png"}
            alt={title}
            className={
              urlToImage
                ? "w-full h-full object-cover"
                : "max-w-30 max-h-30 object-contain opacity-70 ml-26 mt-8"
            }
          />

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