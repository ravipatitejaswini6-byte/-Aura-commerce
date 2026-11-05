import React, { useState } from 'react';
import { Terminal, FolderTree, Server, Database, CreditCard, ShieldCheck, Rocket, Copy, Check } from 'lucide-react';

export const DevGuide: React.FC = () => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6 space-y-2">
        <span className="text-xs uppercase tracking-widest font-semibold text-neutral-500">
          Beginner Developer Guide
        </span>
        <h1 className="text-3xl font-bold font-serif-display text-neutral-900 dark:text-white">
          Full-Stack E-Commerce Architecture & VS Code Run Guide
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl">
          Everything you need to clone, run, test, and deploy this complete modern e-commerce application in Visual Studio Code.
        </p>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <a href="#quickstart" className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 transition-colors">
          <Terminal className="w-5 h-5 text-neutral-700 dark:text-neutral-300 mb-2" />
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">1. VS Code Quickstart</h3>
          <p className="text-xs text-neutral-500 mt-1">Terminal commands to clone, install, and run on port 3000.</p>
        </a>

        <a href="#structure" className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 transition-colors">
          <FolderTree className="w-5 h-5 text-neutral-700 dark:text-neutral-300 mb-2" />
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">2. Project Directory Tree</h3>
          <p className="text-xs text-neutral-500 mt-1">Clean separation of frontend, backend, contexts, and assets.</p>
        </a>

        <a href="#backend" className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 transition-colors">
          <Server className="w-5 h-5 text-neutral-700 dark:text-neutral-300 mb-2" />
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">3. Express & Database</h3>
          <p className="text-xs text-neutral-500 mt-1">REST API endpoints, JWT auth, and SQLite / MongoDB integration.</p>
        </a>

        <a href="#payments" className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 transition-colors">
          <CreditCard className="w-5 h-5 text-neutral-700 dark:text-neutral-300 mb-2" />
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">4. Payment Gateway</h3>
          <p className="text-xs text-neutral-500 mt-1">Stripe & PayPal secure test credentials without exposing secrets.</p>
        </a>

        <a href="#testing" className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 transition-colors">
          <ShieldCheck className="w-5 h-5 text-neutral-700 dark:text-neutral-300 mb-2" />
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">5. Testing Checklist</h3>
          <p className="text-xs text-neutral-500 mt-1">Step-by-step test instructions for auth, cart, coupons, and orders.</p>
        </a>

        <a href="#deploy" className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 transition-colors">
          <Rocket className="w-5 h-5 text-neutral-700 dark:text-neutral-300 mb-2" />
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">6. Production Deployment</h3>
          <p className="text-xs text-neutral-500 mt-1">How to build and launch on Cloud Run, Vercel, or Render.</p>
        </a>
      </div>

      {/* 1. Quickstart Section */}
      <section id="quickstart" className="space-y-4 pt-4">
        <h2 className="text-xl font-bold font-serif-display text-neutral-900 dark:text-white flex items-center gap-2">
          <Terminal className="w-5 h-5" />
          <span>1. How to Open and Run in Visual Studio Code</span>
        </h2>
        
        <div className="bg-neutral-900 text-neutral-100 rounded-xl p-5 text-xs font-mono space-y-4 overflow-x-auto relative">
          <button
            onClick={() => copyToClipboard(`git clone <repo-url> aura-market\ncd aura-market\nnpm install\nnpm run dev`, 'quickstart')}
            className="absolute top-4 right-4 p-2 bg-neutral-800 hover:bg-neutral-700 rounded text-neutral-300 flex items-center gap-1.5"
          >
            {copiedSection === 'quickstart' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedSection === 'quickstart' ? 'Copied' : 'Copy'}</span>
          </button>

          <p className="text-neutral-400 font-sans text-xs">Execute these commands in your VS Code Integrated Terminal (`Ctrl + \`` or `Cmd + \``):</p>
          
          <pre className="text-emerald-400 leading-relaxed">
{`# 1. Open the project folder in VS Code:
code aura-market

# 2. Install all dependencies:
npm install

# 3. Start the Vite development server on port 3000:
npm run dev

# 4. Open your browser:
# http://localhost:3000`}
          </pre>
        </div>
      </section>

      {/* 2. Directory Tree */}
      <section id="structure" className="space-y-4 pt-4">
        <h2 className="text-xl font-bold font-serif-display text-neutral-900 dark:text-white flex items-center gap-2">
          <FolderTree className="w-5 h-5" />
          <span>2. Project Architecture & Folder Breakdown</span>
        </h2>
        
        <div className="p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs font-mono space-y-2">
          <div className="text-neutral-500 font-sans mb-3 text-xs">A structured enterprise modular architecture:</div>
          <div className="text-neutral-900 dark:text-neutral-100 space-y-1">
            <p className="text-amber-600 dark:text-amber-400 font-bold">/src</p>
            <p className="pl-4">├── <strong className="text-neutral-800 dark:text-neutral-200">components/</strong></p>
            <p className="pl-8">├── Navbar.tsx         <span className="text-neutral-400 font-sans text-[11px]">// 3-Zone Top Bar Contract & Mobile Drawer</span></p>
            <p className="pl-8">├── Home.tsx           <span className="text-neutral-400 font-sans text-[11px]">// Hero Campaign, taxonomy & proof bar</span></p>
            <p className="pl-8">├── Catalog.tsx        <span className="text-neutral-400 font-sans text-[11px]">// Real-time Search, category tabs, price slider, sorting</span></p>
            <p className="pl-8">├── ProductCard.tsx    <span className="text-neutral-400 font-sans text-[11px]">// Zero-pill compliant card with quick-add</span></p>
            <p className="pl-8">├── ProductDetail.tsx  <span className="text-neutral-400 font-sans text-[11px]">// Contiguous PDP, specs, interactive reviews</span></p>
            <p className="pl-8">├── CartDrawer.tsx     <span className="text-neutral-400 font-sans text-[11px]">// Slide-over drawer, steppers, promo codes</span></p>
            <p className="pl-8">├── Checkout.tsx       <span className="text-neutral-400 font-sans text-[11px]">// Shipping details & Stripe/PayPal test gateway</span></p>
            <p className="pl-8">├── OrderConfirmation.tsx <span className="text-neutral-400 font-sans text-[11px]">// Order receipt, tracking status, print receipt</span></p>
            <p className="pl-8">├── Profile.tsx        <span className="text-neutral-400 font-sans text-[11px]">// Order history, wishlist, saved address</span></p>
            <p className="pl-8">└── AuthModal.tsx      <span className="text-neutral-400 font-sans text-[11px]">// JWT auth simulation & quick demo button</span></p>
            <p className="pl-4">├── <strong className="text-neutral-800 dark:text-neutral-200">context/</strong></p>
            <p className="pl-8">└── StoreContext.tsx   <span className="text-neutral-400 font-sans text-[11px]">// Reactive cart, orders, wishlist, localStorage sync</span></p>
            <p className="pl-4">├── <strong className="text-neutral-800 dark:text-neutral-200">data/</strong></p>
            <p className="pl-8">└── mockData.ts        <span className="text-neutral-400 font-sans text-[11px]">// Curated luxury products, verified reviews, demo user</span></p>
            <p className="pl-4">├── <strong className="text-neutral-800 dark:text-neutral-200">types/</strong></p>
            <p className="pl-8">└── index.ts           <span className="text-neutral-400 font-sans text-[11px]">// Strict TypeScript interfaces</span></p>
            <p className="pl-4">└── <strong className="text-neutral-800 dark:text-neutral-200">server.ts</strong>          <span className="text-neutral-400 font-sans text-[11px]">// Express REST backend & Vite middleware mount</span></p>
          </div>
        </div>
      </section>

      {/* 3. Backend & Express Integration */}
      <section id="backend" className="space-y-4 pt-4">
        <h2 className="text-xl font-bold font-serif-display text-neutral-900 dark:text-white flex items-center gap-2">
          <Server className="w-5 h-5" />
          <span>3. Backend API Routes (Express & Database)</span>
        </h2>

        <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-4 text-xs">
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            The applet includes an Express server (<code className="px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded font-mono">server.ts</code>) that exposes clean REST endpoints:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-[11px]">
            <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700">
              <span className="text-emerald-600 font-bold">GET</span> /api/products
              <p className="font-sans text-neutral-500 mt-1">Returns all catalog items with filters & ratings.</p>
            </div>
            <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700">
              <span className="text-blue-600 font-bold">POST</span> /api/auth/login
              <p className="font-sans text-neutral-500 mt-1">Verifies bcrypt hash and signs JWT token.</p>
            </div>
            <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700">
              <span className="text-blue-600 font-bold">POST</span> /api/orders
              <p className="font-sans text-neutral-500 mt-1">Creates immutable order record and generates tracking ID.</p>
            </div>
            <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700">
              <span className="text-blue-600 font-bold">POST</span> /api/create-payment-intent
              <p className="font-sans text-neutral-500 mt-1">Creates server-side Stripe PaymentIntent.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Payment Testing Guide */}
      <section id="payments" className="space-y-4 pt-4">
        <h2 className="text-xl font-bold font-serif-display text-neutral-900 dark:text-white flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          <span>4. Stripe & PayPal Test Mode Guide</span>
        </h2>

        <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-neutral-50 dark:bg-neutral-800/80 rounded-lg space-y-1">
              <span className="text-neutral-400 block text-[11px]">Valid Test Card</span>
              <strong className="font-mono text-sm text-neutral-900 dark:text-white">4242 4242 4242 4242</strong>
              <p className="text-[11px] text-neutral-500">Any MM/YY in future, any 3-digit CVC.</p>
            </div>

            <div className="p-4 bg-neutral-50 dark:bg-neutral-800/80 rounded-lg space-y-1">
              <span className="text-neutral-400 block text-[11px]">Promo Discount Codes</span>
              <strong className="font-mono text-sm text-neutral-900 dark:text-white">WELCOME10 / FREESHIP</strong>
              <p className="text-[11px] text-neutral-500">10% off subtotal or free shipping.</p>
            </div>

            <div className="p-4 bg-neutral-50 dark:bg-neutral-800/80 rounded-lg space-y-1">
              <span className="text-neutral-400 block text-[11px]">Card Decline Simulation</span>
              <strong className="font-mono text-sm text-neutral-900 dark:text-white">Checkbox in Checkout</strong>
              <p className="text-[11px] text-neutral-500">Tests user-facing card failure alerts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Production Deployment */}
      <section id="deploy" className="space-y-4 pt-4">
        <h2 className="text-xl font-bold font-serif-display text-neutral-900 dark:text-white flex items-center gap-2">
          <Rocket className="w-5 h-5" />
          <span>5. Deploying Online</span>
        </h2>

        <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-3 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
          <p>
            This codebase compiles cleanly to static web assets or a full-stack container:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-neutral-800 dark:text-neutral-200">
            <li><strong>Build production bundle:</strong> Run <code className="px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded font-mono">npm run build</code>. The optimized output is emitted to <code className="font-mono">/dist</code>.</li>
            <li><strong>Vercel / Netlify:</strong> Connect your GitHub repository, choose <em>Vite</em> preset, and set Build Command to <code className="font-mono">npm run build</code> and Output Directory to <code className="font-mono">dist</code>.</li>
            <li><strong>Google Cloud Run / Render:</strong> Use the provided <code className="font-mono">server.ts</code> with Node 22 runtime for full-stack API capabilities.</li>
          </ul>
        </div>
      </section>

    </div>
  );
};
