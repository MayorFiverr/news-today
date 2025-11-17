import React from "react";

export default function ArticleContent({ article, isDark }) {
  return (
    <div
      className={`prose prose-lg max-w-none mb-6 ${
        isDark ? "text-gray-100" : "text-gray-600"
      }`}
    >
      <div
        dangerouslySetInnerHTML={{
          __html:
            article.fullText ||
            article.content?.replace(/\[\+\d+ chars\]$/, "") ||
            article.description ||
            "Full story available in the source link below.",
        }}
      ></div>

      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 underline block mt-4"
      >
        Read the full story →
      </a>
    </div>
  );
}
