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
    name: 'UltraSound Pro X1',
    price: 349.99,
    originalPrice: 449.99,
    description:
      'Premium noise-cancelling koptelefoon met AI-gestuurde geluidsprofiel aanpassingen. 40 uur batterijduur, titanium frame en Bluetooth 5.3.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    category: 'Koptelefoons',
    brand: 'UltraSound',
    rating: 4.9,
    reviews: 3456,
    inStock: true,
    tags: ['noise-cancelling', 'wireless', 'over-ear', 'premium'],
    isSale: true,
  },
  {
    id: '2',
    name: 'VoiceMax Studio Elite',
    price: 199.99,
    description:
      'Professionele studio-koptelefoon met 50mm drivers. Ideaal voor audio engineers en producers. Licht, compact en duurzaam ontwerp.',
    image: 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&q=80',
    category: 'Koptelefoons',
    brand: 'VoiceMax',
    rating: 4.7,
    reviews: 2145,
    inStock: true,
    tags: ['studio', 'wired', 'over-ear', 'professioneel'],
    isNew: true,
  },
  {
    id: '3',
    name: 'Comfort Fit Mini Buds',
    price: 129.99,
    originalPrice: 179.99,
    description:
      'Ergonomische in-ear koptelefoon met 6 uur afspeelduur. Perfecte passering met aanpassbare oordopjes en touch-bediening.',
    image: 'https://images.unsplash.com/photo-1598331668826-20cecc596b86?w=800&q=80',
    category: 'Draadloze Oordopjes',
    brand: 'ComfortFit',
    rating: 4.5,
    reviews: 5123,
    inStock: true,
    tags: ['wireless', 'in-ear', 'portable', 'touch-control'],
    isSale: true,
  },
  {
    id: '4',
    name: 'Retro Vinyl Sound Classic',
    price: 89.99,
    description:
      'Vintage-geïnspireerde kabelgebonden koptelefoon met warm, analoog geluid. Geschikte voor vinyl collectors en klassieke muziek enthusiasten.',
    image: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800&q=80',
    category: 'Bekabelde Koptelefoons',
    brand: 'RetroWave',
    rating: 4.3,
    reviews: 876,
    inStock: true,
    tags: ['wired', 'over-ear', 'retro', 'budget'],
  },
  {
    id: '5',
    name: 'SportFlex Pro Runner',
    price: 159.99,
    originalPrice: 199.99,
    description:
      'Waterbestendige wireless oordopjes ontworpen voor sporters. IPX6-rating, secure-fit design en 8 uur batterijduur met snelladen.',
    image: 'https://images.unsplash.com/photo-1606741965326-cb990ae01bb2?w=800&q=80',
    category: 'Draadloze Oordopjes',
    brand: 'SportFlex',
    rating: 4.6,
    reviews: 4201,
    inStock: true,
    tags: ['waterproof', 'wireless', 'in-ear', 'sports'],
    isSale: true,
  },
  {
    id: '6',
    name: 'SilentZone Sleeper Max',
    price: 119.99,
    description:
      'Speciale slaapkoptelefoon met ultradunne drivers. Perfect voor slaap, mediatie en ontspanning. Zachte oordopjes en draadloos design.',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80',
    category: 'Draadloze Oordopjes',
    brand: 'SilentZone',
    rating: 4.4,
    reviews: 1234,
    inStock: false,
    tags: ['sleep', 'wireless', 'in-ear', 'comfort'],
  },
  {
    id: '7',
    name: 'Gaming Beast GX500',
    price: 279.99,
    originalPrice: 349.99,
    description:
      'E-sports kwaliteit gaming koptelefoon met 7.1 surround sound en laag latency. RGB verlichting, memory foam ear cups en draadloze connectie.',
    image: 'https://images.unsplash.com/photo-1483389127117-b6a2102724ae?w=800&q=80',
    category: 'Gaming',
    brand: 'BeastSound',
    rating: 4.8,
    reviews: 6789,
    inStock: true,
    tags: ['gaming', 'wireless', 'over-ear', 'surround-sound'],
    isNew: true,
  },
  {
    id: '8',
    name: 'Classical Orchestra HD',
    price: 439.99,
    description:
      'Audiofiele open-back koptelefoon voor klassieke muziekliefhebbers. Handgemaakte componenten, uitvoerige soundstage en ongeëvenaarde klarheid.',
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80',
    category: 'Premium Koptelefoons',
    brand: 'ClassicalAudio',
    rating: 4.9,
    reviews: 543,
    inStock: true,
    tags: ['open-back', 'wired', 'over-ear', 'audiophile', 'premium'],
  },
  {
    id: '9',
    name: 'Urban Street Beats',
    price: 69.99,
    originalPrice: 99.99,
    description:
      'Hip-hop georiënteerde wireless koptelefoon met krachtig bass. Stijlvol design, 12 uur batterij en foldbaar voor draagbaarheid.',
    image: 'https://images.unsplash.com/photo-1593642532400-2682810df593?w=800&q=80',
    category: 'Koptelefoons',
    brand: 'UrbanBeats',
    rating: 4.2,
    reviews: 2987,
    inStock: true,
    tags: ['wireless', 'over-ear', 'bass-boosted', 'budget', 'portable'],
    isSale: true,
  },
];

export const collections = [
  {
    id: 'koptelefoons',
    name: 'Alle Koptelefoons',
    description: 'De beste koptelefoons voor elke situatie – van gaming tot studio-gebruik.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    productIds: ['1', '2', '4', '9'],
  },
  {
    id: 'draadloze-oordopjes',
    name: 'Draadloze Oordopjes',
    description: 'Compacte en draagbare oordopjes met de nieuwste Bluetooth-technologie.',
    image: 'https://images.unsplash.com/photo-1598331668826-20cecc596b86?w=800&q=80',
    productIds: ['3', '5', '6'],
  },
  {
    id: 'bekabelde-koptelefoons',
    name: 'Bekabelde Koptelefoons',
    description: 'Klassieke kabelgebonden koptelefoons voor zuiver geluid zonder batterij.',
    image: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800&q=80',
    productIds: ['4', '8'],
  },
  {
    id: 'gaming',
    name: 'Gaming Koptelefoons',
    description: 'Speciaal ontworpen voor gamers met surround sound en lage latency.',
    image: 'https://images.unsplash.com/photo-1483389127117-b6a2102724ae?w=800&q=80',
    productIds: ['7'],
  },
  {
    id: 'premium',
    name: 'Premium Audio',
    description: 'High-end audiophile koptelefoons voor de meest kritische luisteraars.',
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80',
    productIds: ['1', '2', '8'],
  },
  {
    id: 'budget',
    name: 'Budget-vriendelijk',
    description: 'Kwalitatief goede koptelefoons tegen een voordelig prijs.',
    image: 'https://images.unsplash.com/photo-1593642532400-2682810df593?w=800&q=80',
    productIds: ['4', '9', '6'],
  },
];

export const getProductsByCollection = (collectionId: string): Product[] => {
  const collection = collections.find((c) => c.id === collectionId);
  if (!collection) return [];
  return products.filter((p) => collection.productIds.includes(p.id));
};

export const getFeaturedProduct = () => products[0];
