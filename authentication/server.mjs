import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const PORT = 8090;
const API_ORIGIN = 'https://api.freeapi.app';
const ROOT = process.cwd();

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
};

function send(res, status, body, headers = {}) {
  res.writeHead(status, headers);
  res.end(body);
}

function getBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];

    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

function safeStaticPath(urlPath) {
  const requestedPath = urlPath === '/' ? '/html/index.html' : urlPath;
  const filePath = normalize(join(ROOT, requestedPath));

  if (!filePath.startsWith(ROOT)) {
    return null;
  }

  return filePath;
}

async function proxyApi(req, res) {
  const body = ['GET', 'HEAD'].includes(req.method) ? undefined : await getBody(req);
  const headers = {
    accept: req.headers.accept || 'application/json',
    'content-type': req.headers['content-type'] || 'application/json',
  };

  if (req.headers.cookie) {
    headers.cookie = req.headers.cookie;
  }

  try {
    const apiResponse = await fetch(`${API_ORIGIN}${req.url}`, {
      method: req.method,
      headers,
      body,
      redirect: 'manual',
    });

    const responseBody = Buffer.from(await apiResponse.arrayBuffer());
    const responseHeaders = {
      'content-type': apiResponse.headers.get('content-type') || 'application/json',
    };
    const setCookie =
      apiResponse.headers.getSetCookie?.() ||
      (apiResponse.headers.get('set-cookie') ? [apiResponse.headers.get('set-cookie')] : []);

    if (setCookie.length > 0) {
      responseHeaders['set-cookie'] = setCookie;
    }

    send(res, apiResponse.status, responseBody, responseHeaders);
  } catch (error) {
    send(
      res,
      502,
      JSON.stringify({
        success: false,
        message: `Proxy request failed: ${error.message}`,
      }),
      { 'content-type': 'application/json; charset=utf-8' },
    );
  }
}

async function serveStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const filePath = safeStaticPath(url.pathname);

  if (!filePath) {
    send(res, 403, 'Forbidden', { 'content-type': 'text/plain; charset=utf-8' });
    return;
  }

  try {
    const file = await readFile(filePath);
    const contentType = mimeTypes[extname(filePath)] || 'application/octet-stream';
    send(res, 200, file, { 'content-type': contentType });
  } catch {
    send(res, 404, 'Not found', { 'content-type': 'text/plain; charset=utf-8' });
  }
}

createServer((req, res) => {
  if (req.url.startsWith('/api/v1/users')) {
    proxyApi(req, res);
    return;
  }

  serveStatic(req, res);
}).listen(PORT, '127.0.0.1', () => {
  console.log(`Authentication app running at http://127.0.0.1:${PORT}/html/index.html`);
});
