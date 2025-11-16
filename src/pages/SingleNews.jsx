import { useEffect, useState, useMemo } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import {
  FiHeart,
  FiMessageCircle,
  FiBookmark,
  FiShare2,
  FiSend,
} from "react-icons/fi";

// Utility function to strip HTML
function stripHtml(html) {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "").trim();
}

export default function SinglePost() {
  const { slug } = useParams();
  const { state } = useLocation();

  const [article, setArticle] = useState(state?.article || null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(!state?.article);

  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Ethan Carter",
      avatar: "../images/download.jpeg",
      date: "July 27, 2024",
      text: "Great coverage of the conference! It's exciting to see the progress in AI and sustainable tech.",
      replies: [
        {
          id: 2,
          name: "Olivia Bennett",
          avatar: "../images/download (1).jpeg",
          date: "July 27, 2024",
          text: "I agree! The focus on ethical considerations is also very important.",
        },
      ],
    },
  ]);

  const [commentText, setCommentText] = useState("");
  const [likes, setLikes] = useState(120);

  useEffect(() => {
    if (state?.article && state.article.title === slug) {
      setArticle(state.article);
      setLoading(false);
      return;
    }
    setArticle(null);
    setLoading(true);
  }, [slug, state]);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const res = await fetch(`/api/news?category=all`);
        const data = await res.json();
        const list = data.articles || [];

        if (!article) {
          const selected = list.find((a) => a.title === slug);
          if (mounted) setArticle(selected || null);
        }

        const currentTitle = article?.title || null;
        const relatedList = list
          .filter((a) => a.title !== currentTitle)
          .slice(0, 2);
        if (mounted) setRelated(relatedList);
      } catch (err) {
        console.error("Error loading related:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => (mounted = false);
  }, [slug, state]);

  const pubDate = useMemo(() => {
    if (!article?.publishedAt) return "";
    try {
      return new Date(article.publishedAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return article.publishedAt;
    }
  }, [article]);

  const handlePostComment = () => {
    if (!commentText.trim()) return;
    const newComment = {
      id: Date.now(),
      name: "You",
      avatar: "../images/download (2).jpeg",
      date: new Date().toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      text: commentText.trim(),
    };
    setComments((c) => [newComment, ...c]);
    setCommentText("");
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
          <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded w-full" />
          <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-10 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Article not found or no longer available.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 font-playfair text-gray-900 dark:text-gray-100 transition-colors">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
        News / {article.source?.name || "General"}
      </p>

      {/* Title */}
      <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight mb-4">
        {article.title}
      </h1>

      {/* Author + Date */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        {article.author ? `By ${article.author}` : "By Unknown Author"} ·
        Published on {pubDate || article.publishedAt || ""}
      </p>

      {/* Hero image */}
      {article.urlToImage && (
        <div className="rounded-xl overflow-hidden mb-6">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-[420px] object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-6">
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

      <hr className="border-t border-gray-200 dark:border-gray-700 mb-3" />

      {/* Actions */}
      <div className="w-full flex justify-center mb-3">
        <div className="flex flex-wrap items-center justify-center gap-4 text-gray-600 dark:text-gray-400">
          <button
            type="button"
            onClick={() => setLikes((l) => l + 1)}
            className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md"
          >
            <FiHeart className="w-5 h-5" />
            <span className="text-sm hidden sm:inline">
              {likes >= 1000
                ? `${Math.round((likes / 1000) * 10) / 10}k`
                : likes}
            </span>
          </button>

          <div className="flex items-center gap-2 px-3 py-2 rounded-md">
            <FiMessageCircle className="w-5 h-5" />
            <span className="text-sm hidden sm:inline">{comments.length}</span>
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
            <span className="text-sm hidden sm:inline">Save</span>
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
            <span className="text-sm hidden sm:inline">Share</span>
          </button>
        </div>
      </div>

      <hr className="border-t border-gray-200 dark:border-gray-700 mb-6" />

      {/* Related Articles */}
      <h2 className="text-3xl font-bold mb-6">Related Articles</h2>
      <div className="grid grid-cols-2 gap-8 mb-10">
        {related.map((r, i) => (
          <Link
            key={i}
            to={`/news/${r.title}`}
            state={{ article: r }}
            className="flex items-start gap-6 group"
          >
            <div className="flex-1">
              <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">
                {r.source?.name || "General"}
              </p>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                {r.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 leading-relaxed line-clamp-3">
                {r.description}
              </p>

              <p className="text-blue-600 dark:text-blue-400 font-bold">
                Read More
              </p>
            </div>

            <div className="w-36 h-36 rounded-xl overflow-hidden flex-shrink-0">
              {r.urlToImage ? (
                <img
                  src={r.urlToImage}
                  alt={r.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 dark:bg-gray-800" />
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* 💬 COMMENTS */}
      <h3 className="text-2xl font-semibold mb-6">
        Comments ({comments.length})
      </h3>

      <div className="space-y-8 mb-10">
        {comments.map((c) => (
          <div key={c.id} className="flex flex-col gap-3">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-sm overflow-hidden">
                {c.avatar ? (
                  <img
                    src={c.avatar}
                    alt={c.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  c.name.charAt(0)
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <p className="font-medium text-sm">{c.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {c.date}
                  </p>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  {c.text}
                </p>

                <div className="mt-2 flex items-center gap-4">
                  <button
                    onClick={() =>
                      setComments((prev) =>
                        prev.map((com) =>
                          com.id === c.id
                            ? { ...com, showReplyBox: !com.showReplyBox }
                            : com
                        )
                      )
                    }
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Reply
                  </button>

                  {c.replies && c.replies.length > 0 && (
                    <button
                      onClick={() =>
                        setComments((prev) =>
                          prev.map((com) =>
                            com.id === c.id
                              ? { ...com, showReplies: !com.showReplies }
                              : com
                          )
                        )
                      }
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {c.showReplies
                        ? "Hide replies"
                        : `View ${c.replies.length} repl${
                            c.replies.length > 1 ? "ies" : "y"
                          }`}
                    </button>
                  )}
                </div>

                {/* Reply input */}
                {c.showReplyBox && (
                  <div className="mt-3">
                    <textarea
                      placeholder={`Reply to ${c.name}...`}
                      value={c.replyText || ""}
                      onChange={(e) =>
                        setComments((prev) =>
                          prev.map((com) =>
                            com.id === c.id
                              ? { ...com, replyText: e.target.value }
                              : com
                          )
                        )
                      }
                      className="w-full border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-sm min-h-[60px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-400"
                    />
                    <div className="text-right mt-2">
                      <button
                        onClick={() => {
                          const text = c.replyText?.trim();
                          if (!text) return;
                          const reply = {
                            id: Date.now(),
                            name: "You",
                            avatar: "../images/download (2).jpeg",
                            date: new Date().toLocaleDateString(undefined, {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }),
                            text,
                          };
                          setComments((prev) =>
                            prev.map((com) =>
                              com.id === c.id
                                ? {
                                    ...com,
                                    replies: [...(com.replies || []), reply],
                                    replyText: "",
                                    showReplyBox: false,
                                  }
                                : com
                            )
                          );
                        }}
                        className="inline-flex items-center gap-1 bg-blue-600 dark:bg-blue-500 text-white text-sm px-3 py-1 rounded-md"
                      >
                        <FiSend className="w-4 h-4" /> Reply
                      </button>
                    </div>
                  </div>
                )}

                {/* Replies */}
                {c.showReplies && c.replies && c.replies.length > 0 && (
                  <div className="mt-4 ml-10 space-y-4">
                    {c.replies.map((r) => (
                      <div key={r.id} className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-xs overflow-hidden">
                          {r.avatar ? (
                            <img
                              src={r.avatar}
                              alt={r.name}
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            r.name.charAt(0)
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-xs">{r.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {r.date}
                            </p>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
                            {r.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Comment */}
      <div className="mb-8 border-t border-gray-200 dark:border-gray-700 pt-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
            <img
              src="../images/download (2).jpeg"
              alt="User Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <div className="flex-1">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="w-full border border-gray-200 dark:border-gray-700 rounded-lg p-4 min-h-[72px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-400 bg-transparent text-gray-900 dark:text-gray-100"
            />
            <div className="text-right mt-3">
              <button
                onClick={handlePostComment}
                className="inline-flex items-center gap-2 bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                <FiSend /> Post Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
