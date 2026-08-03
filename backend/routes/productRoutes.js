import express from 'express';
import {
  getProducts,
  getProductById,
  getSearchSuggestions,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.get('/search/suggestions', getSearchSuggestions);
router
  .route('/:identifier')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;
