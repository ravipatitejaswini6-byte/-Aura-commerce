import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Star, ShieldCheck, Truck, RotateCcw, Heart, Plus, Minus, ArrowLeft, MessageSquare, Check, ThumbsUp } from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const {
    selectedProductId,
    products,
    reviews,
    addReview,
    addToCart,
    wishlist,
    toggleWishlist,
    setActiveView,
    openProductDetail,
    user,
    setIsAuthModalOpen
  } = useStore();

  const product = products.find((p) => p.id === selectedProductId) || products[0];
  const productReviews = reviews[product.id] || [];

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview');
  const isWishlisted = wishlist.includes(product.id);

  // Review submission state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    if (!reviewTitle.trim() || !reviewComment.trim()) return;

    setIsSubmittingReview(true);
    addReview(product.id, {
      productId: product.id,
      userName: user.name,
      userAvatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`,
      rating: reviewRating,
      title: reviewTitle.trim(),
      comment: reviewComment.trim(),
      verifiedPurchase: true
    });

    setReviewTitle('');
    setReviewComment('');
    setShowReviewForm(false);
    setIsSubmittingReview(false);
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumb & Back Navigation */}
      <div className="flex items-center gap-3 text-xs text-neutral-500">
        <button
          onClick={() => setActiveView('catalog')}
          className="flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </button>
        <span aria-hidden="true">/</span>
        <span>{product.category}</span>
        <span aria-hidden="true">/</span>
        <span className="text-neutral-900 dark:text-white font-medium truncate max-w-xs">{product.name}</span>
      </div>

      {/* Contiguous PDP Grid: Gallery (Left) & Contiguous Purchase Module (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Gallery & Visual Showcase */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-4/3 w-full bg-neutral-100 dark:bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 text-xs font-medium uppercase tracking-wider bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xs px-3 py-1.5 rounded text-neutral-800 dark:text-neutral-200">
                {product.badge}
              </span>
            )}
          </div>

          {/* Value Props Strip */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200/60 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-neutral-800 dark:text-neutral-200 shrink-0" />
              <span>Complimentary insured delivery over $300</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-neutral-800 dark:text-neutral-200 shrink-0" />
              <span>30-Day trial with prepaid returns</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-neutral-800 dark:text-neutral-200 shrink-0" />
              <span>2-Year comprehensive manufacturer warranty</span>
            </div>
          </div>
        </div>

        {/* Right: Contiguous Purchase Module */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          
          <div className="space-y-3">
            {/* Category & Rating */}
            <div className="flex items-center justify-between text-xs text-neutral-500">
              <span className="uppercase tracking-wider font-medium">{product.category}</span>
              <button
                onClick={() => setActiveTab('reviews')}
                className="flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-neutral-300 dark:text-neutral-700'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold text-neutral-900 dark:text-white tabular-nums">
                  {product.rating}
                </span>
                <span>({productReviews.length} reviews)</span>
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-serif-display text-neutral-900 dark:text-white tracking-tight leading-tight">
              {product.name}
            </h1>

            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {product.subtitle}
            </p>
          </div>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-3 pt-2 border-t border-neutral-200 dark:border-neutral-800">
            <span className="text-2xl font-bold tabular-nums text-neutral-900 dark:text-white">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-neutral-400 line-through tabular-nums">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-xs text-neutral-500 ml-auto">
              {product.inStock ? (
                <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                  In Stock · {product.stockCount} available
                </span>
              ) : (
                <span className="text-rose-600 font-medium">Temporarily Backordered</span>
              )}
            </span>
          </div>

          {/* Quantity & Buy CTAs */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-neutral-300 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-800">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-semibold tabular-nums text-neutral-900 dark:text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                  disabled={quantity >= product.stockCount}
                  className="p-3 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 disabled:opacity-30 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 py-3.5 px-6 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 text-white font-medium text-sm rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Add to Shopping Bag</span>
                <span className="tabular-nums">· ${(product.price * quantity).toFixed(2)}</span>
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:text-rose-500 transition-colors"
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>
          </div>

          {/* Highlights */}
          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
              Product Highlights
            </span>
            <ul className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
              {product.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-neutral-900 dark:text-neutral-100 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Tabs Section: Detailed Description, Technical Specs, Customer Reviews */}
      <div className="pt-10 border-t border-neutral-200 dark:border-neutral-800">
        <div className="flex border-b border-neutral-200 dark:border-neutral-800 gap-8">
          {(['overview', 'specs', 'reviews'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-medium transition-colors border-b-2 capitalize ${
                activeTab === tab
                  ? 'border-neutral-900 dark:border-white text-neutral-900 dark:text-white font-semibold'
                  : 'border-transparent text-neutral-400 hover:text-neutral-600'
              }`}
            >
              {tab === 'reviews' ? `Customer Reviews (${productReviews.length})` : tab}
            </button>
          ))}
        </div>

        <div className="py-8">
          {activeTab === 'overview' && (
            <div className="max-w-3xl space-y-4 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              <p>{product.description}</p>
              <p>
                Each piece undergoes meticulous inspection at our studio prior to numbered dispatch. We prioritize enduring materials over disposable consumer cycles, ensuring your acquisition matures with distinction.
              </p>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-2xl">
              <dl className="divide-y divide-neutral-200 dark:divide-neutral-800 border-y border-neutral-200 dark:border-neutral-800 text-sm">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="py-3 grid grid-cols-3 gap-4">
                    <dt className="text-neutral-500 dark:text-neutral-400 font-medium">{key}</dt>
                    <dd className="col-span-2 text-neutral-900 dark:text-white font-mono text-xs">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-8">
              
              {/* Reviews Summary & Write Review Button */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200/80 dark:border-neutral-800">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold font-serif-display text-neutral-900 dark:text-white tabular-nums">
                    {product.rating}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-neutral-300 dark:text-neutral-700'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-neutral-500 mt-1 block">
                      Based on {productReviews.length} verified owner reviews
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="px-5 py-2.5 text-xs font-semibold bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors flex items-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{showReviewForm ? 'Cancel Review' : 'Write a Customer Review'}</span>
                </button>
              </div>

              {/* Review Submission Form */}
              {showReviewForm && (
                <form
                  onSubmit={handleReviewSubmit}
                  className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-4 max-w-xl"
                >
                  <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                    Submit Your Feedback
                  </h3>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                      Your Rating (1 to 5 Stars)
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="p-1 focus:outline-none"
                        >
                          <Star
                            className={`w-6 h-6 transition-colors ${
                              star <= reviewRating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-neutral-300 dark:text-neutral-700'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs text-neutral-500 ml-2">{reviewRating} of 5 Stars</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Review Headline
                    </label>
                    <input
                      type="text"
                      required
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                      placeholder="e.g. Flawless craft and timeless design"
                      className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Detailed Review
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Share your experience regarding material quality, ergonomics, and daily performance..."
                      className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingReview}
                    className="px-5 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-semibold rounded-lg hover:bg-neutral-800 transition-colors"
                  >
                    Post Verified Review
                  </button>
                </form>
              )}

              {/* Reviews List */}
              <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {productReviews.map((rev) => (
                  <div key={rev.id} className="py-6 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={rev.userAvatar || `https://api.dicebear.com/7.x/initials/svg?seed=${rev.userName}`}
                          alt={rev.userName}
                          className="w-8 h-8 rounded-full bg-neutral-200"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                              {rev.userName}
                            </span>
                            {rev.verifiedPurchase && (
                              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                                Verified Buyer
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-neutral-400">{rev.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-neutral-300 dark:text-neutral-700'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <h4 className="text-sm font-semibold text-neutral-900 dark:text-white pt-1">
                      {rev.title}
                    </h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {rev.comment}
                    </p>

                    <div className="pt-2 flex items-center gap-2 text-[11px] text-neutral-400">
                      <button className="flex items-center gap-1 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors">
                        <ThumbsUp className="w-3 h-3" />
                        <span>Helpful ({rev.helpfulCount})</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}
        </div>
      </div>

      {/* Related Products Showcase */}
      <div className="pt-12 border-t border-neutral-200 dark:border-neutral-800 space-y-6">
        <h3 className="text-xl font-bold font-serif-display text-neutral-900 dark:text-white">
          Complementary Acquisitions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {relatedProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => openProductDetail(p.id)}
              className="group cursor-pointer bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-400 transition-colors"
            >
              <div className="aspect-4/3 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                <img
                  src={p.image}
                  alt={p.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                />
              </div>
              <div className="p-4 space-y-1">
                <span className="text-[11px] text-neutral-400 uppercase tracking-wider">{p.category}</span>
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-white truncate">{p.name}</h4>
                <span className="text-xs font-bold tabular-nums text-neutral-900 dark:text-white">${p.price.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
