export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json({
    status: 'ok',
    message: 'SajjadCenter Full-Stack API is running 100% cleanly on Vercel',
    endpoints: [
      '/api/health',
      '/api/products',
      '/api/categories',
      '/api/banners',
      '/api/coupons'
    ]
  });
}
