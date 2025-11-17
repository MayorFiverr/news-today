import { useState } from "react";
import { FiSearch, FiBell, FiMoon, FiSun, FiMenu, FiX } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import "../index.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const navLinks = [
    "All",
    "Top Stories",
    "World",
    "Politics",
    "Business",
    "Tech",
    "Culture",
  ];

  return (
    <nav
      className={`border-b sticky top-0 z-50 transition-colors duration-300 ${
        isDark
          ? "bg-gray-900 border-gray-700 text-gray-200"
          : "bg-gray-50 border-gray-200 text-gray-800"
      }`}
    >
      <div className="font-playfair max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <a href="/" className="flex items-center space-x-2">
              <div className="text-blue-600 text-2xl">📰</div>
              <span className="font-extrabold text-2xl tracking-[0.1rem] text-inherit">
                News Today
              </span>
            </a>

            <div className="hidden lg:flex space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className={`text-sm font-medium   hover:text-blue-600  transition-colors ${
                    isDark ? "text-gray-100" : "text-gray-500"
                  }`}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden lg:flex items-center px-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-800">
              <FiSearch className="mr-2 text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="outline-none text-sm w-40 bg-transparent placeholder-gray-500 text-gray-700 dark:text-gray-100"
              />
            </div>

            {/* Dark/light toggle uses global context */}
            <button onClick={toggleTheme}>
              {isDark ? (
                <FiSun className="text-gray-50 w-5 h-5" />
              ) : (
                <FiMoon className="text-gray-600 dark:text-gray-300 w-5 h-5" />
              )}
            </button>

            <FiBell
              className={`w-5 h-5 ${
                isDark ? "text-gray-100" : "text-gray-600"
              }`}
            />

            {/* Mobile menu toggle */}
            <button
              className="block lg:hidden text-gray-700 dark:text-gray-300"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden mt-2 pb-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center px-3 py-2 mt-2 rounded-md mx-4 bg-gray-100 dark:bg-gray-800">
              <FiSearch className="mr-2 text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="outline-none text-sm w-full bg-transparent placeholder-gray-500 text-gray-700 dark:text-gray-100"
              />
            </div>

            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="block py-2 px-4 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
