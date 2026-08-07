import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    discountPercent: { type: Number, required: true },
    minSpend: { type: Number, default: 0 },
    expiryDate: { type: Date }
  },
  { timestamps: true }
);

export default mongoose.models.Coupon || mongoose.model('Coupon', couponSchema);
