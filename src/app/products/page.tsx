'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { ShopifyProduct, formatPrice } from '@/lib/shopify';
import { getProducts } from '@/lib/queries';
import { ChevronDown } from 'lucide-react';

type SortOption = 'newest' | 'price-low' | 'price-high';

export default function ProductsPage() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>('newest');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  // Laad producten
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const fetchedProducts = await getProducts(50);
        setProducts(fetchedProducts);
        
        // Bereken max prijs
        if (fetchedProducts.length > 0) {
          const maxPrice = Math.max(
            ...fetchedProducts.map((p) => parseFloat(p.priceRange.maxVariantPrice.amount))
          );
          setPriceRange([0, Math.ceil(maxPrice)]);
        }
      } catch (err) {
        console.error('Fout bij laden producten:', err);
        setError('Kon producten niet laden. Controleer uw Shopify-instellingen.');
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // Filter en sorteer producten
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const price = parseFloat(product.priceRange.minVariantPrice.amount);
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
      return matchesPrice;
    });

    // Sorteer
    const sorted = [...filtered].sort((a, b) => {
      const priceA = parseFloat(a.priceRange.minVariantPrice.amount);
      const priceB = parseFloat(b.priceRange.minVariantPrice.amount);

      switch (sort) {
        case 'price-low':
          return priceA - priceB;
        case 'price-high':
          return priceB - priceA;
        case 'newest':
        default:
          return 0;
      }
    });

    return sorted;
  }, [sort, priceRange, products]);

  const resetFilters = () => {
    if (products.length > 0) {
      const maxPrice = Math.max(
        ...products.map((p) => parseFloat(p.priceRange.maxVariantPrice.amount))
      );
      setPriceRange([0, Math.ceil(maxPrice)]);
    }
    setSort('newest');
  };

  const hasActiveFilters = sort !== 'newest' || priceRange[0] > 0;

  if (error) {
    return (
      <div className="container-main py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-red-900 mb-2">Fout bij laden</h2>
          <p className="text-red-700">{error}</p>
          <div className="mt-6 space-y-2 text-sm text-red-600">
            <p>• Zorg dat NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN is ingesteld</p>
            <p>• Zorg dat NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN is ingesteld</p>
            <p>• Controleer of uw Shopify store producten bevat</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-main py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Alle producten</h1>
        <p className="text-gray-500">
          {loading
            ? 'Producten laden...'
            : `Bekijk ons volledige assortiment (${filteredAndSortedProducts.length} producten)`}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar - Filters */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 border border-gray-200 sticky top-4 max-h-[calc(100vh-100px)] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900">Filters</h3>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs font-medium text-blue-600 hover:text-blue-700"
                >
                  Wissen
                </button>
              )}
            </div>

            {/* Prijs */}
            <div className="mb-6">
              <h4 className="font-semibold text-sm text-gray-900 mb-3">Prijs</h4>
              <div className="space-y-3">
                <input
                  type="range"
                  min="0"
                  max={priceRange[1]}
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  type="range"
                  min="0"
                  max={priceRange[1]}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex gap-2 text-sm">
                  <input
                    type="number"
                    value={Math.round(priceRange[0])}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded text-gray-900"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    value={Math.round(priceRange[1])}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded text-gray-900"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Producten */}
        <div className="lg:col-span-3">
          {/* Top bar - Sortering */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
            <div className="text-sm text-gray-500">
              {loading ? 'Laden...' : `${filteredAndSortedProducts.length} producten`}
            </div>

            <div className="relative inline-block">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-lg text-sm font-medium text-gray-900 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="newest">Nieuwste eerst</option>
                <option value="price-low">Laagste prijs</option>
                <option value="price-high">Hoogste prijs</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square bg-gray-200 rounded-xl mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : filteredAndSortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 text-gray-400">
              <p className="text-lg font-medium">Geen producten gevonden</p>
              <p className="text-sm mt-2">Probeer andere filters of sortering</p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Filters verwijderen
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
