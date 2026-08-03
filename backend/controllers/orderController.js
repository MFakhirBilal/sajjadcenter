import Order from '../models/Order.js';
import Product from '../models/Product.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Public / Private
export const addOrderItems = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      discountAmount,
      totalPrice
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items provided' });
    }

    const trackingId = 'SCH-' + Math.floor(100000 + Math.random() * 900000);

    const order = new Order({
      user: req.user ? req.user._id : null,
      trackingId,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      discountAmount: discountAmount || 0,
      totalPrice,
      orderStatus: 'Pending',
      isPaid: paymentMethod === 'Stripe' ? true : false,
      paidAt: paymentMethod === 'Stripe' ? Date.now() : null
    });

    const createdOrder = await order.save();

    // Decrement product stock
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.qty }
      });
    }

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get order by ID or Tracking ID
// @route   GET /api/orders/:identifier
// @access  Public
export const getOrderById = async (req, res) => {
  try {
    const { identifier } = req.params;
    let order;

    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      order = await Order.findById(identifier).populate('user', 'name email');
    }
    if (!order) {
      order = await Order.findOne({ trackingId: identifier.toUpperCase() }).populate('user', 'name email');
    }

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'id name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {
      order.orderStatus = orderStatus;
      if (orderStatus === 'Delivered') {
        order.deliveredAt = Date.now();
        order.isPaid = true;
      }
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
