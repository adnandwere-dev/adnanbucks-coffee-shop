// src/lib/data.js

// قاعدة بيانات محلية لمنتجات AdnanBucks.
// كل الصور المحلية يجب أن تكون داخل:
// public/images/products
// وتُستخدم من الموقع عبر المسار: /images/products/اسم-الصورة.jpg

export const PRODUCTS = [
  // =========================
  // COFFEE
  // =========================
  {
    id: "reserve-espresso",
    name: "Reserve Espresso",
    price: 3.5,
    calories: "10 Calories",
    description:
      "A double shot of our signature dark roast blend with a rich body and notes of dark chocolate and toasted nuts.",
    image: "/images/products/reserve-espresso.jpg",
    category: "coffee",
    tags: ["Strong", "Dark Roast"],
    isHot: true,
    ingredients: ["Double Shot Espresso", "Dark Roast Blend"],
  },
  {
    id: "heritage-pour-over",
    name: "Heritage Pour Over",
    price: 4.75,
    calories: "5 Calories",
    description:
      "Single-origin Ethiopian coffee, slowly brewed to reveal floral notes and a clean citrus finish.",
    image: "/images/products/heritage-pour-over.jpg",
    category: "coffee",
    tags: ["Fruity", "Light Roast"],
    isHot: true,
    ingredients: ["Single-Origin Ethiopian Beans", "Filtered Water", "Paper Filter Brew"],
  },
  {
    id: "classic-caffe-latte",
    name: "Classic Caffè Latte",
    price: 4.5,
    calories: "190 Calories",
    description:
      "Smooth espresso balanced with steamed milk and a delicate layer of velvety foam.",
    image: "/images/products/classic-caffe-latte.jpg",
    category: "coffee",
    tags: ["Classic", "Milky"],
    isHot: true,
    ingredients: ["Espresso", "Steamed Milk", "Milk Foam"],
  },
  {
    id: "vanilla-flat-white",
    name: "Vanilla Flat White",
    price: 4.85,
    calories: "180 Calories",
    description:
      "A silky flat white made with ristretto espresso, creamy milk, and a gentle touch of vanilla.",
    image: "/images/products/vanilla-flat-white.jpg",
    category: "coffee",
    tags: ["Creamy", "Vanilla"],
    isHot: true,
    ingredients: ["Ristretto Espresso", "Steamed Milk", "Vanilla Syrup"],
  },
  {
    id: "honey-cinnamon-latte",
    name: "Honey Cinnamon Latte",
    price: 5.1,
    calories: "220 Calories",
    description:
      "Comforting espresso and steamed milk sweetened with honey and finished with warm cinnamon.",
    image: "/images/products/honey-cinnamon-latte.jpg",
    category: "coffee",
    tags: ["Honey", "Spiced"],
    isHot: true,
    ingredients: ["Espresso", "Steamed Milk", "Honey", "Cinnamon"],
  },
  {
    id: "maple-pecan-latte",
    name: "Maple Pecan Latte",
    price: 5.35,
    calories: "240 Calories",
    description:
      "Rich espresso, creamy milk, maple sweetness, and roasted pecan notes in every sip.",
    image: "/images/products/maple-pecan-latte.jpg",
    category: "coffee",
    tags: ["Maple", "Nutty"],
    isHot: true,
    ingredients: ["Espresso", "Steamed Milk", "Maple Syrup", "Pecan Flavor"],
  },
  {
    id: "rose-pistachio-latte",
    name: "Rose Pistachio Latte",
    price: 5.6,
    calories: "230 Calories",
    description:
      "A floral and nutty latte with smooth espresso, pistachio, and a subtle rose finish.",
    image: "/images/products/rose-pistachio-latte.jpg",
    category: "coffee",
    tags: ["Floral", "Pistachio"],
    isHot: true,
    ingredients: ["Espresso", "Steamed Milk", "Pistachio Syrup", "Rose Syrup"],
  },

  // =========================
  // ICED DRINKS
  // =========================
  {
    id: "signature-caramel-macchiato",
    name: "Signature Caramel Macchiato",
    price: 5.5,
    calories: "250 Calories",
    description:
      "Dark roast espresso, milk, vanilla syrup, ice, and our signature caramel drizzle.",
    image: "/images/products/signature-caramel-macchiato.jpg",
    category: "iced",
    tags: ["Bestseller", "Iced", "Sweet"],
    isHot: false,
    ingredients: ["Espresso", "Vanilla Syrup", "Milk", "Ice", "Caramel Drizzle"],
  },
  {
    id: "cold-brew-classic",
    name: "Cold Brew Classic",
    price: 4.65,
    calories: "15 Calories",
    description:
      "Slow-steeped cold brew with a smooth, bold taste and a naturally sweet finish.",
    image: "/images/products/cold-brew-classic.jpg",
    category: "iced",
    tags: ["Cold Brew", "Smooth"],
    isHot: false,
    ingredients: ["Cold Brew Coffee", "Filtered Water", "Ice"],
  },
  {
    id: "iced-vanilla-latte",
    name: "Iced Vanilla Latte",
    price: 5.0,
    calories: "210 Calories",
    description:
      "Espresso shaken with vanilla, milk, and ice for a refreshing creamy classic.",
    image: "/images/products/iced-vanilla-latte.jpg",
    category: "iced",
    tags: ["Iced", "Vanilla"],
    isHot: false,
    ingredients: ["Espresso", "Milk", "Vanilla Syrup", "Ice"],
  },
  {
    id: "iced-spanish-latte",
    name: "Iced Spanish Latte",
    price: 5.25,
    calories: "260 Calories",
    description:
      "A sweet, creamy iced latte made with espresso, milk, condensed milk, and ice.",
    image: "/images/products/iced-spanish-latte.jpg",
    category: "iced",
    tags: ["Sweet", "Creamy"],
    isHot: false,
    ingredients: ["Espresso", "Milk", "Condensed Milk", "Ice"],
  },
  {
    id: "salted-caramel-cold-foam",
    name: "Salted Caramel Cold Foam",
    price: 5.45,
    calories: "230 Calories",
    description:
      "Cold brew topped with airy salted caramel foam for a sweet and balanced finish.",
    image: "/images/products/salted-caramel-cold-foam.jpg",
    category: "iced",
    tags: ["Cold Foam", "Caramel"],
    isHot: false,
    ingredients: ["Cold Brew Coffee", "Ice", "Salted Caramel Cold Foam"],
  },
  {
    id: "orange-mocha",
    name: "Orange Mocha",
    price: 5.4,
    calories: "240 Calories",
    description:
      "Chocolatey espresso meets bright orange notes and chilled milk for a bold seasonal twist.",
    image: "/images/products/orange-mocha.jpg",
    category: "iced",
    tags: ["Chocolate", "Citrus"],
    isHot: false,
    ingredients: ["Espresso", "Chocolate Sauce", "Orange Syrup", "Milk", "Ice"],
  },

  // =========================
  // SEASONAL
  // =========================
  {
    id: "iced-matcha-latte",
    name: "Iced Matcha Latte",
    price: 5.25,
    calories: "200 Calories",
    description:
      "Ceremonial-grade matcha whisked smooth and poured over ice with creamy milk.",
    image: "/images/products/iced-matcha-latte.jpg",
    category: "seasonal",
    tags: ["Matcha", "Iced", "Seasonal"],
    isHot: false,
    ingredients: ["Ceremonial Matcha", "Milk", "Ice"],
  },

  // =========================
  // BAKERY
  // =========================
  {
    id: "almond-croissant",
    name: "Almond Croissant",
    price: 4.25,
    calories: "380 Calories",
    description:
      "Flaky butter pastry filled with almond frangipane and topped with toasted almonds.",
    image: "/images/products/almond-croissant.jpg",
    category: "bakery",
    tags: ["Fresh Baked", "Sweet"],
    isHot: false,
    ingredients: ["Butter Croissant", "Almond Frangipane", "Toasted Almonds"],
  },
  {
    id: "cinnamon-roll",
    name: "Cinnamon Roll",
    price: 3.95,
    calories: "390 Calories",
    description:
      "Soft swirled pastry filled with cinnamon sugar and finished with a smooth vanilla glaze.",
    image: "/images/products/cinnamon-roll.jpg",
    category: "bakery",
    tags: ["Fresh Baked", "Cinnamon"],
    isHot: false,
    ingredients: ["Sweet Dough", "Cinnamon Sugar", "Vanilla Glaze"],
  },
  {
    id: "pain-au-chocolat",
    name: "Pain au Chocolat",
    price: 4.15,
    calories: "340 Calories",
    description:
      "Buttery French pastry layered around rich dark chocolate for a crisp and tender bite.",
    image: "/images/products/pain-au-chocolat.jpg",
    category: "bakery",
    tags: ["French Pastry", "Chocolate"],
    isHot: false,
    ingredients: ["Butter Pastry", "Dark Chocolate"],
  },
  {
    id: "iced-lemon-loaf",
    name: "Iced Lemon Loaf",
    price: 3.45,
    calories: "410 Calories",
    description:
      "Bright lemon cake finished with sweet citrus icing, made for coffee pairings.",
    image: "/images/products/iced-lemon-loaf.jpg",
    category: "bakery",
    tags: ["Citrus", "Sweet"],
    isHot: false,
    ingredients: ["Lemon Cake", "Lemon Icing"],
  },
  {
    id: "blueberry-muffin",
    name: "Blueberry Muffin",
    price: 2.95,
    calories: "360 Calories",
    description:
      "A soft vanilla muffin packed with juicy blueberries and baked fresh every morning.",
    image: "/images/products/blueberry-muffin.jpg",
    category: "bakery",
    tags: ["Fresh Baked", "Blueberry"],
    isHot: false,
    ingredients: ["Vanilla Batter", "Blueberries"],
  },

  // =========================
  // DESSERTS
  // =========================
  {
    id: "dark-mocha",
    name: "Dark Mocha",
    price: 5.15,
    calories: "290 Calories",
    description:
      "A rich mocha with bold espresso, dark chocolate, and creamy milk.",
    image: "/images/products/dark-mocha.jpg",
    category: "desserts",
    tags: ["Chocolate", "Rich"],
    isHot: true,
    ingredients: ["Espresso", "Dark Chocolate Sauce", "Milk"],
  },
  {
    id: "matcha-crepe-cake",
    name: "Matcha Crepe Cake",
    price: 6.75,
    calories: "420 Calories",
    description:
      "Delicate layers of crepes and light matcha cream for an elegant dessert.",
    image: "/images/products/matcha-crepe-cake.jpg",
    category: "desserts",
    tags: ["Matcha", "Artisanal"],
    isHot: false,
    ingredients: ["Crepes", "Matcha Cream"],
  },
  {
    id: "chocolate-fudge-brownie",
    name: "Chocolate Fudge Brownie",
    price: 3.85,
    calories: "430 Calories",
    description:
      "Dense, fudgy chocolate brownie with a rich cocoa finish.",
    image: "/images/products/chocolate-fudge-brownie.jpg",
    category: "desserts",
    tags: ["Chocolate", "Fudgy"],
    isHot: false,
    ingredients: ["Dark Chocolate", "Cocoa", "Butter"],
  },
  {
    id: "burnt-basque-cheesecake",
    name: "Burnt Basque Cheesecake",
    price: 5.95,
    calories: "460 Calories",
    description:
      "Creamy cheesecake with a caramelized top and a soft custardy center.",
    image: "/images/products/burnt-basque-cheesecake.jpg",
    category: "desserts",
    tags: ["Cheesecake", "Creamy"],
    isHot: false,
    ingredients: ["Cream Cheese", "Eggs", "Vanilla"],
  },
  {
    id: "tiramisu-cup",
    name: "Tiramisu Cup",
    price: 5.25,
    calories: "390 Calories",
    description:
      "Coffee-soaked layers, mascarpone cream, and cocoa served in an elegant cup.",
    image: "/images/products/tiramisu-cup.jpg",
    category: "desserts",
    tags: ["Coffee", "Italian"],
    isHot: false,
    ingredients: ["Coffee Soaked Cake", "Mascarpone Cream", "Cocoa"],
  },
  {
    id: "vanilla-bean-panna-cotta",
    name: "Vanilla Bean Panna Cotta",
    price: 5.1,
    calories: "320 Calories",
    description:
      "Silky vanilla bean cream dessert with a delicate and smooth finish.",
    image: "/images/products/vanilla-bean-panna-cotta.jpg",
    category: "desserts",
    tags: ["Vanilla", "Creamy"],
    isHot: false,
    ingredients: ["Cream", "Vanilla Bean", "Sugar"],
  },
];

// جلب منتج واحد بواسطة الـ id
export function getProductById(id) {
  return PRODUCTS.find((product) => product.id === id);
}

// جلب المنتجات حسب الفئة
export function getProductsByCategory(category) {
  if (category === "all") return PRODUCTS;

  return PRODUCTS.filter((product) => product.category === category);
}

// اقتراح منتجات مناسبة مع المنتج الحالي
export function getPairings(productId, limit = 3) {
  const product = getProductById(productId);

  if (!product) return [];

  const drinkCategories = ["coffee", "iced", "seasonal"];
  const isDrink = drinkCategories.includes(product.category);

  const targetCategories = isDrink
    ? ["bakery", "desserts"]
    : ["coffee", "iced", "seasonal"];

  return PRODUCTS.filter(
    (item) =>
      item.id !== productId && targetCategories.includes(item.category),
  ).slice(0, limit);
}