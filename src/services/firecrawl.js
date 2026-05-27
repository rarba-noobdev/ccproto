/**
 * Firecrawl API client for scraping product data from URLs.
 * Set VITE_FIRECRAWL_API_KEY in your .env file.
 * @see https://firecrawl.dev
 */

const API_KEY = import.meta.env.VITE_FIRECRAWL_API_KEY || ''
const BASE_URL = 'https://api.firecrawl.dev/v1'

async function request(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || `Firecrawl error: ${res.status}`)
  }
  return res.json()
}

/**
 * Scrape a single URL and return the markdown/extracted content.
 * @param {string} url
 * @param {{ formats?: string[], onlyMainContent?: boolean }} opts
 */
export async function scrapeUrl(url, opts = {}) {
  if (!API_KEY) throw new Error('Firecrawl API key not configured. Set VITE_FIRECRAWL_API_KEY.')
  return request('/scrape', {
    method: 'POST',
    body: JSON.stringify({
      url,
      formats: opts.formats || ['markdown', 'html'],
      onlyMainContent: opts.onlyMainContent !== false,
    }),
  })
}

/**
 * Crawl a website starting from a URL.
 * @param {string} url
 * @param {{ limit?: number, includePaths?: string[], excludePaths?: string[] }} opts
 */
export async function crawlWebsite(url, opts = {}) {
  if (!API_KEY) throw new Error('Firecrawl API key not configured. Set VITE_FIRECRAWL_API_KEY.')
  return request('/crawl', {
    method: 'POST',
    body: JSON.stringify({
      url,
      limit: opts.limit || 10,
      includePaths: opts.includePaths,
      excludePaths: opts.excludePaths,
      scrapeOptions: { formats: ['markdown'] },
    }),
  })
}

/**
 * Extract structured product data from a URL using Firecrawl's LLM extraction.
 * Returns an array of product objects.
 * @param {string} url
 */
export async function extractProducts(url) {
  if (!API_KEY) throw new Error('Firecracrawl API key not configured. Set VITE_FIRECRAWL_API_KEY.')
  const res = await request('/scrape', {
    method: 'POST',
    body: JSON.stringify({
      url,
      formats: ['extract'],
      onlyMainContent: true,
      extract: {
        schema: {
          type: 'object',
          properties: {
            products: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string', description: 'Product name or title' },
                  price: { type: 'number', description: 'Product price in USD' },
                  description: { type: 'string', description: 'Short product description' },
                  category: { type: 'string', description: 'Product category' },
                  image: { type: 'string', description: 'Product image URL' },
                  rating: { type: 'number', description: 'Product rating out of 5' },
                  stock: { type: 'number', description: 'Available stock count' },
                },
                required: ['name', 'price'],
              },
            },
          },
          required: ['products'],
        },
      },
    }),
  })

  // Firecrawl extract returns data under res.data.extract
  const extracted = res?.data?.extract?.products || []
  return extracted.map((p) => ({
    id: `scraped-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: p.name || 'Unnamed Product',
    tagline: p.description?.slice(0, 60) || '',
    price: typeof p.price === 'number' ? p.price : 0,
    originalPrice: typeof p.price === 'number' ? Math.round(p.price * 1.15) : 0,
    badge: 'SCRAPED',
    badgeColor: 'neon-purple',
    gpu: '',
    cpu: '',
    ram: '',
    storage: '',
    cooling: '',
    psu: '',
    case: '',
    rgb: false,
    fps: { '1080p': 0, '1440p': 0, '4K': 0 },
    games: [],
    image: p.image || null,
    color: 'from-purple-900/40 to-blue-900/40',
    glowColor: 'rgba(124,58,237,0.4)',
    rating: typeof p.rating === 'number' ? p.rating : 0,
    reviews: 0,
    stock: typeof p.stock === 'number' ? p.stock : 0,
    category: p.category || 'scraped',
    sourceUrl: url,
  }))
}

export function isConfigured() {
  return Boolean(API_KEY)
}
