"use client";
import { ThemeProvider } from "@/context/ThemeContext";

export default function AppThemeProvider({children}: {children: React.ReactNode}) {
  return <ThemeProvider>{children}</ThemeProvider>
}