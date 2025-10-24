"use client";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { Categories } from "@/lib/constants";
import { motion } from "framer-motion";

interface CategoryListProp {
  selectedCategory?: string;
}

const CategoryList: React.FC<CategoryListProp> = ({ selectedCategory }) => {
  const { theme } = useTheme();
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
    <motion.div
      className="ctw"
      initial={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: false, amount: 0.2 }}

    >
      {Categories.map((cat, index) => (
        <motion.button
          key={cat}
          onClick={() => handleClick(cat)}
          className={`ctb ${isSelected(cat) ? "ctbs" : `${theme === "dark" ? "ctb-l" : "ctb-b"}`}`}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          {cat}
        </motion.button>
      ))}
    </motion.div>
  )
}
export default CategoryList;