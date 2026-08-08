import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

// @desc    Get Admin Dashboard Stats & Analytics
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getAdminStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments({});
    const totalProducts = await Product.countDocuments({});
    const totalCustomers = await User.countDocuments({ role: 'customer' });

    const totalRevenueResult = await Order.aggregate([
      { $match: { orderStatus: { $ne: 'Cancelled' } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    const totalRevenue = totalRevenueResult.length > 0 ? totalRevenueResult[0].total : 0;

    const lowStockProducts = await Product.find({ stock: { $lte: 5 } }).select('name sku stock price images category');

    const recentOrders = await Order.find({}).sort({ createdAt: -1 }).limit(5).populate('user', 'name email');

    res.json({
      totalOrders,
      totalProducts,
      totalCustomers,
      totalRevenue,
      lowStockProducts,
      recentOrders
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Sales Report Data
// @route   GET /api/admin/reports/sales
// @access  Private/Admin
export const getSalesReport = async (req, res) => {
  try {
    const orders = await Order.find({ orderStatus: { $ne: 'Cancelled' } }).sort({ createdAt: -1 });

    const monthlySalesMap = {};
    orders.forEach((order) => {
      const month = new Date(order.createdAt).toLocaleString('default', { month: 'short', year: 'numeric' });
      if (!monthlySalesMap[month]) {
        monthlySalesMap[month] = 0;
      }
      monthlySalesMap[month] += order.totalPrice;
    });

    res.json({
      ordersCount: orders.length,
      totalSales: orders.reduce((sum, o) => sum + o.totalPrice, 0),
      monthlySales: monthlySalesMap,
      orders
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
