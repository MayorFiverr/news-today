import { useTheme } from "../context/ThemeContext";

export default function HeroNews({ article }) {
  const { isDark } = useTheme();

  const fallback = {
    title: "Breaking: Global Economic Outlook Sees Major Shifts",
    desc: "Economists are forecasting a significant adjustment in global markets as geopolitical events and emerging technologies reshape the financial landscape.",
    img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1350&q=80",
  };

  const display = article || fallback;

  return (
    <section
      className="relative rounded-2xl overflow-hidden h-[420px] sm:h-[480px] flex items-end shadow-md"
      style={{
        backgroundImage: `url('${display.urlToImage || display.img}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 p-6 sm:p-10 max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold leading-snug mb-3 text-white">
          {display.title}
        </h1>

        <p className="text-gray-200 text-sm sm:text-base mb-5 line-clamp-3">
          {display.description || display.desc}
        </p>

        {display.url && (
          <a
            href={display.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm sm:text-base transition"
          >
            Read More
          </a>
        )}
      </div>
    </section>
  );
}
