import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    imageUrl: { type: String, required: true },
    linkUrl: { type: String, default: '/shop' },
    buttonText: { type: String, default: 'Shop Now' }
  },
  { timestamps: true }
);

export default mongoose.models.Banner || mongoose.model('Banner', bannerSchema);
