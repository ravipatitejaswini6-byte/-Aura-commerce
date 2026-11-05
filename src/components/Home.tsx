import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { HERO_IMAGE } from '../data/mockData';
import { ArrowRight, Compass, ShieldCheck, Sparkles, Feather } from 'lucide-react';

export const Home: React.FC = () => {
  const { products, setActiveView, openProductDetail, setSelectedCategory } = useStore();

  const featuredProducts = products.slice(0, 3);
  const heroProduct = products[4]; // Nordic Pavilion Solid Oak Lounge Chair

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. Storefront Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <div className="relative rounded-2xl overflow-hidden bg-neutral-900 text-white min-h-[460px] sm:min-h-[540px] flex items-end">
          
          {/* Hero Background Image with measured contrast scrim */}
          <img
            src={HERO_IMAGE}
            alt="Aura Living Interior"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

          {/* Hero Content */}
          <div className="relative z-10 p-6 sm:p-12 lg:p-16 max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest text-neutral-300 font-medium">
              Autumn / Winter 2026 Archive
            </span>

            <h1 className="text-3xl sm:text-5xl font-bold font-serif-display leading-tight text-balance tracking-tight">
              Honest Materials. Lasting Proportions.
            </h1>

            <p className="text-sm sm:text-base text-neutral-200 max-w-xl font-normal leading-relaxed">
              Curating tactile living objects, precision acoustic monitors, mechanical horology, and un-dyed organic merino knitwear crafted by masters.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  setActiveView('catalog');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 bg-white text-neutral-900 font-semibold text-xs uppercase tracking-wider rounded-lg hover:bg-neutral-100 transition-colors flex items-center gap-2 group"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => openProductDetail(heroProduct.id)}
                className="px-6 py-3.5 bg-neutral-900/60 hover:bg-neutral-900/80 backdrop-blur-md text-white border border-white/20 font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors"
              >
                View Centerpiece Chair
              </button>
            </div>
          </div>
        </div>

        {/* 4-Item Proof Bar below Hero */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-neutral-700 dark:text-neutral-300 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-neutral-900 dark:text-white">Lifetime Provenance</h4>
              <p className="text-[11px] text-neutral-500 mt-0.5">FSC-certified oak, 316L steel & organic wool</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 flex items-start gap-3">
            <Compass className="w-5 h-5 text-neutral-700 dark:text-neutral-300 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-neutral-900 dark:text-white">Artisanal Workshops</h4>
              <p className="text-[11px] text-neutral-500 mt-0.5">Directly sourced across Kyoto, Grasse & Milan</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-neutral-700 dark:text-neutral-300 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-neutral-900 dark:text-white">Verified Customer Trust</h4>
              <p className="text-[11px] text-neutral-500 mt-0.5">4.9/5 average rating across 180+ buyers</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 flex items-start gap-3">
            <Feather className="w-5 h-5 text-neutral-700 dark:text-neutral-300 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-neutral-900 dark:text-white">Complimentary Shipping</h4>
              <p className="text-[11px] text-neutral-500 mt-0.5">Insured global white-glove dispatch over $300</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Acquisitions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">
              Curated Edition
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-display text-neutral-900 dark:text-white mt-1">
              Featured Signatures
            </h2>
          </div>
          <button
            onClick={() => setActiveView('catalog')}
            className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-white hover:opacity-70 transition-opacity flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 3. Category Showcase Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
          <span className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">
            By Discipline
          </span>
          <h2 className="text-2xl font-bold font-serif-display text-neutral-900 dark:text-white mt-1">
            Collections & Taxonomy
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: 'Audio & Tech',
              desc: 'Custom beryllium drivers and studio acoustic isolation',
              category: 'Audio & Tech',
              image: products[0].image
            },
            {
              title: 'Watches & Precision',
              desc: 'Automatic Swiss and German caliber mechanical horology',
              category: 'Watches & Precision',
              image: products[1].image
            },
            {
              title: 'Fragrance & Living',
              desc: 'Extrait de parfum macerated in Grasse with raw resins',
              category: 'Fragrance & Living',
              image: products[2].image
            },
            {
              title: 'Textiles & Apparel',
              desc: 'Un-dyed 19.5-micron extrafine merino wool cable knitwear',
              category: 'Textiles & Apparel',
              image: products[3].image
            }
          ].map((cat) => (
            <div
              key={cat.title}
              onClick={() => {
                setSelectedCategory(cat.category);
                setActiveView('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group cursor-pointer relative rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-800 aspect-3/4 flex flex-col justify-end p-5"
            >
              <img
                src={cat.image}
                alt={cat.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              <div className="relative z-10 text-white space-y-1">
                <h3 className="text-lg font-serif-display font-bold group-hover:translate-x-1 transition-transform">
                  {cat.title}
                </h3>
                <p className="text-xs text-neutral-300 line-clamp-2">
                  {cat.desc}
                </p>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-200 pt-2 block">
                  Browse Collection →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Story & Material Integrity */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">
              The Aura Constitution
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-display text-neutral-900 dark:text-white leading-tight">
              Designed to be passed down, not replaced next season.
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              In a landscape dominated by disposable cycles and built-in obsolescence, Aura curates objects engineered for decades of service. We work exclusively with certified independent ateliers who uphold rigorous material standards: sustainably harvested European hardwoods, vegetable-tanned full-grain leather, surgical-grade stainless alloys, and un-dyed organic yarns.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setActiveView('about')}
                className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-white underline underline-offset-4 hover:opacity-75 transition-opacity"
              >
                Read our craftsmanship charter
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
              <span className="text-2xl font-bold font-serif-display text-neutral-900 dark:text-white">100%</span>
              <p className="text-xs text-neutral-500 mt-1">Traceable raw provenance</p>
            </div>
            <div className="p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
              <span className="text-2xl font-bold font-serif-display text-neutral-900 dark:text-white">30 Days</span>
              <p className="text-xs text-neutral-500 mt-1">Complimentary home evaluation</p>
            </div>
            <div className="p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
              <span className="text-2xl font-bold font-serif-display text-neutral-900 dark:text-white">2 Years</span>
              <p className="text-xs text-neutral-500 mt-1">Comprehensive repair warranty</p>
            </div>
            <div className="p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
              <span className="text-2xl font-bold font-serif-display text-neutral-900 dark:text-white">0%</span>
              <p className="text-xs text-neutral-500 mt-1">Synthetic fillers or plastic mesh</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
