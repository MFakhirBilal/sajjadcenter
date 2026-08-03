export const sampleProducts = Array.from({ length: 40 }).map((_, index) => {
  const i = index + 1;
  const categories = ['Women', 'Men', 'Kids', 'Unstitched', 'Ready to Wear', 'Accessories'];
  const cat = categories[index % categories.length];
  
  const femaleImages = [
    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800',
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800',
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800'
  ];
  const maleImages = [
    'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=800',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800'
  ];
  const kidsImages = [
    'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800',
    'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=800'
  ];

  const imgSet = (cat === 'Women' || cat === 'Unstitched' || cat === 'Ready to Wear') ? femaleImages : cat === 'Men' ? maleImages : kidsImages;
  const primaryImg = imgSet[i % imgSet.length];
  const secImg = imgSet[(i + 1) % imgSet.length];

  const basePrice = 2800 + (i * 150) % 7500;
  const isOnSale = i % 3 === 0;

  return {
    _id: `prod-${i}`,
    name: `Sajjad Royal ${cat} Collection Vol. ${i}`,
    slug: `sajjad-royal-${cat.toLowerCase().replace(/ /g, '-')}-collection-vol-${i}`,
    description: `Elevate your wardrobe with Sajjad Cloth House's luxury ${cat} collection. Crafted with fine premium fabrics, gold tilla embroidery accents, and tailored precision.`,
    brand: 'Sajjad Cloth House',
    category: cat,
    subcategory: i % 2 === 0 ? 'Festive Premium' : 'Casual Daily Wear',
    price: basePrice,
    salePrice: isOnSale ? Math.floor(basePrice * 0.85) : 0,
    sku: `SCH-${cat.substring(0, 2).toUpperCase()}-2026-${1000 + i}`,
    barcode: `890123456${i.toString().padStart(3, '0')}`,
    stock: (i * 7) % 45 + 3,
    sizes: cat === 'Unstitched' ? ['Unstitched'] : ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Emerald Green', hex: '#064e3b' },
      { name: 'Royal Gold', hex: '#d97706' },
      { name: 'Midnight Navy', hex: '#1e3a8a' }
    ],
    images: [primaryImg, secImg],
    rating: +(4.0 + ((i % 10) / 10)).toFixed(1),
    numReviews: (i * 3) % 35 + 8,
    isNewArrival: i <= 10,
    isBestSeller: i % 4 === 0,
    isFeatured: i % 5 === 0,
    fabric: 'Luxury Lawn / Egyptian Cotton'
  };
});
