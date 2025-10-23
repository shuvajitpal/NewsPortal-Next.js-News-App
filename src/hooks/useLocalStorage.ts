"use client";
import type { Article } from "@/lib/constants";
import { useState, useEffect } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
};

export const useFavourites = () => {
  const [favourites, setFavourites] = useLocalStorage<Article[]>("favourite-articles", []);

  const addFavourite = (article: Article) => {
    setFavourites(prev => [...prev, article]);
  };

  const removeFavourite = (articleUrl: string) => {
    setFavourites(prev => prev.filter(article => article.url !== articleUrl));
  };

  const isFavourite = (articleUrl: string) => {
    return favourites.some(article => article.url === articleUrl);
  };

  return {
    favourites,
    addFavourite,
    removeFavourite,
    isFavourite,
    favouriteCount: favourites.length
  };
};