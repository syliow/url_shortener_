import { API_URL, SHORT_URL_DOMAIN } from './config'

// Export domain for display
export const getShortUrlDomain = () => SHORT_URL_DOMAIN

// Helper func to build full short URL from code
export const buildShortUrl = (shortCode) => {
  return `${SHORT_URL_DOMAIN}/${shortCode}`
}

// POST /shorten - Create short URL
export async function createShortUrl(longUrl) {
  const res = await fetch(`${API_URL}/shorten`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ long_url: longUrl })
  })
  if (!res.ok) throw new Error(`Failed to shorten URL`)
  return res.json()
}

// GET /urls - List all URLs with visit counts (with pagination)
export async function getAllUrls(page, perPage) {
  const res = await fetch(`${API_URL}/urls?page=${page}&per_page=${perPage}`)
  if (!res.ok) throw new Error(`Failed to fetch URLs`)
  return res.json()
}

// GET /urls/:short_url - Get individual URL analytics
export async function getUrlDetails(shortUrl) {
  const res = await fetch(`${API_URL}/urls/${shortUrl}`)
  if (!res.ok) throw new Error(`Failed to fetch URL details`)
  return res.json()
}
