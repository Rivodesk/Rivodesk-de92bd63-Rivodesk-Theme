'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  toasts: Toast[];
  removeToast: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Laad cart uit localStorage bij opstarten
  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) {
      try {
        setCart(JSON.parse(stored));
      } catch {}
    }
  }, []);

  // Sla cart op in localStorage bij elke wijziging
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 3000);
  };

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        addToast(`${item.name} - hoeveelheid verhoogd naar ${existing.quantity + 1}`, 'success');
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      addToast(`${item.name} toegevoegd aan winkelmand`, 'success');
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    const item = cart.find((i) => i.id === id);
    if (item) {
      addToast(`${item.name} verwijderd uit winkelmand`, 'info');
    }
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setCart([]);
    addToast('Winkelmand geleegd', 'info');
  };

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice, toasts, removeToast }}
    >
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-lg text-sm font-medium text-white animate-in slide-in-from-bottom-2 ${
              toast.type === 'success'
                ? 'bg-green-500'
                : toast.type === 'error'
                  ? 'bg-red-500'
                  : 'bg-blue-500'
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
