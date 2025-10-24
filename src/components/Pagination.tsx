"use client";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

interface PaginationProps {
  currentPage: number;
  totalResults: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalResults, pageSize = 10, onPageChange }) => {
  const { theme } = useTheme();

  const totalPages = Math.ceil(totalResults / pageSize);

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

  return (
    <motion.div
      className="flex flex-col items-center gap-4 my-2"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
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
        Showing {startResult} of {totalResults} results
      </div>
    </motion.div>
  )
}
export default Pagination;