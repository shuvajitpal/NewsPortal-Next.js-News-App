"use client";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";

interface StatusMessageProps{
  type: 'loading' | 'error';
  message?: string;
}

export default function StatusMessage({ type, message }: StatusMessageProps) {
  const { theme } = useTheme();

  const defaultMessages = {
    loading: "Loading...",
    error: "Something went wrong. Please try again later."
  }

  const displayMessage = message || defaultMessages[type];
  const imageSrc = type === 'loading' ? "/loading.webp" : "/err.png";
  const altText = type === 'loading' ? "Loading" : "Error";

  return(
    <div className="flex flex-col items-center justify-center mt-20 text-2xl">
      <Image
        src={imageSrc}
        alt={altText}
        width={100}
        height={100}
        className="mb-4"
      />
      <p className={`text-center ${theme === "dark" ? "text-gray-800" : "text-gray-200"}`}>
        {displayMessage}
      </p>
    </div>
  )
}