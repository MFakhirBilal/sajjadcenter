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
    const products = await Product.find().limit(100).sort({ createdAt: -1 });

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

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    
    const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newProduct = new Product({
      name: data.name,
      slug: slug,
      description: data.description || 'Exclusive Collection from SajjadCenter.',
      brand: data.brand || 'Sajjad Cloth House',
      category: data.category || 'Women',
      price: Number(data.price) || 0,
      salePrice: Number(data.salePrice) || 0,
      sku: data.sku || `SCH-${Math.floor(1000 + Math.random() * 9000)}`,
      stock: Number(data.stock) || 10,
      sizes: data.sizes || ['S', 'M', 'L', 'XL'],
      images: data.images || ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800'],
      rating: 5.0,
      numReviews: 1,
      isNewArrival: true,
      isFeatured: true
    });

    const saved = await newProduct.save();
    return Response.json({ success: true, product: saved }, { status: 201 });
  } catch (error) {
    console.error('POST Product API Error:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (id) {
      await Product.findByIdAndDelete(id);
    }
    return Response.json({ success: true });
  } catch (error) {
    console.error('DELETE Product API Error:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
