import React from "react";
import { Link } from "react-router-dom";

export default function RelatedArticles({ related, isDark }) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
        {related.map((r, i) => (
          <Link
            key={i}
            to={`/news/${r.title}`}
            state={{ article: r }}
            className="flex items-start gap-6 group"
          >
            <div className="flex-1">
              <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">
                {r.category || "Top Stories"}
              </p>
              <h3
                className={`text-lg font-semibold mb-1 group-hover:text-blue-600 transition-colors duration-200 ${
                  isDark ? "text-gray-100" : "text-gray-600"
                }`}
              >
                {r.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 leading-relaxed line-clamp-3">
                {r.description}
              </p>
              <p className="text-blue-600 dark:text-blue-400 font-bold">
                Read More
              </p>
            </div>

            <div className="w-36 h-36 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-gray-800">
              {r.urlToImage && (
                <img
                  src={r.urlToImage}
                  alt={r.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
