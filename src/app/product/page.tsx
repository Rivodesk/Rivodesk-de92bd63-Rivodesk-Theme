import Link from "next/link";
import { getFeaturedProduct } from "@/lib/products";

export default function ProductPage() {
  const product = getFeaturedProduct();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-gray-600 mb-8">
        <Link href="/" className="hover:text-gray-900">
          Home
        </Link>
        <span>/</span>
        <span className="text-gray-900">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={product.featuredImage?.url || ''}
            alt={product.featuredImage?.altText || product.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div>
          <p className="text-gray-600 text-sm font-semibold mb-2">
            Audio Equipment
          </p>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {product.title}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl font-bold text-gray-900">
              €{product.priceRange.minVariantPrice.amount}
            </span>
            <span className={`font-semibold ${product.variants.edges[0]?.node.availableForSale ? 'text-green-600' : 'text-red-600'}`}>
              {product.variants.edges[0]?.node.availableForSale ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            {product.description}
          </p>

          {/* Specs */}
          <div className="border-t border-gray-200 pt-8 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Features
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-green-600">✓</span>
                <span>Premium sound quality with deep bass</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600">✓</span>
                <span>Active Noise Cancellation (ANC)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600">✓</span>
                <span>30-hour battery life</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600">✓</span>
                <span>Comfortable over-ear design</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600">✓</span>
                <span>Bluetooth 5.0 connectivity</span>
              </li>
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4 flex-wrap">
            <button className="flex-1 bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
              Add to Cart
            </button>
            <button className="flex-1 border border-gray-300 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition">
              Add to Wishlist
            </button>
          </div>

          {/* Additional Info */}
          <div className="border-t border-gray-200 mt-8 pt-8 text-gray-600 text-sm">
            <p className="mb-2">
              <span className="font-semibold">SKU:</span> {product.handle.toUpperCase()}
            </p>
            <p>
              <span className="font-semibold">Product ID:</span> {product.id}
            </p>
          </div>
        </div>
      </div>

      {/* Related Info */}
      <section className="mt-16 border-t border-gray-200 pt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Product Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Shipping & Returns
            </h3>
            <p className="text-gray-600">
              We offer fast and free shipping on all orders. Returns are easy
              and hassle-free within 30 days of purchase.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Warranty
            </h3>
            <p className="text-gray-600">
              This product comes with a 2-year manufacturer warranty covering
              defects in materials and workmanship.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
