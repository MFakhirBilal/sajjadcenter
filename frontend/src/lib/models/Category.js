import { mongoose } from '../db.js';

let CategoryModel = null;

if (mongoose && mongoose.Schema) {
  const categorySchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      slug: { type: String, required: true, unique: true },
      parentCategory: { type: String },
      image: { type: String }
    },
    { timestamps: true }
  );

  CategoryModel = mongoose.models.Category || mongoose.model('Category', categorySchema);
}

export default CategoryModel;
