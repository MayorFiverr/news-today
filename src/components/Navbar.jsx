import { useState } from "react";
import { FiSearch, FiBell, FiMoon, FiSun, FiMenu, FiX } from "react-icons/fi";
import "../index.css";

export default function Navbar({ darkMode, toggleDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    "Top Stories",
    "World",
    "Politics",
    "Business",
    "Tech",
    "Culture",
  ];

  return (
    <nav
      className={`border-b ${
        darkMode ? "bg-gray-900 border-gray-700" : "bg-gray-50 border-gray-200"
      } sticky top-0 z-50 transition-colors`}
    >
      <div className="font-playfair max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navbar inner */}
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="text-blue-600 text-2xl">📰</div>
              <span
                className={`font-extrabold text-2xl tracking-[0.1rem] ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                News Today
              </span>
            </div>

            {/* Nav links - only show on large screens */}
            <div className="hidden lg:flex space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className={`text-sm font-medium ${
                    darkMode
                      ? "text-gray-400 hover:text-blue-400"
                      : "text-gray-500 hover:text-blue-600"
                  } transition-colors`}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-6">
            {/* Search box - show on large screens only */}
            <div
              className={`hidden lg:flex items-center px-3 py-1.5 rounded-md ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <FiSearch
                className={`mr-2 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <input
                type="text"
                placeholder="Search"
                className={`outline-none text-sm w-40 bg-transparent placeholder-gray-500 ${
                  darkMode ? "text-gray-100" : "text-gray-700"
                }`}
              />
            </div>

            {/* Dark mode toggle */}
            <button onClick={toggleDarkMode}>
              {darkMode ? (
                <FiSun className="text-yellow-400 w-5 h-5" />
              ) : (
                <FiMoon className="text-gray-600 w-5 h-5" />
              )}
            </button>

            {/* Bell icon */}
            <FiBell
              className={`${
                darkMode ? "text-gray-300" : "text-gray-600"
              } w-5 h-5`}
            />

            {/* Menu toggle - visible on mobile & tablet */}
            <button
              className="block lg:hidden text-gray-700 dark:text-gray-300"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile + Tablet dropdown menu */}
        {menuOpen && (
          <div
            className={`lg:hidden mt-2 pb-3 border-t ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            {/* Search visible inside menu on mobile/tablet */}
            <div
              className={`flex items-center px-3 py-2 mt-2 rounded-md mx-4 ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <FiSearch
                className={`mr-2 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <input
                type="text"
                placeholder="Search"
                className={`outline-none text-sm w-full bg-transparent placeholder-gray-500 ${
                  darkMode ? "text-gray-100" : "text-gray-700"
                }`}
              />
            </div>

            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className={`block py-2 px-4 text-sm font-medium ${
                  darkMode
                    ? "text-gray-200 hover:text-blue-400"
                    : "text-gray-700 hover:text-blue-600"
                } transition-colors`}
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
