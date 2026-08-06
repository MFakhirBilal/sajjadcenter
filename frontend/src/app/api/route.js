export const runtime = 'nodejs';

export async function GET() {
  return Response.json({
    status: 'ok',
    message: 'SajjadCenter Full-Stack App is running cleanly on a single Vercel deployment!',
    timestamp: new Date().toISOString()
  });
}
