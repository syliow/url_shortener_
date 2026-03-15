// API endpoint 
const API_BASE_URL = import.meta.env.API_URL || ''
// Domain for shortened links
const SHORT_URL_DOMAIN = import.meta.env.SHORT_URL_DOMAIN || 'http://localhost:3000'

// Helper func to build full short URL from code
export const buildShortUrl = (shortCode) => {
  return `${SHORT_URL_DOMAIN}/${shortCode}`
}

// POST /shorten - Create short URL
export async function createShortUrl(longUrl) {
  const res = await fetch(`${API_BASE_URL}/shorten`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ long_url: longUrl })
  })
  if (!res.ok) throw new Error(`Failed to shorten URL`)
  return res.json()
}

// GET /urls - List all URLs with visit counts
export async function getAllUrls() {
  const res = await fetch(`${API_BASE_URL}/urls`)
  if (!res.ok) throw new Error(`Failed to fetch URLs`)
  return res.json()
}

// GET /urls/:short_url - Get individual URL analytics
export async function getUrlDetails(shortUrl) {
  const res = await fetch(`${API_BASE_URL}/urls/${shortUrl}`)
  if (!res.ok) throw new Error(`Failed to fetch URL details`)
  return res.json()
}
