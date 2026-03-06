import Link from "next/link";
import { getFeaturedProduct } from "@/lib/products";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import NewsletterSection from "@/components/NewsletterSection";

export default function Home() {
  const featured = getFeaturedProduct();

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white py-32 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=600&fit=crop")',
          }}
        />

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Experience Premium Sound
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Discover our curated collection of high-quality audio equipment. From professional headphones to immersive speakers, elevate your listening experience.
            </p>
            <Link
              href="/products"
              className="inline-block bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Product */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Featured Product
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={featured.image}
                alt={featured.name}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Content */}
            <div>
              <p className="text-gray-600 text-sm font-semibold mb-2">
                {featured.category}
              </p>
              <h3 className="text-4xl font-bold text-gray-900 mb-4">
                {featured.name}
              </h3>
              <p className="text-gray-600 text-lg mb-6">
                {featured.description}
              </p>
              <div className="flex items-center gap-6 mb-8">
                <span className="text-4xl font-bold text-gray-900">
                  Ã¢Â¬{featured.price.toFixed(2)}
                </span>
              </div>
              <Link
                href={`/product/${featured.id}`}
                className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
              >
                View Product
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Have Questions?
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Check our FAQ or contact us for more information.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/faq"
              className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition"
            >
              Read FAQ
            </Link>
            <Link
              href="/contact"
              className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Carousel */}
      <ReviewsCarousel />

      {/* Newsletter Section */}
      <NewsletterSection />
    </>
  );
}
