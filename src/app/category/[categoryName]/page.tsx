"use client";
import { useTheme } from "@/context/ThemeContext";
import { useParams } from "next/navigation";
import Header from "@/components/Layout/Header";
import NewsCard from "@/components/NewsCard";
import CategoryList from "@/components/CategoryList";
import useFetchNews from "@/hooks/useFetchNews";
import Pagination from "@/components/Pagination";
import { useEffect, useState } from "react";

export default function CategoryPage(){
  const { theme } = useTheme();
  const params = useParams();
  const categoryParam = params.categoryName;
  const category = Array.isArray(categoryParam) ? categoryParam[0] : categoryParam;
  const formattedCategory = category?.toLowerCase();

  const [page, setPage] = useState(1);

  const { articles, loading, error, totalResults} = useFetchNews(undefined, formattedCategory, page);

  useEffect(() =>{
    setPage(1);
  },[formattedCategory])

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    console.log("Current category:", formattedCategory);
    console.log("Articles:", articles);
  },[formattedCategory, articles])

  return(
    <div>
      <Header />
      <CategoryList selectedCategory={category} />

      {category && (
        <div className="text-center mt-8">
          <h1 className="text-2xl font-bold animated-rainbow-text capitalize">
            {category} News
          </h1>
        </div>
      )}

      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-2 p-4">
        {articles.length > 0 ? (
          articles.map((article, i) => <NewsCard key={i} article={article} />)
        ) : (
          !loading && <p className="text-center text-gray-500">No news found.</p>
        )}
      </section>
      {!loading && !error && totalResults > 10 && (
        <Pagination 
          currentPage={page}
          totalResults={totalResults}
          pageSize={9}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}