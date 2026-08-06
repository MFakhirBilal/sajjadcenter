import app from '../../../../../backend/server.js';
import { connectDB } from '../../../../../backend/config/db.js';
import { Readable } from 'stream';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request, context) {
  return handleExpress(request, context);
}

export async function POST(request, context) {
  return handleExpress(request, context);
}

export async function PUT(request, context) {
  return handleExpress(request, context);
}

export async function DELETE(request, context) {
  return handleExpress(request, context);
}

export async function PATCH(request, context) {
  return handleExpress(request, context);
}

export async function OPTIONS(request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}

async function handleExpress(request, context) {
  await connectDB();

  return new Promise(async (resolve) => {
    const url = new URL(request.url);
    const bodyBuffer = request.body ? Buffer.from(await request.arrayBuffer()) : Buffer.alloc(0);

    const reqStream = new Readable();
    reqStream.push(bodyBuffer);
    reqStream.push(null);

    const req = Object.assign(reqStream, {
      url: url.pathname + url.search,
      method: request.method,
      headers: Object.fromEntries(request.headers.entries()),
      query: Object.fromEntries(url.searchParams.entries()),
      body: bodyBuffer.length > 0 ? (tryParseJson(bodyBuffer) || bodyBuffer) : {}
    });

    let resHeaders = {};
    let statusCode = 200;
    let resBody = [];

    const res = {
      statusCode: 200,
      setHeader(name, value) {
        resHeaders[name.toLowerCase()] = value;
        return this;
      },
      getHeader(name) {
        return resHeaders[name.toLowerCase()];
      },
      getHeaderNames() {
        return Object.keys(resHeaders);
      },
      removeHeader(name) {
        delete resHeaders[name.toLowerCase()];
      },
      status(code) {
        statusCode = code;
        this.statusCode = code;
        return this;
      },
      json(data) {
        resHeaders['content-type'] = 'application/json';
        this.end(JSON.stringify(data));
      },
      send(data) {
        if (typeof data === 'object') {
          return this.json(data);
        }
        resHeaders['content-type'] = resHeaders['content-type'] || 'text/plain';
        this.end(String(data));
      },
      write(chunk) {
        resBody.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      },
      end(data) {
        if (data) this.write(data);
        const finalBuffer = Buffer.concat(resBody);
        resolve(
          new Response(finalBuffer, {
            status: statusCode,
            headers: resHeaders
          })
        );
      }
    };

    app(req, res, (err) => {
      if (err) {
        resolve(
          new Response(JSON.stringify({ error: err.message || 'Internal Express Error' }), {
            status: 500,
            headers: { 'content-type': 'application/json' }
          })
        );
      }
    });
  });
}

function tryParseJson(buffer) {
  try {
    return JSON.parse(buffer.toString('utf-8'));
  } catch (e) {
    return null;
  }
}
