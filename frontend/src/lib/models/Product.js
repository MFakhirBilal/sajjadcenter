import { mongoose } from '../db.js';

let ProductModel = null;

if (mongoose && mongoose.Schema) {
  const productSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      slug: { type: String, required: true, unique: true },
      description: { type: String, required: true },
      brand: { type: String, default: 'Sajjad Cloth House' },
      category: { type: String, required: true },
      subcategory: { type: String },
      price: { type: Number, required: true, default: 0 },
      salePrice: { type: Number, default: 0 },
      sku: { type: String, required: true },
      stock: { type: Number, required: true, default: 10 },
      sizes: [{ type: String }],
      images: [{ type: String }],
      rating: { type: Number, default: 4.5 },
      numReviews: { type: Number, default: 0 },
      isNewArrival: { type: Boolean, default: false },
      isFeatured: { type: Boolean, default: false }
    },
    { timestamps: true }
  );

  ProductModel = mongoose.models.Product || mongoose.model('Product', productSchema);
}

export default ProductModel;
