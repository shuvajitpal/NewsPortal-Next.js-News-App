"use client";
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import ShareButtons from "@/components/ShareButtons";
import StatusMessage from "@/components/StatusMessage";

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
  const [error] = useState<string | null>(null);
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

  if (loading) return <StatusMessage type="loading" message="Loading Article..." />;
  if (error) return <StatusMessage type="error" message={error} />;
  if (!article) return <StatusMessage type="error" message="Article not found. Redirecting..." />;

  const author = <Image src="/person.png" alt="logo" width={10} height={10} />
  const calender = <Image src="/calender.png" alt="logo" width={10} height={10} />
  const rss = <Image src={`${theme === "dark" ? "/rss.png" : "/rss-w.png"}`} alt="logo" width={14} height={20} />

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="dm">
      <button
        onClick={() => router.back()}
        className={`${theme === "dark" ? "d-bk-l" : "d-bk-b"} d-bk`}
      >
        ←<span className="hover:underline"> Back to News</span>
      </button>

      <div className={`${theme === "dark" ? "bg-white" : "bg-gray-900"} d-wm`}>
        <div className="d-hfv">
          <h1 className={`d-h ${theme === "dark" ? "text-gray-900" : "text-white"}`}>
            {article.title}
          </h1>
          <button
            onClick={handleFavourite}
            className={`${theme === "dark" ? "bg-black/20" : "bg-white/20"} d-fv`}
          ><img
              src={isFav ? "/fill-heart.png" : theme === "dark"
                ? "/heart-l.png"
                : "/heart-b.png"}
              alt={isFav ? "Remove Favorite" : "Add Favorite"}
              width={16}
              height={16}
              className="d-fvi"
            /></button>
        </div>
        <div className={`${theme === "dark" ? "d-asd-l" : "d-asd-b"} d-asd`}>
          <span className="d-athr">{author}
            {article.author && (
              <span>{article.author}</span>
            )}
          </span>
          <span className="d-src">{rss}
            <span className="">Source: {article.source?.name}</span>
          </span>
          <span className="d-cl">{calender}
            <span>Published: {formattedDate}</span></span>
        </div>
        <div className={`d-imgw ${article.urlToImage ? "d-imgy" : "d-imgn"}`}>
          {article.urlToImage ? (
            <img
              src={article.urlToImage}
              alt={article.title}
              className=".d-img"
            />
          ) : (
            <div className="d-imgnw">
              <img
                src="/placeholder.png"
                alt="No image available"
                className="d-nimg"
              />
            </div>
          )}
        </div>
        <p className={`${theme === "dark" ? "text-gray-700" : "text-gray-300"} d-ct`}>
          {article.content}
          <br /><br />
          *For the Full Live Article, Please Visit the Original Source:*
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${theme === "dark" ? "text-indigo-600" : "text-indigo-400"} d-lk`}>
            🔗<span className="hover:underline">{article.url.split('/')[2]}</span>
          </a>
        </p>
        <ShareButtons url={article.url} title={article.title} />
      </div>
    </div>
  )
}