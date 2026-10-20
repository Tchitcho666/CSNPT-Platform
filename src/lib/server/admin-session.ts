import 'server-only';

import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'csnpt-admin-session';
const SESSION_DURATION_SECONDS = 60 * 60 * 8;

function sessionSecret() {
  return process.env.CSNPT_ADMIN_SESSION_SECRET;
}

function signature(expiresAt: string, secret: string) {
  return createHmac('sha256', secret).update(expiresAt).digest('hex');
}

export function adminLoginConfigured() {
  return Boolean(process.env.CSNPT_ADMIN_PASSWORD && sessionSecret());
}

export async function createAdminSession(password: string) {
  const expectedPassword = process.env.CSNPT_ADMIN_PASSWORD;
  const secret = sessionSecret();
  if (!expectedPassword || !secret) return false;

  const supplied = Buffer.from(password);
  const expected = Buffer.from(expectedPassword);
  if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) return false;

  const expiresAt = String(Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS);
  const value = `${expiresAt}.${signature(expiresAt, secret)}`;
  const cookieStore = await cookies();
  // Clear sessions created before the cookie was widened to cover the admin download API.
  cookieStore.set(COOKIE_NAME, '', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/admin', maxAge: 0 });
  cookieStore.set(COOKIE_NAME, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_DURATION_SECONDS,
  });
  return true;
}

export async function isAdminSessionValid() {
  const secret = sessionSecret();
  if (!secret) return false;

  const value = (await cookies()).get(COOKIE_NAME)?.value;
  if (!value) return false;
  const [expiresAt, suppliedSignature, extra] = value.split('.');
  if (!expiresAt || !suppliedSignature || extra || Number(expiresAt) <= Math.floor(Date.now() / 1000)) {
    return false;
  }

  const expected = Buffer.from(signature(expiresAt, secret));
  const supplied = Buffer.from(suppliedSignature);
  return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  cookieStore.set(COOKIE_NAME, '', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/admin', maxAge: 0 });
}
