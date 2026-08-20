// Foot-er-path Product Database (JavaScript)
const PRODUCTS = [
  {
    id: "1",
    name: "Aero Runner Pro",
    slug: "aero-runner-pro",
    sku: "FEP-AERO-001",
    price: 189.99,
    discountPrice: 159.99,
    stock: 45,
    category: "Running",
    brand: "Foot-er-path",
    description: "Engineered for speed and comfort. Responsive foam midsole, breathable mesh upper, and carbon-fiber plate for explosive energy return. Perfect for marathon training and daily runs.",
    shortDesc: "Responsive racing shoe with carbon plate",
    material: "Engineered mesh, TPU overlays",
    rating: 4.8,
    reviewCount: 124,
    featured: true,
    bestseller: true,
    newArrival: true,
    sizes: ["8", "9", "10", "11"],
    colors: ["Black/Red", "White/Blue"],
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800"
    ]
  },
  {
    id: "2",
    name: "Urban Pulse Sneaker",
    slug: "urban-pulse-sneaker",
    sku: "FEP-URB-002",
    price: 129.99,
    discountPrice: 99.99,
    stock: 60,
    category: "Sneakers",
    brand: "Foot-er-path",
    description: "Street-ready style meets all-day comfort. Soft suede overlays, cushioned midsole, and rubber outsole for city exploration.",
    shortDesc: "Modern lifestyle sneaker",
    material: "Suede, mesh, rubber",
    rating: 4.6,
    reviewCount: 89,
    featured: true,
    bestseller: true,
    newArrival: false,
    sizes: ["8", "9", "10", "11"],
    colors: ["Navy", "Olive"],
    images: [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800"
    ]
  },
  {
    id: "3",
    name: "Executive Oxford",
    slug: "executive-oxford",
    sku: "FEP-EXE-003",
    price: 249.99,
    discountPrice: null,
    stock: 30,
    category: "Formal",
    brand: "Foot-er-path",
    description: "Hand-finished leather oxford for the modern professional. Goodyear welt construction, leather sole, and elegant silhouette.",
    shortDesc: "Classic formal leather oxford",
    material: "Full-grain leather",
    rating: 4.9,
    reviewCount: 56,
    featured: true,
    bestseller: false,
    newArrival: false,
    sizes: ["8", "9", "10", "11"],
    colors: ["Black", "Brown"],
    images: [
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800"
    ]
  },
  {
    id: "4",
    name: "Trail Master Boot",
    slug: "trail-master-boot",
    sku: "FEP-TRB-004",
    price: 219.99,
    discountPrice: 189.99,
    stock: 25,
    category: "Boots",
    brand: "Foot-er-path",
    description: "Rugged hiking boot with waterproof membrane, aggressive lug sole, and protective toe cap. Built for mountain trails.",
    shortDesc: "Waterproof trail hiking boot",
    material: "Nubuck, waterproof membrane",
    rating: 4.7,
    reviewCount: 41,
    featured: false,
    bestseller: false,
    newArrival: true,
    sizes: ["9", "10", "11", "12"],
    colors: ["Tan", "Charcoal"],
    images: [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800"
    ]
  },
  {
    id: "5",
    name: "Velocity Knit Runner",
    slug: "velocity-knit-runner",
    sku: "FEP-VEL-005",
    price: 149.99,
    discountPrice: null,
    stock: 50,
    category: "Running",
    brand: "Foot-er-path",
    description: "One-piece knit upper for sock-like fit. Ultra-light EVA foam and flexible outsole for natural movement.",
    shortDesc: "Sock-fit knit running shoe",
    material: "Recycled knit, EVA foam",
    rating: 4.5,
    reviewCount: 78,
    featured: false,
    bestseller: true,
    newArrival: false,
    sizes: ["8", "9", "10", "11"],
    colors: ["Neon Green", "Graphite"],
    images: [
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800"
    ]
  },
  {
    id: "6",
    name: "Classic Court Low",
    slug: "classic-court-low",
    sku: "FEP-CCL-006",
    price: 99.99,
    discountPrice: 79.99,
    stock: 80,
    category: "Sneakers",
    brand: "Foot-er-path",
    description: "Timeless low-top court silhouette updated with premium materials and modern cushioning.",
    shortDesc: "Iconic low-top lifestyle shoe",
    material: "Leather, rubber",
    rating: 4.4,
    reviewCount: 156,
    featured: true,
    bestseller: false,
    newArrival: false,
    sizes: ["7", "8", "9", "10", "11"],
    colors: ["White", "Black"],
    images: [
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800"
    ]
  },
  {
    id: "7",
    name: "Summit Trail Sandal",
    slug: "summit-trail-sandal",
    sku: "FEP-SAN-007",
    price: 69.99,
    discountPrice: 54.99,
    stock: 40,
    category: "Sandals",
    brand: "Foot-er-path",
    description: "Rugged outdoor sandal with adjustable straps and grippy sole for summer adventures.",
    shortDesc: "Adventure-ready outdoor sandal",
    material: "Synthetic, rubber",
    rating: 4.3,
    reviewCount: 32,
    featured: false,
    bestseller: false,
    newArrival: true,
    sizes: ["8", "9", "10", "11"],
    colors: ["Black", "Khaki"],
    images: [
      "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800"
    ]
  },
  {
    id: "8",
    name: "Daily Ease Slip-On",
    slug: "daily-ease-slip-on",
    sku: "FEP-CAS-008",
    price: 89.99,
    discountPrice: null,
    stock: 55,
    category: "Casual",
    brand: "Foot-er-path",
    description: "Effortless slip-on comfort for everyday wear. Soft knit upper and cushioned footbed.",
    shortDesc: "Comfortable everyday slip-on",
    material: "Knit, foam",
    rating: 4.5,
    reviewCount: 67,
    featured: false,
    bestseller: true,
    newArrival: false,
    sizes: ["8", "9", "10", "11", "12"],
    colors: ["Grey", "Navy", "Black"],
    images: [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800"
    ]
  }
];

const CATEGORIES = ["Running", "Sneakers", "Sports", "Casual", "Formal", "Boots", "Sandals"];

function getProductBySlug(slug) {
  return PRODUCTS.find(p => p.slug === slug);
}

function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}

function filterProducts({ category, featured, bestseller, newArrival, search } = {}) {
  return PRODUCTS.filter(p => {
    if (category && p.category.toLowerCase() !== category.toLowerCase()) return false;
    if (featured && !p.featured) return false;
    if (bestseller && !p.bestseller) return false;
    if (newArrival && !p.newArrival) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q)
      );
    }
    return true;
  });
}

function formatPrice(price) {
  return "$" + Number(price).toFixed(2);
}
