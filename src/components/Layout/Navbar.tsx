"use client";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [favouriteCount, setFavouriteCount] = useState(0);
  
  const { theme, toggleTheme } = useTheme();

  const pathname = usePathname();

  useEffect(() => {
    const updateFavouriteCount = () => {
      const saved = localStorage.getItem("favourite-articles");
      if (saved) {
        const favourites = JSON.parse(saved);
        setFavouriteCount(favourites.length);
      } else {
        setFavouriteCount(0);
      }
    };
    updateFavouriteCount();
    window.addEventListener('storage', updateFavouriteCount);
    window.addEventListener('favouritesUpdated', updateFavouriteCount);
    const interval = setInterval(updateFavouriteCount, 1000);

    return () => {
      window.removeEventListener('storage', updateFavouriteCount);
      window.removeEventListener('favouritesUpdated', updateFavouriteCount);
      clearInterval(interval);
    };
  }, []);

  const rss = <Image src={`${theme === "dark" ? "/rss.png" : "/rss-w.png"}`} alt="logo" width={40} height={40} />
  const home = <Image src={`${theme === "dark" ? "/home-l.png" : "/home-b.png"}`} alt="logo" width={25} height={25} className="active:scale-80" />
  const favourite = <Image src={`${theme === "dark" ? "/heart-l.png" : "/heart-b.png"}`} alt="logo" width={25} height={25} className="active:scale-80" />
  const change = <Image src={`${theme === "dark" ? "/moon.png" : "/sun.png"}`} alt="logo" width={25} height={25} className="active:scale-80" />

  const bg = `${theme === "dark" ? " hover:shadow-[0_0_10px_#f472b6]" : " hover:shadow-[0_0_10px_#fef3c7]"}`;

  const isFavouritePage = pathname === '/favourites';
  const isHomePage = pathname === '/';

  return (
    <nav className={`${theme === "dark" ? "bg-white/30 text-black shadow-[0_6px_15px_rgba(0,0,0,0.4)]"
      : "bg-black/30 text-white shadow-[0_6px_15px_rgba(255,255,255,0.4)]"} sticky top-0 z-50 backdrop-blur-sm flex justify-between items-center px-6 py-1 transition-all duration-500`}>
      <div className="flex items-start -ml-4">{rss}
        <h1 className="text-2xl font-extrabold mt-1.5">NewsPortal</h1>
      </div>
      <div className="flex items-end gap-6">
        {!isHomePage && (
          <Link href="/" className={`round-bg ${bg}`}>{home}</Link>
        )}
        {!isFavouritePage && (
          <Link href="/favourites" className={`round-bg ${bg} relative`}>
            {favourite}
            {favouriteCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {favouriteCount > 99 ? '99+' : favouriteCount}
              </span>
            )}
          </Link>
        )}
        <button
          onClick={toggleTheme}
          className={`round-bg ${bg}`}
        >{change}</button>
      </div>
    </nav>
  )
}