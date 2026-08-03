import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter product name'],
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    description: {
      type: String,
      required: [true, 'Please enter product description']
    },
    brand: {
      type: String,
      default: 'Sajjad Cloth House'
    },
    category: {
      type: String,
      required: [true, 'Please select category'],
      enum: ['Men', 'Women', 'Kids', 'Accessories', 'Unstitched', 'Ready to Wear']
    },
    subcategory: {
      type: String,
      default: 'General'
    },
    price: {
      type: Number,
      required: [true, 'Please enter product price'],
      default: 0.0
    },
    salePrice: {
      type: Number,
      default: 0.0
    },
    sku: {
      type: String,
      required: true,
      unique: true
    },
    barcode: {
      type: String,
      default: ''
    },
    stock: {
      type: Number,
      required: [true, 'Please enter product stock'],
      default: 0
    },
    sizes: {
      type: [String],
      enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Unstitched', 'Standard'],
      default: ['S', 'M', 'L']
    },
    colors: [
      {
        name: String,
        hex: String
      }
    ],
    images: {
      type: [String],
      required: true
    },
    rating: {
      type: Number,
      default: 4.5
    },
    numReviews: {
      type: Number,
      default: 0
    },
    isNewArrival: {
      type: Boolean,
      default: false
    },
    isBestSeller: {
      type: Boolean,
      default: false
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    fabric: {
      type: String,
      default: 'Premium Lawn / Cotton / Silk / Wash & Wear'
    }
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
