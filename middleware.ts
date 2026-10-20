import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'csnpt-admin-session';

function fromHex(value: string): Uint8Array<ArrayBuffer> | null {
  if (!/^[0-9a-f]{64}$/i.test(value)) return null;
  const bytes = new Uint8Array(new ArrayBuffer(32));
  for (let index = 0; index < bytes.length; index += 1) {
    bytes[index] = Number.parseInt(value.slice(index * 2, index * 2 + 2), 16);
  }
  return bytes;
}

function encodeText(value: string): Uint8Array<ArrayBuffer> {
  const encoded = new TextEncoder().encode(value);
  const bytes = new Uint8Array(new ArrayBuffer(encoded.byteLength));
  bytes.set(encoded);
  return bytes;
}

async function validAdminSession(value: string | undefined) {
  const secret = process.env.CSNPT_ADMIN_SESSION_SECRET;
  if (!secret || !value) return false;

  const [expiresAt, signature, extra] = value.split('.');
  if (!expiresAt || !signature || extra || !/^\d+$/.test(expiresAt)) return false;
  if (Number(expiresAt) <= Math.floor(Date.now() / 1000)) return false;

  const signatureBytes = fromHex(signature);
  if (!signatureBytes) return false;

  try {
    const key = await crypto.subtle.importKey(
      'raw',
      encodeText(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify'],
    );
    return crypto.subtle.verify('HMAC', key, signatureBytes, encodeText(expiresAt));
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const session = request.cookies.get(COOKIE_NAME)?.value;
  if (await validAdminSession(session)) return NextResponse.next();

  // The /admin page is also the password login screen; it performs its own
  // server-side session gate before rendering the dashboard.
  if (request.nextUrl.pathname === '/admin') return NextResponse.next();

  const loginUrl = new URL('/admin', request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/admin/:path*'],
};
