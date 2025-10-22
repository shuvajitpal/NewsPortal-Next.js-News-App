"use client";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

const categories = [
  "General",
  "Business",
  "Technology",
  "Science",
  "Health",
  "Sports",
  "Entertainment",
];

interface CategoryListProp {
  selectedCategory?: string;
}

const CategoryList: React.FC<CategoryListProp> = ({ selectedCategory }) => {
  const router = useRouter();
  const {theme} = useTheme();

  const handleClick = (category: string) => {
    if (selectedCategory === category || category === "General") router.push("/");
    else router.push(`/category/${category.toLowerCase()}`);
  }

  const isSelected = (cat: string) => {
    if (cat === "General") return !selectedCategory;
    return selectedCategory && selectedCategory.toLowerCase() === cat.toLowerCase();
  }

  return (
    <div className="flex flex-wrap gap-2 mt-4 -mb-5 ml-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleClick(cat)}
          className={`px-4 py-0.5 rounded-full transition-colors font-medium ${isSelected(cat)
              ? "bg-blue-600 text-white"
              : `${theme === "dark" ? "bg-gray-200 text-gray-700 hover:bg-gray-300" : "bg-gray-700 text-gray-300 hover:bg-gray-600"} transition-all duration-500`}`}>
          {cat}
        </button>
      ))}
    </div>
  )
}
export default CategoryList;