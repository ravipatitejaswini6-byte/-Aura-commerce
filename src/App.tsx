/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { Catalog } from './components/Catalog';
import { ProductDetail } from './components/ProductDetail';
import { Checkout } from './components/Checkout';
import { OrderConfirmation } from './components/OrderConfirmation';
import { Profile } from './components/Profile';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { DevGuide } from './components/DevGuide';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/Footer';
import { X, Sparkles } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { activeView, setActiveView } = useStore();
  const [promoBannerVisible, setPromoBannerVisible] = useState(true);

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col font-sans-body selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-900 transition-colors">
      
      {/* Slim Dismissible Top Notification Banner (<40px high, Section 2 & 1.I) */}
      {promoBannerVisible && (
        <div className="h-9 bg-neutral-900 dark:bg-neutral-100 text-neutral-200 dark:text-neutral-800 text-[11px] px-4 flex items-center justify-between border-b border-neutral-800/40 dark:border-neutral-200">
          <div className="flex-1 text-center font-medium truncate flex items-center justify-center gap-2">
            <Sparkles className="w-3 h-3 text-amber-400 dark:text-amber-600 hidden sm:inline" />
            <span>Complimentary insured courier delivery over $300 · Use code <strong>WELCOME10</strong> for 10% off</span>
          </div>
          <button
            onClick={() => setPromoBannerVisible(false)}
            className="text-neutral-400 hover:text-white dark:hover:text-neutral-900 p-1"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Bar Contract Navigation */}
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1">
        {activeView === 'home' && <Home />}
        {activeView === 'catalog' && <Catalog />}
        {activeView === 'product-detail' && <ProductDetail />}
        {activeView === 'checkout' && <Checkout />}
        {activeView === 'order-confirmation' && <OrderConfirmation />}
        {activeView === 'profile' && <Profile />}
        {activeView === 'about' && <About />}
        {activeView === 'contact' && <Contact />}
        {activeView === 'guide' && <DevGuide />}
      </main>

      {/* Modals & Overlays */}
      <CartDrawer />
      <AuthModal />
      <ToastContainer />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainLayout />
    </StoreProvider>
  );
}
