"use client";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

interface PaginationProps {
  currentPage: number;
  totalResults: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
  currentArticlesCount?: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalResults, pageSize = 10, onPageChange, currentArticlesCount }) => {
  const { theme } = useTheme();

  const totalPages = Math.ceil(totalResults / pageSize);

  const isLastPage = currentPage === totalPages;
  const expectedArticles = isLastPage ? totalResults - ((totalPages - 1) * pageSize) : pageSize;
  const hasIncompletePage = currentArticlesCount && currentArticlesCount < expectedArticles && !isLastPage;

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const showPages = 4;
    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();
  const startResult = (currentPage - 1) * pageSize + 1;
  const endResult = Math.min(startResult + (currentArticlesCount || pageSize) - 1, totalResults);

  return (
    <motion.div
      className="flex flex-col items-center gap-4 my-2"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {hasIncompletePage && (
        <div className="text-sm text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900 px-3 py-1 rounded">
          Showing {currentArticlesCount} of {expectedArticles} expected articles (API limitation)
        </div>
      )}

      <div className="flex items-center gap-2">
        <motion.button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`pgbp ${theme === "dark" ? "pgbp-l" : "pgbp-b"}`}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Prev
        </motion.button>

        <div className="pgnw">
          {pageNumbers.map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && onPageChange(page)}
              disabled={page === '...'}
              className={`pgnb ${page === currentPage ? "pghnbc" : page === '...' ? "pgnbcn" : theme === "dark" ? "pgnb-l" : "pgnb-b"}`}>
              {page}
            </button>
          ))}
        </div>

        <motion.button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`pgn ${theme === "dark" ? "pgn-l" : "pgn-b"}`}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          Next
        </motion.button>
      </div>
      <div className={`pgs ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`}>
        Showing {startResult}-{endResult} of {totalResults} results
        {hasIncompletePage && " (limited by API)"}
      </div>
    </motion.div>
  )
}
export default Pagination;