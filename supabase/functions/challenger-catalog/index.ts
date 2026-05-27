import "jsr:@supabase/functions-js/edge-runtime.d.ts"

type CatalogProduct = {
  id: string
  name: string
  price: number
  originalPrice?: number
  category: string
  categoryLabel: string
  categoryDescription: string
  availability: string
  rating: number
  imageSource: string
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-sync-token',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
}

const catalog: CatalogProduct[] = [
  {
    "id": "accessories-glorious-pc-gaming-race-cleaning-kit-for-keyboard-and-mouse-0",
    "name": "Glorious PC Gaming Race Cleaning Kit for Keyboard and Mouse",
    "price": 1049,
    "originalPrice": 1499,
    "category": "accessories",
    "categoryLabel": "Accessories",
    "categoryDescription": "Desk utilities and add-ons",
    "availability": "In Stock",
    "rating": 4.6,
    "imageSource": "https://mdcomputers.in/image/catalog/accessories/glorious/glo-acc-ck/glo-acc-ck-image-main.jpg"
  },
  {
    "id": "accessories-ek-hd-hard-tube-reamer-for-acrylic-petg-copper-aluminum-brass-carbon-fiber-tube--1",
    "name": "EK-HD Hard Tube Reamer For Acrylic, PETG, Copper, Aluminum, Brass, Carbon Fiber Tube - Orange",
    "price": 1260,
    "originalPrice": 2599,
    "category": "accessories",
    "categoryLabel": "Accessories",
    "categoryDescription": "Desk utilities and add-ons",
    "availability": "In Stock",
    "rating": 4.699999999999999,
    "imageSource": "https://mdcomputers.in/image/catalog/diy_tools_and_accessories/ekwb/3830046994585/ek-hd-tube-reamer-image-main.jpg"
  },
  {
    "id": "accessories-elgato-chat-link-party-adapter-for-ps4-2",
    "name": "Elgato Chat Link Party Adapter For PS4",
    "price": 1400,
    "originalPrice": 1850,
    "category": "accessories",
    "categoryLabel": "Accessories",
    "categoryDescription": "Desk utilities and add-ons",
    "availability": "In Stock",
    "rating": 4.8,
    "imageSource": "https://mdcomputers.in/image/catalog/accessories/cable/elgato/chat-link/chat-link-4.jpg"
  },
  {
    "id": "accessories-fractal-design-usb-c-10gbps-cable-model-e-3",
    "name": "Fractal Design USB-C 10Gbps Cable - Model E",
    "price": 1500,
    "originalPrice": 1577,
    "category": "accessories",
    "categoryLabel": "Accessories",
    "categoryDescription": "Desk utilities and add-ons",
    "availability": "In Stock",
    "rating": 4.8999999999999995,
    "imageSource": "https://mdcomputers.in/image/catalog/accessories/fd-a-usbc-002/fd-a-usbc-002-image-main.jpg"
  },
  {
    "id": "accessories-fractal-design-hdd-tray-kit-type-b-black-dual-pack-4",
    "name": "Fractal Design HDD Tray kit Type - B - Black (Dual Pack)",
    "price": 1700,
    "originalPrice": 1823,
    "category": "accessories",
    "categoryLabel": "Accessories",
    "categoryDescription": "Desk utilities and add-ons",
    "availability": "In Stock",
    "rating": 4.6,
    "imageSource": "https://mdcomputers.in/image/catalog/accessories/cabinet%20accesories/fractal-design/fd-a-tray-001/fd-a-tray-001-image-main.jpg"
  },
  {
    "id": "accessories-elgato-chat-link-pro-audio-adapter-5",
    "name": "Elgato Chat Link Pro Audio Adapter",
    "price": 2200,
    "originalPrice": 2900,
    "category": "accessories",
    "categoryLabel": "Accessories",
    "categoryDescription": "Desk utilities and add-ons",
    "availability": "In Stock",
    "rating": 4.699999999999999,
    "imageSource": "https://mdcomputers.in/image/catalog/accessories/elgato/10gbc9901/10gbc9901-image-main0.webp"
  },
  {
    "id": "cabinet-antec-cx800-argb-atx-mid-tower-case-6",
    "name": "Antec CX800 ARGB ATX Mid Tower Case",
    "price": 5200,
    "originalPrice": 6644,
    "category": "cabinet",
    "categoryLabel": "Cabinet",
    "categoryDescription": "Airflow and showcase cases",
    "availability": "In Stock",
    "rating": 4.8,
    "imageSource": "https://mdcomputers.in/image/catalog/cabinet/antec/cx800-argb-bk/cx800-argb-bk-image-main0.webp"
  },
  {
    "id": "cabinet-antec-c8-e-atx-full-tower-case-7",
    "name": "Antec C8 E-ATX Full Tower Case",
    "price": 8100,
    "originalPrice": 14550,
    "category": "cabinet",
    "categoryLabel": "Cabinet",
    "categoryDescription": "Airflow and showcase cases",
    "availability": "In Stock",
    "rating": 4.8999999999999995,
    "imageSource": "https://mdcomputers.in/image/catalog/cabinet/antec/c8-black/c8-black-image-main.jpg"
  },
  {
    "id": "cabinet-antec-c8-aluminum-white-e-atx-full-tower-case-8",
    "name": "Antec C8 Aluminum White E-ATX Full Tower Case",
    "price": 9030,
    "originalPrice": 14058,
    "category": "cabinet",
    "categoryLabel": "Cabinet",
    "categoryDescription": "Airflow and showcase cases",
    "availability": "In Stock",
    "rating": 4.6,
    "imageSource": "https://mdcomputers.in/image/catalog/cabinet/antec/c8-aluminum-white/c8-aluminum-white-image-main.jpg"
  },
  {
    "id": "cabinet-antec-c3-argb-white-atx-mid-tower-case-9",
    "name": "Antec C3 ARGB White ATX Mid Tower Case",
    "price": 6800,
    "originalPrice": 13250,
    "category": "cabinet",
    "categoryLabel": "Cabinet",
    "categoryDescription": "Airflow and showcase cases",
    "availability": "In Stock",
    "rating": 4.699999999999999,
    "imageSource": "https://mdcomputers.in/image/catalog/cabinet/antec/c3-argb-white/c3-argb-white-image-main.jpg"
  },
  {
    "id": "cooler-cooler-master-cryofuze-5-purple-3g-thermal-paste-10",
    "name": "Cooler Master CryoFuze 5 Purple 3g Thermal Paste",
    "price": 440,
    "originalPrice": 1099,
    "category": "cooler",
    "categoryLabel": "Cooler",
    "categoryDescription": "Air and liquid CPU cooling",
    "availability": "In Stock",
    "rating": 4.8,
    "imageSource": "https://mdcomputers.in/image/catalog/accessories/thermal-paste/cooler-master/mgy-nosg-n07m-r1/mgy-nosg-n07m-r1-image_main-.jpg"
  },
  {
    "id": "cooler-corsair-380mm-gray-tubing-sleeving-kit-for-aio-cpu-cooler-11",
    "name": "Corsair 380mm Gray Tubing Sleeving Kit for AIO CPU Cooler",
    "price": 520,
    "originalPrice": 2600,
    "category": "cooler",
    "categoryLabel": "Cooler",
    "categoryDescription": "Air and liquid CPU cooling",
    "availability": "In Stock",
    "rating": 4.8999999999999995,
    "imageSource": "https://mdcomputers.in/image/catalog/accessories/corsair/ct-9010005-ww/ct-9010005-ww-image-main0.webp"
  },
  {
    "id": "cooler-ant-esports-ice-c120-120mm-cpu-air-cooler-12",
    "name": "Ant Esports ICE-C120 120mm CPU Air Cooler",
    "price": 525,
    "originalPrice": 699,
    "category": "cooler",
    "categoryLabel": "Cooler",
    "categoryDescription": "Air and liquid CPU cooling",
    "availability": "In Stock",
    "rating": 4.6,
    "imageSource": "https://mdcomputers.in/image/catalog/cpu%20cooler/ant-esports/ice-c120/ice-c120-image-main.jpg"
  },
  {
    "id": "cooler-gamdias-boreas-e1-210-lite-rainbow-lighting-92mm-cpu-air-cooler-13",
    "name": "Gamdias Boreas E1-210 Lite Rainbow Lighting 92mm CPU Air Cooler",
    "price": 930,
    "originalPrice": 1999,
    "category": "cooler",
    "categoryLabel": "Cooler",
    "categoryDescription": "Air and liquid CPU cooling",
    "availability": "In Stock",
    "rating": 4.699999999999999,
    "imageSource": "https://mdcomputers.in/image/catalog/cpu%20cooler/gamdias/boreas-e1-210-lite/boreas-e1-210-lite-image-main.jpg"
  },
  {
    "id": "cooler-ant-esports-ice-c400-120mm-cpu-air-cooler-with-rainbow-led-14",
    "name": "Ant Esports ICE-C400 120mm CPU Air Cooler with Rainbow LED",
    "price": 1150,
    "originalPrice": 1799,
    "category": "cooler",
    "categoryLabel": "Cooler",
    "categoryDescription": "Air and liquid CPU cooling",
    "availability": "In Stock",
    "rating": 4.8,
    "imageSource": "https://mdcomputers.in/image/catalog/cpu%20cooler/ant-esports/ice-c400/ice-c400-image-main.jpg"
  },
  {
    "id": "cooler-thermaltake-ux100-argb-15",
    "name": "Thermaltake UX100 ARGB",
    "price": 1430,
    "originalPrice": 2090,
    "category": "cooler",
    "categoryLabel": "Cooler",
    "categoryDescription": "Air and liquid CPU cooling",
    "availability": "In Stock",
    "rating": 4.8999999999999995,
    "imageSource": "https://mdcomputers.in/image/catalog/cpu%20cooler/thermaltake/cl-p064-al12sw-a/cl-p064-al12sw-a-image-main.jpg"
  },
  {
    "id": "graphic-card-asus-gt-710-2gb-ddr5-graphics-card-16",
    "name": "Asus GT 710 2GB DDR5 Graphics Card",
    "price": 4600,
    "originalPrice": 8000,
    "category": "graphic-card",
    "categoryLabel": "Graphic Card",
    "categoryDescription": "GPUs for gaming and creation",
    "availability": "In Stock",
    "rating": 4.6,
    "imageSource": "https://mdcomputers.in/image/catalog/graphics%20card/asus/gt710-sl-2gd5-brk-evo/gt710-sl-2gd5-brk-evo-image_main.jpg"
  },
  {
    "id": "graphic-card-powercolor-rx-550-red-dragon-2gb-gddr5-low-profile-graphics-card-17",
    "name": "PowerColor RX 550 Red Dragon 2GB GDDR5 Low Profile Graphics Card",
    "price": 5399,
    "originalPrice": 9999,
    "category": "graphic-card",
    "categoryLabel": "Graphic Card",
    "categoryDescription": "GPUs for gaming and creation",
    "availability": "In Stock",
    "rating": 4.699999999999999,
    "imageSource": "https://mdcomputers.in/image/catalog/graphics%20card/powercolor/axrx-550-2gbd5-hle/axrx-550-2gbd5-hle-image.webp"
  },
  {
    "id": "graphic-card-galax-gt-730-lp-4gb-ddr3-graphics-card-18",
    "name": "Galax GT 730 LP 4GB DDR3 Graphics Card",
    "price": 7600,
    "originalPrice": 9000,
    "category": "graphic-card",
    "categoryLabel": "Graphic Card",
    "categoryDescription": "GPUs for gaming and creation",
    "availability": "In Stock",
    "rating": 4.8,
    "imageSource": "https://mdcomputers.in/image/catalog/graphics%20card/galax/73gqf8hx00hd/73gqf8hx00hd-image-main.jpg"
  },
  {
    "id": "graphic-card-asus-gt-1030-2gb-graphics-card-19",
    "name": "Asus GT 1030 2GB Graphics Card",
    "price": 9999,
    "originalPrice": 15000,
    "category": "graphic-card",
    "categoryLabel": "Graphic Card",
    "categoryDescription": "GPUs for gaming and creation",
    "availability": "In Stock",
    "rating": 4.8999999999999995,
    "imageSource": "https://mdcomputers.in/image/catalog/graphics%20card/asus/gt1030-sl-2g-brk/gt1030-sl-2g-brk-image-main.jpg"
  },
  {
    "id": "graphic-card-asus-gt-730-2gb-gddr5-graphics-card-with-4-hdmi-ports-20",
    "name": "Asus GT 730 2GB GDDR5 Graphics Card with 4 HDMI Ports",
    "price": 11800,
    "originalPrice": 16000,
    "category": "graphic-card",
    "categoryLabel": "Graphic Card",
    "categoryDescription": "GPUs for gaming and creation",
    "availability": "In Stock",
    "rating": 4.6,
    "imageSource": "https://mdcomputers.in/image/catalog/graphics%20card/asus/gt730-4h-sl-2gd5/gt730-4h-sl-2gd5-image-main.jpg"
  },
  {
    "id": "graphic-card-ant-esports-gcb200-digital-argb-graphics-card-holder-21",
    "name": "Ant Esports GCB200 Digital ARGB Graphics Card Holder",
    "price": 1900,
    "originalPrice": 3199,
    "category": "graphic-card",
    "categoryLabel": "Graphic Card",
    "categoryDescription": "GPUs for gaming and creation",
    "availability": "In Stock",
    "rating": 4.699999999999999,
    "imageSource": "https://mdcomputers.in/image/catalog/accessories/graphic-accessories/ant-esports/gcb200-digital-black/gcb200-black-image-main0.webp"
  },
  {
    "id": "keyboard-hp-k160-black-wired-keyboard-22",
    "name": "HP K160 Black Wired Keyboard",
    "price": 595,
    "originalPrice": 1299,
    "category": "keyboard",
    "categoryLabel": "Keyboard",
    "categoryDescription": "Mechanical and gaming keyboards",
    "availability": "Add to Cart",
    "rating": 4.8,
    "imageSource": "https://mdcomputers.in/image/catalog/keyboard/h%20p/k160-black/k160-black-image.webp"
  },
  {
    "id": "keyboard-dell-kb216-multimedia-wired-keyboard-23",
    "name": "Dell KB216 Multimedia Wired Keyboard",
    "price": 650,
    "originalPrice": 1500,
    "category": "keyboard",
    "categoryLabel": "Keyboard",
    "categoryDescription": "Mechanical and gaming keyboards",
    "availability": "Add to Cart",
    "rating": 4.8999999999999995,
    "imageSource": "https://mdcomputers.in/image/catalog/keyboard/dell/kb216/dellkb216-5844.jpg"
  },
  {
    "id": "keyboard-logitech-k120-wired-usb-keyboard-24",
    "name": "Logitech K120 Wired USB Keyboard",
    "price": 710,
    "originalPrice": 800,
    "category": "keyboard",
    "categoryLabel": "Keyboard",
    "categoryDescription": "Mechanical and gaming keyboards",
    "availability": "Add to Cart",
    "rating": 4.6,
    "imageSource": "https://mdcomputers.in/image/catalog/keyboard/logitech/920-002582/920-002582-image-main.jpg"
  },
  {
    "id": "keyboard-aula-f2023-membrane-gaming-keyboard-25",
    "name": "Aula F2023 Membrane Gaming Keyboard",
    "price": 795,
    "originalPrice": 2999,
    "category": "keyboard",
    "categoryLabel": "Keyboard",
    "categoryDescription": "Mechanical and gaming keyboards",
    "availability": "Add to Cart",
    "rating": 4.699999999999999,
    "imageSource": "https://mdcomputers.in/image/catalog/keyboard/aula/f2023-black/f2023-black-image-main.webp"
  },
  {
    "id": "keyboard-ant-esports-mk720-pro-v2-tkl-white-rgb-wireless-keyboard-26",
    "name": "Ant Esports MK720 Pro V2 TKL White RGB Wireless Keyboard",
    "price": 970,
    "originalPrice": 2999,
    "category": "keyboard",
    "categoryLabel": "Keyboard",
    "categoryDescription": "Mechanical and gaming keyboards",
    "availability": "Add to Cart",
    "rating": 4.8,
    "imageSource": "https://mdcomputers.in/image/catalog/keyboard/ant-esports/mk720-pro-v2-white/mk720-pro-v2-white-image.webp"
  },
  {
    "id": "keyboard-acer-zc-a01si-2dp-wireless-keyboard-and-mouse-combo-27",
    "name": "Acer ZC.A01SI.2DP Wireless Keyboard and Mouse Combo",
    "price": 990,
    "originalPrice": 1999,
    "category": "keyboard",
    "categoryLabel": "Keyboard",
    "categoryDescription": "Mechanical and gaming keyboards",
    "availability": "Add to Cart",
    "rating": 4.8999999999999995,
    "imageSource": "https://mdcomputers.in/image/catalog/combo-offer/acer/zc-a01si-2dp/zc-a01si-2dp-image.webp"
  },
  {
    "id": "mouse-dell-d-select-ds111-mouse-28",
    "name": "Dell D SELECT DS111 Mouse",
    "price": 280,
    "originalPrice": 499,
    "category": "mouse",
    "categoryLabel": "Mouse",
    "categoryDescription": "Precision wired and wireless mice",
    "availability": "Available",
    "rating": 4.6,
    "imageSource": "https://mdcomputers.in/image/catalog/mouse/dell/ds111-black/ds111-black-image.webp"
  },
  {
    "id": "mouse-hp-m10-black-wired-mouse-29",
    "name": "HP M10 Black Wired Mouse",
    "price": 290,
    "originalPrice": 599,
    "category": "mouse",
    "categoryLabel": "Mouse",
    "categoryDescription": "Precision wired and wireless mice",
    "availability": "Available",
    "rating": 4.699999999999999,
    "imageSource": "https://mdcomputers.in/image/catalog/mouse/h-p/7ya10pa/7ya10pa-image-main.jpg"
  },
  {
    "id": "mouse-fingers-megahit-wired-mouse-30",
    "name": "Fingers MegaHit Wired Mouse",
    "price": 300,
    "originalPrice": 425,
    "category": "mouse",
    "categoryLabel": "Mouse",
    "categoryDescription": "Precision wired and wireless mice",
    "availability": "Available",
    "rating": 4.8,
    "imageSource": "https://mdcomputers.in/image/catalog/mouse/fingers/megahit-black/megahit-black-image.webp"
  },
  {
    "id": "mouse-fingers-blazinghit-rgb-mouse-31",
    "name": "Fingers BlazingHit RGB Mouse",
    "price": 310,
    "originalPrice": 495,
    "category": "mouse",
    "categoryLabel": "Mouse",
    "categoryDescription": "Precision wired and wireless mice",
    "availability": "Available",
    "rating": 4.8999999999999995,
    "imageSource": "https://mdcomputers.in/image/catalog/mouse/fingers/blazing-hit/blazing-hit-image.webp"
  },
  {
    "id": "mouse-dell-ms116-wired-mouse-32",
    "name": "Dell MS116 Wired Mouse",
    "price": 365,
    "originalPrice": 430,
    "category": "mouse",
    "categoryLabel": "Mouse",
    "categoryDescription": "Precision wired and wireless mice",
    "availability": "Available",
    "rating": 4.6,
    "imageSource": "https://mdcomputers.in/image/catalog/mouse/dell/ms116/dell-ms116-mouse-image-main.webp"
  },
  {
    "id": "mouse-aula-s31-gaming-mouse-33",
    "name": "Aula S31 Gaming Mouse",
    "price": 375,
    "originalPrice": 599,
    "category": "mouse",
    "categoryLabel": "Mouse",
    "categoryDescription": "Precision wired and wireless mice",
    "availability": "Available",
    "rating": 4.699999999999999,
    "imageSource": "https://mdcomputers.in/image/catalog/mouse/aula/s31-black/s31-black-image-main.webp"
  },
  {
    "id": "laptop-gear-compact-business-blue-laptop-backpack-34",
    "name": "Gear Compact Business Blue Laptop Backpack",
    "price": 899,
    "originalPrice": 1799,
    "category": "laptop",
    "categoryLabel": "Laptop",
    "categoryDescription": "Portable gaming and work machines",
    "availability": "In Stock",
    "rating": 4.8,
    "imageSource": "https://mdcomputers.in/image/catalog/accessories/laptop-bag/gear/buscompact052/buscompact052-image.webp"
  },
  {
    "id": "laptop-gear-classic-faux-leather-brown-black-laptop-backpack-35",
    "name": "Gear Classic Faux Leather Brown-Black Laptop Backpack",
    "price": 989,
    "originalPrice": 2199,
    "category": "laptop",
    "categoryLabel": "Laptop",
    "categoryDescription": "Portable gaming and work machines",
    "availability": "In Stock",
    "rating": 4.8999999999999995,
    "imageSource": "https://mdcomputers.in/image/catalog/accessories/laptop-bag/gear/lbpclslth0201/lbpclslth0201_image.webp"
  },
  {
    "id": "laptop-gear-vintage-2-faux-leather-laptop-backpack-36",
    "name": "Gear Vintage 2 Faux Leather Laptop Backpack",
    "price": 989,
    "originalPrice": 2199,
    "category": "laptop",
    "categoryLabel": "Laptop",
    "categoryDescription": "Portable gaming and work machines",
    "availability": "In Stock",
    "rating": 4.6,
    "imageSource": "https://mdcomputers.in/image/catalog/accessories/laptop-bag/gear/lbpvg2lth0101/lbpvg2lth0101-image-main.webp"
  },
  {
    "id": "laptop-gear-classic-faux-leather-navy-blue-tan-laptop-backpack-37",
    "name": "Gear Classic Faux Leather Navy Blue Tan Laptop Backpack",
    "price": 989,
    "originalPrice": 2199,
    "category": "laptop",
    "categoryLabel": "Laptop",
    "categoryDescription": "Portable gaming and work machines",
    "availability": "In Stock",
    "rating": 4.699999999999999,
    "imageSource": "https://mdcomputers.in/image/catalog/accessories/laptop-bag/gear/lbpclslth0519/lbpclslth0519-image-main.webp"
  },
  {
    "id": "laptop-gear-compact-business-laptop-backpack-38",
    "name": "Gear Compact Business Laptop Backpack",
    "price": 1099,
    "originalPrice": 1799,
    "category": "laptop",
    "categoryLabel": "Laptop",
    "categoryDescription": "Portable gaming and work machines",
    "availability": "In Stock",
    "rating": 4.8,
    "imageSource": "https://mdcomputers.in/image/catalog/accessories/laptop-bag/gear/buscompact001/buscompact001-image.webp"
  },
  {
    "id": "laptop-gear-vintage-2-leather-brown-black-laptop-backpack-39",
    "name": "Gear Vintage 2 Leather Brown-Black Laptop Backpack",
    "price": 989,
    "originalPrice": 2199,
    "category": "laptop",
    "categoryLabel": "Laptop",
    "categoryDescription": "Portable gaming and work machines",
    "availability": "In Stock",
    "rating": 4.8999999999999995,
    "imageSource": "https://mdcomputers.in/image/catalog/accessories/laptop-bag/gear/lbpvg2lth0201/lbpvg2lth0201-image.webp"
  },
  {
    "id": "monitor-benq-pd2706u-27-inch-designer-monitor-40",
    "name": "BenQ PD2706U 27 Inch Designer Monitor",
    "price": 38400,
    "originalPrice": 45000,
    "category": "monitor",
    "categoryLabel": "Monitor",
    "categoryDescription": "High-refresh displays",
    "availability": "In Stock",
    "rating": 4.6,
    "imageSource": "https://mdcomputers.in/image/catalog/monitor/benq/pd2706u/pd2706u-image-main.png"
  },
  {
    "id": "monitor-benq-mobiuz-ex271-27-inch-gaming-monitor-41",
    "name": "BenQ Mobiuz EX271 27 Inch Gaming Monitor",
    "price": 15500,
    "originalPrice": 22990,
    "category": "monitor",
    "categoryLabel": "Monitor",
    "categoryDescription": "High-refresh displays",
    "availability": "In Stock",
    "rating": 4.699999999999999,
    "imageSource": "https://mdcomputers.in/image/catalog/monitor/benq/ex271/ex271-image-main0.webp"
  },
  {
    "id": "monitor-msi-pro-mp223-e2-22-inch-business-monitor-42",
    "name": "MSI Pro MP223 E2 22 Inch Business Monitor",
    "price": 5350,
    "originalPrice": 10999,
    "category": "monitor",
    "categoryLabel": "Monitor",
    "categoryDescription": "High-refresh displays",
    "availability": "In Stock",
    "rating": 4.8,
    "imageSource": "https://mdcomputers.in/image/catalog/monitor/msi/pro-mp223-e2/pro-mp223-e2-image-main.jpg"
  },
  {
    "id": "monitor-aoc-22b30hm2-22-inch-monitor-43",
    "name": "AOC 22B30HM2 22 Inch Monitor",
    "price": 5570,
    "originalPrice": 13799,
    "category": "monitor",
    "categoryLabel": "Monitor",
    "categoryDescription": "High-refresh displays",
    "availability": "In Stock",
    "rating": 4.8999999999999995,
    "imageSource": "https://mdcomputers.in/image/catalog/monitor/aoc/22b30hm2/22b30hm2-image-main.jpg"
  },
  {
    "id": "monitor-samsung-ls22d300gawxxl-22-inch-fhd-monitor-44",
    "name": "Samsung LS22D300GAWXXL 22 Inch FHD Monitor",
    "price": 6680,
    "originalPrice": 13700,
    "category": "monitor",
    "categoryLabel": "Monitor",
    "categoryDescription": "High-refresh displays",
    "availability": "In Stock",
    "rating": 4.6,
    "imageSource": "https://mdcomputers.in/image/catalog/monitor/samsung/ls22d300gawxxl/ls22d300gawxxl-image-main.webp"
  },
  {
    "id": "monitor-aoc-24b30hm-24-inch-fhd-monitor-45",
    "name": "AOC 24B30HM 24 Inch FHD Monitor",
    "price": 6500,
    "originalPrice": 15990,
    "category": "monitor",
    "categoryLabel": "Monitor",
    "categoryDescription": "High-refresh displays",
    "availability": "In Stock",
    "rating": 4.699999999999999,
    "imageSource": "https://mdcomputers.in/image/catalog/monitor/aoc/24b30hm/24b30hm-image-main.webp"
  },
  {
    "id": "motherboard-a520-motherboard-46",
    "name": "A520 Motherboard",
    "price": 3000,
    "originalPrice": 5500,
    "category": "motherboard",
    "categoryLabel": "Motherboard",
    "categoryDescription": "Platform boards by socket and chipset",
    "availability": "In Stock",
    "rating": 4.8,
    "imageSource": "https://mdcomputers.in/image/catalog/motherboard/a520/a520-main-image.webp"
  },
  {
    "id": "motherboard-b450-motherboard-47",
    "name": "B450 Motherboard",
    "price": 4000,
    "originalPrice": 6500,
    "category": "motherboard",
    "categoryLabel": "Motherboard",
    "categoryDescription": "Platform boards by socket and chipset",
    "availability": "In Stock",
    "rating": 4.8999999999999995,
    "imageSource": "https://mdcomputers.in/image/catalog/motherboard/b450/b450-main-image.webp"
  },
  {
    "id": "motherboard-b550-motherboard-48",
    "name": "B550 Motherboard",
    "price": 5500,
    "originalPrice": 8000,
    "category": "motherboard",
    "categoryLabel": "Motherboard",
    "categoryDescription": "Platform boards by socket and chipset",
    "availability": "In Stock",
    "rating": 4.6,
    "imageSource": "https://mdcomputers.in/image/catalog/motherboard/b550/b550-main-image.webp"
  },
  {
    "id": "motherboard-b650-motherboard-49",
    "name": "B650 Motherboard",
    "price": 7000,
    "originalPrice": 10000,
    "category": "motherboard",
    "categoryLabel": "Motherboard",
    "categoryDescription": "Platform boards by socket and chipset",
    "availability": "In Stock",
    "rating": 4.699999999999999,
    "imageSource": "https://mdcomputers.in/image/catalog/motherboard/b650/b650-main-image.webp"
  },
  {
    "id": "motherboard-z790-motherboard-50",
    "name": "Z790 Motherboard",
    "price": 10999,
    "originalPrice": 15000,
    "category": "motherboard",
    "categoryLabel": "Motherboard",
    "categoryDescription": "Platform boards by socket and chipset",
    "availability": "In Stock",
    "rating": 4.8,
    "imageSource": "https://mdcomputers.in/image/catalog/motherboard/z790/z790-main-image.webp"
  },
  {
    "id": "motherboard-z890-motherboard-51",
    "name": "Z890 Motherboard",
    "price": 14500,
    "originalPrice": 18000,
    "category": "motherboard",
    "categoryLabel": "Motherboard",
    "categoryDescription": "Platform boards by socket and chipset",
    "availability": "In Stock",
    "rating": 4.8999999999999995,
    "imageSource": "https://mdcomputers.in/image/catalog/motherboard/z890/z890-main-image.webp"
  },
  {
    "id": "power-supply-antec-atom-v450-v2-smps-52",
    "name": "Antec Atom V450 V2 SMPS",
    "price": 1865,
    "originalPrice": 3100,
    "category": "power-supply",
    "categoryLabel": "Power Supply",
    "categoryDescription": "Reliable SMPS units",
    "availability": "In Stock",
    "rating": 4.6,
    "imageSource": "https://mdcomputers.in/image/catalog/smps/antec/atom-v450-v2/atom-v450-v2-image-main.jpg"
  },
  {
    "id": "power-supply-gamdias-aura-gp-550-watt-80-plus-smps-53",
    "name": "Gamdias Aura GP 550 Watt 80 Plus SMPS",
    "price": 2080,
    "originalPrice": 8999,
    "category": "power-supply",
    "categoryLabel": "Power Supply",
    "categoryDescription": "Reliable SMPS units",
    "availability": "In Stock",
    "rating": 4.699999999999999,
    "imageSource": "https://mdcomputers.in/image/catalog/smps/gamdias/gp550-550/aura-gp550-image-main.png"
  },
  {
    "id": "power-supply-antec-atom-v550-v2-smps-54",
    "name": "Antec Atom V550 V2 SMPS",
    "price": 2140,
    "originalPrice": 2899,
    "category": "power-supply",
    "categoryLabel": "Power Supply",
    "categoryDescription": "Reliable SMPS units",
    "availability": "In Stock",
    "rating": 4.8,
    "imageSource": "https://mdcomputers.in/image/catalog/smps/antec/atom-v550-v2/atom-v550-v2-image-02.jpg"
  },
  {
    "id": "power-supply-ant-esports-vs600l-smps-55",
    "name": "Ant Esports VS600L SMPS",
    "price": 2250,
    "originalPrice": 3299,
    "category": "power-supply",
    "categoryLabel": "Power Supply",
    "categoryDescription": "Reliable SMPS units",
    "availability": "In Stock",
    "rating": 4.8999999999999995,
    "imageSource": "https://mdcomputers.in/image/catalog/smps/antesports/vs600l/vsl-600-image-main.jpg"
  },
  {
    "id": "power-supply-ant-esports-vs500l-smps-56",
    "name": "Ant Esports VS500L SMPS",
    "price": 2310,
    "originalPrice": 2999,
    "category": "power-supply",
    "categoryLabel": "Power Supply",
    "categoryDescription": "Reliable SMPS units",
    "availability": "In Stock",
    "rating": 4.6,
    "imageSource": "https://mdcomputers.in/image/catalog/smps/antesports/vs500l/vsl-500-image-main.jpg"
  },
  {
    "id": "power-supply-ant-esports-vs700l-700-watt-smps-57",
    "name": "Ant Esports VS700L 700 Watt SMPS",
    "price": 2870,
    "originalPrice": 4499,
    "category": "power-supply",
    "categoryLabel": "Power Supply",
    "categoryDescription": "Reliable SMPS units",
    "availability": "In Stock",
    "rating": 4.699999999999999,
    "imageSource": "https://mdcomputers.in/image/catalog/smps/antesports/vs700l/vs700l-image-1.jpg"
  },
  {
    "id": "prebuild-amd-ryzen-5-8500g-processor-with-radeon-graphics-58",
    "name": "AMD Ryzen 5 8500G Processor with Radeon Graphics",
    "price": 15345,
    "originalPrice": 29999,
    "category": "prebuild",
    "categoryLabel": "Prebuild",
    "categoryDescription": "Ready systems",
    "availability": "In stock",
    "rating": 4.8,
    "imageSource": "https://mdcomputers.in/image/catalog/processor/amd/ryzen-5-8500g/ryzen-5-8500g-image-main.jpg"
  },
  {
    "id": "prebuild-amd-ryzen-5-8600g-processor-with-radeon-graphics-59",
    "name": "AMD Ryzen 5 8600G Processor with Radeon Graphics",
    "price": 20250,
    "originalPrice": 38999,
    "category": "prebuild",
    "categoryLabel": "Prebuild",
    "categoryDescription": "Ready systems",
    "availability": "In stock",
    "rating": 4.8999999999999995,
    "imageSource": "https://mdcomputers.in/image/catalog/processor/amd/ryzen-5-8600g/ryzen-5-8600g-image-0main.jpg"
  },
  {
    "id": "prebuild-amd-ryzen-7-8700g-processor-with-radeon-graphics-60",
    "name": "AMD Ryzen 7 8700G Processor with Radeon Graphics",
    "price": 28900,
    "originalPrice": 55999,
    "category": "prebuild",
    "categoryLabel": "Prebuild",
    "categoryDescription": "Ready systems",
    "availability": "In stock",
    "rating": 4.6,
    "imageSource": "https://mdcomputers.in/image/catalog/processor/amd/ryzen-7-8700g/ryzen-7-8700g-image-0main.jpg"
  },
  {
    "id": "prebuild-antec-cx800-argb-atx-mid-tower-case-61",
    "name": "Antec CX800 ARGB ATX Mid Tower Case",
    "price": 5200,
    "originalPrice": 6644,
    "category": "prebuild",
    "categoryLabel": "Prebuild",
    "categoryDescription": "Ready systems",
    "availability": "In stock",
    "rating": 4.699999999999999,
    "imageSource": "https://mdcomputers.in/image/catalog/cabinet/antec/cx800-argb-bk/cx800-argb-bk-image-main0.webp"
  },
  {
    "id": "prebuild-antec-c8-e-atx-full-tower-case-62",
    "name": "Antec C8 E-ATX Full Tower Case",
    "price": 8100,
    "originalPrice": 14550,
    "category": "prebuild",
    "categoryLabel": "Prebuild",
    "categoryDescription": "Ready systems",
    "availability": "In stock",
    "rating": 4.8,
    "imageSource": "https://mdcomputers.in/image/catalog/cabinet/antec/c8-black/c8-black-image-main.jpg"
  },
  {
    "id": "prebuild-antec-c8-aluminum-white-e-atx-full-tower-case-63",
    "name": "Antec C8 Aluminum White E-ATX Full Tower Case",
    "price": 9030,
    "originalPrice": 14058,
    "category": "prebuild",
    "categoryLabel": "Prebuild",
    "categoryDescription": "Ready systems",
    "availability": "In stock",
    "rating": 4.8999999999999995,
    "imageSource": "https://mdcomputers.in/image/catalog/cabinet/antec/c8-aluminum-white/c8-aluminum-white-image-main.jpg"
  },
  {
    "id": "processor-amd-ryzen-5-8500g-processor-with-radeon-graphics-64",
    "name": "AMD Ryzen 5 8500G Processor with Radeon Graphics",
    "price": 15345,
    "originalPrice": 29999,
    "category": "processor",
    "categoryLabel": "Processor",
    "categoryDescription": "Desktop CPUs",
    "availability": "Available",
    "rating": 4.6,
    "imageSource": "https://mdcomputers.in/image/catalog/processor/amd/ryzen-5-8500g/ryzen-5-8500g-image-main.jpg"
  },
  {
    "id": "processor-amd-ryzen-5-8600g-processor-with-radeon-graphics-65",
    "name": "AMD Ryzen 5 8600G Processor with Radeon Graphics",
    "price": 20250,
    "originalPrice": 38999,
    "category": "processor",
    "categoryLabel": "Processor",
    "categoryDescription": "Desktop CPUs",
    "availability": "Available",
    "rating": 4.699999999999999,
    "imageSource": "https://mdcomputers.in/image/catalog/processor/amd/ryzen-5-8600g/ryzen-5-8600g-image-0main.jpg"
  },
  {
    "id": "processor-amd-ryzen-7-8700g-processor-with-radeon-graphics-66",
    "name": "AMD Ryzen 7 8700G Processor with Radeon Graphics",
    "price": 28900,
    "originalPrice": 55999,
    "category": "processor",
    "categoryLabel": "Processor",
    "categoryDescription": "Desktop CPUs",
    "availability": "Available",
    "rating": 4.8,
    "imageSource": "https://mdcomputers.in/image/catalog/processor/amd/ryzen-7-8700g/ryzen-7-8700g-image-0main.jpg"
  },
  {
    "id": "ram-adata-premier-4gb-2666mhz-ddr4-laptop-ram-67",
    "name": "Adata Premier 4GB 2666MHz DDR4 Laptop RAM",
    "price": 3680,
    "originalPrice": 12380,
    "category": "ram",
    "categoryLabel": "RAM",
    "categoryDescription": "Memory kits and modules",
    "availability": "In Stock",
    "rating": 4.8999999999999995,
    "imageSource": "https://mdcomputers.in/image/catalog/memory/adata/ad4s26664g19-sgn/ad4s26664g19-sgn-image-main.jpg"
  },
  {
    "id": "ram-teamgroup-t-force-elite-8gb-3200mhz-cl22-ddr4-ram-68",
    "name": "TeamGroup T-Force Elite 8GB 3200MHz CL22 DDR4 RAM",
    "price": 6220,
    "originalPrice": 11990,
    "category": "ram",
    "categoryLabel": "RAM",
    "categoryDescription": "Memory kits and modules",
    "availability": "In Stock",
    "rating": 4.6,
    "imageSource": "https://mdcomputers.in/image/catalog/memory/teamgroup/ted48g3200c22bk/ted48g3200c22bk-image-main0.webp"
  },
  {
    "id": "ram-adata-premier-8gb-3200mhz-cl22-ddr4-ram-69",
    "name": "Adata Premier 8GB 3200MHz CL22 DDR4 RAM",
    "price": 6440,
    "originalPrice": 18840,
    "category": "ram",
    "categoryLabel": "RAM",
    "categoryDescription": "Memory kits and modules",
    "availability": "In Stock",
    "rating": 4.699999999999999,
    "imageSource": "https://mdcomputers.in/image/catalog/memory/adata/ad4u32008g22-sgn/ad4u32008g22-sgn-image-main.jpg"
  },
  {
    "id": "ram-adata-xpg-gammix-d35-8gb-3200mhz-cl16-ddr4-ram-70",
    "name": "Adata XPG Gammix D35 8GB 3200MHz CL16 DDR4 RAM",
    "price": 6980,
    "originalPrice": 19560,
    "category": "ram",
    "categoryLabel": "RAM",
    "categoryDescription": "Memory kits and modules",
    "availability": "In Stock",
    "rating": 4.8,
    "imageSource": "https://mdcomputers.in/image/catalog/memory/adata/ax4u32008g16a-sbkd35/ax4u32008g16a-sbkd35-image-main.jpg"
  },
  {
    "id": "ram-g-skill-ripjaws-v-16gb-3200mhz-cl16-ddr4-ram-71",
    "name": "G.Skill Ripjaws V 16GB 3200MHz CL16 DDR4 RAM",
    "price": 9725,
    "originalPrice": 29520,
    "category": "ram",
    "categoryLabel": "RAM",
    "categoryDescription": "Memory kits and modules",
    "availability": "In Stock",
    "rating": 4.8999999999999995,
    "imageSource": "https://mdcomputers.in/image/catalog/memory/g%20skill/f4-3200c16s-16gvk/f4-3200c16s-16gvk-image-main.webp"
  },
  {
    "id": "ram-adata-premier-16gb-3200mhz-cl22-ddr4-ram-72",
    "name": "Adata Premier 16GB 3200MHz CL22 DDR4 RAM",
    "price": 11480,
    "originalPrice": 28920,
    "category": "ram",
    "categoryLabel": "RAM",
    "categoryDescription": "Memory kits and modules",
    "availability": "In Stock",
    "rating": 4.6,
    "imageSource": "https://mdcomputers.in/image/catalog/memory/adata/ad4u320016g22-sgn/ad4u320032g22-sgn-image-main0.jpg"
  },
  {
    "id": "ssd-arctic-m2-pro-ssd-cooler-for-m-2-drives-73",
    "name": "Arctic M2 Pro SSD Cooler for M.2 Drives",
    "price": 999,
    "originalPrice": 7999,
    "category": "ssd",
    "categoryLabel": "SSD",
    "categoryDescription": "Fast storage drives",
    "availability": "In Stock",
    "rating": 4.699999999999999,
    "imageSource": "https://mdcomputers.in/image/catalog/accessories/ssd-case/arctic/acoth00001a/acoth00001a-image.webp"
  },
  {
    "id": "ssd-arctic-m2-pro-silver-ssd-cooler-for-m-2-drives-74",
    "name": "Arctic M2 Pro Silver SSD Cooler for M.2 Drives",
    "price": 999,
    "originalPrice": 7999,
    "category": "ssd",
    "categoryLabel": "SSD",
    "categoryDescription": "Fast storage drives",
    "availability": "In Stock",
    "rating": 4.8,
    "imageSource": "https://mdcomputers.in/image/catalog/accessories/ssd-case/arctic/acoth00002a/acoth00002a-image.webp"
  },
  {
    "id": "ssd-consistent-s7-128gb-internal-ssd-75",
    "name": "Consistent S7 128GB Internal SSD",
    "price": 2600,
    "originalPrice": 3999,
    "category": "ssd",
    "categoryLabel": "SSD",
    "categoryDescription": "Fast storage drives",
    "availability": "In Stock",
    "rating": 4.8999999999999995,
    "imageSource": "https://mdcomputers.in/image/catalog/ssd/consistent/ctssd128s7/ctssd128s7-image-main.jpg"
  },
  {
    "id": "ssd-patriot-burst-elite-240gb-ssd-76",
    "name": "Patriot Burst Elite 240GB SSD",
    "price": 3015,
    "originalPrice": 5999,
    "category": "ssd",
    "categoryLabel": "SSD",
    "categoryDescription": "Fast storage drives",
    "availability": "In Stock",
    "rating": 4.6,
    "imageSource": "https://mdcomputers.in/image/catalog/ssd/patriot/pbe240gs25ssdr/pbe240gs25ssdr-image-main.jpg"
  },
  {
    "id": "ssd-patriot-p220-internal-ssd-256gb-77",
    "name": "Patriot P220 Internal SSD, 256GB",
    "price": 3364,
    "originalPrice": 6449,
    "category": "ssd",
    "categoryLabel": "SSD",
    "categoryDescription": "Fast storage drives",
    "availability": "In Stock",
    "rating": 4.699999999999999,
    "imageSource": "https://mdcomputers.in/image/catalog/memory/patriot/p220s256g25/p220s256g25-image-main.webp"
  },
  {
    "id": "ssd-evm-256gb-sata-ssd-78",
    "name": "EVM 256GB Sata SSD",
    "price": 3789,
    "originalPrice": 4500,
    "category": "ssd",
    "categoryLabel": "SSD",
    "categoryDescription": "Fast storage drives",
    "availability": "In Stock",
    "rating": 4.8,
    "imageSource": "https://mdcomputers.in/image/catalog/ssd/evm/evm25-256gb/evm25-256gb0/evm25-256gb-image-main.jpg"
  }
]

function json(data: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: { ...corsHeaders, 'content-type': 'application/json', ...(init.headers || {}) },
  })
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const url = new URL(req.url)
  const path = url.pathname.split('/').filter(Boolean)
  const route = path.at(-1)

  if (route === 'products') {
    const category = url.searchParams.get('category')
    const products = category ? catalog.filter((item) => item.category === category) : catalog
    return json({ products })
  }

  if (path.includes('image')) {
    const id = decodeURIComponent(path.at(-1) || '')
    const product = catalog.find((item) => item.id === id)
    if (!product) return new Response('Not found', { status: 404, headers: corsHeaders })

    const upstream = await fetch(product.imageSource, {
      headers: {
        'user-agent': 'Mozilla/5.0 ChallengerCatalog/1.0',
        accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      },
    })
    if (!upstream.ok || !upstream.body) return new Response('Image unavailable', { status: 502, headers: corsHeaders })

    return new Response(upstream.body, {
      status: 200,
      headers: {
        ...corsHeaders,
        'content-type': upstream.headers.get('content-type') || 'image/webp',
        'cache-control': 'public, max-age=86400',
      },
    })
  }

  if (route === 'refresh') {
    const token = req.headers.get('x-sync-token')
    if (!token || token !== Deno.env.get('CHALLENGER_SYNC_TOKEN')) {
      return json({ error: 'Unauthorized' }, { status: 401 })
    }
    return json({ ok: true, message: 'Catalog refresh endpoint is ready for scheduled sync jobs.' })
  }

  return json({ ok: true, routes: ['/products', '/products?category=processor', '/image/:id', '/refresh'] })
})
