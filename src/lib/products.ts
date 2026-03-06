export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  category: string;
  brand: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  tags: string[];
  isNew?: boolean;
  isSale?: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Sony WH-1000XM5',
    price: 279.99,
    originalPrice: 349.99,
    description:
      'Industrie-leidende noise cancelling met twee processors en acht microfoons. 30 uur batterijduur, multipoint verbinding en premium geluidskwaliteit.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    category: 'Koptelefoons',
    brand: 'Sony',
    rating: 4.8,
    reviews: 2341,
    inStock: true,
    tags: ['noise-cancelling', 'wireless', 'over-ear'],
    isSale: true,
  },
  {
    id: '2',
    name: 'Apple AirPods Pro (2e gen)',
    price: 249.00,
    description:
      'Met actieve ruisonderdrukking, Adaptive Audio en een verbeterd geluid. Perfecte pasvorm met vier maten oordopjes.',
    image: 'https://images.unsplash.com/photo-1606741965326-cb990ae01bb2?w=800&q=80',
    category: 'Koptelefoons',
    brand: 'Apple',
    rating: 4.7,
    reviews: 5892,
    inStock: true,
    tags: ['noise-cancelling', 'wireless', 'in-ear', 'apple'],
    isNew: true,
  },
  {
    id: '3',
    name: 'Bose QuietComfort 45',
    price: 229.00,
    originalPrice: 279.00,
    description:
      'Lichtgewicht over-ear koptelefoon met world-class noise cancelling. Comfortabel voor de hele dag dragen met 24 uur batterij.',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80',
    category: 'Koptelefoons',
    brand: 'Bose',
    rating: 4.6,
    reviews: 1876,
    inStock: true,
    tags: ['noise-cancelling', 'wireless', 'over-ear'],
    isSale: true,
  },
  {
    id: '4',
    name: 'Sennheiser HD 660S2',
    price: 399.00,
    description:
      'Open-back audiofiele hoofdtelefoon voor thuis. Uitzonderlijke geluidskwaliteit met een breed soundstage en nauwkeurige reproductie.',
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80',
    category: 'Koptelefoons',
    brand: 'Sennheiser',
    rating: 4.9,
    reviews: 643,
    inStock: true,
    tags: ['open-back', 'wired', 'over-ear', 'audiofiel'],
  },
  {
    id: '5',
    name: 'JBL Tune 770NC',
    price: 99.99,
    originalPrice: 129.99,
    description:
      'Betaalbare draadloze koptelefoon met actieve ruisonderdrukking. 70 uur batterijduur en JBL Pure Bass geluid.',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80',
    category: 'Koptelefoons',
    brand: 'JBL',
    rating: 4.3,
    reviews: 987,
    inStock: true,
    tags: ['noise-cancelling', 'wireless', 'over-ear', 'budget'],
    isSale: true,
  },
  {
    id: '6',
    name: 'Audio-Technica ATH-M50x',
    price: 149.00,
    description:
      'Professionele studio-monitorhoofdtelefoon. Industrie-standaard voor opnamestudio\'s en producers. Uitzonderlijke helderheid en diep, nauwkeurig bas.',
    image: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800&q=80',
    category: 'Koptelefoons',
    brand: 'Audio-Technica',
    rating: 4.7,
    reviews: 3201,
    inStock: false,
    tags: ['wired', 'over-ear', 'studio', 'professioneel'],
  },
  {
    id: '7',
    name: 'Samsung Galaxy Buds2 Pro',
    price: 189.00,
    originalPrice: 229.00,
    description:
      'Hi-Fi 24-bit audio met intelligente actieve ruisonderdrukking. Comfortabel ergonomisch ontwerp voor de hele dag dragen.',
    image: 'https://images.unsplash.com/photo-1598331668826-20cecc596b86?w=800&q=80',
    category: 'Koptelefoons',
    brand: 'Samsung',
    rating: 4.4,
    reviews: 1543,
    inStock: true,
    tags: ['noise-cancelling', 'wireless', 'in-ear', 'samsung'],
    isSale: true,
  },
  {
    id: '8',
    name: 'Beyerdynamic DT 900 Pro X',
    price: 299.00,
    description:
      'Open-back studio referentie koptelefoon. Ontworpen voor mixing en mastering met STELLAR.45 driver voor ongeÃ«venaard detail.',
    image: 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&q=80',
    category: 'Koptelefoons',
    brand: 'Beyerdynamic',
    rating: 4.8,
    reviews: 412,
    inStock: true,
    tags: ['open-back', 'wired', 'over-ear', 'studio', 'professioneel'],
    isNew: true,
  },
  {
    id: '9',
    name: 'Test Koptelefoon',
    price: 59.99,
    description: 'Deze koptelefoon is perfect voor testdoeleinden.',
    image: 'https://images.unsplash.com/photo-1593642532400-2682810df593?w=800&q=80',
    category: 'Koptelefoons',
    brand: 'TestBrand',
    rating: 4.0,
    reviews: 10,
    inStock: true,
    tags: ['test'],
    isNew: true,
  },
];

export const collections = [
  {
    id: 'koptelefoons',
    name: 'Koptelefoons',
    description: 'De beste koptelefoons voor elke situatie â van noise-cancelling tot audiofiele studio-sets.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    productIds: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
  },
];

export const getProductsByCollection = (collectionId: string): Product[] => {
  const collection = collections.find((c) => c.id === collectionId);
  if (!collection) return [];
  return products.filter((p) => collection.productIds.includes(p.id));
};

export const getFeaturedProduct = () => products[0];
