import { connectDB } from '../../../../../backend/config/db.js';
import Category from '../../../../../backend/models/Category.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const sampleCategories = [
  { name: 'Women Unstitched', slug: 'women-unstitched', parentCategory: 'Women', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600' },
  { name: 'Women Ready to Wear', slug: 'women-ready-to-wear', parentCategory: 'Women', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600' },
  { name: 'Men Kurta & Suit', slug: 'men-kurta-suit', parentCategory: 'Men', image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=600' },
  { name: 'Kids Eastern Wear', slug: 'kids-eastern', parentCategory: 'Kids', image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600' }
];

export async function GET() {
  try {
    await connectDB();
    let categories = await Category.find();
    if (!categories || categories.length === 0) {
      categories = sampleCategories;
    }
    return Response.json(categories);
  } catch (error) {
    return Response.json(sampleCategories);
  }
}
