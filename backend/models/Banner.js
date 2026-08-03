import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    imageUrl: { type: String, required: true },
    linkUrl: { type: String, default: '/shop' },
    buttonText: { type: String, default: 'Shop Now' },
    position: { type: Number, default: 1 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model('Banner', bannerSchema);
