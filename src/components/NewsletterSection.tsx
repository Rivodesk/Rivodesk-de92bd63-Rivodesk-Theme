'use client';

import { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Stay Updated
        </h2>
        <p className="text-gray-300 text-lg mb-8">
          Ontvang exclusieve aanbiedingen, nieuwe producten en tips rechtstreeks in je inbox.
        </p>

        <form onSubmit={handleSubmit} className="flex gap-3 flex-col sm:flex-row">
          <input
            type="email"
            placeholder="Vul je e-mailadres in..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>

        {subscribed && (
          <div className="mt-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-100">
            ✓ Bedankt! Controleer je inbox voor bevestiging.
          </div>
        )}

        <p className="text-gray-400 text-sm mt-6">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
