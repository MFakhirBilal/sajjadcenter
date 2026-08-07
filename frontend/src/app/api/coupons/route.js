import { connectDB } from '../../../../../backend/config/db.js';
import Coupon from '../../../../../backend/models/Coupon.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const sampleCoupons = [
  { code: 'SAJJAD10', discountPercent: 10, minSpend: 3000 },
  { code: 'EID2026', discountPercent: 20, minSpend: 5000 }
];

export async function GET() {
  try {
    await connectDB();
    let coupons = await Coupon.find();
    if (!coupons || coupons.length === 0) {
      coupons = sampleCoupons;
    }
    return Response.json(coupons);
  } catch (error) {
    return Response.json(sampleCoupons);
  }
}
