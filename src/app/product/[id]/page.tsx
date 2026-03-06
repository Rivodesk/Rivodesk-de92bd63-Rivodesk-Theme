'use client';

import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/lib/products';
import { ShoppingCart, Star, Heart, Share2, ChevronRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { ProductCard } from '@/components/ProductCard';

interface PageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params }: PageProps) {
  const product = products.find((p) => p.id === params.id);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  // Aanbevolen producten (willekeurige andere producten)
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const discountPercentage = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="container-main py-4 border-b border-gray-200">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <Link href="/products" className="text-gray-600 hover:text-gray-900">
            Producten
          </Link>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-gray-900 font-medium line-clamp-1">{product.name}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-main py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Product Image */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
                  <span className="text-lg font-semibold text-gray-700">Uitverkocht</span>
                </div>
              )}
            </div>

            {/* Badges */}
            <div className="flex gap-2 flex-wrap">
              {product.isNew && (
                <span className="bg-gray-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  ✨ Nieuw
                </span>
              )}
              {product.isSale && product.originalPrice && (
                <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  🔥 -{discountPercentage}% korting
                </span>
              )}
              {product.inStock ? (
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                  ✓ Op voorraad
                </span>
              ) : (
                <span className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">
                  Niet op voorraad
                </span>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between">
            {/* Header */}
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-2">{product.brand}</p>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.round(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} van 5 • {product.reviews.toLocaleString('nl-NL')} reviews
                </span>
              </div>

              {/* Prijs */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-gray-900">
                    €{product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-400 line-through">
                      €{product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                {product.originalPrice && (
                  <p className="text-sm text-green-600 font-medium mt-2">
                    U bespaart €{(product.originalPrice - product.price).toFixed(2)}
                  </p>
                )}
              </div>

              {/* Beschrijving */}
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {product.description}
              </p>
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="mb-8">
                <p className="text-xs font-semibold text-gray-500 mb-3">FEATURES</p>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Actions */}
            <div className="space-y-4">
              {/* Quantity */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Hoeveelheid:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                    className="w-16 text-center font-medium text-gray-900 border-l border-r border-gray-300 focus:outline-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white text-lg transition-all ${
                    product.inStock
                      ? 'bg-gray-900 hover:bg-gray-800 active:scale-95'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {product.inStock ? 'In winkelmand' : 'Niet beschikbaar'}
                </button>

                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`px-6 py-3 rounded-xl font-semibold border-2 transition-all ${
                    isWishlisted
                      ? 'border-red-500 bg-red-50 text-red-600'
                      : 'border-gray-300 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>

                <button className="px-6 py-3 rounded-xl font-semibold border-2 border-gray-300 text-gray-600 hover:border-gray-400 transition-all">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>

              {/* Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <span className="font-semibold">Gratis verzending</span> op alle bestellingen boven €50
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 py-12 border-y border-gray-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">🚚</div>
            <h3 className="font-semibold text-gray-900 mb-1">Snelle verzending</h3>
            <p className="text-sm text-gray-600">Verzonden binnen 1-2 werkdagen</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">↩️</div>
            <h3 className="font-semibold text-gray-900 mb-1">Makkelijk retour</h3>
            <p className="text-sm text-gray-600">30 dagen kosteloos retourneren</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">🛡️</div>
            <h3 className="font-semibold text-gray-900 mb-1">Garantie</h3>
            <p className="text-sm text-gray-600">2 jaar fabrieksgarantie</p>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Andere producten in {product.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
