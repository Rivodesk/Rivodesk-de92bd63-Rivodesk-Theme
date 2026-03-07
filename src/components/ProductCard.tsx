'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { ShopifyProduct, formatPrice } from '@/lib/shopify';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: ShopifyProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const currency = product.priceRange.minVariantPrice.currencyCode;
  const isInStock = product.variants.edges.some((edge) => edge.node.availableForSale);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.featuredImage) {
      addToCart({
        id: product.id,
        name: product.title,
        price: price,
        image: product.featuredImage.url,
      });
    }
  };

  const imageUrl = product.featuredImage?.url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80';
  const imageAlt = product.featuredImage?.altText || product.title;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link href={`/product/${product.handle}`} className="block">
        {/* Image */}
        <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 mb-3">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Out of stock overlay */}
          {!isInStock && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <span className="text-sm font-semibold text-white bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                Out of stock
              </span>
            </div>
          )}

          {/* Add to cart hover knop */}
          {isInStock && (
            <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white text-sm font-medium py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <ShoppingCart className="h-4 w-4" />
                In winkelmand
              </button>
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-600 line-clamp-2 leading-snug">
            {product.title}
          </h3>

          {/* Prijs */}
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-sm font-semibold text-gray-900">
              {formatPrice(product.priceRange.minVariantPrice.amount, currency, 'nl-NL')}
            </span>
            {product.priceRange.maxVariantPrice.amount !== product.priceRange.minVariantPrice.amount && (
              <span className="text-xs text-gray-400">
                tot {formatPrice(product.priceRange.maxVariantPrice.amount, currency, 'nl-NL')}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
