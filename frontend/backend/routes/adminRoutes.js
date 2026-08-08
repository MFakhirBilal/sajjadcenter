import express from 'express';
import { getAdminStats, getSalesReport } from '../controllers/adminController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/stats', protect, admin, getAdminStats);
router.get('/reports/sales', protect, admin, getSalesReport);

export default router;
