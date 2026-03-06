'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '@/lib/products';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link href={`/product/${product.id}`} className="block">
        {/* Image */}
        <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 mb-3">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <span className="bg-gray-900 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                Nieuw
              </span>
            )}
            {product.isSale && product.originalPrice && (
              <span className="bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              </span>
            )}
          </div>

          {/* Uitverkocht overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
              <span className="text-xs font-semibold text-gray-500 bg-white px-2 py-1 rounded-full shadow-sm">
                Uitverkocht
              </span>
            </div>
          )}

          {/* Add to cart hover knop */}
          {product.inStock && (
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
          <p className="text-xs text-gray-400 mb-0.5">{product.brand}</p>
          <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-600 line-clamp-2 leading-snug">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-gray-500">
              {product.rating} ({product.reviews.toLocaleString('nl-NL')})
            </span>
          </div>

          {/* Prijs */}
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-sm font-semibold text-gray-900">
              €{product.price.toFixed(2).replace('.', ',')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                €{product.originalPrice.toFixed(2).replace('.', ',')}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
