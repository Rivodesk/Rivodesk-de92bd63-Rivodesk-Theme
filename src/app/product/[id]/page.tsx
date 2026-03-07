'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Star, Heart, Share2, ChevronRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { ShopifyProduct, formatPrice } from '@/lib/shopify';
import { getProductByHandle } from '@/lib/queries';

interface PageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params }: PageProps) {
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const { addToCart } = useCart();

  // Fetch product van Shopify
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // params.id is eigenlijk de product handle
        const shopifyProduct = await getProductByHandle(params.id);
        if (!shopifyProduct) {
          setError('Product niet gevonden');
          return;
        }
        setProduct(shopifyProduct);
        // Eerste variant als standaard
        if (shopifyProduct.variants.edges.length > 0) {
          setSelectedVariant(shopifyProduct.variants.edges[0].node.id);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Er is een fout opgetreden bij het laden van het product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900"></div>
          <p className="mt-4 text-gray-600">Product laden...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container-main py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Product niet gevonden</h1>
            <p className="text-gray-600 mb-8">{error || 'Dit product kon niet worden gevonden.'}</p>
            <Link href="/products" className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800">
              Terug naar producten
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    const variant = product.variants.edges.find((e) => e.node.id === selectedVariant)?.node;
    if (!variant) return;

    addToCart({
      id: variant.id,
      name: product.title,
      price: parseFloat(variant.price.amount),
      image: product.featuredImage?.url || '/placeholder.png',
    });
  };

  const isInStock = selectedVariant
    ? product.variants.edges.find((e) => e.node.id === selectedVariant)?.node.availableForSale ?? false
    : false;

  const selectedVariantData = selectedVariant
    ? product.variants.edges.find((e) => e.node.id === selectedVariant)?.node
    : product.variants.edges[0]?.node;

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
          <span className="text-gray-900 font-medium line-clamp-1">{product.title}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-main py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Product Image */}
          <div className="flex flex-col gap-4">
            {product.featuredImage ? (
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center">
                <Image
                  src={product.featuredImage.url}
                  alt={product.featuredImage.altText || product.title}
                  width={product.featuredImage.width}
                  height={product.featuredImage.height}
                  className="object-cover w-full h-full"
                  priority
                />
                {!isInStock && (
                  <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
                    <span className="text-lg font-semibold text-gray-700">Uitverkocht</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400">Geen afbeelding beschikbaar</span>
              </div>
            )}

            {/* Badges */}
            <div className="flex gap-2 flex-wrap">
              {isInStock ? (
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
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>

              {/* Prijs */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-gray-900">
                    {selectedVariantData && formatPrice(selectedVariantData.price.amount, selectedVariantData.price.currencyCode)}
                  </span>
                </div>
              </div>

              {/* Beschrijving */}
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {product.description}
              </p>
            </div>

            {/* Variant Selection */}
            {product.variants.edges.length > 1 && (
              <div className="mb-8">
                <p className="text-sm font-semibold text-gray-700 mb-3">KEUZE VARIANTEN</p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.edges.map((edge) => (
                    <button
                      key={edge.node.id}
                      onClick={() => setSelectedVariant(edge.node.id)}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                        selectedVariant === edge.node.id
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      } ${!edge.node.availableForSale ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={!edge.node.availableForSale}
                    >
                      {edge.node.title}
                    </button>
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
                  disabled={!isInStock}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white text-lg transition-all ${
                    isInStock
                      ? 'bg-gray-900 hover:bg-gray-800 active:scale-95'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {isInStock ? 'In winkelmand' : 'Niet beschikbaar'}
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
            <div className="text-3xl font-bold text-gray-900 mb-2">📦</div>
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

        {/* Product Info Section */}
        <div className="border-t border-gray-200 pt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Product informatie</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Beschrijving</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Beschikbare varianten</h3>
              <ul className="space-y-2 text-gray-600">
                {product.variants.edges.map((edge) => (
                  <li key={edge.node.id} className="flex justify-between">
                    <span>{edge.node.title}</span>
                    <span className={edge.node.availableForSale ? 'text-green-600' : 'text-red-600'}>
                      {edge.node.availableForSale ? 'Beschikbaar' : 'Uitverkocht'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
