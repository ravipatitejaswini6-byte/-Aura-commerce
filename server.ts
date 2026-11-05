import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json());

// In-memory mock storage for demo
const catalog = [
  {
    id: 'prod-headphones-01',
    name: 'Acoustic One Studio Wireless',
    category: 'Audio & Tech',
    price: 349,
    rating: 4.9,
    reviewCount: 42,
    stockCount: 14,
    image: '/src/assets/images/product_wireless_headphones_1793899413480.jpg'
  },
  {
    id: 'prod-watch-02',
    name: 'Atelier Automatic Horology 38mm',
    category: 'Watches & Precision',
    price: 680,
    rating: 4.8,
    reviewCount: 29,
    stockCount: 8,
    image: '/src/assets/images/product_mechanical_watch_1793899414182.jpg'
  },
  {
    id: 'prod-perfume-03',
    name: "Aurea L'Essence Eau de Parfum 50ml",
    category: 'Fragrance & Living',
    price: 165,
    rating: 4.9,
    reviewCount: 56,
    stockCount: 22,
    image: '/src/assets/images/product_amber_perfume_1793899414359.jpg'
  },
  {
    id: 'prod-knitwear-04',
    name: 'Heirloom Merino Cable Knit Sweater',
    category: 'Textiles & Apparel',
    price: 240,
    rating: 4.7,
    reviewCount: 31,
    stockCount: 16,
    image: '/src/assets/images/product_merino_knitwear_1793899414396.jpg'
  },
  {
    id: 'prod-lounge-05',
    name: 'Nordic Pavilion Solid Oak Lounge Chair',
    category: 'Living & Design',
    price: 890,
    rating: 5.0,
    reviewCount: 18,
    stockCount: 5,
    image: '/src/assets/images/hero_modern_lifestyle_1793899413412.jpg'
  }
];

const orders: any[] = [];

// 1. API: Get products
app.get('/api/products', (_req: Request, res: Response) => {
  res.json({ success: true, count: catalog.length, products: catalog });
});

// 2. API: Authenticate user (JWT & bcrypt mock pattern)
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password required' });
  }

  // Generate simulated signed token
  const token = `jwt_aura_${Buffer.from(email).toString('base64')}_${Date.now()}`;
  return res.json({
    success: true,
    token,
    user: {
      name: email.split('@')[0],
      email,
      role: 'customer'
    }
  });
});

// 3. API: Create Stripe Payment Intent simulation
app.post('/api/create-payment-intent', (req: Request, res: Response) => {
  const { amount, currency = 'usd' } = req.body;
  
  if (!amount || amount <= 0) {
    return res.status(400).json({ success: false, message: 'Invalid payment amount' });
  }

  // Simulated client secret for Stripe Elements
  const clientSecret = `pi_${Math.random().toString(36).substring(2)}_secret_${Math.random().toString(36).substring(2)}`;
  res.json({
    success: true,
    clientSecret,
    amount,
    currency,
    status: 'requires_payment_method'
  });
});

// 4. API: Create Order
app.post('/api/orders', (req: Request, res: Response) => {
  const { items, total, shippingAddress, paymentMethod } = req.body;
  const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

  const order = {
    id: orderId,
    date: new Date().toISOString().split('T')[0],
    items,
    total,
    shippingAddress,
    paymentMethod,
    status: 'Confirmed',
    trackingNumber: `TRK-AUR-${Math.floor(1000000 + Math.random() * 9000000)}`
  };

  orders.push(order);
  res.json({ success: true, order });
});

// In development, hook up Vite middleware
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Aura Commerce Server running on http://localhost:${PORT}`);
  });
}

startServer();
