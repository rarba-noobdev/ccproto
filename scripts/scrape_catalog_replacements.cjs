const fs = require('fs')
const path = require('path')

const API_KEY = process.env.FIRECRAWL_API_KEY
const OUT_DIR = path.join(__dirname, '..', 'scrape_cache')
const USD_TO_INR = 84

if (!API_KEY) {
  throw new Error('Set FIRECRAWL_API_KEY before running this script.')
}

const sources = {
  starforge: 'https://starforgesystems.com/pages/gaming-pcs',
  cabinet: 'https://antesports.com/product-category/components/cabinet/',
  cooler: 'https://antesports.com/product-category/components/air-cooler/',
  psu: 'https://antesports.com/product-category/components/psu/',
  storage: 'https://antesports.com/product-category/ram-ssd/',
  ram: 'https://www.corsair.com/us/en/c/memory/ddr5-ram?filter=formatted_tech_specs.LED%20Lighting%3A%3ARGB',
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 82)
}

function cleanText(value) {
  return String(value || '')
    .replace(/â€”|â€“/g, '-')
    .replace(/â€³/g, '"')
    .replace(/â€™/g, "'")
    .replace(/â€œ|â€�/g, '"')
    .replace(/Ã—/g, 'x')
    .replace(/Â/g, '')
    .replace(/®/g, '')
    .replace(/\\|\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function sqlString(value) {
  if (value === null || value === undefined) return 'NULL'
  if (typeof value === 'number') return String(value)
  if (typeof value === 'boolean') return value ? 'TRUE' : 'FALSE'
  return `'${String(value).replace(/'/g, "''")}'`
}

function parseMoney(text, symbol) {
  const marker = symbol === '$' ? '\\$' : '₹'
  const matches = [...String(text).matchAll(new RegExp(`${marker}\\s*([0-9][0-9,.]*)`, 'g'))]
    .map((match) => Number(match[1].replace(/,/g, '')))
    .filter(Number.isFinite)
  return matches
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
      waitFor: 4000,
    }),
  })

  const payload = await response.json()
  if (!response.ok || !payload.success) {
    throw new Error(`Firecrawl failed for ${url}: ${JSON.stringify(payload).slice(0, 500)}`)
  }
  return payload.data.markdown || ''
}

function scoreComponents(items) {
  const groups = items.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || []
    acc[item.category].push(item)
    return acc
  }, {})

  Object.values(groups).forEach((group) => {
    group.sort((a, b) => a.price - b.price)
    const min = group[0]?.price || 0
    const max = group[group.length - 1]?.price || min
    group.forEach((item) => {
      item.score = Math.round(60 + (40 * (item.price - min)) / Math.max(1, max - min))
      item.tier = item.score >= 92 ? 'ultra' : item.score >= 80 ? 'high' : item.score >= 70 ? 'mid' : 'base'
    })
  })
}

function parseAntesports(md, category, limit = 14) {
  const products = []
  const regex = /\[!\[([^\]]+)\]\((https?:\/\/[^)]+)\)([\s\S]*?)\]\((https:\/\/antesports\.com\/product\/[^)]+)\)/g
  let match

  while ((match = regex.exec(md))) {
    const [, alt, image, body, url] = match
    const rawName = (body.match(/\*\*([\s\S]*?)\*\*/) || [null, alt])[1]
    const name = cleanText(rawName)
    const prices = parseMoney(body, '₹')
    const price = prices.length > 1 ? prices[prices.length - 1] : prices[0]
    const mrp = prices.length > 1 ? prices[0] : Math.round((price || 0) * 1.12)
    if (!name || !price) continue
    if (category === 'storage' && !/ssd|nvme|sata/i.test(name)) continue

    products.push({
      id: `${category}-${slugify(name)}`,
      category,
      sub_category: category === 'case' ? 'PC Cabinet' : category === 'cooler' ? 'Air Cooler' : category === 'psu' ? 'Power Supply' : 'Storage',
      name,
      brand: 'Ant Esports',
      image,
      source_url: url,
      price: Math.round(price),
      mrp: Math.round(mrp),
      discount_pct: mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0,
      currency: 'INR',
      in_stock: !/sold out/i.test(body),
    })
  }

  return products.slice(0, limit)
}

function parseCorsairMemory(md, limit = 14) {
  const products = []
  const imageRegex = /\[!\[([^\]]+)\]\((https:\/\/assets\.corsair\.com\/image\/upload\/[^)]+)\)\]\((https:\/\/www\.corsair\.com\/us\/en\/p\/(?:memory|bundles)\/[^)]+)\)/g
  let imageMatch
  const imageByUrl = new Map()
  while ((imageMatch = imageRegex.exec(md))) {
    imageByUrl.set(imageMatch[3].split('?')[0], { alt: imageMatch[1], image: imageMatch[2] })
  }

  const titleRegex = /## \[([^\]]+)\]\((https:\/\/www\.corsair\.com\/us\/en\/p\/(?:memory|bundles)\/[^)]+)\)([\s\S]*?)(?=\n\[!\[|\n## \[|$)/g
  let match
  while ((match = titleRegex.exec(md))) {
    const [, title, href, body] = match
    if (!/rgb/i.test(title)) continue
    if (/bundle|sodimm/i.test(title)) continue
    const url = href.split('?')[0]
    const image = imageByUrl.get(url)?.image
    const prices = parseMoney(body, '$')
    const usd = prices[0]
    const originalUsd = prices[1] && prices[1] > usd ? prices[1] : Math.round((usd || 0) * 1.12)
    if (!usd || !image) continue

    products.push({
      id: `ram-${slugify(title)}`,
      category: 'ram',
      sub_category: 'DDR5 RGB Memory',
      name: cleanText(title),
      brand: 'Corsair',
      image,
      source_url: url,
      price: Math.round(usd * USD_TO_INR),
      mrp: Math.round(originalUsd * USD_TO_INR),
      discount_pct: originalUsd > usd ? Math.round(((originalUsd - usd) / originalUsd) * 100) : 0,
      currency: 'INR',
      in_stock: true,
      speed: (title.match(/(\d{4,5}MT\/s|\d{4,5}MTS|\d{4,5}MHz)/i) || [])[1] || null,
    })
  }

  return products.slice(0, limit)
}

function parseStarforge(md, limit = 14) {
  const systems = []
  const regex = /\[!\[\]\((https:\/\/starforgesystems\.com\/cdn\/shop\/files\/[^)]+)\)[\s\S]*?\]\((https:\/\/starforgesystems\.com\/products\/[^)]+)\)\s*\n\s*\[([\s\S]*?)\]\(\2\)/g
  let match

  while ((match = regex.exec(md))) {
    const [, image, url, body] = match
    const name = cleanText((body.match(/\*\*([\s\S]*?)\*\*/) || [])[1])
    if (!name || /case print|bundle$/i.test(name)) continue
    const usdPrices = parseMoney(body, '$')
    const usd = usdPrices[0]
    const originalUsd = usdPrices[1] && usdPrices[1] > usd ? usdPrices[1] : Math.round((usd || 0) * 1.08)
    if (!usd || usd < 1000) continue
    const bestFor = cleanText([...body.matchAll(/Best\s*for:\\?\s*([\s\S]*?)\\\s*\\\s*\$/g)][0]?.[1])

    systems.push({
      slug: slugify(name),
      name,
      tagline: bestFor ? `Best for ${bestFor}` : 'Ready gaming desktop',
      image,
      source_url: url,
      price: Math.round(usd * USD_TO_INR),
      mrp: Math.round(originalUsd * USD_TO_INR),
      badge: /voyager|elite|ultimate/i.test(name) ? 'Performance' : /horizon/i.test(name) ? 'Starter' : /explorer/i.test(name) ? 'Creator' : 'Gaming',
      badge_color: /horizon/i.test(name) ? 'emerald' : /explorer/i.test(name) ? 'rose' : 'amber',
      category: /explorer/i.test(name) ? 'workstation' : 'gaming',
    })
  }

  const preferred = systems.filter((system) => /horizon|navigator|voyager|explorer|sentinel/i.test(system.name))
  const rest = systems.filter((system) => !preferred.includes(system))
  return [...preferred, ...rest].slice(0, limit)
}

function pick(items, category, tier = 0.5) {
  const list = items.filter((item) => item.category === category).sort((a, b) => a.price - b.price)
  if (!list.length) return null
  return list[Math.min(list.length - 1, Math.max(0, Math.floor(list.length * tier)))]
}

function buildSql(components, systems) {
  scoreComponents(components)
  const componentRows = components.map((p) => `(${[
    sqlString(p.id),
    sqlString(p.category),
    sqlString(p.sub_category),
    sqlString(p.name),
    sqlString(p.brand),
    sqlString(p.image),
    sqlString(p.source_url),
    p.price,
    p.mrp || Math.round(p.price * 1.12),
    p.discount_pct || 0,
    sqlString(p.currency || 'INR'),
    p.in_stock !== false ? 'TRUE' : 'FALSE',
    sqlString(p.speed || null),
    sqlString(p.efficiency || null),
    p.score || 72,
    sqlString(p.tier || 'mid'),
  ].join(', ')})`)

  const tiers = [0.15, 0.28, 0.42, 0.58, 0.72, 0.86, 0.95]
  const systemRows = systems.map((system, index) => {
    const tier = tiers[Math.min(index, tiers.length - 1)]
    const ram = pick(components, 'ram', tier)
    const storage = pick(components, 'storage', tier)
    const cooler = pick(components, 'cooler', tier)
    const casePart = pick(components, 'case', tier)
    const cpuOffset = Math.min(index, 16)
    const gpuOffset = Math.min(index, 18)
    const fpsBase = Math.max(150, 180 + index * 22)

    return `(${[
      sqlString(system.slug),
      sqlString(system.slug),
      sqlString(system.name),
      sqlString(system.tagline),
      sqlString(system.category),
      system.price,
      system.mrp,
      sqlString(system.badge),
      sqlString(system.badge_color),
      `(select id from components where category = 'cpu' order by price limit 1 offset ${cpuOffset})`,
      `(select id from components where category = 'gpu' order by price limit 1 offset ${gpuOffset})`,
      sqlString(ram?.id),
      sqlString(storage?.id),
      sqlString(cooler?.id),
      sqlString(casePart?.id),
      sqlString('linear-gradient(135deg,#f8f4ed,#ffffff)'),
      sqlString('rgba(250,93,25,0.18)'),
      Math.round(fpsBase * 1.45),
      fpsBase,
      Math.round(fpsBase * 0.58),
      4.8,
      80 + index * 27,
      4 + index,
      sqlString(system.image),
      sqlString(system.source_url),
      `ARRAY[${(system.category === 'workstation' ? ['Creator', 'Rendering', 'Production'] : ['Gaming', 'Streaming', 'High FPS']).map(sqlString).join(', ')}]`,
    ].join(', ')})`
  })

  return `-- Generated by scripts/scrape_catalog_replacements.cjs
-- Replaces old prebuilts plus RAM, storage, cooler, PSU, and cabinet rows.

DELETE FROM prebuilts;
DELETE FROM components WHERE category IN ('ram', 'storage', 'cooler', 'psu', 'case');

INSERT INTO components (
  id, category, sub_category, name, brand, image, source_url, price, mrp, discount_pct,
  currency, in_stock, speed, efficiency, score, tier
) VALUES
${componentRows.join(',\n')}
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
  score = EXCLUDED.score,
  tier = EXCLUDED.tier;

INSERT INTO prebuilts (
  id, slug, name, tagline, category, price, mrp, badge, badge_color,
  cpu_id, gpu_id, ram_id, storage_id, cooler_id, case_id,
  hero_color, glow_color, fps_1080p, fps_1440p, fps_4k, rating, reviews_count, stock,
  image, source_url, use_cases
) VALUES
${systemRows.join(',\n')}
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  mrp = EXCLUDED.mrp,
  badge = EXCLUDED.badge,
  badge_color = EXCLUDED.badge_color,
  cpu_id = EXCLUDED.cpu_id,
  gpu_id = EXCLUDED.gpu_id,
  ram_id = EXCLUDED.ram_id,
  storage_id = EXCLUDED.storage_id,
  cooler_id = EXCLUDED.cooler_id,
  case_id = EXCLUDED.case_id,
  image = EXCLUDED.image,
  source_url = EXCLUDED.source_url,
  use_cases = EXCLUDED.use_cases;`
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true })
  const markdown = {}
  for (const [key, url] of Object.entries(sources)) {
    console.log(`Scraping ${key}: ${url}`)
    markdown[key] = await scrapeMarkdown(url)
    fs.writeFileSync(path.join(OUT_DIR, `replacement_${key}.md`), markdown[key])
  }

  const components = [
    ...parseAntesports(markdown.cabinet, 'case', 18),
    ...parseAntesports(markdown.cooler, 'cooler', 11),
    ...parseAntesports(markdown.psu, 'psu', 14),
    ...parseAntesports(markdown.storage, 'storage', 8),
    ...parseCorsairMemory(markdown.ram, 14),
  ]
  const systems = parseStarforge(markdown.starforge, 14)

  fs.writeFileSync(path.join(OUT_DIR, 'replacement_products.json'), JSON.stringify({ components, systems }, null, 2))
  fs.writeFileSync(path.join(OUT_DIR, '03_replacements.sql'), buildSql(components, systems))

  console.log(`Components: ${components.length}`)
  console.log(Object.entries(components.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1
    return acc
  }, {})).map(([k, v]) => `${k}:${v}`).join(', '))
  console.log(`Systems: ${systems.length}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
