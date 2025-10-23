"use client";
import { useTheme } from "@/context/ThemeContext";

interface PaginationProps {
  currentPage: number;
  totalResults: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalResults, pageSize = 10, onPageChange }) => {
  const totalPages = Math.ceil(totalResults / pageSize);
  const { theme } = useTheme();

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
    <div className="flex flex-col items-center gap-4 my-2">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-2 py-1 rounded-md text-sm font-medium transition-all duration-200 ${theme === "dark"
            ? "bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400"
            : "bg-gray-700 text-white hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500"
            }`}
        >
          Prev
        </button>

        <div className="flex items-center gap-1">
          {pageNumbers.map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && onPageChange(page)}
              disabled={page === '...'}
              className={`min-w-[30px] h-5 flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 ${page === currentPage
                ? "bg-indigo-600 text-white"
                : page === '...'
                  ? "text-gray-500 cursor-default"
                  : theme === "dark"
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-2 py-1 rounded-md text-sm font-medium transition-all duration-200 ${theme === "dark"
              ? "bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400"
              : "bg-gray-700 text-white hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500"
            }`}
        >
          Next
        </button>
      </div>
      <div className={`text-sm -mt-2 mb-2 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`}>
        Showing {startResult} of {totalResults} results
      </div>
    </div>
  )
}
export default Pagination;