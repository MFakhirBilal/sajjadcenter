import { mongoose } from '../db.js';

let CouponModel = null;

if (mongoose && mongoose.Schema) {
  const couponSchema = new mongoose.Schema(
    {
      code: { type: String, required: true, unique: true },
      discountPercent: { type: Number, required: true },
      minSpend: { type: Number, default: 0 },
      expiryDate: { type: Date }
    },
    { timestamps: true }
  );

  CouponModel = mongoose.models.Coupon || mongoose.model('Coupon', couponSchema);
}

export default CouponModel;
