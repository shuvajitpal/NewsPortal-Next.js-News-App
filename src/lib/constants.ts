export interface Article {
  source: { name: string; }
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
  author?: string;
}

export interface NewsCardProps {
  article: Article;
  onFavouriteToggle?: () => void;
}

export interface ShareButtonProps {
  url: string;
  title: string;
}

export interface PaginationProps {
  currentPage: number;
  totalResults: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
}

export const Categories = [
  "General",
  "Business",
  "Technology", 
  "Science",
  "Health",
  "Sports",
  "Entertainment",
];

export const socialMediaIcons = [
  "/github.png", "/linkedin.png", "/twitter.png", "/youtube.png",
  "/facebook.png", "/instagram.png"
];

export const socialMediaLinks = [
    "https://github.com/shuvajitpal", // github
    "https://www.linkedin.com/in/shuvajit-pal-a324241b2", // linkedin
    "https://x.com/shuvajitpal103", // twitter
    null, // youtube (no link)
    "https://www.facebook.com/share/1D4zcTSDzz/", // facebook
    "https://www.instagram.com/shuvajit.pal?igsh=czlhNHFkb2htajQ3" // instagram
  ];