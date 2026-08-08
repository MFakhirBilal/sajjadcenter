import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';

export const runtime = 'nodejs';

let inMemoryOrders = [
  {
    _id: 'ord-1',
    trackingId: 'SCH-894210',
    createdAt: '2026-07-25T10:30:00Z',
    orderStatus: 'Pending',
    isPaid: false,
    totalPrice: 12500,
    paymentMethod: 'Cash on Delivery',
    shippingAddress: { fullName: 'Fakhir Chaudhry', phone: '+923001234567', email: 'customer@sajjadcenter.com', address: 'House 45, Sector Commercial', city: 'Lahore' },
    orderItems: [{ name: 'Sajjad Royal Women Collection Vol. 1', qty: 2, size: 'M', color: 'Emerald Green', price: 4200 }, { name: 'Sajjad Royal Men Kurta Vol. 3', qty: 1, size: 'L', color: 'White', price: 4100 }]
  },
  {
    _id: 'ord-2',
    trackingId: 'SCH-710294',
    createdAt: '2026-07-24T14:15:00Z',
    orderStatus: 'Processing',
    isPaid: true,
    totalPrice: 6800,
    paymentMethod: 'JazzCash',
    transactionRef: 'TRX98124018',
    shippingAddress: { fullName: 'Usman Ali', phone: '+923129876543', email: 'usman@example.com', address: 'Plot 12, Gulberg', city: 'Lahore' },
    orderItems: [{ name: 'Sajjad Royal Kids Eastern Vol. 2', qty: 2, size: 'S', color: 'Gold', price: 3400 }]
  }
];

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const trackingId = searchParams.get('trackingId');

    if (trackingId) {
      const match = inMemoryOrders.find(
        (o) => o.trackingId.toLowerCase() === trackingId.toLowerCase()
      );
      if (match) {
        return NextResponse.json({ success: true, order: match });
      }
      return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, orders: inMemoryOrders });
  } catch (error) {
    return NextResponse.json({ success: true, orders: inMemoryOrders });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newOrder = {
      _id: `ord-${Date.now()}`,
      trackingId: body.trackingId || 'SCH-' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toISOString(),
      orderStatus: 'Pending',
      isPaid: body.paymentMethod !== 'Cash on Delivery' && body.paymentMethod !== 'COD',
      totalPrice: body.totalPrice || 0,
      paymentMethod: body.paymentMethod || 'COD',
      transactionRef: body.transactionRef || '',
      shippingAddress: body.shippingAddress || {},
      orderItems: body.orderItems || []
    };

    inMemoryOrders.unshift(newOrder);

    return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, orderStatus } = body;

    const order = inMemoryOrders.find((o) => o._id === id || o.trackingId === id);
    if (order) {
      order.orderStatus = orderStatus;
      if (orderStatus === 'Delivered') {
        order.isPaid = true;
      }
      return NextResponse.json({ success: true, order });
    }

    return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
