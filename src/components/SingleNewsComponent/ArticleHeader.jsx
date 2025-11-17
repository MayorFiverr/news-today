import React from "react";

export default function ArticleHeader({ article, pubDate, isDark }) {
  return (
    <>
      <p
        className={`text-sm mb-3 ${isDark ? "text-gray-200" : "text-gray-500"}`}
      >
        {article.category || "Top Stories"} /{" "}
        {article.source?.name || "General"}
      </p>

      <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight mb-4">
        {article.title}
      </h1>

      <p
        className={`text-sm mb-6 ${isDark ? "text-gray-100" : "text-gray-600"}`}
      >
        {article.author ? `By ${article.author}` : "By Unknown Author"} ·
        Published on {pubDate || article.publishedAt || ""}
      </p>

      {article.urlToImage && (
        <div className="rounded-xl overflow-hidden mb-6">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full object-cover h-52 sm:h-[420px] md:h-[420px]]"
          />
        </div>
      )}
    </>
  );
}
