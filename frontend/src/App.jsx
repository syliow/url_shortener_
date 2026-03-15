import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import AnalyticsPage from './pages/AnalyticsPage'
import UrlDetailsPage from './pages/UrlDetailsPage'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedShortUrl, setSelectedShortUrl] = useState(null)

  const navigateToHome = () => setCurrentPage('home')
  const navigateToAnalytics = () => setCurrentPage('analytics')
  const navigateToDetails = (shortUrl) => {
    setSelectedShortUrl(shortUrl)
    setCurrentPage('details')
  }

  return (
    <div>
      <nav>
        <button onClick={navigateToHome}>Home</button>
        <button onClick={navigateToAnalytics}>Analytics</button>
      </nav>

      {currentPage === 'home' && <HomePage />}
      {currentPage === 'analytics' && <AnalyticsPage onSelectUrl={navigateToDetails} />}
      {currentPage === 'details' && selectedShortUrl && (
        <UrlDetailsPage shortUrl={selectedShortUrl} onBack={navigateToAnalytics} />
      )}
    </div>
  )
}

export default App
