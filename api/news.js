// /api/news.js (Updated with article-extractor for full article text)
import { extract } from "@extractus/article-extractor";

export default async function handler(req, res) {
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

  async function fetchNews(cat = "") {
    const endpoint =
      `https://newsapi.org/v2/top-headlines?country=us` +
      `${cat ? `&category=${cat}` : ""}` +
      `${q ? `&q=${encodeURIComponent(q)}` : ""}` +
      `&pageSize=40&apiKey=${API_KEY}`;

    console.log("Fetching endpoint:", endpoint);

    const response = await fetch(endpoint);

    if (!response.ok) {
      console.log("News Fetch Error:", response.status, await response.text());
      return { articles: [] };
    }

    const data = await response.json();
    console.log("Articles fetched:", data.articles?.length || 0);

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
      let mappedCat = validCategories.includes(category) ? category : "";
      const data = await fetchNews(mappedCat);
      articles = data.articles || [];
    } else if (category === "all") {
      const mixCategories = ["general", "technology", "business", "science"];
      const results = await Promise.all(mixCategories.map((c) => fetchNews(c)));
      results.forEach((r) => {
        if (r.articles) articles.push(...r.articles);
      });
    } else if (["top", "world", "politics"].includes(category)) {
      const data = await fetchNews("general");
      articles = data.articles || [];
    } else {
      const catToFetch = validCategories.includes(category)
        ? category
        : "general";
      const data = await fetchNews(catToFetch);
      articles = data.articles || [];
    }

    // Randomize and limit
    let finalArticles = articles.sort(() => Math.random() - 0.5).slice(0, 7);

    // Enrich with full article text
    finalArticles = await Promise.all(finalArticles.map(enrichWithFullText));

    res.status(200).json({ articles: finalArticles });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({ error: "Unable to fetch news" });
  }
}
