import Link from 'next/link';
import Image from 'next/image';
import { collections } from '@/lib/products';

export const metadata = {
  title: 'Collecties',
};

export default function CollectionsPage() {
  return (
    <div className="container-main py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Collecties</h1>
      <p className="text-gray-500 mb-10">Ontdek onze zorgvuldig samengestelde collecties.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            href={`/collections/${collection.id}`}
            className="group relative rounded-2xl overflow-hidden bg-gray-100 aspect-[4/3] block"
          >
            <Image
              src={collection.image}
              alt={collection.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h2 className="text-white text-xl font-bold">{collection.name}</h2>
              <p className="text-white/80 text-sm mt-1 line-clamp-2">{collection.description}</p>
              <span className="inline-block mt-3 text-xs font-semibold text-white bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                {collection.productIds.length} producten →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
