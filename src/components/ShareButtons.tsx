"use client";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ShareButtonProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }

  const ecoUrl = encodeURIComponent(url);
  const ecoTitle = encodeURIComponent(title);

  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${ecoUrl}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${ecoUrl}&text=${ecoTitle}&via=NewsPortal`;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${ecoTitle}%20${ecoUrl}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${ecoUrl}&quote=${ecoTitle}`;

  const wp = <Image src="/wpw.png" alt="logo" width={14} height={20} />
  const fb = <Image src="/fbw.png" alt="logo" width={14} height={20} />
  const lin = <Image src="/inw.png" alt="logo" width={14} height={20} />
  const tw = <Image src="/twtw.png" alt="logo" width={14} height={20} />
  const cp = <Image src="/cpw.png" alt="" width={14} height={20} />

  const buttonVariants = { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }, hover: { scale: 1.1, transition: { duration: 0.2 } }, tap: { scale: 0.9 } };

  return (
    <motion.div
      className="shw"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <span className={`shs ${theme === "dark" ? "text-gray-600" : "text-gray-300"}`}>Share:</span>
      <motion.a
        href={twitterShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="sht"
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
      ><span>{tw}</span>Twitter
      </motion.a>
      <motion.a
        href={linkedinShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="shl"
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
      ><span>{lin}</span>Linkedin
      </motion.a>
      <motion.a
        href={whatsappShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="shwp"
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
      ><span>{wp}</span>WhatsApp
      </motion.a>
      <motion.a
        href={facebookShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="shf"
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
      ><span>{fb}</span>Facebook
      </motion.a>
      <motion.button
        onClick={handleCopy}
        className="shc"
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
      >
        <span>{cp}</span> Copy
      </motion.button>
      {copied && <motion.span
        className="shcd"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
      >
        Copied!
      </motion.span>}
    </motion.div>
  )
}