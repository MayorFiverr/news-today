import { useEffect, useState, useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import ArticleHeader from "../components/SingleNewsComponent/ArticleHeader";
import ArticleContent from "../components/SingleNewsComponent/ArticleContent";
import ArticleActions from "../components/SingleNewsComponent/ArticleActions";
import RelatedArticles from "../components/SingleNewsComponent/RelatedArticles";
import CommentList from "../components/SingleNewsComponent/CommentList";
import AddComment from "../components/SingleNewsComponent/AddComment";

export default function SinglePost() {
  const { isDark } = useTheme();
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
          text: "I agree! The focus on ethical considerations is also very important!",
        },
      ],
    },
  ]);
  const [commentText, setCommentText] = useState("");
  const [likes, setLikes] = useState(120);

  // Load article if not passed via state
  useEffect(() => {
    if (state?.article && state.article.title === slug) {
      setArticle(state.article);
      setLoading(false);
      return;
    }
    setArticle(null);
    setLoading(true);
  }, [slug, state]);

  // Fetch related articles
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
  }, [slug, state, article]);

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

  if (loading)
    return (
      <div
        className={`max-w-4xl mx-auto px-6 py-10 duration-300 ${
          isDark ? "text-gray-100" : "text-gray-900"
        }`}
      >
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
          <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded w-full" />
          <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded-xl" />
        </div>
      </div>
    );

  if (!article)
    return (
      <div className="max-w-4xl mx-auto px-6 py-10 text-center">
        <p
          className={` duration-300 ${
            isDark ? "text-gray-100" : "text-gray-600"
          }`}
        >
          Article not found or no longer available.
        </p>
      </div>
    );

  return (
    <div
      className={`max-w-4xl mx-auto px-6 py-10 font-playfair transition-colors duration-300 ${
        isDark ? "text-gray-100" : "text-gray-900"
      }`}
    >
      {/* Article Header */}
      <ArticleHeader article={article} pubDate={pubDate} isDark={isDark} />

      {/* Article Content */}
      <ArticleContent article={article} isDark={isDark} />

      <hr className="border-t border-gray-200 dark:border-gray-700 mb-3" />

      {/* Article Actions */}
      <ArticleActions
        article={article}
        likes={likes}
        setLikes={setLikes}
        comments={comments}
        isDark={isDark}
      />

      <hr className="border-t border-gray-200 dark:border-gray-700 mb-6" />

      <RelatedArticles
        related={related}
        isDark={isDark}
        isLoading={!related.length}
      />

      {/* Comments */}
      <h3 className="text-2xl font-semibold mb-6">
        Comments ({comments.length})
      </h3>
      <CommentList
        comments={comments}
        setComments={setComments}
        isDark={isDark}
      />

      {/* Add Comment */}
      <AddComment
        commentText={commentText}
        setCommentText={setCommentText}
        handlePostComment={handlePostComment}
        isDark={isDark}
      />
    </div>
  );
}
