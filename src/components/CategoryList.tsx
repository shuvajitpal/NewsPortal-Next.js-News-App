"use client";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { Categories } from "@/lib/constants";

interface CategoryListProp {
  selectedCategory?: string;
}

const CategoryList: React.FC<CategoryListProp> = ({ selectedCategory }) => {
  const {theme} = useTheme();

  const router = useRouter();

  const handleClick = (category: string) => {
    if (selectedCategory === category || category === "General") router.push("/");
    else router.push(`/category/${category.toLowerCase()}`);
  }

  const isSelected = (cat: string) => {
    if (cat === "General") return !selectedCategory;
    return selectedCategory && selectedCategory.toLowerCase() === cat.toLowerCase();
  }

  return (
    <div className="ctw">
      {Categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleClick(cat)}
          className={`ctb ${isSelected(cat) ? "ctbs" : `${theme === "dark" ? "ctb-l" : "ctb-b"}`}`}>
          {cat}
        </button>
      ))}
    </div>
  )
}
export default CategoryList;