import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { CATEGORIES } from '../data/mockData';
import { Search, X, SlidersHorizontal, ArrowUpDown, RefreshCcw } from 'lucide-react';

export const Catalog: React.FC = () => {
  const {
    products,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    minRating,
    setMinRating,
    sortBy,
    setSortBy
  } = useStore();

  // Filter products
  const filteredProducts = products.filter((product) => {
    // Search
    const matchesSearch =
      searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Category
    const matchesCategory =
      selectedCategory === 'All Products' || product.category === selectedCategory;

    // Price
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    // Rating
    const matchesRating = product.rating >= minRating;

    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });

  // Sort
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'newest') return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
    return 0; // featured default
  });

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Products');
    setPriceRange([0, 1000]);
    setMinRating(0);
    setSortBy('featured');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'All Products' ||
    priceRange[0] > 0 ||
    priceRange[1] < 1000 ||
    minRating > 0 ||
    sortBy !== 'featured';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header & Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
            Curated Catalog
          </span>
          <h1 className="text-3xl font-bold font-serif-display text-neutral-900 dark:text-white mt-1">
            Archival Goods & Living
          </h1>
        </div>
        <p className="text-xs text-neutral-500 max-w-sm">
          Precision audio instruments, automatic horology, rare fragrance notes, and heirloom textiles.
        </p>
      </div>

      {/* Control Bar: Search & Category Segments */}
      <div className="space-y-4">
        
        {/* Search bar & Sorting */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by keyword, category, or note..."
              className="w-full pl-10 pr-9 py-2.5 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-600"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
              <label htmlFor="sort-select" className="text-neutral-500 font-medium">Sort:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-2.5 py-2 text-xs font-medium text-neutral-800 dark:text-neutral-200 focus:outline-none"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Recently Released</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="px-3 py-2 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white border border-neutral-200 dark:border-neutral-800 rounded-lg flex items-center gap-1 transition-colors"
                title="Reset all filters"
              >
                <RefreshCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Buttons (Functional Segmented Control) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-xs'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Refined Secondary Filter Strip: Price & Minimum Rating */}
        <div className="p-4 bg-neutral-50 dark:bg-neutral-900/60 rounded-xl border border-neutral-200/60 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-6 text-xs">
          
          {/* Price Range */}
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-neutral-500 font-medium">Max Price:</span>
            <input
              type="range"
              min="100"
              max="1000"
              step="50"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="accent-neutral-900 dark:accent-white cursor-pointer w-28 sm:w-36"
            />
            <span className="font-semibold tabular-nums text-neutral-900 dark:text-white">
              ${priceRange[1]}
            </span>
          </div>

          {/* Rating filter */}
          <div className="flex items-center gap-2">
            <span className="text-neutral-500 font-medium">Rating:</span>
            {[0, 4.0, 4.5, 4.8].map((rate) => (
              <button
                key={rate}
                onClick={() => setMinRating(rate)}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  minRating === rate
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {rate === 0 ? 'All' : `${rate}★+`}
              </button>
            ))}
          </div>

          {/* Match counter */}
          <div className="text-neutral-400 text-xs">
            Showing <strong className="text-neutral-900 dark:text-white tabular-nums">{sortedProducts.length}</strong> items
          </div>
        </div>

      </div>

      {/* Products Grid */}
      {sortedProducts.length === 0 ? (
        <div className="py-20 text-center space-y-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl">
          <p className="text-base font-semibold text-neutral-900 dark:text-white">No pieces match your current criteria</p>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Try adjusting your search query, increasing your price range, or clearing active filters.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-semibold rounded-lg"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
};
