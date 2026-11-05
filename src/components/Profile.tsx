import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { User, Package, Heart, MapPin, LogOut, ExternalLink, ShoppingBag, ShieldCheck, Clock } from 'lucide-react';

export const Profile: React.FC = () => {
  const {
    user,
    logout,
    orders,
    wishlist,
    products,
    openProductDetail,
    addToCart,
    setIsAuthModalOpen,
    setActiveView
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'address'>('orders');

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold font-serif-display text-neutral-900 dark:text-white">
          Authentication Required
        </h2>
        <p className="text-xs text-neutral-500">
          Sign in to inspect your order history, manage saved addresses, and view your private wishlist.
        </p>
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="px-6 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-semibold rounded-lg hover:bg-neutral-800 transition-colors"
        >
          Sign In / Register
        </button>
      </div>
    );
  }

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Profile Header */}
      <div className="p-6 sm:p-8 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`}
            alt={user.name}
            className="w-16 h-16 rounded-full bg-neutral-200 border-2 border-white dark:border-neutral-800 shadow-sm"
          />
          <div className="space-y-0.5">
            <h1 className="text-xl font-bold font-serif-display text-neutral-900 dark:text-white">
              {user.name}
            </h1>
            <p className="text-xs text-neutral-500">{user.email}</p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-neutral-400">
              <Clock className="w-3.5 h-3.5" />
              <span>Patron since {user.joinedDate}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={logout}
            className="px-4 py-2 border border-neutral-200 dark:border-neutral-700 hover:bg-white dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-medium rounded-lg flex items-center gap-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-neutral-200 dark:border-neutral-800 gap-8">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-4 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'border-neutral-900 dark:border-white text-neutral-900 dark:text-white font-semibold'
              : 'border-transparent text-neutral-400 hover:text-neutral-600'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Previous Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`pb-4 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === 'wishlist'
              ? 'border-neutral-900 dark:border-white text-neutral-900 dark:text-white font-semibold'
              : 'border-transparent text-neutral-400 hover:text-neutral-600'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Wishlist ({wishlistedProducts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('address')}
          className={`pb-4 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === 'address'
              ? 'border-neutral-900 dark:border-white text-neutral-900 dark:text-white font-semibold'
              : 'border-transparent text-neutral-400 hover:text-neutral-600'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Saved Addresses</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div>
        {/* 1. Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="py-12 text-center text-xs text-neutral-500">
                You have not placed any orders yet.
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 dark:border-neutral-800 pb-3 text-xs">
                    <div>
                      <span className="text-neutral-400">Order ID: </span>
                      <strong className="font-mono text-neutral-900 dark:text-white">#{order.id}</strong>
                    </div>
                    <div>
                      <span className="text-neutral-400">Date: </span>
                      <span className="text-neutral-800 dark:text-neutral-200">{order.date}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400">Tracking: </span>
                      <span className="font-mono text-neutral-800 dark:text-neutral-200">{order.trackingNumber}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400 uppercase text-[11px]">
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Items in order */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {order.items.map((item) => (
                      <div key={item.product.id} className="flex items-center gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-14 h-14 object-cover rounded-md bg-neutral-100 border border-neutral-200 dark:border-neutral-800"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-neutral-900 dark:text-white truncate">
                            {item.product.name}
                          </h4>
                          <span className="text-[11px] text-neutral-400">
                            Qty: {item.quantity} · ${(item.product.price).toFixed(2)}
                          </span>
                        </div>
                        <button
                          onClick={() => openProductDetail(item.product.id)}
                          className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white p-1"
                          title="View product"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800 text-xs">
                    <span className="text-neutral-500">
                      Payment via {order.paymentMethod.toUpperCase()} (Status: {order.paymentStatus})
                    </span>
                    <span className="text-sm font-bold text-neutral-900 dark:text-white tabular-nums">
                      Total: ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* 2. Wishlist Tab */}
        {activeTab === 'wishlist' && (
          <div className="space-y-6">
            {wishlistedProducts.length === 0 ? (
              <div className="py-12 text-center text-xs text-neutral-500 space-y-3">
                <p>Your wishlist is currently empty.</p>
                <button
                  onClick={() => setActiveView('catalog')}
                  className="px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs"
                >
                  Discover Goods
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistedProducts.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-3"
                  >
                    <div
                      className="aspect-4/3 w-full rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800 cursor-pointer"
                      onClick={() => openProductDetail(p.id)}
                    >
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="text-[11px] text-neutral-400 uppercase">{p.category}</span>
                      <h4 className="text-sm font-semibold text-neutral-900 dark:text-white truncate">
                        {p.name}
                      </h4>
                      <span className="text-xs font-bold tabular-nums text-neutral-900 dark:text-white block mt-1">
                        ${p.price.toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={() => addToCart(p, 1)}
                      className="w-full py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3. Address Tab */}
        {activeTab === 'address' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {user.addresses.map((addr, idx) => (
              <div
                key={idx}
                className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-neutral-900 dark:text-white">Primary Delivery Address</span>
                  <span className="text-[11px] text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded font-medium">Default</span>
                </div>
                <p className="font-medium text-neutral-800 dark:text-neutral-200">{addr.fullName}</p>
                <p className="text-neutral-500">{addr.street}</p>
                <p className="text-neutral-500">{addr.city}, {addr.state} {addr.postalCode}</p>
                <p className="text-neutral-500">{addr.country}</p>
                <p className="text-neutral-400 pt-1">Tel: {addr.phone}</p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
