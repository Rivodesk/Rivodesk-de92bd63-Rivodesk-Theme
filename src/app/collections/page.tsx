import Link from 'next/link';
import Image from 'next/image';
import { collections } from '@/lib/products';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Collecties',
  description: 'Ontdek onze zorgvuldig samengestelde collecties.',
};

export default function CollectionsPage() {
  return (
    <div className="container-main py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Collecties</h1>
        <p className="text-lg text-gray-500 max-w-2xl">
          Ontdek onze zorgvuldig samengestelde collecties met de beste producten per categorie.
        </p>
      </div>

      {/* Grid */}
      {collections.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.id}`}
              className="group relative rounded-2xl overflow-hidden bg-gray-100 aspect-[4/3] block shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div>
                  <h2 className="text-white text-2xl font-bold mb-2">{collection.name}</h2>
                  <p className="text-white/80 text-sm mb-4 line-clamp-2">{collection.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      {collection.productIds.length} product{collection.productIds.length !== 1 ? 'en' : ''}
                    </span>
                    <span className="flex items-center gap-1 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      Bekijken <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 text-gray-400">
          <p className="text-lg font-medium">Geen collecties gevonden</p>
        </div>
      )}

      {/* Divider */}
      <div className="my-16 border-b border-gray-200" />

      {/* Featured Section */}
      <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 md:p-12 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Vind wat je zoekt</h2>
        <p className="text-gray-600 max-w-2xl mb-6">
          Of ontdek al onze producten in een modern overzicht met geavanceerde filters en sortering.
        </p>
        <Link
          href="/products"
          className="inline-block px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          Alle producten →
        </Link>
      </div>
    </div>
  );
}
