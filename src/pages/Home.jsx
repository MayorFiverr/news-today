import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import SearchBar from "../components/HomeComponents/SearchBar";
import CategoryFilter from "../components/HomeComponents/CategoryFilter";
import HeroNews from "../components/HomeComponents/HeroNews";
import NewsGrid from "../components/HomeComponents/NewsGrid";

export default function Home() {
  const { isDark } = useTheme();

  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [heroArticle, setHeroArticle] = useState(null);
  const [gridArticles, setGridArticles] = useState([]);
  const [loadingHero, setLoadingHero] = useState(true);
  const [loadingGrid, setLoadingGrid] = useState(true);
  const [error, setError] = useState("");

  // Load Hero article
  useEffect(() => {
    const fetchHero = async () => {
      try {
        setLoadingHero(true);
        setError("");
        const res = await fetch("/api/news?category=general&pageSize=1");
        const data = await res.json();

        if (data.articles && data.articles.length > 0) {
          setHeroArticle(data.articles[0]);
        } else {
          setError("No hero article found.");
        }
      } catch (err) {
        console.error(err);
        setError("Unable to fetch news at the moment.");
      } finally {
        setLoadingHero(false);
      }
    };

    fetchHero();
  }, []);

  // Load grid articles + search/category
  useEffect(() => {
    const fetchGrid = async () => {
      try {
        setLoadingGrid(true);
        setError("");

        let url = `/api/news?category=${category}`;
        if (searchTerm) url += `&q=${encodeURIComponent(searchTerm)}`;

        const res = await fetch(url);
        const data = await res.json();

        if (data.articles && data.articles.length > 0) {
          setHeroArticle(data.articles[0]);
          setGridArticles(data.articles);
        } else {
          setHeroArticle(null);
          setGridArticles([]);
          setError("No articles found for this category or search.");
        }
      } catch (err) {
        console.error(err);
        setError("Unable to fetch news at the moment.");
      } finally {
        setLoadingGrid(false);
      }
    };

    fetchGrid();
  }, [category, searchTerm]);

  return (
    <div
      className={`font-playfair px-4 sm:px-10 py-6 max-w-4xl mx-auto min-h-screen transition-colors duration-300 ${
        isDark ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Search */}
      <SearchBar onSearch={setSearchTerm} />

      {/* Categories */}
      <CategoryFilter
        activeCategory={category}
        onCategoryChange={setCategory}
      />

      {/* Hero Loading */}
      {loadingHero ? (
        <div
          className={`h-60 w-full rounded-md mb-6 animate-pulse duration-300 ${
            isDark ? "bg-gray-700" : "bg-gray-200"
          }`}
        ></div>
      ) : (
        heroArticle && <HeroNews article={heroArticle} />
      )}

      {/* Grid Loading */}
      {loadingGrid ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-pulse mt-10">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`h-40 rounded-md duration-300 ${
                isDark ? "bg-gray-700" : "bg-gray-200"
              }`}
            ></div>
          ))}
        </div>
      ) : (
        gridArticles.length > 0 && <NewsGrid articles={gridArticles.slice(1)} />
      )}

      {/* Error */}
      {!loadingHero &&
        !loadingGrid &&
        !heroArticle &&
        gridArticles.length === 0 &&
        error && <p className="text-center text-red-500 mt-8">{error}</p>}
    </div>
  );
}
