import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function NewsPage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/news?category=all`);
      const data = await res.json();
      const list = data.articles || [];

      // Find the clicked article
      const selected = list.find((a) => encodeURIComponent(a.title) === slug);

      setArticle(selected || null);

      // Generate 6 related items
      const relatedNews = list
        .filter((a) => a.title !== selected?.title)
        .sort(() => Math.random() - 0.5)
        .slice(0, 6);

      setRelated(relatedNews);
    }

    load();
  }, [slug]);

  if (!article) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold">{article.title}</h1>

      {article.urlToImage && (
        <img
          src={article.urlToImage}
          className="rounded-lg mt-4 w-full"
          alt={article.title}
        />
      )}

      <p className="mt-6 text-lg leading-relaxed">
        {article.description ||
          "Full story available in the source link below."}
      </p>

      <a
        href={article.url}
        target="_blank"
        className="block mt-5 text-blue-600 underline font-medium"
      >
        Read full article
      </a>

      {/* Related Articles */}
      <h2 className="text-2xl font-bold mt-12 mb-4">Related Articles</h2>

      <div className="grid sm:grid-cols-2 gap-5">
        {related.map((r, i) => {
          const relatedSlug = encodeURIComponent(r.title);
          return (
            <a
              key={i}
              href={`/news/${relatedSlug}`}
              className="block border rounded-lg p-3 shadow-sm hover:bg-gray-50 transition"
            >
              {r.urlToImage && (
                <img
                  src={r.urlToImage}
                  className="rounded-md h-32 w-full object-cover"
                  alt={r.title}
                />
              )}
              <p className="font-medium mt-3">{r.title}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
}
