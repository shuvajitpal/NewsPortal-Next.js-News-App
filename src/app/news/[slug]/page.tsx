"use client";
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

interface Article {
  title: string;
  description: string;
  content: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: { name: string; }
  author?: string;
}

export default function NewsDetailsPage() {
  const { theme } = useTheme();
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const slug = params.slug as string;
    console.log("Slug from URL:", slug);
    if (slug) {
      const savedArticle = localStorage.getItem(`article_${slug}`);
      console.log("Found article in localStorage:", !!savedArticle);
      if (savedArticle) setArticle(JSON.parse(savedArticle));
      else setTimeout(() => {
        router.push("/");
      }, 2000);
      setLoading(false);
    }
  }, [params.slug, router]);

  if (!article) return <p className="mt-6 text-center">Loadin Article...</p>

  const author = <Image src="/person.png" alt="logo" width={10} height={10} />
  const calender = <Image src="/calender.png" alt="logo" width={10} height={10} />
  const rss = <Image src={`${theme === "dark" ? "/rss.png" : "/rss-w.png"}`} alt="logo" width={14} height={20} />
  
   const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="max-w-4xl mx-auto px-4 mt-4 mb-10">
      <button
        onClick={() => router.back()}
        className={`flex items-center hover:underline ${theme === "dark" ? "text-indigo-600 hover:text-indigo-800" : "text-indigo-400 hover:text-indigo-300"} mb-4 font-medium transition-colors`}
      >
        ← Back to News
      </button>

      <div className={`${theme === "dark" ? "bg-white" : "bg-gray-800"} rounded-xl shadow-2xl p-6`}>
        <div className="flex justify-between items-start mb-4">
          <h1 className={`text-3xl font-extrabold mb-4 ${theme === "dark" ? "text-gray-900" : "text-white"}`}>
            {article.title}
          </h1>
        </div>
        <div className={`text-sm border-b ${theme === "dark" ? "text-gray-500 border-gray-700" : "text-gray-400 border-gray-200"} pb-4 mb-6 space-y-1 md:space-y-0 md:flex md:justify-between flex-col`}>
          <span className="flex font-semibold items-center space-x-1">{author}
            {article.author && (
              <span>{article.author}</span>
            )}
          </span>
          <span className="flex items-center space-x-1 -ml-0.5">{rss}
            <span className="">Source: {article.source?.name}</span>
          </span>
          <span className="flex items-center space-x-1">{calender}
            <span>Published: {formattedDate}</span></span>
        </div>
        {article.urlToImage && (
          <div className="relative w-full aspect-video mb-6 rounded-lg overflow-hidden"> {/*"relative w-full h-80 mb-6">*/}
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <p className={`text-lg ${theme === "dark" ? "text-gray-700" : "text-gray-300"} leading-relaxed mb-8 whitespace-pre-wrap`}>
          {article.content}
          <br /><br />
          *For the full, live article, please visit the original source:*
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${theme === "dark" ? "text-indigo-600" : "text-indigo-400"} hover:underline flex items-center mt-2`}>
            🔗 {article.url.split('/')[2]}
          </a>
        </p>
      </div>
    </div>
  )
}