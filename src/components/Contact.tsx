import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

export const Contact: React.FC = () => {
  const { showToast } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Acquisition Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      showToast('Thank you! Our salon concierge will respond within 4 business hours.');
      setName('');
      setEmail('');
      setMessage('');
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <div className="text-center space-y-3">
        <span className="text-xs uppercase tracking-widest font-semibold text-neutral-500">
          Concierge & Client Care
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif-display text-neutral-900 dark:text-white">
          Private Client Salon
        </h1>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
          For bespoke horology commissions, bespoke interior appointments, or order assistance, our salon team is at your disposal.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Contact Info */}
        <div className="md:col-span-5 space-y-6 p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl text-xs">
          <h2 className="text-base font-bold font-serif-display text-neutral-900 dark:text-white">
            Salon Coordinates
          </h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-neutral-800 dark:text-neutral-200 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-neutral-900 dark:text-white font-medium">San Francisco Studio</strong>
                <span className="text-neutral-500">742 Evergreen Terrace, Suite 500<br />San Francisco, CA 94107</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-neutral-800 dark:text-neutral-200 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-neutral-900 dark:text-white font-medium">Direct Inquiries</strong>
                <span className="text-neutral-500">concierge@auragoods.com</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-neutral-800 dark:text-neutral-200 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-neutral-900 dark:text-white font-medium">Telephone Salon</strong>
                <span className="text-neutral-500">+1 (800) 492-AURA (Mon–Fri, 9am–6pm PST)</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2 text-[11px] text-neutral-400">
            <p>Average response time: <strong>&lt; 4 hours</strong></p>
            <p>White-glove courier returns accepted without restocking fees.</p>
          </div>
        </div>

        {/* Message Form */}
        <div className="md:col-span-7 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tejaswini Ravipati"
                className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Nature of Inquiry
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white"
              >
                <option value="Acquisition Inquiry">Acquisition & Stock Inquiry</option>
                <option value="Bespoke Commission">Bespoke Horology Commission</option>
                <option value="Order Tracking">Existing Order Support</option>
                <option value="Press & Guilds">Artisanal Guild Application</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Your Message
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Detail your request or inquiry..."
                className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Transmitting...' : 'Dispatch Inquiry'}</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
