import { Link } from "react-router-dom";

export default function NewsGrid({ articles = [] }) {
  if (!articles || articles.length === 0) {
    return (
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Recent Articles
        </h2>
        <p className="text-center text-gray-500">
          No related articles found for this search.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Articles</h2>
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
              <article className="space-y-4 hover:opacity-90 transition">
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-52 object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 hover:text-blue-600 transition-colors duration-200">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed line-clamp-3">
                    {article.description}
                  </p>
                  <p className="text-gray-400 text-xs">
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
