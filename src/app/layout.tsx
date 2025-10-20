// import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Layout/Navbar";
import AppThemeProvider from "./theme-provider";
import Footer from "@/components/Layout/Footer";

export const metadata = {
  title: "NewsPortal",
  description: "Latest news, categories, and trends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white">
        <AppThemeProvider>
          <Navbar />
        {children}
        <Footer />
        </AppThemeProvider>
      </body>
    </html>
  );
}
