import { collections, getProductsByCollection } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';
import { notFound } from 'next/navigation';
import Image from 'next/image';

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  const collection = collections.find((c) => c.id === params.id);
  if (!collection) return { title: 'Collectie niet gevonden' };

  return {
    title: collection.name,
    description: collection.description,
  };
}

export async function generateStaticParams() {
  return collections.map((collection) => ({
    id: collection.id,
  }));
}

export default function CollectionPage({ params }: PageProps) {
  const collection = collections.find((c) => c.id === params.id);
  if (!collection) notFound();

  const products = getProductsByCollection(params.id);

  return (
    <div>
      {/* Hero Banner */}
      <div className="relative h-80 w-full overflow-hidden bg-gray-100">
        <Image
          src={collection.image}
          alt={collection.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container-main">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{collection.name}</h1>
            <p className="text-white/90 text-lg max-w-2xl">{collection.description}</p>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="container-main py-12">
        {/* Info bar */}
        <div className="mb-10 flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-gray-200">
          <div>
            <p className="text-sm text-gray-500">
              {products.length} product{products.length !== 1 ? 'en' : ''} in deze collectie
            </p>
          </div>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-gray-400">
            <p className="text-lg font-medium">Geen producten in deze collectie</p>
          </div>
        )}
      </div>
    </div>
  );
}
