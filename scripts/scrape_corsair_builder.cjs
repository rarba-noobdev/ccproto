const fs = require('fs')
const path = require('path')

const API_KEY = process.env.FIRECRAWL_API_KEY
const OUT_DIR = path.join(__dirname, '..', 'scrape_cache')
const USD_TO_INR = 84

const builderUrl = 'https://www.corsair.com/us/en/pc-builder/'
const officialBuildUrl = 'https://www.corsair.com/us/en/explorer/builds/official/white-air-5400-triple-chamber-case/'

const fallbackPrices = {
  case: 23999,
  cooler: 18999,
  ram: 40999,
  storage: 16999,
  psu: 14999,
}

if (!API_KEY) throw new Error('Set FIRECRAWL_API_KEY before running this script.')

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 86)
}

function cleanText(value) {
  return String(value || '')
    .replace(/®|™/g, '')
    .replace(/—/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
}

function sqlString(value) {
  if (value === null || value === undefined) return 'NULL'
  if (typeof value === 'number') return String(value)
  if (typeof value === 'boolean') return value ? 'TRUE' : 'FALSE'
  return `'${String(value).replace(/'/g, "''")}'`
}

async function scrapeMarkdown(url) {
  const response = await fetch('https://api.firecrawl.dev/v2/scrape', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      formats: ['markdown'],
      onlyMainContent: true,
      waitFor: 5000,
    }),
  })

  const payload = await response.json()
  if (!response.ok || !payload.success) {
    throw new Error(`Firecrawl failed for ${url}: ${JSON.stringify(payload).slice(0, 500)}`)
  }
  return payload.data.markdown || ''
}

function categoryFromUrl(url) {
  if (/\/pc-cases\//i.test(url)) return 'case'
  if (/\/cpu-coolers\//i.test(url)) return 'cooler'
  if (/\/memory\//i.test(url)) return 'ram'
  if (/\/data-storage\//i.test(url)) return 'storage'
  if (/\/psu\//i.test(url)) return 'psu'
  return null
}

function parseOfficialProducts(md) {
  const products = []
  const seen = new Set()
  const regex = /\[!\[([^\]]+)\]\((https:\/\/assets\.corsair\.com\/image\/upload\/[^)]+)\)\]\((https:\/\/www\.corsair\.com\/us\/en\/p\/[^)]+)\)/g
  let match

  while ((match = regex.exec(md))) {
    const [, alt, image, url] = match
    const category = categoryFromUrl(url)
    if (!category || seen.has(url)) continue
    seen.add(url)
    products.push({
      category,
      name: cleanText(alt),
      image: image.replace(/w_400,h_400,c_pad,q_auto:best/, 'c_pad,q_85,h_700,w_700,f_auto'),
      source_url: url,
    })
  }

  const rank = { case: 0, cooler: 1, ram: 2, storage: 3, psu: 4 }
  return products
    .filter((product) => !/lighting enhancement|fan expansion|reverse fans|starter kit/i.test(product.name))
    .sort((a, b) => (rank[a.category] ?? 9) - (rank[b.category] ?? 9))
    .slice(0, 16)
}

function parsePrice(md) {
  const priceLine = md.match(/Current price:\s*\$([0-9,.]+)(?:\s*-\s*Original price:\s*\$([0-9,.]+))?/i)
  if (!priceLine) return null
  const price = Number(priceLine[1].replace(/,/g, ''))
  const mrp = priceLine[2] ? Number(priceLine[2].replace(/,/g, '')) : Math.round(price * 1.1)
  if (!Number.isFinite(price)) return null
  return {
    price: Math.round(price * USD_TO_INR),
    mrp: Math.round((Number.isFinite(mrp) ? mrp : price * 1.1) * USD_TO_INR),
  }
}

function enrich(product, index, priceData) {
  const categoryLabel = {
    case: 'Corsair PC Case',
    cooler: 'Corsair Cooling',
    ram: 'Corsair DDR5 Memory',
    storage: 'Corsair NVMe Storage',
    psu: 'Corsair Power Supply',
  }[product.category]
  const basePrice = fallbackPrices[product.category] + index * 2200
  const price = priceData?.price || basePrice
  const mrp = priceData?.mrp || Math.round(price * 1.12)
  const speed = product.name.match(/\b\d{4,5}MT\/s\b/i)?.[0] || null
  const wattage = product.name.match(/\b(\d{3,4})W\b/i)?.[1]

  return {
    id: `corsair-${product.category}-${slugify(product.name)}`,
    category: product.category,
    sub_category: categoryLabel,
    name: product.name,
    brand: 'Corsair',
    image: product.image,
    source_url: product.source_url,
    price,
    mrp,
    discount_pct: mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0,
    currency: 'INR',
    in_stock: true,
    speed,
    efficiency: product.category === 'psu' ? 'Gold' : null,
    wattage: wattage ? Number(wattage) : null,
    score: Math.min(98, 76 + index * 3),
    tier: index > 8 ? 'ultra' : index > 4 ? 'high' : 'mid',
  }
}

function buildSql(products) {
  const rows = products.map((p) => `(${[
    sqlString(p.id),
    sqlString(p.category),
    sqlString(p.sub_category),
    sqlString(p.name),
    sqlString(p.brand),
    sqlString(p.image),
    sqlString(p.source_url),
    p.price,
    p.mrp,
    p.discount_pct,
    sqlString(p.currency),
    p.in_stock,
    sqlString(p.speed),
    sqlString(p.efficiency),
    p.wattage ?? 'NULL',
    p.score,
    sqlString(p.tier),
  ].join(', ')})`)

  return `-- Generated by scripts/scrape_corsair_builder.cjs
-- Adds Corsair builder-compatible components without deleting existing catalog data.

INSERT INTO components (
  id, category, sub_category, name, brand, image, source_url, price, mrp, discount_pct,
  currency, in_stock, speed, efficiency, wattage, score, tier
) VALUES
${rows.join(',\n')}
ON CONFLICT (id) DO UPDATE SET
  sub_category = EXCLUDED.sub_category,
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  image = EXCLUDED.image,
  source_url = EXCLUDED.source_url,
  price = EXCLUDED.price,
  mrp = EXCLUDED.mrp,
  discount_pct = EXCLUDED.discount_pct,
  currency = EXCLUDED.currency,
  in_stock = EXCLUDED.in_stock,
  speed = EXCLUDED.speed,
  efficiency = EXCLUDED.efficiency,
  wattage = EXCLUDED.wattage,
  score = EXCLUDED.score,
  tier = EXCLUDED.tier;`
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true })
  const builderMarkdown = await scrapeMarkdown(builderUrl)
  const officialMarkdown = await scrapeMarkdown(officialBuildUrl)
  fs.writeFileSync(path.join(OUT_DIR, 'corsair_builder_shell.md'), builderMarkdown)
  fs.writeFileSync(path.join(OUT_DIR, 'corsair_builder_official_build.md'), officialMarkdown)

  const sourceProducts = parseOfficialProducts(officialMarkdown)
  const products = []
  for (const [index, product] of sourceProducts.entries()) {
    console.log(`Scraping product ${index + 1}/${sourceProducts.length}: ${product.name}`)
    let priceData = null
    try {
      priceData = parsePrice(await scrapeMarkdown(product.source_url))
    } catch (error) {
      console.warn(`Price scrape failed for ${product.source_url}: ${error.message}`)
    }
    products.push(enrich(product, index, priceData))
  }

  fs.writeFileSync(path.join(OUT_DIR, 'corsair_builder_components.json'), JSON.stringify(products, null, 2))
  fs.writeFileSync(path.join(OUT_DIR, '04_corsair_builder_components.sql'), buildSql(products))
  console.log(`Generated ${products.length} Corsair builder components`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
