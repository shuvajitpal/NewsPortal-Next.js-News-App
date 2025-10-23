"use client";
import { useTheme } from "@/context/ThemeContext";
import { socialMediaIcons } from "@/lib/constants";

export default function Footer() {
  const { theme } = useTheme();
  const h4 = `${theme === "dark" ? "text-gray-900" : "text-white"} foh4`;
  const ul = `${theme === "dark" ? "text-gray-700" : "text-gray-400"} ful`;

  return (
    <footer className={`${theme === "dark" ? 'fbg-l' : 'fbg-b'} fbg`}>
      <div className="fp">
        <div className="fg">
          <div>
            <h4 className={`${h4}`}>NewsPortal</h4>
            <ul className={`${ul}`}>
              <li className="fl">About Us</li>
              <li className="fl">API Sources</li>
              <li className="fl">Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h4 className={`${h4}`}>Top Categories</h4>
            <ul className={`${ul}`}>
              <li><a href="#" className="fl">Technology</a></li>
              <li><a href="#" className="fl">Business</a></li>
              <li><a href="#" className="fl">Sports</a></li>
            </ul>
          </div>
          <div>
            <h4 className={`${h4}`}>Support</h4>
            <ul className={`${ul}`}>
              <li><a href="#" className="fl">Contact</a></li>
              <li><a href="#" className="fl">FAQ</a></li>
              <li><a href="#" className="fl">Report Bug</a></li>
            </ul>
          </div>
          <div>
            <h4 className={`${h4}`}>Follow Us</h4>
            <div className="fig">
              {socialMediaIcons.map((src, i) => (
                <img key={i} src={src} alt="social" width={22} height={22} className="fi"/>
              ))}
            </div>
          </div>
        </div>
        <div className={`fmb ${theme === "dark" ? "border-gray-800" : "border-gray-300"} text-center`}>
          <p className={`text-sm ${theme === "dark" ? "text-gray-700" : "text-gray-300"}`}>
            © {new Date().getFullYear()} NewsPortal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}