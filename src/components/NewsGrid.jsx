import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function NewsGrid({ articles = [] }) {
  const { isDark } = useTheme();

  if (!articles || articles.length === 0) {
    return (
      <section className="mt-10">
        <h2
          className={`text-2xl font-bold mb-6 ${
            isDark ? "text-gray-100" : "text-gray-900"
          }`}
        >
          Recent Articles
        </h2>
        <p className={isDark ? "text-gray-400" : "text-gray-500"}>
          No related articles found for this search.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-10">
      <h2
        className={`text-2xl font-bold mb-6 duration-300 ${
          isDark ? "text-gray-100" : "text-gray-900"
        }`}
      >
        Recent Articles
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, i) => {
          const slug = encodeURIComponent(article.title);
          return (
            <Link
              to={`/news/${slug}`}
              state={{ article }}
              key={i}
              className="block"
            >
              <article
                className={`space-y-4 hover:opacity-90 transition rounded-xl duration-300 ${
                  isDark
                    ? "bg-gray-900 text-gray-200"
                    : "bg-gray-50 text-gray-800"
                }`}
              >
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    onError={(e) => (e.currentTarget.style.display = "none")}
                    className="w-full h-52 object-cover"
                  />
                </div>

                <div className="p-4">
                  <h3
                    className={`text-lg font-semibold mb-1 transition-colors duration-300 ${
                      isDark
                        ? "text-gray-100 hover:text-blue-400"
                        : "text-gray-900 hover:text-blue-600"
                    }`}
                  >
                    {article.title}
                  </h3>

                  <p
                    className={`text-sm mb-3 leading-relaxed line-clamp-3 duration-300 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {article.description}
                  </p>

                  <p
                    className={
                      isDark ? "text-gray-500 text-xs" : "text-gray-400 text-xs"
                    }
                  >
                    {article.publishedAt
                      ? new Date(article.publishedAt).toDateString()
                      : ""}
                  </p>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
