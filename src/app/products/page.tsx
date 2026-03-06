'use client';

import React, { useState, useMemo } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/lib/products';
import { ChevronDown } from 'lucide-react';

type SortOption = 'newest' | 'price-low' | 'price-high' | 'rating' | 'popularity';

export default function ProductsPage() {
  const [sort, setSort] = useState<SortOption>('newest');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Extract unique values for filters
  const brands = [...new Set(products.map((p) => p.brand))].sort();
  const categories = [...new Set(products.map((p) => p.category))].sort();
  const maxPrice = Math.max(...products.map((p) => p.price));

  // Filter en sorteer producten
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesBrand = !selectedBrand || product.brand === selectedBrand;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesStock = !inStockOnly || product.inStock;

      return matchesCategory && matchesBrand && matchesPrice && matchesStock;
    });

    // Sorteer
    const sorted = [...filtered].sort((a, b) => {
      switch (sort) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'popularity':
          return b.reviews - a.reviews;
        case 'newest':
        default:
          return 0;
      }
    });

    return sorted;
  }, [sort, selectedCategory, selectedBrand, priceRange, inStockOnly]);

  const resetFilters = () => {
    setSelectedCategory('');
    setSelectedBrand('');
    setPriceRange([0, 500]);
    setInStockOnly(false);
    setSort('newest');
  };

  const hasActiveFilters =
    selectedCategory || selectedBrand || inStockOnly || priceRange[0] > 0 || priceRange[1] < maxPrice;

  return (
    <div className="container-main py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Alle producten</h1>
        <p className="text-gray-500">Bekijk ons volledige assortiment ({filteredAndSortedProducts.length} producten)</p>
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

            {/* Kategorie */}
            <div className="mb-6">
              <h4 className="font-semibold text-sm text-gray-900 mb-3">Categorie</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="category"
                    value=""
                    checked={!selectedCategory}
                    onChange={() => setSelectedCategory('')}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900">Alle categorieën</span>
                </label>
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600"
                    />
                    <span className="text-sm text-gray-600 group-hover:text-gray-900">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Merk */}
            <div className="mb-6">
              <h4 className="font-semibold text-sm text-gray-900 mb-3">Merk</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="brand"
                    value=""
                    checked={!selectedBrand}
                    onChange={() => setSelectedBrand('')}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900">Alle merken</span>
                </label>
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="brand"
                      value={brand}
                      checked={selectedBrand === brand}
                      onChange={() => setSelectedBrand(brand)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600"
                    />
                    <span className="text-sm text-gray-600 group-hover:text-gray-900">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Prijs */}
            <div className="mb-6">
              <h4 className="font-semibold text-sm text-gray-900 mb-3">Prijs</h4>
              <div className="space-y-3">
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
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

            {/* Voorraad */}
            <div className="mb-6">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900">Alleen op voorraad</span>
              </label>
            </div>
          </div>
        </div>

        {/* Producten */}
        <div className="lg:col-span-3">
          {/* Top bar - Sortering */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
            <div className="text-sm text-gray-500">
              {filteredAndSortedProducts.length} producten
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
                <option value="rating">Beste beoordeling</option>
                <option value="popularity">Populairste</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Product Grid */}
          {filteredAndSortedProducts.length > 0 ? (
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
