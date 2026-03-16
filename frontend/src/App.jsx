import { useState } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import AnalyticsPage from "./pages/AnalyticsPage";
import UrlDetailsPage from "./pages/UrlDetailsPage";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedShortUrl, setSelectedShortUrl] = useState(null);

  const navigateToHome = () => setCurrentPage("home");
  const navigateToAnalytics = () => setCurrentPage("analytics");
  const navigateToDetails = (shortUrl) => {
    setSelectedShortUrl(shortUrl);
    setCurrentPage("details");
  };

  return (
    <div className="min-h-screen">
      <nav className="border-b p-4">
        <div className="flex gap-2">
          <button
            onClick={navigateToHome}
            className={`px-4 py-2 ${
              currentPage === "home" ? "bg-black text-white" : ""
            }`}
          >
            Home
          </button>
          <button
            onClick={navigateToAnalytics}
            className={`px-4 py-2 ${
              currentPage === "analytics" || currentPage === "details"
                ? "bg-black text-white"
                : ""
            }`}
          >
            Analytics
          </button>
        </div>
      </nav>

      {currentPage === "home" && <HomePage />}
      {currentPage === "analytics" && (
        <AnalyticsPage onSelectUrl={navigateToDetails} />
      )}
      {currentPage === "details" && selectedShortUrl && (
        <UrlDetailsPage
          shortUrl={selectedShortUrl}
          onBack={navigateToAnalytics}
        />
      )}
    </div>
  );
}

export default App;
