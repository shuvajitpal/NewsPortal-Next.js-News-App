"use client";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import Image from "next/image";

interface StatusMessageProps {
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

  return (
    <motion.div
      className="sm"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Image
        src={imageSrc}
        alt={altText}
        width={100}
        height={100}
        className="mb-4"
      />
      <motion.p
        className={`text-center ${theme === "dark" ? "text-gray-800" : "text-gray-200"}`}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {displayMessage}
      </motion.p>
    </motion.div>
  )
}