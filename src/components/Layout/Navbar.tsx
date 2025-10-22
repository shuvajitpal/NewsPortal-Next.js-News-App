"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  const rss = <Image src={`${theme === "dark" ? "/rss.png" : "/rss-w.png"}`} alt="logo" width={40} height={40} />
  const home = <Image src={`${theme === "dark" ? "/home-l.png" : "/home-b.png"}`} alt="logo" width={25} height={25} />
  const favourite = <Image src={`${theme === "dark" ? "/heart-l.png" : "/heart-b.png"}`} alt="logo" width={25} height={25} />
  const change = <Image src={`${theme === "dark" ? "/moon.png" : "/sun.png"}`} alt="logo" width={25} height={25} />

  const bg =`${theme === "dark" ?  " hover:shadow-[0_0_10px_#f472b6]" : " hover:shadow-[0_0_10px_#fef3c7]"}`;

  return (
    <nav className={`${theme === "dark" ? "bg-white/90 text-black"
      : "bg-gray-900/90 text-white"} sticky top-0 z-50 backdrop-blur-sm flex justify-between items-center px-6 py-1 transition-all duration-500`}>
      <div className="flex items-start -ml-4">{rss}
        <h1 className="text-2xl font-extrabold mt-1.5">NewsPortal</h1>
      </div>
      <div className="flex items-end gap-6">
        <Link href="/" className={`round-bg ${bg}`}>{home}</Link>
        <Link href="/favourites" className={`round-bg ${bg}`}>{favourite}</Link>
        <button
          onClick={toggleTheme}
          className={`round-bg ${bg}`}
        >{change}</button>
      </div>
    </nav>
  )
}