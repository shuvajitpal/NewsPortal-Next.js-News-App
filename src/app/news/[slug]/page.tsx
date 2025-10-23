"use client";
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import ShareButtons from "@/components/ShareButtons";

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
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const slug = params.slug as string;
    console.log("Slug from URL:", slug);
    const savedArticle = localStorage.getItem(`article_${slug}`);
    if (savedArticle) {
      const parsed = JSON.parse(savedArticle);
      setArticle(parsed);
      const favs = JSON.parse(localStorage.getItem("favourite-articles") || "[]");
      setIsFav(favs.some((fav: Article) => fav.url === parsed.url));
    } else setTimeout(() => {
      router.push("/");
    }, 2000);
    setLoading(false);
  }, [params.slug, router]);

  const handleFavourite = () => {
    if (!article) return;
    const stored = JSON.parse(localStorage.getItem("favourite-articles") || "[]");
    let updated;

    if (isFav) {
      updated = stored.filter((a: Article) => a.url !== article.url);
    } else {
      updated = [...stored, article];
    }

    localStorage.setItem("favourite-articles", JSON.stringify(updated));
    setIsFav(!isFav);
  };

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
        className={`flex items-center ${theme === "dark" ? "text-indigo-600 hover:text-indigo-800" : "text-indigo-400 hover:text-indigo-300"} mb-4 font-medium transition-colors gap-0.5`}
      >
        ←<span className="hover:underline"> Back to News</span>
      </button>

      <div className={`${theme === "dark" ? "bg-white" : "bg-gray-900"} relative rounded-xl shadow-2xl p-6`}>
        <div className="flex justify-between items-start -mb-1">
          <h1 className={`text-3xl font-extrabold mb-4 ${theme === "dark" ? "text-gray-900" : "text-white"}`}>
            {article.title}
          </h1>
          <button
            onClick={handleFavourite}
            className={`absolute top-2 right-2 p-2 ${theme === "dark" ? "bg-black/20" : "bg-white/20"} rounded-full backdrop-blur-sm transition-colors shadow-lg`}
          ><img
              src={isFav ? "/fill-heart.png" : theme === "dark"
                ? "/heart-l.png"
                : "/heart-b.png"}
              alt={isFav ? "Remove Favorite" : "Add Favorite"}
              width={16}
              height={16}
              className="hover:scale-120 active:scale-90 transition-all duration-300"
            /></button>
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
        <div className={`mb-2 rounded-lg overflow-hidden ${article.urlToImage ? "w-full aspect-video" : "h-15 flex items-center justify-center"}`}>
          {article.urlToImage ? (
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <img
                src="/placeholder.png"
                alt="No image available"
                className="max-w-16 max-h-16 object-contain opacity-40"
              />
            </div>
          )}
        </div>
        <p className={`text-lg ${theme === "dark" ? "text-gray-700" : "text-gray-300"} leading-relaxed mb-8 whitespace-pre-wrap`}>
          {article.content}
          <br /><br />
          *For the Full Live Article, Please Visit the Original Source:*
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${theme === "dark" ? "text-indigo-600" : "text-indigo-400"}  flex items-center mt-2 gap-0.5`}>
            🔗<span className="hover:underline">{article.url.split('/')[2]}</span>
          </a>
        </p>
        <ShareButtons url={article.url} title={article.title} />
      </div>
    </div>
  )
}