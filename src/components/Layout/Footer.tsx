"use client";
import { useTheme } from "@/context/ThemeContext";
import { socialMediaIcons } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  const { theme } = useTheme();
  const router = useRouter();
  const h4 = `${theme === "dark" ? "text-gray-900" : "text-white"} foh4`;
  const ul = `${theme === "dark" ? "text-gray-700" : "text-gray-400"} ful`;

  const handleCategory = (category: string) => {
    router.push(`/category/${category.toLowerCase()}`);
  };

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

  return (
    <motion.footer
      className={`${theme === "dark" ? 'fbg-l' : 'fbg-b'} fbg`}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1, type: "spring" }}
    >
      <div className="fp">
        <motion.div
          className="fg"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div>
            <h4 className={`${h4}`}>NewsPortal</h4>
            <ul className={`${ul}`}>
              <li className="fl ">About Us</li>
              <li><Link href="/api-source" className="fl">
                API Sources
              </Link></li>
              <li className="fl ">Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h4 className={`${h4}`}>Top Categories</h4>
            <ul className={`${ul}`}>
              <li><button
                onClick={() => handleCategory("technology")}
                className="flb"
              >Technology
              </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategory("business")}
                  className="flb"
                >Business
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategory("sports")}
                  className="flb"
                >Sports
                </button></li>
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
                <img key={i} src={src} alt="social" width={22} height={22} className="fi" />
              ))}
            </div>
          </div>
        </motion.div>
        <motion.div
          className={`fmb ${theme === "dark" ? "border-gray-800" : "border-gray-300"} text-center`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className={`text-sm ${theme === "dark" ? "text-gray-700" : "text-gray-300"}`}>
            © {new Date().getFullYear()} NewsPortal. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  )
}