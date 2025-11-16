import { useTheme } from "../context/ThemeContext";

export default function Footer() {
  const { isDark } = useTheme();

  return (
    <footer
      className={`font-playfair border-t py-8 mt-12 transition-colors duration-300 ${
        isDark
          ? "bg-gray-900 border-gray-700 text-gray-400"
          : "bg-gray-50 border-gray-200 text-gray-600"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Links */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-6 mb-4 text-base font-medium">
          {["About Us", "Contact", "Privacy Policy", "Terms of Service"].map(
            (item, i) => (
              <a
                key={i}
                href="#"
                className={`hover:underline transition-colors ${
                  isDark
                    ? "text-gray-300 hover:text-blue-400"
                    : "text-gray-500 hover:text-blue-600"
                }`}
              >
                {item}
              </a>
            )
          )}
        </div>

        <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-600"}`}>
          © {new Date().getFullYear()}{" "}
          <span
            className={`${
              isDark ? "text-gray-300" : "text-gray-700"
            } font-medium`}
          >
            News Today
          </span>{" "}
          — All rights reserved.
        </p>
      </div>
    </footer>
  );
}
