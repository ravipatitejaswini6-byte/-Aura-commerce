import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView, showToast, setSelectedCategory } = useStore();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    showToast(`Thank you! ${email} has been subscribed to private salon releases.`);
    setEmail('');
  };

  return (
    <footer className="bg-neutral-900 text-neutral-300 border-t border-neutral-800 transition-colors">
      
      {/* Upper Newsletter & Mission */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-neutral-800">
        
        {/* Brand Column */}
        <div className="lg:col-span-5 space-y-4">
          <span className="text-2xl font-bold font-serif-display text-white tracking-tight">
            AURA
          </span>
          <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
            Curators of architectural home objects, Swiss caliber horology, studio acoustic monitors, and organic textiles engineered for lifetime service.
          </p>
          <div className="flex items-center gap-6 text-xs text-neutral-400 pt-2">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-neutral-300" />
              <span>Certified Provenance</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-neutral-300" />
              <span>Global White-Glove</span>
            </span>
            <span className="flex items-center gap-1.5">
              <RotateCcw className="w-4 h-4 text-neutral-300" />
              <span>30-Day Evaluation</span>
            </span>
          </div>
        </div>

        {/* Navigation Columns */}
        <div className="lg:col-span-3 grid grid-cols-2 gap-8 text-xs">
          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Acquisitions
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button
                  onClick={() => { setSelectedCategory('Audio & Tech'); setActiveView('catalog'); }}
                  className="hover:text-white transition-colors"
                >
                  Audio & Tech
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setSelectedCategory('Watches & Precision'); setActiveView('catalog'); }}
                  className="hover:text-white transition-colors"
                >
                  Horology
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setSelectedCategory('Fragrance & Living'); setActiveView('catalog'); }}
                  className="hover:text-white transition-colors"
                >
                  Fragrance
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setSelectedCategory('Textiles & Apparel'); setActiveView('catalog'); }}
                  className="hover:text-white transition-colors"
                >
                  Textiles
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Services
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button onClick={() => setActiveView('profile')} className="hover:text-white transition-colors">
                  Order Tracking
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('about')} className="hover:text-white transition-colors">
                  Craft Charter
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('contact')} className="hover:text-white transition-colors">
                  Private Salon
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('guide')} className="hover:text-white transition-colors text-amber-300">
                  Dev & VS Code Guide
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="lg:col-span-4 space-y-3">
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
            Private Gazette Dispatch
          </h4>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Receive private allocations of limited batch editions, atelier monographs, and studio recordings.
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-2 pt-1">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-3 py-2 text-xs bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-white"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-white text-neutral-900 rounded-lg text-xs font-semibold hover:bg-neutral-200 transition-colors flex items-center gap-1 shrink-0"
            >
              <span>Join</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Bar: Copyright & Terms */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
        <p>© 2026 Aura Commerce Platform. Built for craftsmanship and responsive performance.</p>
        <div className="flex items-center gap-6">
          <button onClick={() => setActiveView('about')} className="hover:text-neutral-300">Privacy Policy</button>
          <button onClick={() => setActiveView('about')} className="hover:text-neutral-300">Terms of Service</button>
          <button onClick={() => setActiveView('contact')} className="hover:text-neutral-300">Concierge Desk</button>
        </div>
      </div>

    </footer>
  );
};
