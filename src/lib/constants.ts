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