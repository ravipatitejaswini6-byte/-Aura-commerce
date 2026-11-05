import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Compass, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';
import { HERO_IMAGE } from '../data/mockData';

export const About: React.FC = () => {
  const { setActiveView } = useStore();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest font-semibold text-neutral-500">
          Philosophy & Ateliers
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold font-serif-display text-neutral-900 dark:text-white leading-tight">
          Objects engineered for generational provenance.
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Founded in 2026, Aura was established as a counterbalance to fast retail and disposable electronics. We unite independent industrial designers, horologists, and textile masters under a unified material charter.
        </p>
      </div>

      {/* Atmospheric Media Showcase */}
      <div className="aspect-16/9 w-full rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800">
        <img
          src={HERO_IMAGE}
          alt="Aura Workshop Aesthetic"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 4 Pillars of Aura */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-3">
          <ShieldCheck className="w-6 h-6 text-neutral-900 dark:text-white" />
          <h3 className="text-base font-bold font-serif-display text-neutral-900 dark:text-white">
            01. Structural Honesty
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Every joint, fastener, and chassis component is designed to be visible, serviceable, and repairable. We ban glued enclosures, irreversible snap-fits, and planned obsolescence.
          </p>
        </div>

        <div className="p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-3">
          <Compass className="w-6 h-6 text-neutral-900 dark:text-white" />
          <h3 className="text-base font-bold font-serif-display text-neutral-900 dark:text-white">
            02. Verified Origin
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            From FSC-certified European hardwoods to 19.5-micron ethical merino spun in Biella, Italy, every raw component is documented with traceable batch numbers.
          </p>
        </div>

        <div className="p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-3">
          <HeartHandshake className="w-6 h-6 text-neutral-900 dark:text-white" />
          <h3 className="text-base font-bold font-serif-display text-neutral-900 dark:text-white">
            03. Direct Atelier Guilds
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            We partner directly with specialized family-owned manufactories in Grasse, Solingen, Kyoto, and Milan. Removing intermediaries ensures superior artisan compensation.
          </p>
        </div>

        <div className="p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-3">
          <Sparkles className="w-6 h-6 text-neutral-900 dark:text-white" />
          <h3 className="text-base font-bold font-serif-display text-neutral-900 dark:text-white">
            04. 30-Day Home Trial
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Experience our acoustic headphones and mechanical horology in your everyday environment. We provide complimentary insured return postage if you are not deeply moved.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="p-8 bg-neutral-900 text-white rounded-2xl text-center space-y-4">
        <h2 className="text-2xl font-bold font-serif-display">
          Explore the Curated Archive
        </h2>
        <p className="text-xs text-neutral-300 max-w-md mx-auto">
          Discover our current autumn and winter allocations ready for immediate worldwide white-glove dispatch.
        </p>
        <button
          onClick={() => setActiveView('catalog')}
          className="px-6 py-3 bg-white text-neutral-900 rounded-lg text-xs font-semibold hover:bg-neutral-100 transition-colors inline-flex items-center gap-2"
        >
          <span>Browse Available Pieces</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
