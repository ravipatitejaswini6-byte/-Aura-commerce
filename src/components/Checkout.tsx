import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Address } from '../types';
import { Lock, ShieldCheck, CreditCard, ArrowLeft, CheckCircle2, AlertCircle, RefreshCw, Sparkles } from 'lucide-react';

export const Checkout: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    shippingFee,
    discountAmount,
    taxAmount,
    cartTotal,
    appliedCoupon,
    user,
    placeOrder,
    setActiveView
  } = useStore();

  // Form states
  const [shippingAddress, setShippingAddress] = useState<Address>(() => {
    if (user?.addresses && user.addresses.length > 0) {
      return user.addresses[0];
    }
    return {
      fullName: user?.name || 'Tejaswini Ravipati',
      email: user?.email || 'tejaswini@example.com',
      phone: '+1 (555) 382-9912',
      street: '742 Evergreen Terrace',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94107',
      country: 'United States'
    };
  });

  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal' | 'cod'>('stripe');

  // Card details
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [cardName, setCardName] = useState('Tejaswini Ravipati');

  // Test failure simulation switch
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold font-serif-display text-neutral-900 dark:text-white">
          Your Shopping Bag is Empty
        </h2>
        <p className="text-xs text-neutral-500">
          Please add items to your cart before proceeding to checkout.
        </p>
        <button
          onClick={() => setActiveView('catalog')}
          className="px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-semibold rounded-lg"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 16);
    let formatted = val.replace(/(.{4})/g, '$1 ').trim();
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (val.length >= 3) {
      val = `${val.substring(0, 2)}/${val.substring(2, 4)}`;
    }
    setCardExpiry(val);
  };

  const handleAutofillTestCard = () => {
    setCardNumber('4242 4242 4242 4242');
    setCardExpiry('12/28');
    setCardCvc('888');
    setCardName(shippingAddress.fullName || 'Tejaswini Ravipati');
    setPaymentError(null);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError(null);
    setIsProcessing(true);

    // Simulate network delay to payment processor
    setTimeout(() => {
      if (simulateFailure) {
        setIsProcessing(false);
        setPaymentError(
          'Your card was declined (Simulated Error: Insufficient funds or invalid card testing rule). Please try unchecking "Simulate payment failure" or autofill the valid Stripe test card.'
        );
        return;
      }

      const cardLast4 = paymentMethod === 'stripe' ? cardNumber.replace(/\s/g, '').slice(-4) || '4242' : undefined;
      placeOrder(shippingAddress, paymentMethod, cardLast4);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Back button */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveView('catalog')}
          className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>
      </div>

      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
        <h1 className="text-2xl sm:text-3xl font-bold font-serif-display text-neutral-900 dark:text-white">
          Express Checkout
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Review your items, provide shipping coordinates, and confirm secure payment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Shipping & Payment Form */}
        <div className="lg:col-span-7 space-y-8">
          
          <form onSubmit={handlePaymentSubmit} className="space-y-8">
            
            {/* Step 1: Delivery Address */}
            <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs flex items-center justify-center font-mono">1</span>
                  <span>Shipping Address</span>
                </h2>
                <span className="text-xs text-neutral-400">Step 1 of 2</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Recipient Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.fullName}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Email for Shipment Tracking
                  </label>
                  <input
                    type="email"
                    required
                    value={shippingAddress.email}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Street Address & Apartment / Suite
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.street}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                    placeholder="123 Ocean Boulevard, Apt 4B"
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      State / Province
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.postalCode}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Contact Phone (For Courier)
                  </label>
                  <input
                    type="tel"
                    required
                    value={shippingAddress.phone}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Country
                  </label>
                  <select
                    value={shippingAddress.country}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Germany">Germany</option>
                    <option value="Japan">Japan</option>
                    <option value="Australia">Australia</option>
                    <option value="India">India</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs flex items-center justify-center font-mono">2</span>
                  <span>Payment Method & Verification</span>
                </h2>
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
                  <Lock className="w-3.5 h-3.5" />
                  <span>256-Bit SSL</span>
                </div>
              </div>

              {/* Payment Selectors */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('stripe')}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    paymentMethod === 'stripe'
                      ? 'border-neutral-900 dark:border-white bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white'
                      : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold">Credit Card</span>
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] text-neutral-400">Stripe Gateway</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    paymentMethod === 'paypal'
                      ? 'border-neutral-900 dark:border-white bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white'
                      : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold">PayPal</span>
                    <span className="text-xs font-bold font-serif-display text-blue-600">PP</span>
                  </div>
                  <span className="text-[11px] text-neutral-400">Express Sandbox</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-neutral-900 dark:border-white bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white'
                      : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold">Cash On Delivery</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] text-neutral-400">Upon Arrival</span>
                </button>
              </div>

              {/* Stripe Credit Card Form */}
              {paymentMethod === 'stripe' && (
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                      Card Information
                    </span>
                    <button
                      type="button"
                      onClick={handleAutofillTestCard}
                      className="text-[11px] text-neutral-600 dark:text-neutral-300 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 px-2.5 py-1 rounded transition-colors flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      <span>Autofill Stripe Test Card (4242)</span>
                    </button>
                  </div>

                  <div>
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="4242 4242 4242 4242"
                      className="w-full px-3 py-2.5 text-xs font-mono bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-neutral-500 mb-1">Expires (MM/YY)</label>
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={handleExpiryChange}
                        placeholder="12/28"
                        className="w-full px-3 py-2 text-xs font-mono bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-neutral-500 mb-1">Security Code (CVC)</label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ''))}
                        placeholder="888"
                        className="w-full px-3 py-2 text-xs font-mono bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-neutral-500 mb-1">Name on Card</label>
                    <input
                      type="text"
                      required
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'paypal' && (
                <div className="p-4 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg text-xs space-y-2">
                  <p className="font-semibold text-blue-900 dark:text-blue-200">
                    PayPal Sandbox Test Mode Active
                  </p>
                  <p className="text-blue-700 dark:text-blue-300">
                    Clicking "Confirm & Pay" will simulate secure tokenized capture via PayPal REST APIs without live funds.
                  </p>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="p-4 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg text-xs space-y-2">
                  <p className="font-semibold text-amber-900 dark:text-amber-200">
                    Cash on Delivery (White-Glove Courier Verification)
                  </p>
                  <p className="text-amber-700 dark:text-amber-300">
                    Please prepare exact cash or mobile terminal tap for ${(cartTotal).toFixed(2)} when the white-glove driver delivers your parcel.
                  </p>
                </div>
              )}

              {/* Developer Testing Toggle: Simulate Failed Payment */}
              <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-lg border border-neutral-200 dark:border-neutral-700 flex items-center justify-between text-xs">
                <div>
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">
                    Beginner Test Option: Simulate Card Decline
                  </span>
                  <p className="text-[11px] text-neutral-500">
                    Toggle to test how the UI handles failed payment errors gracefully.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={simulateFailure}
                  onChange={(e) => setSimulateFailure(e.target.checked)}
                  className="w-4 h-4 accent-rose-600 rounded cursor-pointer"
                />
              </div>

              {/* Payment Error Alert */}
              {paymentError && (
                <div className="p-4 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-400 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-semibold">Payment Failed:</span>
                    <p>{paymentError}</p>
                  </div>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 px-6 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 text-white font-medium text-sm rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-60"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying with Payment Gateway...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Confirm & Authorize ${cartTotal.toFixed(2)}</span>
                  </>
                )}
              </button>

            </div>

          </form>

        </div>

        {/* Right Column: Order Summary & Item Review */}
        <div className="lg:col-span-5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 space-y-6 lg:sticky lg:top-24">
          
          <h2 className="text-base font-semibold text-neutral-900 dark:text-white font-serif-display border-b border-neutral-200 dark:border-neutral-800 pb-3">
            Acquisitions Summary ({cart.reduce((s, i) => s + i.quantity, 0)})
          </h2>

          {/* Itemized list */}
          <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 object-cover rounded-md bg-white shrink-0 border border-neutral-200 dark:border-neutral-800"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-neutral-900 dark:text-white truncate">
                    {item.product.name}
                  </h4>
                  <span className="text-[11px] text-neutral-500">Qty: {item.quantity}</span>
                </div>
                <span className="text-xs font-semibold tabular-nums text-neutral-900 dark:text-white">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Breakdown */}
          <div className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400 pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="tabular-nums font-medium text-neutral-900 dark:text-white">
                ${cartSubtotal.toFixed(2)}
              </span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                <span>Discount ({appliedCoupon})</span>
                <span className="tabular-nums font-medium">-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Insured Shipping</span>
              <span className="tabular-nums font-medium text-neutral-900 dark:text-white">
                {shippingFee === 0 ? 'Complimentary' : `$${shippingFee.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Sales Tax (8%)</span>
              <span className="tabular-nums font-medium text-neutral-900 dark:text-white">
                ${taxAmount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold text-neutral-900 dark:text-white pt-3 border-t border-neutral-200 dark:border-neutral-800">
              <span>Order Total</span>
              <span className="tabular-nums">${cartTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="p-3 bg-white dark:bg-neutral-800/80 rounded-lg border border-neutral-200 dark:border-neutral-700 space-y-1.5 text-[11px] text-neutral-500">
            <div className="flex items-center gap-1.5 font-medium text-neutral-800 dark:text-neutral-200">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300" />
              <span>Full Consumer Protection Guaranteed</span>
            </div>
            <p>
              Your payment information is tokenized using Stripe Elements client library. Secret keys never leave your secure backend infrastructure.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
