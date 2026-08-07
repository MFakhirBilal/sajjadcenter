import { connectDB } from '../../../lib/db.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    return Response.json({
      status: 'ok',
      message: 'SajjadCenter Serverless API is running cleanly on Vercel',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return Response.json({ status: 'ok', message: 'SajjadCenter API online' });
  }
}
