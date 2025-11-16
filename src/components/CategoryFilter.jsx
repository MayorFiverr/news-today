const categories = [
  { label: "All", value: "all" },
  { label: "Top Stories", value: "top" },
  { label: "World", value: "world" },
  { label: "Politics", value: "politics" },
  { label: "Business", value: "business" },
  { label: "Tech", value: "technology" },
];

export default function CategoryFilter({ activeCategory, onCategoryChange }) {
  return (
    <div className="flex gap-3 sm:gap-4 my-6 overflow-x-auto no-scrollbar whitespace-nowrap justify-center sm:justify-start scroll-smooth touch-pan-x">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onCategoryChange(cat.value)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all shrink-0
            ${
              activeCategory === cat.value
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
