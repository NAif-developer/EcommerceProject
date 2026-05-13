const { setServers } = require('node:dns/promises');
setServers(['1.1.1.1', '8.8.8.8']);

const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./models/Product.cjs');
// الصور تفضل تكون CDN او PNG
const products = [

  {
    name: 'Steam Gift Card — 50 SAR',
    cat: 'Gift Cards',
    price: 50,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/753/header.jpg',
    description: 'Add 50 SAR to your Steam Wallet. Redeem for thousands of games, DLC, and in-game items on the Steam store.',
  },
  {
    name: 'Steam Gift Card — 100 SAR',
    cat: 'Gift Cards',
    price: 100,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/753/header.jpg',
    description: 'Add 100 SAR to your Steam Wallet. Redeem for thousands of games, DLC, and in-game items on the Steam store.',
  },

  {
    name: 'App Store Gift Card — 50 SAR',
    cat: 'Gift Cards',
    price: 50,
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple125/v4/d7/4d/c3/d74dc3b7-a4e5-4a6d-8dce-e3d1e1f25a4e/source/512x512bb.jpg',
    description: 'Spend 50 SAR on the Apple App Store — apps, games, subscriptions, Apple Music, iCloud storage, and more.',
  },
  {
    name: 'App Store Gift Card — 100 SAR',
    cat: 'Gift Cards',
    price: 100,
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple125/v4/d7/4d/c3/d74dc3b7-a4e5-4a6d-8dce-e3d1e1f25a4e/source/512x512bb.jpg',
    description: 'Spend 100 SAR on the Apple App Store — apps, games, subscriptions, Apple Music, iCloud storage, and more.',
  },

  {
    name: 'Google Play Gift Card — 25 SAR',
    cat: 'Gift Cards',
    price: 25,
    image: 'https://www.gstatic.com/android/market_images/web/play_logo_x2.png',
    description: 'Top up your Google Play balance with 25 SAR. Use it for Android apps, games, movies, books, and subscriptions.',
  },
  {
    name: 'Google Play Gift Card — 50 SAR',
    cat: 'Gift Cards',
    price: 50,
    image: 'https://www.gstatic.com/android/market_images/web/play_logo_x2.png',
    description: 'Top up your Google Play balance with 50 SAR. Use it for Android apps, games, movies, books, and subscriptions.',
  },

  {
    name: 'PlayStation Store Gift Card — 50 SAR',
    cat: 'Gift Cards',
    price: 50,
    image: 'https://gmedia.playstation.com/is/image/SIEPDC/ps-store-gift-card-product-thumbnail-01-en-19oct21',
    description: 'Add 50 SAR to your PSN wallet. Buy PS5 and PS4 games, add-ons, PS Plus subscriptions, and more from the PlayStation Store.',
  },
  {
    name: 'PlayStation Store Gift Card — 100 SAR',
    cat: 'Gift Cards',
    price: 100,
    image: 'https://gmedia.playstation.com/is/image/SIEPDC/ps-store-gift-card-product-thumbnail-01-en-19oct21',
    description: 'Add 100 SAR to your PSN wallet. Buy PS5 and PS4 games, add-ons, PS Plus subscriptions, and more from the PlayStation Store.',
  },

  {
    name: 'Xbox Gift Card — 50 SAR',
    cat: 'Gift Cards',
    price: 50,
    image: '',
    description: 'Add 50 SAR to your Microsoft account. Spend it on Xbox and PC games, Game Pass, and add-ons in the Microsoft Store.',
  },
  {
    name: 'Xbox Gift Card — 100 SAR',
    cat: 'Gift Cards',
    price: 100,
    image: '',
    description: 'Add 100 SAR to your Microsoft account. Spend it on Xbox and PC games, Game Pass, and add-ons in the Microsoft Store.',
  },

  {
    name: 'Samsung Galaxy S25 Ultra',
    cat: 'Electronics',
    price: 3899,
    image: 'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s25-ultra-2025-1.jpg',
    description: 'The ultimate Android flagship. Snapdragon 8 Elite, 6.9" Dynamic AMOLED 2X, 200MP camera, built-in S Pen, and 5000mAh battery.',
  },
  {
    name: 'Samsung Galaxy A55 5G',
    cat: 'Electronics',
    price: 1099,
    originalPrice: 1299,
    image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a55.jpg',
    description: "Mid-range powerhouse with a 6.6\" Super AMOLED display, 50MP triple camera, 5000mAh battery, and Samsung's 4-year OS update promise.",
  },
  {
    name: 'iPhone 16 Pro Max 256GB',
    cat: 'Electronics',
    price: 5199,
    image: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-pro-max-2024-1.jpg',
    description: "Apple's most powerful iPhone. A18 Pro chip, 6.9\" Super Retina XDR ProMotion display, 48MP Fusion camera system, and Apple Intelligence.",
  },
  {
    name: 'iPhone 16 128GB',
    cat: 'Electronics',
    price: 3299,
    originalPrice: 3599,
    image: 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16.jpg',
    description: 'The standard iPhone 16 with A18 chip, 6.1" OLED display, 48MP dual-camera, Action Button, Camera Control, and Apple Intelligence support.',
  },
  {
    name: 'Google Pixel 9 Pro',
    cat: 'Electronics',
    price: 3199,
    image: 'https://fdn2.gsmarena.com/vv/pics/google/google-pixel-9-pro-2024-1.jpg',
    description: "Google's flagship with Tensor G4 chip, 6.3\" LTPO OLED, 50MP triple camera with Pro Zoom, 7 years of OS updates, and Gemini AI built in.",
  },

  {
    name: 'ASUS ROG Strix G16 — RTX 4070',
    cat: 'Electronics',
    price: 5999,
    image: 'https://dlcdnwebimgs.asus.com/gain/2EC328E4-7529-4CB5-A797-3B13E84D4664/w1000/h732',
    description: 'Gaming laptop with Intel Core i9-14900HX, NVIDIA RTX 4070 8GB, 16" QHD 240Hz display, 16GB DDR5 RAM, and ROG liquid metal thermal system. Handles any modern game at high settings.',
  },

  {
    name: 'Apple MacBook Pro 14" — M4 Pro',
    cat: 'Electronics',
    price: 6799,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spaceblack-select-202410?wid=904&hei=840&fmt=jpeg&qlt=90',
    description: 'M4 Pro chip with 14-core CPU and 20-core GPU. 14.2" Liquid Retina XDR ProMotion display, up to 24GB unified memory, 22-hour battery, and three Thunderbolt 5 ports.',
  },


  {
    name: 'Apple MacBook Air 13" — M3',
    cat: 'Electronics',
    price: 4199,
    originalPrice: 4499,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-midnight-select-202402?wid=904&hei=840&fmt=jpeg&qlt=90',
    description: 'Impossibly thin and light. M3 chip with 8-core CPU and 10-core GPU, 13.6" Liquid Retina display, 18-hour battery, and fanless design — silent always.',
  },

  {
    name: 'Acer Aspire 5 — Ryzen 5',
    cat: 'Electronics',
    price: 1299,
    originalPrice: 1499,
    image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSbBmVeoWtYQkl_tOuJ-vAyEbrHPkRGNi5CYM2xqVVnepvlgjLLKnvVv6YAtF9lmF7SOZ3ZEX40BtIko1fE45JHWSdU5EMVhk2tsalVCtqUejlE3VzB931yqA',
    description: 'Great value laptop with AMD Ryzen 5 7530U, 15.6" Full HD IPS display, 8GB RAM, 512GB NVMe SSD, and a backlit keyboard. Smooth for everyday tasks and light work.',
  },

  {
    name: 'Lenovo IdeaPad 3 — Intel Core i5',
    cat: 'Electronics',
    price: 1099,
    image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSQRIcD5-9oh2jKI8vyuqnqi3ENZI7Ro2YSL6ElDYLe5wy0UqC_PSzdpe0e-dSByaH--bD39zMNvwB7oxejvVeqewF63BmCJvl917yVhlR5_cHDwmKab_rmY7NXe-CsX6dx-OU_2hc&usqp=CAc',
    description: 'Reliable everyday laptop. Intel Core i5-1235U, 15.6" Full HD display, 8GB RAM, 512GB SSD, and Windows 11 Home. Perfect for students and office work.',
  },

  {
    name: 'MSI Raider GE78 HX — RTX 4080',
    cat: 'Electronics',
    price: 8499,
    originalPrice: 9999,
    image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTQ1h_qZ9NgUBN5FLQAEbC4olhJf_0aucp0A5p12ebgoqi-gewA7zAB_OPawHTOUHKB8qnr6kLXBYKms9A1yOOVlQ7m_Pxsj_RB3a5_ZkLprHb1e8zGs-5tCKNrM1qQ&usqp=CAc',
    description: 'Top-tier gaming laptop with Intel Core i9-14900HX, RTX 4080 12GB, 17" QHD+ 240Hz display, 32GB DDR5, and PCIe 5.0 SSD. Built for 4K gaming on the go.',
  },


  {
    name: 'PlayStation 5 Slim — Digital Edition',
    cat: 'Games',
    price: 1799,
    image: 'https://gmedia.playstation.com/is/image/SIEPDC/ps5-slim-product-thumbnail-01-en-14sep23',
    description: "Sony's latest PS5 in a slimmer design. Custom AMD Zen 2 CPU, RDNA 2 GPU, 1TB SSD, 4K/120fps gaming, ray tracing, and DualSense haptic feedback controller included.",
  },

  {
    name: 'Xbox Series X — 1TB',
    cat: 'Games',
    price: 1899,
    image: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4mRni?ver=d82f',
    description: "Microsoft's most powerful console. Custom AMD Zen 2 / RDNA 2, 12 teraflops, 1TB NVMe SSD, 4K/120fps, Quick Resume, and access to hundreds of Game Pass titles.",
  },

  {
    name: 'Nintendo Switch OLED',
    cat: 'Games',
    price: 1399,
    originalPrice: 1599,
    image: 'https://assets.nintendo.com/image/upload/f_auto/q_auto/ncom/en_US/products/hardware/nintendo-switch-oled-model-white-set/115373-main.jpg',
    description: '7" vibrant OLED screen, enhanced audio, 64GB internal storage, and a wide adjustable stand. Play at home on your TV or take it anywhere in handheld mode.',
  },

  {
    name: 'Elden Ring — PC Steam Key',
    cat: 'Games',
    price: 189,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg',
    description: "FromSoftware's masterpiece. An open-world action RPG set in the Lands Between, featuring brutal combat, deep lore co-written with George R.R. Martin, and breathtaking boss fights.",
  },

  {
    name: 'Cyberpunk 2077 — PC Steam Key',
    cat: 'Games',
    price: 89,
    originalPrice: 239,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg',
    description: 'Night City awaits. An open-world RPG set in a dystopian megacity. Includes the Phantom Liberty expansion. Fully redeemed post-launch — one of the best RPGs of its generation.',
  },
  {
    name: 'Cyberpunk 2077 — PS5 Digital Key',
    cat: 'Games',
    price: 119,
    originalPrice: 259,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg',
    description: 'Night City on PS5 with ray tracing, DualSense haptic feedback, and adaptive triggers. Includes the Phantom Liberty expansion. The definitive console experience.',
  },
  {
    name: 'Cyberpunk 2077 — Xbox Key',
    cat: 'Games',
    price: 99,
    originalPrice: 239,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg',
    description: 'Night City on Xbox Series X/S with ray tracing and 60fps performance mode. Includes the Phantom Liberty expansion. Xbox Play Anywhere — buy once, play on console and PC.',
  },

  {
    name: 'Arc Raiders — PC Steam Key',
    cat: 'Games',
    price: 179,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1808500/header.jpg',
    description: 'Cooperative third-person shooter by Embark Studios. Team up to raid the surface, battle massive mechanised enemies called Arcas, and bring back loot to the underground colony.',
  },

  {
    name: 'EA Sports FC 26 — PC Steam Key',
    cat: 'Games',
    price: 249,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2669320/header.jpg',
    description: "The world's #1 football simulation. New Rush game mode, HyperMotionV technology, updated squads and kits for the 2025/26 season, and the deepest Ultimate Team yet.",
  },

  {
    name: 'The Farmer Was Replaced — PC Steam Key',
    cat: 'Games',
    price: 39,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2060160/header.jpg',
    description: 'A programming puzzle game where you write Python-like code to automate a farm. Start by harvesting wheat — end up building a fully optimised agricultural AI. Surprisingly addictive.',
  },

  {
    name: 'Red Dead Redemption 2 — PC Steam Key',
    cat: 'Games',
    price: 89,
    originalPrice: 189,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg',
    description: "Rockstar's magnum opus. An epic open-world western following outlaw Arthur Morgan across a stunningly detailed America in 1899. Story of the decade. Online multiplayer included.",
  },

  {
    name: 'GTA V Premium — PC Steam Key',
    cat: 'Games',
    price: 49,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg',
    description: 'Grand Theft Auto V with the Criminal Enterprise Starter Pack included — giving you a head start in GTA Online with businesses, vehicles, and over 10 million in in-game cash.',
  },

  {
    name: 'Hogwarts Legacy — PC Steam Key',
    cat: 'Games',
    price: 109,
    originalPrice: 249,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/990080/header.jpg',
    description: 'Live the life of a Hogwarts student in the 1800s. Explore the castle, learn spells, and uncover a hidden secret. An immersive open-world RPG set in the Wizarding World.',
  },

  {
    name: 'Sea of Thieves — PC / Xbox Key',
    cat: 'Games',
    price: 99,
    originalPrice: 159,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1172620/header.jpg',
    description: 'A shared-world pirate adventure from Rare. Sail with friends, hunt treasure, battle skeleton crews and rival pirates. Every session is a story. Xbox Play Anywhere title.',
  },
  {
    name: 'Sea of Thieves — PC Steam Key',
    cat: 'Games',
    price: 79,
    originalPrice: 149,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1172620/header.jpg',
    description: 'Sea of Thieves on Steam with full cross-play support with Xbox players. Sail the seas, hunt treasure, and battle rival pirates in this shared-world pirate adventure from Rare.',
  },

  {
    name: 'Elden Ring — PS5 Digital Key',
    cat: 'Games',
    price: 199,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg',
    description: "FromSoftware's open-world masterpiece on PS5. Full 60fps performance mode, haptic feedback support, and DualSense adaptive triggers. Includes Shadow of the Erdtree DLC.",
  },
  {
    name: "Marvel's Spider-Man 2 — PS5 Digital Key",
    cat: 'Games',
    price: 249,
    image: 'https://gmedia.playstation.com/is/image/SIEPDC/ps5-spiderman2-gamehub-thumbnail-01-en-26sep23',
    description: "Play as both Peter Parker and Miles Morales in this PS5 exclusive. Swing through an expanded open-world New York, face Venom, and experience Insomniac's best storytelling yet.",
  },

  {
    name: 'EA Sports FC 26 — PS5 Digital Key',
    cat: 'Games',
    price: 269,
    originalPrice: 299,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2669320/header.jpg',
    description: 'Full PS5 version with DualSense haptic feedback and adaptive triggers. HyperMotionV, updated 25/26 rosters, Rush mode, and the deepest Ultimate Team experience yet.',
  },

  {
    name: 'Call of Duty: Black Ops 7 — PS5 Digital Key',
    cat: 'Games',
    price: 249,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2933620/header.jpg',
    description: 'TIn Call of Duty: Black Ops 7, Treyarch & Raven Software are bringing players the biggest Black Ops ever.',
  },

  {
    name: 'Ratchet & Clank: Rift Apart — PS5 Digital Key',
    cat: 'Games',
    price: 149,
    originalPrice: 219,
    image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSAbHBklTqvi0TlGNea5SL9TDF36ZS8kuiKc9ncmkXf8RwDfTwuwPjQChDRPZ5pQ4n2cBRzlJ4CjXCFOMIOpfGIwo8K-DtR&usqp=CAc',
    description: 'The ultimate PS5 showcase. Instant dimension-hopping, near-instant load times, 60fps ray-traced visuals, and a heartfelt adventure across alternate realities. Stunning from start to finish.',
  },
  {
    name: 'Returnal — PS5 Digital Key',
    cat: 'Games',
    price: 189,
    image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRRMxmLON8pXlWfVJFDkjBASo-6yuuwguR4daf8x_zi9cOD7MiH22cRE_QUXCuuWAvb67XVR0CpMuHAEl0Gt62ubHOpd3ov_iEBvecEo-JN9lMrRhUrkEmU',
    description: 'A third-person bullet-hell roguelite from Housemarque. Fight through an alien world that resets with every death. One of the most original PS5 exclusives — challenging, terrifying, and beautiful.',
  },

  {
    name: 'Halo Infinite — Xbox / PC Key',
    cat: 'Games',
    price: 149,
    originalPrice: 199,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1240440/header.jpg',
    description: 'Master Chief returns in the most open Halo yet. A vast Zeta Halo to explore, classic sandbox gunplay, and the best Halo multiplayer in years — free to play online.',
  },
  {
    name: 'Halo Infinite — PC Steam Key',
    cat: 'Games',
    price: 129,
    originalPrice: 179,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1240440/header.jpg',
    description: 'Halo Infinite on PC via Steam. The most open Halo ever with a vast Zeta Halo to explore, classic sandbox gunplay, and free-to-play multiplayer with full cross-play.',
  },
  {
    name: 'Forza Horizon 5 — Xbox / PC Key',
    cat: 'Games',
    price: 189,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/header.jpg',
    description: 'The definitive open-world racing game set in Mexico. Over 500 cars, stunning environments from jungles to volcanos, seasonal events, and unmatched driving physics. Xbox Play Anywhere.',
  },

  {
    name: 'Starfield — Xbox / PC Key',
    cat: 'Games',
    price: 169,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/header.jpg',
    description: "Bethesda's space RPG epic. Explore over 1,000 planets, build your own ship, join factions, and uncover the mystery of Starfield's mysterious alien artifacts. Xbox Play Anywhere.",
  },
  {
    name: 'Starfield — PC Steam Key',
    cat: 'Games',
    price: 149,
    originalPrice: 199,
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/header.jpg',
    description: "Starfield on PC via Steam. Bethesda's massive space RPG — explore 1,000+ planets, build ships, join factions, and unravel the mystery of the alien artifacts. Full mod support.",
  },

];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to database');

  await Product.deleteMany({});
  console.log('Cleared existing products');

  const inserted = await Product.insertMany(products);
  console.log(`Seeded ${inserted.length} products successfully`);

  await mongoose.disconnect();
}

seed().catch(err => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
