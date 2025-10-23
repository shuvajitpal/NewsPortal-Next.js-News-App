"use client";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import Image from "next/image";

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

  return (
    <div className="border-t border-gray-500 pt-4 flex flex-wrap gap-2">
      <span className={`text-sm font-semibold mt-0.5 ${theme === "dark" ? "text-gray-600" : "text-gray-300"}`}>Share:</span>
      <a
        href={twitterShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center px-4 py-0.5 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition-colors shadow-md gap-1 shadow-white/40"
      ><span>{tw}</span>Twitter
      </a>
      <a
        href={linkedinShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center px-4 py-0.5 bg-blue-800 text-white rounded-full text-sm hover:bg-blue-900 transition-colors shadow-md gap-1 shadow-white/40"
      ><span>{lin}</span>Linkedin
      </a>
      <a
        href={whatsappShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center px-4 py-0.5 bg-green-500 text-white rounded-full text-sm hover:bg-green-600 transition-colors shadow-md gap-1 shadow-white/60"
      ><span>{wp}</span>WhatsApp
      </a>
      <a
        href={facebookShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center px-4 py-0.5 bg-blue-700 text-white rounded-full text-sm hover:bg-blue-800 transition-colors shadow-md gap-1 shadow-white/40"
      ><span>{fb}</span>Facebook
      </a>
      <button onClick={handleCopy} className="flex items-center px-4 py-0.5 bg-gray-500 text-white rounded-full text-sm hover:bg-gray-400 transition-colors shadow-md gap-1 shadow-white/20">
        <span>{cp}</span> Copy
      </button >
      {copied && <span className="text-sm text-green-500 mt-0.5">Copied!</span>}
    </div>
  )
}