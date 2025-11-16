import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SinglePost from "./pages/SingleNews";
import Footer from "./components/Footer";
import "./index.css";

export default function App() {
  const { isDark } = useTheme(); // ⬅️ read theme from global context

  return (
    <Router>
      <div
        className={`min-h-screen font-playfair transition-colors duration-300 ${
          isDark ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
        }`}
      >
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news/:slug" element={<SinglePost />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}
