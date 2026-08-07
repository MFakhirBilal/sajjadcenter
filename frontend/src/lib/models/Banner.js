import { mongoose } from '../db.js';

let BannerModel = null;

if (mongoose && mongoose.Schema) {
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

  BannerModel = mongoose.models.Banner || mongoose.model('Banner', bannerSchema);
}

export default BannerModel;
