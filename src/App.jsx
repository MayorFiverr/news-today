import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./index.css";
import Home from "./pages/Home";
import SinglePost from "./pages/SingleNews";
import Footer from "./components/Footer";
function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") return true;
    if (savedTheme === "light") return false;
    // Fallback to user's OS preference
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    )
      return true;
    return false;
  });

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <Router>
      <div
        className={`${
          darkMode
            ? "bg-gray-900 text-gray-100 font-playfair"
            : "bg-gray-50 text-gray-900"
        } min-h-screen font-playfair transition-colors`}
      >
        <Navbar
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode(!darkMode)}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news/:slug" element={<SinglePost />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
