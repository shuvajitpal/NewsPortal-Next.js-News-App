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
    <div className="shw">
      <span className={`shs ${theme === "dark" ? "text-gray-600" : "text-gray-300"}`}>Share:</span>
      <a
        href={twitterShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="sht"
      ><span>{tw}</span>Twitter
      </a>
      <a
        href={linkedinShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="shl"
      ><span>{lin}</span>Linkedin
      </a>
      <a
        href={whatsappShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="shw"
      ><span>{wp}</span>WhatsApp
      </a>
      <a
        href={facebookShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="shf"
      ><span>{fb}</span>Facebook
      </a>
      <button onClick={handleCopy} className="shc">
        <span>{cp}</span> Copy
      </button >
      {copied && <span className="shcd">Copied!</span>}
    </div>
  )
}