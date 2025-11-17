# News Today

**News Today** is a modern, responsive news web application built with **React, Vite, Tailwind CSS**, and **React Router**. It fetches live news articles from [NewsAPI.org](https://newsapi.org/) and presents them in a clean, user-friendly interface with features like hero news, category filtering, search, dark/light mode, and dynamic routing for single news articles.

---

## Features

- **Hero News & News Grid:** Display the most important news at the top with additional related articles below.
- **Category Filtering:** Filter news by categories like Top Stories, World, Politics, Business, Tech.
- **Search Functionality:** Search for articles dynamically across all categories.
- **Dark/Light Mode:** Toggle between dark and light themes using a centralized `ThemeContext`.
- **Responsive Design:** Optimized for mobile, tablet, and desktop screens.
- **Single News Pages:** Dynamic routing to individual articles using React Router.
- **Save & Share Articles:** Users can save articles locally and share via native share or clipboard.
- **Comments Section:** Add, reply, and view comments per article.
- **Loading Skeletons:** Improved UX with separate loading skeletons for HeroNews and NewsGrid to handle asynchronous API fetches gracefully.
- **Persistent Theme:** Dark/light mode preference is saved to `localStorage` and respected across sessions.

---

## Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, React Icons
- **Routing:** React Router v6
- **State Management:** React Context API (`ThemeContext`) and local component state
- **API:** NewsAPI.org for live news articles
- **Styling:** Tailwind CSS for utility-first responsive styling
- **Deployment Ready:** Handles dynamic routes for single news pages, mobile-friendly, and dark/light theme support

---

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/news-today.git
   cd news-today
   ```
2. **Install dependencies**

   npm install
   npm install react-router-dom
   npm install react-icons

3. **Set up environment variables**

   NEWS_API_KEY=your_newsapi_key_here

4. **Run the development server**

   npm run dev
   Open your browser at http://localhost:5173

   Use a static hosting service like Netlify, Vercel, or GitHub Pages.
   npx vercel dev

**Project Structure**

src/
├── components/ # Reusable UI components like Navbar, Footer, HeroNews, NewsGrid etc
├── context/ # ThemeContext for dark/light mode
├── pages/ # Home.jsx, SingleNews.jsx
├── App.jsx # Main app and routes
├── index.css # Tailwind imports and global styles
└── main.jsx # App entry point

**Key Implementation Details**
_Theme Management_
Centralized ThemeContext handles dark/light mode toggling across all components.
State persists in localStorage and updates <html> class for proper tailwind dark mode.

_Loading Skeletons_
Separate skeletons for HeroNews and NewsGrid ensure each section shows a placeholder until its data is fetched.
HeroNews and NewsGrid load independently without blocking each other, enhancing UX.

_Dynamic Routing_
Single news pages use React Router with useParams and useLocation.
Refreshing a single news page does not break deployment with proper server configuration (e.g., fallback to index.html on static hosting).

_Responsive Design_
Tailwind CSS ensures mobile-first layout.
Action buttons (Save, Share, Likes, Comments) are visible and functional on all screen sizes.
Images adapt to container sizes without distortion.

_API Fetching_
Uses fetch to get news from NewsAPI.org.
Handles category selection and search dynamically.
Includes proper error handling and loading state management.

**Author**
Mayowa – Front-End/React Developer
React, Tailwind CSS, Vite, and API integration expertise
