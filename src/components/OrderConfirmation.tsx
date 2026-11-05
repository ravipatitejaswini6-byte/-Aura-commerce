import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, PackageCheck, Printer, ArrowRight, Truck, MapPin } from 'lucide-react';

export const OrderConfirmation: React.FC = () => {
  const { currentOrder, orders, setActiveView } = useStore();
  const order = currentOrder || orders[0];

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <p className="text-sm text-neutral-500">No active order found.</p>
        <button
          onClick={() => setActiveView('home')}
          className="px-5 py-2.5 bg-neutral-900 text-white rounded-lg text-xs"
        >
          Return Home
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Success Badge & Header */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 rounded-full flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
          Payment Authorized & Verified
        </span>
        <h1 className="text-3xl font-bold font-serif-display text-neutral-900 dark:text-white">
          Thank you for your order
        </h1>
        <p className="text-xs text-neutral-500 max-w-md mx-auto">
          We have dispatched a confirmation receipt to <strong>{order.shippingAddress.email}</strong>. Our ateliers have received your acquisition for numbered dispatch.
        </p>
      </div>

      {/* Order Details Card */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 sm:p-8 space-y-6 shadow-sm">
        
        {/* Top Info Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4 text-xs">
          <div>
            <span className="text-neutral-400 block">Order Identifier</span>
            <span className="font-mono font-bold text-neutral-900 dark:text-white text-sm">
              #{order.id}
            </span>
          </div>

          <div>
            <span className="text-neutral-400 block">Date of Acquisition</span>
            <span className="font-medium text-neutral-900 dark:text-white">
              {order.date}
            </span>
          </div>

          <div>
            <span className="text-neutral-400 block">Payment Method</span>
            <span className="font-medium text-neutral-900 dark:text-white capitalize">
              {order.paymentMethod} {order.cardLast4 ? `(•••• ${order.cardLast4})` : ''}
            </span>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-xs font-medium transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>
        </div>

        {/* Tracking Milestone Bar */}
        <div className="p-4 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200/60 dark:border-neutral-700 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-neutral-900 dark:text-white flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
              <span>Shipment Tracking:</span>
              <strong className="font-mono text-neutral-800 dark:text-neutral-200">{order.trackingNumber}</strong>
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold uppercase text-[11px] tracking-wider">
              {order.status}
            </span>
          </div>

          {/* Progress dots */}
          <div className="grid grid-cols-3 gap-2 text-center text-[11px] pt-1">
            <div className="space-y-1">
              <div className="h-1.5 bg-neutral-900 dark:bg-white rounded-full" />
              <span className="text-neutral-900 dark:text-white font-medium">1. Confirmed</span>
            </div>
            <div className="space-y-1">
              <div className="h-1.5 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
              <span className="text-neutral-500">2. Dispatched</span>
            </div>
            <div className="space-y-1">
              <div className="h-1.5 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
              <span className="text-neutral-500">3. Delivered</span>
            </div>
          </div>
        </div>

        {/* Itemized list */}
        <div className="space-y-4 pt-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Acquired Goods
          </h3>
          <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {order.items.map((item) => (
              <div key={item.product.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded object-cover bg-neutral-100"
                  />
                  <div>
                    <h4 className="text-xs font-semibold text-neutral-900 dark:text-white">
                      {item.product.name}
                    </h4>
                    <span className="text-[11px] text-neutral-400">
                      Qty: {item.quantity} · ${item.product.price.toFixed(2)} each
                    </span>
                  </div>
                </div>

                <span className="text-xs font-semibold tabular-nums text-neutral-900 dark:text-white">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Summary */}
        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="tabular-nums font-medium text-neutral-900 dark:text-white">
              ${order.subtotal.toFixed(2)}
            </span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
              <span>Applied Savings</span>
              <span className="tabular-nums font-medium">-${order.discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Insured Shipping</span>
            <span className="tabular-nums font-medium text-neutral-900 dark:text-white">
              {order.shipping === 0 ? 'Complimentary' : `$${order.shipping.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Sales Tax (8%)</span>
            <span className="tabular-nums font-medium text-neutral-900 dark:text-white">
              ${order.tax.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-base font-bold text-neutral-900 dark:text-white pt-2 border-t border-neutral-200 dark:border-neutral-800">
            <span>Total Paid</span>
            <span className="tabular-nums">${order.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Shipping Destination */}
        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-start gap-3 text-xs text-neutral-500">
          <MapPin className="w-4 h-4 text-neutral-700 dark:text-neutral-300 shrink-0 mt-0.5" />
          <div>
            <strong className="text-neutral-900 dark:text-white block">{order.shippingAddress.fullName}</strong>
            <span>{order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}, {order.shippingAddress.country}</span>
            <span className="block text-neutral-400 mt-0.5">{order.shippingAddress.phone}</span>
          </div>
        </div>

      </div>

      {/* Return CTA */}
      <div className="flex justify-center pt-4">
        <button
          onClick={() => setActiveView('home')}
          className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors"
        >
          <span>Continue Browsing Aura</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
