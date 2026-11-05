import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Search, User, Sun, Moon, Menu, X, BookOpen } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    cartCount,
    setIsCartDrawerOpen,
    user,
    setIsAuthModalOpen,
    isDarkMode,
    toggleDarkMode
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Store', view: 'home' as const },
    { label: 'Catalog', view: 'catalog' as const },
    { label: 'Craft & Story', view: 'about' as const },
    { label: 'My Orders', view: 'profile' as const },
    { label: 'Dev Guide', view: 'guide' as const },
  ];

  const handleNavClick = (view: typeof activeView) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800 transition-colors">
      {/* Top Bar Container - 3 Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-xl font-bold tracking-tight font-serif-display text-neutral-900 dark:text-white hover:opacity-85 transition-opacity whitespace-nowrap shrink-0 text-left flex items-center gap-2"
        >
          <span>AURA</span>
          <span className="text-xs font-sans uppercase tracking-widest text-neutral-500 font-normal">Living</span>
        </button>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600 dark:text-neutral-300">
          {navLinks.map((link) => {
            const isActive = activeView === link.view;
            return (
              <button
                key={link.view}
                onClick={() => handleNavClick(link.view)}
                className={`relative py-1 transition-colors whitespace-nowrap shrink-0 hover:text-neutral-900 dark:hover:text-white ${
                  isActive ? 'text-neutral-900 dark:text-white font-semibold' : ''
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 dark:bg-white rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions & Shopping Bag */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Search */}
          <button
            onClick={() => handleNavClick('catalog')}
            className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
            title="Search Catalog"
            aria-label="Search Catalog"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleDarkMode}
            className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* User Auth / Profile */}
          <button
            onClick={() => {
              if (user) {
                handleNavClick('profile');
              } else {
                setIsAuthModalOpen(true);
              }
            }}
            className="flex items-center gap-2 p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
            title={user ? `Signed in as ${user.name}` : 'Sign In'}
            aria-label="Account"
          >
            <User className="w-5 h-5" />
            {user && (
              <span className="hidden lg:inline text-xs font-medium text-neutral-700 dark:text-neutral-300 truncate max-w-24">
                {user.name.split(' ')[0]}
              </span>
            )}
          </button>

          {/* Cart Primary CTA */}
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="relative flex items-center justify-center p-2.5 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors whitespace-nowrap shrink-0 group"
            aria-label={`Shopping bag with ${cartCount} items`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="ml-2 text-xs font-semibold tabular-nums">
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-700 dark:text-neutral-200 hover:text-neutral-900"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <button
              key={link.view}
              onClick={() => handleNavClick(link.view)}
              className={`block w-full text-left py-2 text-base font-medium transition-colors ${
                activeView === link.view
                  ? 'text-neutral-900 dark:text-white font-semibold'
                  : 'text-neutral-600 dark:text-neutral-300'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-sm">
            <span className="text-neutral-500 text-xs">
              {user ? `Signed in as ${user.name}` : 'Not signed in'}
            </span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (user) {
                  setActiveView('profile');
                } else {
                  setIsAuthModalOpen(true);
                }
              }}
              className="text-xs font-medium text-neutral-900 dark:text-white underline underline-offset-2"
            >
              {user ? 'View Account' : 'Sign In'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
