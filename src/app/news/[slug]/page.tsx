"use client";
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import ShareButtons from "@/components/ShareButtons";
import StatusMessage from "@/components/StatusMessage";
import { motion } from "framer-motion";

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
    window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
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
    <motion.div 
      className="dm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        onClick={() => router.back()}
        className={`${theme === "dark" ? "d-bk-l" : "d-bk-b"} d-bk`}
        whileHover={{ x: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        ←<span className="hover:underline"> Back to News</span>
      </motion.button>

      <motion.div 
        className={`${theme === "dark" ? "bg-white" : "bg-gray-900"} d-wm`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <div className="d-hfv">
          <motion.h1 
            className={`d-h ${theme === "dark" ? "text-gray-900" : "text-white"}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {article.title}
          </motion.h1>
          <motion.button
            onClick={handleFavourite}
            className={`${theme === "dark" ? "bg-black/20" : "bg-white/20"} d-fv`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <img
              src={isFav ? "/fill-heart.png" : theme === "dark" ? "/heart-l.png" : "/heart-b.png"}
              alt={isFav ? "Remove Favorite" : "Add Favorite"}
              width={16}
              height={16}
              className="d-fvi"
            />
          </motion.button>
        </div>
        <motion.div 
          className={`${theme === "dark" ? "d-asd-l" : "d-asd-b"} d-asd`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
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
        </motion.div>
        <motion.div 
          className={`d-imgw ${article.urlToImage ? "d-imgy" : "d-imgn"}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
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
        </motion.div>
        <motion.p 
          className={`${theme === "dark" ? "text-gray-700" : "text-gray-300"} d-ct`}
          initial={{ y: 20, opacity: 0 }}
          transition={{ delay: 0.3 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {article.content}
          <br /><br />
          *For the Full Live Article, Please Visit the Original Source:*
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${theme === "dark" ? "text-indigo-600" : "text-indigo-400"} d-lk`}>
            🔗<span className="hover:underline active:scale-60 transition-all duration-300">{article.url.split('/')[2]}</span>
          </a>
        </motion.p>
        <ShareButtons url={article.url} title={article.title} />
      </motion.div>
    </motion.div>
  )
}