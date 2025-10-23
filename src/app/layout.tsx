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
      <body className="flex flex-col min-h-screen">
        <AppThemeProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </AppThemeProvider>
      </body>
    </html>
  );
}
