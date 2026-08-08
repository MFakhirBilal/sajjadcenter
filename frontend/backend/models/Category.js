import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add category name'],
      unique: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    image: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    parentCategory: {
      type: String,
      enum: ['Men', 'Women', 'Kids', 'Accessories', 'Main'],
      default: 'Main'
    }
  },
  { timestamps: true }
);

export default mongoose.model('Category', categorySchema);
