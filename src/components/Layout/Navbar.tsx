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
    <nav className={`${theme === "dark" ? "nvw-l"
      : "nvw-b"} nvw`}>
      <div className="nvrss">{rss}
        <h1 className="nvh">NewsPortal</h1>
      </div>
      <div className="nvhi">
        {!isHomePage && (
          <Link href="/" className={`round-bg ${bg}`}>{home}</Link>
        )}
        {!isFavouritePage && (
          <Link href="/favourites" className={`round-bg ${bg} relative`}>
            {favourite}
            {favouriteCount > 0 && (
              <span className="nvfv">
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