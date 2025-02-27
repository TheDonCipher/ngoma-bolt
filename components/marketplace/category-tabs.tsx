import { motion } from 'framer-motion';

interface CategoryTabsProps {
  categories: { id: string; name: string }[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export function CategoryTabs({
  categories,
  activeCategory,
  setActiveCategory,
}: CategoryTabsProps) {
  return (
    <div className="flex justify-center">
      <div className="bg-gray-100 p-1.5 rounded-full flex flex-wrap justify-center gap-1">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`relative px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
              activeCategory === category.id
                ? 'text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {activeCategory === category.id && (
              <motion.span
                layoutId="activeCategoryBg"
                className="absolute inset-0 bg-gradient-to-r from-amber-500 to-pink-600 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
