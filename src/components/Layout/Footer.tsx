"use client";

import { useTheme } from "@/context/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();
  const h4 = `${theme === "dark" ? "text-gray-900" : "text-white"} mb-3 text-md font-semibold transition-colors`;
  const ul = `${theme === "dark" ? "text-gray-700" : "text-gray-400"} space-y-2 text-sm`;
  const icons = [
    "/github.png", "/linkedin.png", "/twitter.png", "/youtube.png",
    "/facebook.png", "/instagram.png"
  ];

  return (
    <footer className={`${theme === "dark" ? "bg-white"
      : "bg-black"} px-6 py-1 transition-all duration-500`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className={`${h4}`}>NewsPortal</h4>
            <ul className={`${ul}`}>
              <li className="hover:text-indigo-600 transition-colors">About Us</li>
              <li className="hover:text-indigo-600 transition-colors">API Sources</li>
              <li className="hover:text-indigo-600 transition-colors">Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h4 className={`${h4}`}>Top Categories</h4>
            <ul className={`${ul}`}>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Technology</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Business</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Sports</a></li>
            </ul>
          </div>
          <div>
            <h4 className={`${h4}`}>Support</h4>
            <ul className={`${ul}`}>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Report Bug</a></li>
            </ul>
          </div>
          <div>
            <h4 className={`${h4}`}>Follow Us</h4>
            <div className="flex flex-wrap gap-2 max-w-[120px]">
              {icons.map((src, i) => (
                <img key={i} src={src} alt="social" width={22} height={22} className="cursor-pointer hover:scale-120 transition-transform" />
              ))}
            </div>
          </div>
        </div>
        <div className={`mt-5 pt-6 border-t ${theme === "dark" ? "border-gray-800" : "border-gray-300"} text-center`}>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} NewsPortal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}