import { connectDB } from '../../../lib/db.js';
import Product from '../../../lib/models/Product.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const femaleImages = [
  'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800',
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800',
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800'
];

const maleImages = [
  'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=800',
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800'
];

function generate30Products() {
  const products = [];
  const categories = ['Women', 'Men', 'Kids', 'Accessories', 'Unstitched', 'Ready to Wear'];
  const fabrics = ['Luxury Lawn', 'Egyptian Cotton', 'Chiffon Silk', 'Wash & Wear', 'Pure Velvet'];

  for (let i = 1; i <= 30; i++) {
    let cat = categories[(i - 1) % categories.length];
    let imgList = cat === 'Women' || cat === 'Unstitched' ? femaleImages : maleImages;
    let selectedImg = imgList[i % imgList.length];
    
    products.push({
      name: `Sajjad Royal ${cat} Collection Vol. ${i}`,
      slug: `sajjad-royal-${cat.toLowerCase().replace(/ /g, '-')}-vol-${i}`,
      description: `Elevate your festive wardrobe with Sajjad Cloth House's premium ${cat} edition. Crafted with fine ${fabrics[i % fabrics.length]}.`,
      brand: 'Sajjad Cloth House',
      category: cat,
      price: 2500 + (i * 150),
      salePrice: i % 3 === 0 ? 2200 : 0,
      sku: `SCH-${cat.substring(0, 2).toUpperCase()}-2026-${1000 + i}`,
      stock: 20,
      sizes: ['S', 'M', 'L', 'XL'],
      images: [selectedImg],
      rating: 4.8,
      numReviews: 12,
      isNewArrival: i <= 10,
      isFeatured: i % 2 === 0
    });
  }
  return products;
}

export async function GET(request) {
  try {
    await connectDB();
    let count = await Product.countDocuments();
    if (count === 0) {
      const sample = generate30Products();
      await Product.insertMany(sample);
      count = sample.length;
    }
    const products = await Product.find().limit(50).sort({ createdAt: -1 });

    return Response.json({
      products,
      totalProducts: count,
      page: 1,
      pages: Math.ceil(count / 12)
    });
  } catch (error) {
    console.error('Products API Error:', error);
    const sample = generate30Products();
    return Response.json({
      products: sample,
      totalProducts: sample.length,
      page: 1,
      pages: Math.ceil(sample.length / 12)
    });
  }
}
