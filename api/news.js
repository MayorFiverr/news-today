import { extract } from "@extractus/article-extractor";

export default async function handler(req, res) {
  // --- CORS headers ---
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const API_KEY = process.env.NEWS_API_KEY;
  const url = new URL(req.url, `http://${req.headers.host}`);
  const category = (url.searchParams.get("category") || "all").toLowerCase();
  const q = url.searchParams.get("q") || "";

  const validCategories = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  async function fetchNews(cat = "", assignedCategory = "Top Stories") {
    const endpoint =
      `https://newsapi.org/v2/top-headlines?country=us` +
      `${cat ? `&category=${cat}` : ""}` +
      `${q ? `&q=${encodeURIComponent(q)}` : ""}` +
      `&pageSize=40&apiKey=${API_KEY}`;

    const response = await fetch(endpoint);
    if (!response.ok) return { articles: [] };
    const data = await response.json();

    if (data.articles) {
      data.articles = data.articles.map((a) => ({
        ...a,
        category: assignedCategory,
      }));
    }
    return data;
  }

  async function enrichWithFullText(article) {
    try {
      if (!article?.url) return article;
      const extracted = await extract(article.url);
      article.fullText = extracted?.content || "";
    } catch (err) {
      console.log("Extraction failed for:", article.url);
      article.fullText = "";
    }
    return article;
  }

  try {
    let articles = [];

    if (q) {
      const mappedCat = validCategories.includes(category) ? category : "";
      const data = await fetchNews(mappedCat, mappedCat || "Top Stories");
      articles = data.articles || [];
    } else if (category === "all") {
      const mixCategories = [
        { cat: "general", name: "Top Stories" },
        { cat: "technology", name: "Technology" },
        { cat: "business", name: "Business" },
        { cat: "science", name: "Science" },
      ];

      const results = await Promise.all(
        mixCategories.map((c) => fetchNews(c.cat, c.name))
      );
      results.forEach((r) => {
        if (r.articles) articles.push(...r.articles);
      });
    } else if (["top", "world", "politics"].includes(category)) {
      const data = await fetchNews("general", "Top Stories");
      articles = data.articles || [];
    } else {
      const catToFetch = validCategories.includes(category)
        ? category
        : "general";
      const data = await fetchNews(catToFetch, catToFetch);
      articles = data.articles || [];
    }

    articles = articles.filter(
      (a) => a.urlToImage && a.urlToImage.trim() !== ""
    );

    let finalArticles = articles.sort(() => Math.random() - 0.5).slice(0, 7);
    finalArticles = await Promise.all(finalArticles.map(enrichWithFullText));

    res.status(200).json({ articles: finalArticles });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({ error: "Unable to fetch news" });
  }
}
