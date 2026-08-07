import { connectDB } from '../../../lib/db.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request) {
  return handleCatchAll(request);
}

export async function POST(request) {
  return handleCatchAll(request);
}

export async function PUT(request) {
  return handleCatchAll(request);
}

export async function DELETE(request) {
  return handleCatchAll(request);
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}

async function handleCatchAll(request) {
  try {
    await connectDB();
    const url = new URL(request.url);
    return Response.json({
      status: 'ok',
      endpoint: url.pathname,
      message: 'SajjadCenter API Endpoint active'
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
