export const builderComponents = {
  cpu: {
    label: 'Processor (CPU)',
    icon: null,
    options: [
      { id: 'i9-14900k', name: 'Intel Core i9-14900K', brand: 'Intel', price: 589, wattage: 125, socket: 'LGA1700', tier: 'ultra', score: 98, benchmark: 'Elite Gaming & Productivity' },
      { id: 'r9-7950x', name: 'AMD Ryzen 9 7950X', brand: 'AMD', price: 699, wattage: 170, socket: 'AM5', tier: 'ultra', score: 99, benchmark: 'Supreme Multithreading' },
      { id: 'r9-7900x3d', name: 'AMD Ryzen 9 7900X3D', brand: 'AMD', price: 449, wattage: 120, socket: 'AM5', tier: 'high', score: 97, benchmark: 'Best Gaming CPU 2024' },
      { id: 'r7-7800x3d', name: 'AMD Ryzen 7 7800X3D', brand: 'AMD', price: 349, wattage: 120, socket: 'AM5', tier: 'high', score: 96, benchmark: 'Price/Perf Champion' },
      { id: 'i7-14700k', name: 'Intel Core i7-14700K', brand: 'Intel', price: 389, wattage: 125, socket: 'LGA1700', tier: 'high', score: 93, benchmark: 'Creator & Gaming' },
      { id: 'r5-7600x', name: 'AMD Ryzen 5 7600X', brand: 'AMD', price: 199, wattage: 105, socket: 'AM5', tier: 'mid', score: 86, benchmark: 'Budget Champion' },
      { id: 'i5-14600k', name: 'Intel Core i5-14600K', brand: 'Intel', price: 249, wattage: 125, socket: 'LGA1700', tier: 'mid', score: 88, benchmark: 'Mid-Range King' },
    ],
  },
  gpu: {
    label: 'Graphics Card (GPU)',
    icon: null,
    options: [
      { id: 'rtx4090', name: 'NVIDIA RTX 4090 24GB', brand: 'NVIDIA', price: 1599, wattage: 450, tier: 'ultra', score: 100, vram: '24GB GDDR6X', benchmark: '4K Ultra Beast' },
      { id: 'rtx4080s', name: 'NVIDIA RTX 4080 Super 16GB', brand: 'NVIDIA', price: 999, wattage: 320, tier: 'ultra', score: 94, vram: '16GB GDDR6X', benchmark: '4K Gaming Perfection' },
      { id: 'rtx4070tis', name: 'NVIDIA RTX 4070 Ti Super 16GB', brand: 'NVIDIA', price: 799, wattage: 285, tier: 'high', score: 89, vram: '16GB GDDR6X', benchmark: '1440p Champion' },
      { id: 'rx7900xtx', name: 'AMD Radeon RX 7900 XTX 24GB', brand: 'AMD', price: 899, wattage: 355, tier: 'ultra', score: 93, vram: '24GB GDDR6', benchmark: 'AMD Flagship' },
      { id: 'rtx4070s', name: 'NVIDIA RTX 4070 Super 12GB', brand: 'NVIDIA', price: 599, wattage: 220, tier: 'high', score: 84, vram: '12GB GDDR6X', benchmark: '1440p Value King' },
      { id: 'rtx4060ti', name: 'NVIDIA RTX 4060 Ti 16GB', brand: 'NVIDIA', price: 429, wattage: 165, tier: 'mid', score: 76, vram: '16GB GDDR6', benchmark: '1080p Dominator' },
      { id: 'rx7700xt', name: 'AMD Radeon RX 7700 XT 12GB', brand: 'AMD', price: 349, wattage: 245, tier: 'mid', score: 72, vram: '12GB GDDR6', benchmark: '1080p Value' },
    ],
  },
  ram: {
    label: 'Memory (RAM)',
    icon: null,
    options: [
      { id: 'ddr5-64-6000', name: '64GB DDR5 6000MHz Kit', brand: 'G.Skill Trident Z5', price: 249, wattage: 10, tier: 'ultra', score: 99 },
      { id: 'ddr5-32-6000', name: '32GB DDR5 6000MHz Kit', brand: 'G.Skill Trident Z5', price: 129, wattage: 8, tier: 'high', score: 96 },
      { id: 'ddr5-32-5200', name: '32GB DDR5 5200MHz Kit', brand: 'Kingston Fury', price: 99, wattage: 8, tier: 'high', score: 93 },
      { id: 'ddr5-16-5200', name: '16GB DDR5 5200MHz Kit', brand: 'Corsair Vengeance', price: 59, wattage: 6, tier: 'mid', score: 88 },
      { id: 'ddr4-32-3600', name: '32GB DDR4 3600MHz Kit', brand: 'G.Skill Ripjaws V', price: 79, wattage: 8, tier: 'mid', score: 82 },
      { id: 'ddr4-16-3200', name: '16GB DDR4 3200MHz Kit', brand: 'Corsair Vengeance', price: 39, wattage: 6, tier: 'base', score: 75 },
    ],
  },
  storage: {
    label: 'Storage (SSD/HDD)',
    icon: null,
    options: [
      { id: 'ssd-2tb-pcie5', name: '2TB NVMe PCIe 5.0 SSD', brand: 'Samsung 990 Pro', price: 249, wattage: 7, tier: 'ultra', score: 100, speed: '14,000 MB/s' },
      { id: 'ssd-2tb-pcie4', name: '2TB NVMe PCIe 4.0 SSD', brand: 'Samsung 990', price: 149, wattage: 6, tier: 'high', score: 94, speed: '7,450 MB/s' },
      { id: 'ssd-1tb-pcie4', name: '1TB NVMe PCIe 4.0 SSD', brand: 'WD Black SN850X', price: 89, wattage: 5, tier: 'high', score: 92, speed: '7,300 MB/s' },
      { id: 'ssd-1tb-pcie3', name: '1TB NVMe PCIe 3.0 SSD', brand: 'Samsung 870 EVO', price: 59, wattage: 4, tier: 'mid', score: 82, speed: '3,500 MB/s' },
      { id: 'ssd-500gb', name: '500GB NVMe PCIe 3.0 SSD', brand: 'Crucial P3', price: 39, wattage: 3, tier: 'base', speed: '3,500 MB/s', score: 70 },
    ],
  },
  motherboard: {
    label: 'Motherboard',
    icon: null,
    options: [
      { id: 'z790-aorus', name: 'ASUS ROG Maximus Z790', brand: 'ASUS ROG', price: 599, wattage: 50, socket: 'LGA1700', tier: 'ultra', score: 99 },
      { id: 'x670e-hero', name: 'ASUS ROG Crosshair X670E Hero', brand: 'ASUS ROG', price: 499, wattage: 40, socket: 'AM5', tier: 'ultra', score: 98 },
      { id: 'z790-gaming', name: 'MSI MPG Z790 Carbon WiFi', brand: 'MSI', price: 329, wattage: 35, socket: 'LGA1700', tier: 'high', score: 92 },
      { id: 'x670-steel', name: 'MSI MAG X670E Tomahawk WiFi', brand: 'MSI', price: 279, wattage: 30, socket: 'AM5', tier: 'high', score: 90 },
      { id: 'b760-gaming', name: 'GIGABYTE B760 AORUS Elite AX', brand: 'GIGABYTE', price: 199, wattage: 25, socket: 'LGA1700', tier: 'mid', score: 83 },
      { id: 'b650-gaming', name: 'MSI PRO B650-A WiFi', brand: 'MSI', price: 159, wattage: 25, socket: 'AM5', tier: 'mid', score: 80 },
    ],
  },
  cooling: {
    label: 'CPU Cooling',
    icon: null,
    options: [
      { id: 'aio-420', name: '420mm AIO Liquid Cooler', brand: 'ASUS ROG Ryujin III', price: 299, wattage: 18, tier: 'ultra', score: 100 },
      { id: 'aio-360', name: '360mm AIO Liquid Cooler', brand: 'Corsair H150i Elite', price: 199, wattage: 15, tier: 'high', score: 95 },
      { id: 'aio-280', name: '280mm AIO Liquid Cooler', brand: 'NZXT Kraken X63', price: 149, wattage: 12, tier: 'high', score: 90 },
      { id: 'aio-240', name: '240mm AIO Liquid Cooler', brand: 'be quiet! Pure Loop 2', price: 99, wattage: 10, tier: 'mid', score: 84 },
      { id: 'air-premium', name: 'Premium Air Cooler', brand: 'Noctua NH-D15', price: 99, wattage: 5, tier: 'mid', score: 88 },
      { id: 'air-budget', name: 'Budget Air Cooler', brand: 'be quiet! Pure Rock 2', price: 39, wattage: 4, tier: 'base', score: 70 },
    ],
  },
  psu: {
    label: 'Power Supply (PSU)',
    icon: null,
    options: [
      { id: 'psu-1200t', name: '1200W 80+ Titanium', brand: 'Seasonic Prime TX-1200', price: 349, wattage: 0, efficiency: '96%', tier: 'ultra', score: 100 },
      { id: 'psu-1000p', name: '1000W 80+ Platinum', brand: 'Corsair HX1000', price: 199, wattage: 0, efficiency: '92%', tier: 'high', score: 95 },
      { id: 'psu-850g', name: '850W 80+ Gold', brand: 'EVGA SuperNOVA 850 G6', price: 139, wattage: 0, efficiency: '90%', tier: 'high', score: 90 },
      { id: 'psu-750g', name: '750W 80+ Gold', brand: 'Seasonic Focus GX-750', price: 109, wattage: 0, efficiency: '90%', tier: 'mid', score: 86 },
      { id: 'psu-650g', name: '650W 80+ Gold', brand: 'be quiet! Pure Power 12M', price: 79, wattage: 0, efficiency: '90%', tier: 'mid', score: 82 },
    ],
  },
  case: {
    label: 'PC Case',
    icon: null,
    options: [
      { id: 'case-o11d', name: 'Lian Li PC-O11 Dynamic EVO', brand: 'Lian Li', price: 179, wattage: 0, tier: 'ultra', score: 98 },
      { id: 'case-h9elite', name: 'Fractal Design Torrent RGB', brand: 'Fractal Design', price: 199, wattage: 0, tier: 'ultra', score: 97 },
      { id: 'case-meshify', name: 'Fractal Design Meshify 2 XL', brand: 'Fractal Design', price: 159, wattage: 0, tier: 'high', score: 93 },
      { id: 'case-p500a', name: 'Phanteks Enthoo Pro II', brand: 'Phanteks', price: 149, wattage: 0, tier: 'high', score: 91 },
      { id: 'case-h510', name: 'NZXT H510 Flow RGB', brand: 'NZXT', price: 99, wattage: 0, tier: 'mid', score: 83 },
      { id: 'case-matx', name: 'Cooler Master MasterBox Q500L', brand: 'Cooler Master', price: 59, wattage: 0, tier: 'base', score: 72 },
    ],
  },
}

export const compatibilityRules = {
  socket: {
    'LGA1700': ['z790-aorus', 'z790-gaming', 'b760-gaming'],
    'AM5': ['x670e-hero', 'x670-steel', 'b650-gaming'],
  },
}

export const fpsEstimates = {
  cyberpunk2077: {
    base: 30,
    gpuMultiplier: { rtx4090: 3.8, rtx4080s: 2.9, rtx4070tis: 2.3, rx7900xtx: 2.7, rtx4070s: 1.9, rtx4060ti: 1.5, rx7700xt: 1.4 },
    cpuMultiplier: { 'i9-14900k': 1.0, 'r9-7950x': 1.0, 'r9-7900x3d': 1.0, 'r7-7800x3d': 0.98, 'i7-14700k': 0.97, 'r5-7600x': 0.95, 'i5-14600k': 0.96 },
  },
  valorant: {
    base: 120,
    gpuMultiplier: { rtx4090: 3.2, rtx4080s: 2.7, rtx4070tis: 2.2, rx7900xtx: 2.5, rtx4070s: 1.9, rtx4060ti: 1.6, rx7700xt: 1.5 },
    cpuMultiplier: { 'i9-14900k': 1.0, 'r9-7950x': 0.98, 'r9-7900x3d': 1.02, 'r7-7800x3d': 1.05, 'i7-14700k': 0.97, 'r5-7600x': 0.95, 'i5-14600k': 0.94 },
  },
}
