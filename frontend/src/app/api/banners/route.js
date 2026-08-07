import { connectDB } from '@/lib/db';
import Banner from '@/lib/models/Banner';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const sampleBanners = [
  {
    title: 'Grand Eid Luxury Collection 2026',
    subtitle: 'Premium Lawn, Unstitched Suits & Designer Kurta Sets',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600',
    linkUrl: '/shop',
    buttonText: 'Explore Collection'
  }
];

export async function GET() {
  try {
    await connectDB();
    let banners = await Banner.find();
    if (!banners || banners.length === 0) {
      banners = sampleBanners;
    }
    return Response.json(banners);
  } catch (error) {
    return Response.json(sampleBanners);
  }
}
