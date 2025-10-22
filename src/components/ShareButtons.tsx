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

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const ecoUrl = encodeURIComponent(url);
  const ecoTitle = encodeURIComponent(title);
  const { theme } = useTheme();

  
  const wp = <Image src="/wpw.png" alt="logo" width={14} height={20} />
  const fb = <Image src="/fbw.png" alt="logo" width={14} height={20} />
  const lin = <Image src="/inw.png" alt="logo" width={14} height={20} />
  const tw = <Image src="/twtw.png" alt="logo" width={14} height={20} />
  const cp = <Image src="/cpw.png" alt="" width={14} height={20} />

  return (
    <div className="border-t border-gray-500 pt-4 flex flex-wrap gap-2">
      <span className={`text-sm font-semibold mt-0.5 ${theme === "dark" ? "text-gray-600" : "text-gray-300"}`}>Share:</span>
      <a
        href={`https://twitter.com/intent/tweet?url=${ecoUrl}&text=${ecoTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center px-4 py-0.5 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition-colors shadow-md gap-1"
      ><span>{tw}</span>Twitter
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?url=${ecoUrl}&title=${ecoTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center px-4 py-0.5 bg-blue-800 text-white rounded-full text-sm hover:bg-blue-900 transition-colors shadow-md gap-1"
      ><span>{lin}</span>Linkedin
      </a>
      <a
        href={`https://www.whatsapp.com/sharer/sharer.php?u=${ecoUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center px-4 py-0.5 bg-green-500 text-white rounded-full text-sm hover:bg-green-600 transition-colors shadow-md gap-1"
      ><span>{wp}</span>WhatsApp
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${ecoUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center px-4 py-0.5 bg-blue-700 text-white rounded-full text-sm hover:bg-blue-800 transition-colors shadow-md gap-1"
      ><span>{fb}</span>Facebook
      </a>
      <button onClick={handleCopy} className="flex items-center px-4 py-0.5 bg-gray-500 text-white rounded-full text-sm hover:bg-gray-400 transition-colors shadow-md gap-1">
       <span>{cp}</span> Copy
      </button >
      {copied && <span className="text-sm text-green-500">Copied!</span>}
    </div>
  )
}