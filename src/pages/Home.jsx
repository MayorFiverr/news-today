import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import HeroNews from "../components/HeroNews";
import NewsGrid from "../components/NewsGrid";

export default function Home() {
  const [category, setCategory] = useState("all"); // default All
  const [searchTerm, setSearchTerm] = useState("");
  const [heroArticle, setHeroArticle] = useState(null);
  const [gridArticles, setGridArticles] = useState([]);
  const [loadingHero, setLoadingHero] = useState(true);
  const [loadingGrid, setLoadingGrid] = useState(true);
  const [error, setError] = useState("");

  // Load HeroNews first (general/top article)
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

  // Load remaining articles (grid) and search/category updates
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
          setHeroArticle(data.articles[0]); // HeroNews (may be same as related)
          setGridArticles(data.articles); // 6 related articles
          setError(""); // Clear any previous error
        } else {
          setHeroArticle(null);
          setGridArticles([]);
          setError("No articles found for this category or search."); // Only show when truly empty
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
    <div className="font-playfair px-4 sm:px-10 py-6 max-w-4xl mx-auto">
      {/* Search Bar */}
      <SearchBar onSearch={setSearchTerm} />

      {/* Categories */}
      <CategoryFilter
        activeCategory={category}
        onCategoryChange={setCategory}
      />

      {/* Loading & Error */}
      {(loadingHero || loadingGrid) && (
        <div className="animate-pulse mt-8">
          {/* Hero Skeleton */}
          <div className="bg-gray-200 h-60 w-full rounded-md mb-6"></div>
          {/* Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-200 h-40 rounded-md"></div>
            <div className="bg-gray-200 h-40 rounded-md"></div>
            <div className="bg-gray-200 h-40 rounded-md"></div>
            <div className="bg-gray-200 h-40 rounded-md"></div>
          </div>
        </div>
      )}

      {!loadingHero &&
        !loadingGrid &&
        !heroArticle &&
        gridArticles.length === 0 &&
        error && <p className="text-center text-red-500 mt-8">{error}</p>}

      {/* Hero Section */}
      {!loadingHero && heroArticle && <HeroNews article={heroArticle} />}

      {/* News Grid */}
      {!loadingGrid && gridArticles.length > 0 && (
        <NewsGrid articles={gridArticles.slice(1)} />
      )}
    </div>
  );
}
