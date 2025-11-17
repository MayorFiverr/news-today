import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SinglePost from "./pages/SingleNews";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

function AppContent() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div
      className={`${
        isDark
          ? "bg-gray-900 text-gray-100 font-playfair"
          : "bg-gray-50 text-gray-900 font-playfair"
      } min-h-screen transition-colors duration-300`}
    >
      <Navbar darkMode={isDark} toggleDarkMode={toggleTheme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news/:slug" element={<SinglePost />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}
