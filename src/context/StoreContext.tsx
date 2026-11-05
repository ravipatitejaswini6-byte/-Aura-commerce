import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, User, Review, Address } from '../types';
import { INITIAL_PRODUCTS, INITIAL_REVIEWS, DEMO_USER, INITIAL_ORDERS } from '../data/mockData';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

export type ViewType = 
  | 'home' 
  | 'catalog' 
  | 'product-detail' 
  | 'cart' 
  | 'checkout' 
  | 'order-confirmation' 
  | 'profile' 
  | 'about' 
  | 'contact' 
  | 'guide';

interface StoreContextType {
  // Navigation
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  selectedProductId: string | null;
  openProductDetail: (productId: string) => void;
  
  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // Search & Catalog Filter
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';
  setSortBy: (sort: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest') => void;

  // Products & Reviews
  products: Product[];
  reviews: Record<string, Review[]>;
  addReview: (productId: string, review: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  cartCount: number;
  cartSubtotal: number;
  shippingFee: number;
  discountAmount: number;
  taxAmount: number;
  cartTotal: number;
  couponCode: string;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;

  // Auth & Profile
  user: User | null;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  login: (email: string, password?: string) => boolean;
  register: (name: string, email: string, password?: string) => boolean;
  logout: () => void;

  // Orders
  orders: Order[];
  currentOrder: Order | null;
  placeOrder: (shippingAddress: Address, paymentMethod: 'stripe' | 'paypal' | 'cod', cardLast4?: string) => Order;

  // Toast
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & Modals
  const [activeView, setActiveView] = useState<ViewType>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>('prod-headphones-01');
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Theme
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Catalog Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Products');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'newest'>('featured');

  // Products & Reviews
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('aura_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [reviews, setReviews] = useState<Record<string, Review[]>>(() => {
    const saved = localStorage.getItem('aura_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('aura_cart');
    return saved ? JSON.parse(saved) : [
      { product: INITIAL_PRODUCTS[0], quantity: 1 }
    ];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState<string>('');

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('aura_wishlist');
    return saved ? JSON.parse(saved) : ['prod-watch-02'];
  });

  // User Auth
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('aura_user');
    return saved ? JSON.parse(saved) : DEMO_USER;
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('aura_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('aura_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('aura_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('aura_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('aura_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('aura_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('aura_user');
    }
  }, [user]);

  // Dark mode effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const openProductDetail = (productId: string) => {
    setSelectedProductId(productId);
    setActiveView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, product.stockCount);
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: newQty } : item
        );
      }
      return [...prev, { product, quantity: Math.min(quantity, product.stockCount) }];
    });
    showToast(`Added "${product.name}" to your cart`);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const validQty = Math.min(quantity, item.product.stockCount);
          return { ...item, quantity: validQty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: string) => {
    const itemToRemove = cart.find(i => i.product.id === productId);
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    if (itemToRemove) {
      showToast(`Removed "${itemToRemove.product.name}" from cart`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  
  // Shipping: free over $300 or with FREESHIP coupon
  const shippingFee = cartSubtotal === 0 || cartSubtotal >= 300 || appliedCoupon === 'FREESHIP' ? 0 : 25;
  
  let discountAmount = 0;
  if (appliedCoupon === 'WELCOME10') {
    discountAmount = Math.round((cartSubtotal * 0.1) * 100) / 100;
  } else if (appliedCoupon === 'AURA20') {
    discountAmount = Math.round((cartSubtotal * 0.2) * 100) / 100;
  }

  const taxableAmount = Math.max(0, cartSubtotal - discountAmount);
  const taxAmount = Math.round(taxableAmount * 0.08 * 100) / 100;
  const cartTotal = Math.max(0, Math.round((taxableAmount + shippingFee + taxAmount) * 100) / 100);

  const applyCoupon = (code: string): boolean => {
    const formatted = code.trim().toUpperCase();
    if (formatted === 'WELCOME10' || formatted === 'FREESHIP' || formatted === 'AURA20') {
      setAppliedCoupon(formatted);
      showToast(`Coupon "${formatted}" applied successfully!`);
      return true;
    } else {
      showToast('Invalid promo code. Try WELCOME10 or FREESHIP', 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Promo code removed', 'info');
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Item removed from wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Item saved to wishlist');
        return [...prev, productId];
      }
    });
  };

  // Reviews
  const addReview = (productId: string, newReviewData: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => {
    const newReview: Review = {
      ...newReviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      helpfulCount: 0
    };

    setReviews((prev) => {
      const existing = prev[productId] || [];
      const updated = [newReview, ...existing];
      
      // Update product rating
      const sum = updated.reduce((acc, r) => acc + r.rating, 0);
      const avg = Math.round((sum / updated.length) * 10) / 10;
      
      setProducts((currentProds) =>
        currentProds.map((p) =>
          p.id === productId ? { ...p, rating: avg, reviewCount: updated.length } : p
        )
      );

      return {
        ...prev,
        [productId]: updated
      };
    });

    showToast('Thank you! Your verified review has been published.');
  };

  // Auth
  const login = (email: string, _password?: string) => {
    const loggedUser: User = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      email,
      role: 'customer',
      joinedDate: new Date().toISOString().split('T')[0],
      addresses: DEMO_USER.addresses
    };
    setUser(loggedUser);
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${loggedUser.name}!`);
    return true;
  };

  const register = (name: string, email: string, _password?: string) => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role: 'customer',
      joinedDate: new Date().toISOString().split('T')[0],
      addresses: [
        {
          fullName: name,
          email,
          phone: '+1 (555) 019-2834',
          street: '100 Market Street, Suite 400',
          city: 'San Francisco',
          state: 'CA',
          postalCode: '94105',
          country: 'United States'
        }
      ]
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
    showToast(`Account created! Welcome to Aura, ${name}.`);
    return true;
  };

  const logout = () => {
    setUser(null);
    showToast('You have been logged out safely.', 'info');
  };

  // Orders
  const placeOrder = (
    shippingAddress: Address,
    paymentMethod: 'stripe' | 'paypal' | 'cod',
    cardLast4?: string
  ): Order => {
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const trackingNum = `TRK-AUR-${Math.floor(1000000 + Math.random() * 9000000)}`;
    
    const newOrder: Order = {
      id: orderId,
      date: new Date().toISOString().split('T')[0],
      items: [...cart],
      subtotal: cartSubtotal,
      shipping: shippingFee,
      discount: discountAmount,
      tax: taxAmount,
      total: cartTotal,
      status: 'Confirmed',
      shippingAddress,
      paymentMethod,
      paymentStatus: 'Paid',
      cardLast4: cardLast4 || (paymentMethod === 'stripe' ? '4242' : undefined),
      trackingNumber: trackingNum
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    clearCart();
    setActiveView('order-confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Order #${orderId} placed successfully!`);
    return newOrder;
  };

  return (
    <StoreContext.Provider
      value={{
        activeView,
        setActiveView,
        selectedProductId,
        openProductDetail,
        isDarkMode,
        toggleDarkMode,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        priceRange,
        setPriceRange,
        minRating,
        setMinRating,
        sortBy,
        setSortBy,
        products,
        reviews,
        addReview,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        cartCount,
        cartSubtotal,
        shippingFee,
        discountAmount,
        taxAmount,
        cartTotal,
        couponCode,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        wishlist,
        toggleWishlist,
        user,
        isAuthModalOpen,
        setIsAuthModalOpen,
        login,
        register,
        logout,
        orders,
        currentOrder,
        placeOrder,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
