'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';

export const metadata = {
  title: 'Winkelmand',
  description: 'Bekijk je winkelmand',
};

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container-main py-12">
        <div className="text-center">
          <ShoppingCart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Winkelmand is leeg</h1>
          <p className="text-gray-500 mb-8">Je hebt nog niets aan je winkelmand toegevoegd.</p>
          <Link
            href="/products"
            className="inline-block px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            Naar alle producten
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-main py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Winkelmand</h1>
        <p className="text-gray-500">{totalItems} item{totalItems !== 1 ? 's' : ''} in je winkelmand</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                {/* Product Image */}
                <Link href={`/product/${item.id}`} className="flex-shrink-0">
                  <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/product/${item.id}`}
                    className="text-sm font-semibold text-gray-900 hover:text-gray-600 line-clamp-2 block mb-1"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm font-semibold text-gray-900">
                    €{item.price.toFixed(2).replace('.', ',')}
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4 text-gray-600" />
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Math.max(1, Number(e.target.value)))}
                      className="w-12 text-center border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Price & Remove */}
                <div className="flex flex-col items-end justify-between">
                  <p className="text-sm font-bold text-gray-900">
                    €{(item.price * item.quantity).toFixed(2).replace('.', ',')}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Continue Shopping */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link
              href="/products"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              ← Terug naar producten
            </Link>
          </div>
        </div>

        {/* Sidebar - Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 sticky top-4">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Samenvatting</h2>

            {/* Subtotal */}
            <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotaal</span>
                <span className="font-semibold text-gray-900">
                  €{totalPrice.toFixed(2).replace('.', ',')}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Verzending</span>
                <span className="font-semibold text-gray-900">Gratis</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Belasting</span>
                <span className="font-semibold text-gray-900">Berekend bij afrekenen</span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between mb-6">
              <span className="font-bold text-gray-900">Totaal</span>
              <span className="font-bold text-lg text-gray-900">
                €{totalPrice.toFixed(2).replace('.', ',')}
              </span>
            </div>

            {/* Checkout Button */}
            <button className="w-full bg-gray-900 text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition-colors mb-3">
              Afrekenen
            </button>

            {/* Clear Cart */}
            <button
              onClick={clearCart}
              className="w-full text-gray-600 font-medium py-2 rounded-lg hover:bg-white transition-colors border border-gray-200"
            >
              Winkelmand legen
            </button>

            {/* Info */}
            <div className="mt-6 pt-6 border-t border-gray-200 text-xs text-gray-500 space-y-2">
              <p>✓ Gratis verzending voor alle bestellingen</p>
              <p>✓ 30 dagen retourrecht</p>
              <p>✓ Veilig afrekenen</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
