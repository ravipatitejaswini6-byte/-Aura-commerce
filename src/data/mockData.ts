import { Product, Review, Order, User } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_modern_lifestyle_1793899413412.jpg';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-headphones-01',
    name: 'Acoustic One Studio Wireless',
    subtitle: 'Custom 40mm Beryllium Drivers & Active Noise Isolation',
    category: 'Audio & Tech',
    price: 349,
    originalPrice: 399,
    rating: 4.9,
    reviewCount: 42,
    inStock: true,
    stockCount: 14,
    description: 'Engineered for audio purists and sound designers. The Acoustic One features matched 40mm custom beryllium diaphragms, memory foam lambskin earcups, and lossless 24-bit/96kHz wireless streaming. Aircraft-grade milled aluminum chassis ensures featherlight ergonomic comfort during extended sessions.',
    highlights: [
      '38-Hour battery life with ultra-fast USB-C charge',
      'Dual active hybrid noise cancellation microphones',
      'Lossless low-latency Bluetooth 5.4 with aptX HD',
      'Foldable aluminum architecture with magnetic ear cushions'
    ],
    specs: {
      'Transducer Type': 'Dynamic 40mm Beryllium',
      'Frequency Response': '5Hz – 42,000Hz',
      'Impedance': '32 Ohms',
      'Weight': '265g',
      'Connectivity': 'Bluetooth 5.4, 3.5mm Analog, USB-C DAC'
    },
    image: '/src/assets/images/product_wireless_headphones_1793899413480.jpg',
    badge: 'Signature Edition',
    createdDate: '2026-09-12'
  },
  {
    id: 'prod-watch-02',
    name: 'Atelier Automatic Horology 38mm',
    subtitle: 'Swiss-Caliber Movement with Sapphire Crystal & Horween Strap',
    category: 'Watches & Precision',
    price: 680,
    originalPrice: 750,
    rating: 4.8,
    reviewCount: 29,
    inStock: true,
    stockCount: 8,
    description: 'A tribute to classical German and Swiss minimalist watchmaking. Housed in a surgical 316L stainless steel monobloc case with double-domed anti-reflective sapphire crystal. Powered by a self-winding mechanical movement with 42-hour power reserve, complemented by handcrafted vegetable-tanned leather.',
    highlights: [
      'Self-winding mechanical automatic caliber (28,800 vph)',
      'Double-domed sapphire crystal with 5x AR coating',
      'Water resistant to 5 ATM (50 meters)',
      'Handcrafted Italian vegetable-tanned calfskin strap'
    ],
    specs: {
      'Case Diameter': '38.5 mm',
      'Thickness': '9.4 mm',
      'Movement': 'Automatic Caliber 2824-2',
      'Power Reserve': '42 Hours',
      'Lug Width': '20 mm'
    },
    image: '/src/assets/images/product_mechanical_watch_1793899414182.jpg',
    badge: 'Limited Batch',
    createdDate: '2026-08-20'
  },
  {
    id: 'prod-perfume-03',
    name: 'Aurea L\'Essence Eau de Parfum 50ml',
    subtitle: 'Golden Amber, Moroccan Cedar, Bergamot & Raw Myrrh',
    category: 'Fragrance & Living',
    price: 165,
    originalPrice: 195,
    rating: 4.9,
    reviewCount: 56,
    inStock: true,
    stockCount: 22,
    description: 'An evocative sensory journey distilling warm Mediterranean sun and ancient resins. Opening with vibrant Calabrian bergamot and cracked coriander, settling into a luminous heart of golden amber and velvet iris, anchored on sustainably harvested Atlas cedarwood and warm benzoin.',
    highlights: [
      'High-concentration 24% Extrait de Parfum formulation',
      'Macerated for 8 weeks in Grasse, France',
      'Free from synthetic phthalates and parabens',
      'Weighted ultraviolet-blocking amber glass vessel'
    ],
    specs: {
      'Volume': '50ml / 1.7 fl. oz.',
      'Concentration': 'Eau de Parfum (24%)',
      'Key Notes': 'Amber, Cedarwood, Bergamot, Tonka Bean',
      'Longevity': '10–12 Hours on skin'
    },
    image: '/src/assets/images/product_amber_perfume_1793899414359.jpg',
    badge: 'Editor\'s Choice',
    createdDate: '2026-10-01'
  },
  {
    id: 'prod-knitwear-04',
    name: 'Heirloom Merino Cable Knit Sweater',
    subtitle: '100% Extrafine Australian Wool with Organic Linen Storage Pouch',
    category: 'Textiles & Apparel',
    price: 240,
    originalPrice: 280,
    rating: 4.7,
    reviewCount: 31,
    inStock: true,
    stockCount: 16,
    description: 'Crafted from un-dyed 19.5-micron extrafine merino wool sourced from ethical regenerative farms. Featuring traditional honeycomb and fisherman cable stitches that trap warmth while allowing natural breathability. Delivered inside an artisanal raw linen dust pouch.',
    highlights: [
      '100% natural, biodegradable extrafine merino wool',
      'Seamless 3D knit construction for zero-friction movement',
      'Naturally thermo-regulating and odor-resistant',
      'Pre-washed with organic plant soap for cloud-soft touch'
    ],
    specs: {
      'Material': '100% Extrafine Merino Wool',
      'Yarn Count': '2/28 Nm Worsted',
      'Origin': 'Spun in Biella, Italy',
      'Care': 'Hand wash cold or gentle dry clean'
    },
    image: '/src/assets/images/product_merino_knitwear_1793899414396.jpg',
    badge: 'Sustainable',
    createdDate: '2026-09-28'
  },
  {
    id: 'prod-lounge-05',
    name: 'Nordic Pavilion Solid Oak Lounge Chair',
    subtitle: 'FSC-Certified Solid European Oak with Natural Saddle Leather',
    category: 'Living & Design',
    price: 890,
    originalPrice: 990,
    rating: 5.0,
    reviewCount: 18,
    inStock: true,
    stockCount: 5,
    description: 'An architectural centerpiece that celebrates proportion, wood grain, and tactile honesty. Sculpted from FSC-certified quarter-sawn European white oak, hand-finished with organic hardwax oil. Fitted with patinating vegetable-tanned cognac leather slings.',
    highlights: [
      'Quarter-sawn solid European oak frame',
      'Full-grain 3.5mm thick vegetable-tanned harness leather',
      'Traditional mortise-and-tenon hand joinery',
      'Designed to develop rich natural patina over decades'
    ],
    specs: {
      'Dimensions': '74cm W × 78cm D × 72cm H',
      'Seat Height': '38cm',
      'Weight': '16.5kg',
      'Max Load': '160kg'
    },
    image: '/src/assets/images/hero_modern_lifestyle_1793899413412.jpg',
    badge: 'Craft Heritage',
    createdDate: '2026-07-15'
  }
];

export const INITIAL_REVIEWS: Record<string, Review[]> = {
  'prod-headphones-01': [
    {
      id: 'rev-hp-01',
      productId: 'prod-headphones-01',
      userName: 'Julian Vance',
      userAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Julian+Vance',
      rating: 5,
      title: 'Studio clarity meets daily luxury',
      comment: 'The acoustic balance is startlingly precise. Bass is tight without bleeding into the mid frequencies, and the beryllium drivers capture micro-details on acoustic strings that my previous monitors missed.',
      date: '2026-10-18',
      verifiedPurchase: true,
      helpfulCount: 24
    },
    {
      id: 'rev-hp-02',
      productId: 'prod-headphones-01',
      userName: 'Elena Rostova',
      userAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Elena+Rostova',
      rating: 5,
      title: 'Flawless build and comfort',
      comment: 'Wore these for an 8-hour transatlantic flight. Zero temple pressure and the active noise isolation made the cabin whisper quiet. Worth every dollar.',
      date: '2026-10-24',
      verifiedPurchase: true,
      helpfulCount: 12
    }
  ],
  'prod-watch-02': [
    {
      id: 'rev-w-01',
      productId: 'prod-watch-02',
      userName: 'Marcus Thorne',
      userAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Marcus+Thorne',
      rating: 5,
      title: 'Minimalism at its highest form',
      comment: 'The Nomos-inspired dial simplicity is executed with perfection. The blued steel hands catch daylight gorgeously. Keeps time within +3s/day on my wrist.',
      date: '2026-10-05',
      verifiedPurchase: true,
      helpfulCount: 31
    }
  ],
  'prod-perfume-03': [
    {
      id: 'rev-p-01',
      productId: 'prod-perfume-03',
      userName: 'Sophia Laurent',
      userAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Sophia+Laurent',
      rating: 5,
      title: 'Warm, magnetic and sophisticated',
      comment: 'I get stopped and asked what fragrance I am wearing everywhere I go. The amber is velvety and smooth, not cloying or sweet. The magnetic cap click is so satisfying.',
      date: '2026-10-30',
      verifiedPurchase: true,
      helpfulCount: 19
    }
  ],
  'prod-knitwear-04': [
    {
      id: 'rev-k-01',
      productId: 'prod-knitwear-04',
      userName: 'David Sterling',
      userAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=David+Sterling',
      rating: 5,
      title: 'Sublime warmth and zero itchiness',
      comment: 'The wool feels remarkably soft against bare skin. The knit weight is heavy and substantial without feeling restrictive.',
      date: '2026-10-12',
      verifiedPurchase: true,
      helpfulCount: 15
    }
  ],
  'prod-lounge-05': [
    {
      id: 'rev-l-01',
      productId: 'prod-lounge-05',
      userName: 'Claire Dupont',
      userAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Claire+Dupont',
      rating: 5,
      title: 'Museum piece in my living room',
      comment: 'Solid joinery and the natural leather has already begun to soften into a deep caramel tone. Everyone who sits in it compliments its posture.',
      date: '2026-09-02',
      verifiedPurchase: true,
      helpfulCount: 28
    }
  ]
};

export const DEMO_USER: User = {
  id: 'usr-demo-01',
  name: 'Tejaswini Ravipati',
  email: 'tejaswini@example.com',
  role: 'customer',
  joinedDate: '2026-01-15',
  addresses: [
    {
      fullName: 'Tejaswini Ravipati',
      email: 'tejaswini@example.com',
      phone: '+1 (555) 382-9912',
      street: '742 Evergreen Terrace',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94107',
      country: 'United States'
    }
  ]
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-9842',
    date: '2026-10-22',
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 1
      },
      {
        product: INITIAL_PRODUCTS[2],
        quantity: 1
      }
    ],
    subtotal: 514,
    shipping: 0,
    discount: 51.4,
    tax: 36.9,
    total: 499.5,
    status: 'Delivered',
    shippingAddress: DEMO_USER.addresses[0],
    paymentMethod: 'stripe',
    paymentStatus: 'Paid',
    cardLast4: '4242',
    trackingNumber: 'TRK-AUR-8829104'
  },
  {
    id: 'ORD-9715',
    date: '2026-10-04',
    items: [
      {
        product: INITIAL_PRODUCTS[3],
        quantity: 1
      }
    ],
    subtotal: 240,
    shipping: 15,
    discount: 0,
    tax: 19.2,
    total: 274.2,
    status: 'Delivered',
    shippingAddress: DEMO_USER.addresses[0],
    paymentMethod: 'paypal',
    paymentStatus: 'Paid',
    trackingNumber: 'TRK-AUR-7731902'
  }
];

export const CATEGORIES = [
  'All Products',
  'Audio & Tech',
  'Watches & Precision',
  'Fragrance & Living',
  'Textiles & Apparel',
  'Living & Design'
] as const;
