"use client"
import { motion } from "framer-motion";

export default function Header() {
  return(
  <motion.header 
      className="hdh"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: "spring" }}
    >
    <div className="hd">
      📰 Breaking News: Stay Updated with Latest Headlines from Around the World | Real-time News Coverage
    </div>
  </motion.header>
  );
}