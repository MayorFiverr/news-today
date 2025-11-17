import { useState } from "react";
import { FiHeart, FiMessageCircle, FiBookmark, FiShare2 } from "react-icons/fi";

export default function ArticleActions({
  article,
  likes,
  setLikes,
  comments,
  isDark,
}) {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);
    }
  };

  return (
    <div
      className={`w-full flex justify-center mb-3 ${
        isDark ? "text-gray-100" : "text-gray-600"
      }`}
    >
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={handleLike}
          className={`flex items-center gap-2 px-3 py-2 rounded-md ${
            liked
              ? "text-blue-500"
              : "hover:text-blue-600 dark:hover:text-blue-400"
          }`}
        >
          <FiHeart className="w-5 h-5" />
          <span className="text-xs">
            {likes >= 1000 ? `${Math.round((likes / 1000) * 10) / 10}k` : likes}
          </span>
        </button>

        <div className="flex items-center gap-2 px-3 py-2 rounded-md">
          <FiMessageCircle className="w-5 h-5" />
          <span className="text-xs">{comments.length}</span>
        </div>

        <button
          type="button"
          onClick={() => {
            let saved = JSON.parse(
              localStorage.getItem("savedArticles") || "[]"
            );
            saved.push(article);
            localStorage.setItem("savedArticles", JSON.stringify(saved));
            alert("Article saved!");
          }}
          className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md"
        >
          <FiBookmark className="w-5 h-5" />
          <span className="text-xs">Save</span>
        </button>

        <button
          type="button"
          onClick={async () => {
            try {
              if (navigator.share) {
                await navigator.share({
                  title: article.title,
                  text: article.description || "Check this news article",
                  url: article.url,
                });
              } else {
                await navigator.clipboard.writeText(article.url);
                alert("Link copied to clipboard!");
              }
            } catch (err) {
              console.error("Share failed", err);
            }
          }}
          className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md"
        >
          <FiShare2 className="w-5 h-5" />
          <span className="text-xs">Share</span>
        </button>
      </div>
    </div>
  );
}
