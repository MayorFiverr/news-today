export default function Footer({ darkMode }) {
  return (
    <footer
      className={`font-playfair border-t py-8 mt-12 transition-colors duration-300 ${
        darkMode
          ? "bg-gray-100 border-gray-700 text-gray-400"
          : "bg-gray-50 border-gray-200 text-gray-600"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Links */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-6 mb-4 text-base font-medium">
          <a
            href="#"
            className={`hover:underline transition-colors ${
              darkMode
                ? "text-gray-300 hover:text-blue-400"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            About Us
          </a>
          <a
            href="#"
            className={`hover:underline transition-colors ${
              darkMode
                ? "text-gray-300 hover:text-blue-400"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            Contact
          </a>
          <a
            href="#"
            className={`hover:underline transition-colors ${
              darkMode
                ? "text-gray-300 hover:text-blue-400"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className={`hover:underline transition-colors ${
              darkMode
                ? "text-gray-300 hover:text-blue-400"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            Terms of Service
          </a>
        </div>

        {/* Copyright */}
        <p
          className={`text-sm ${darkMode ? "text-gray-500" : "text-gray-500"}`}
        >
          © {new Date().getFullYear()}{" "}
          <span
            className={`font-medium ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            News Today
          </span>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
}
