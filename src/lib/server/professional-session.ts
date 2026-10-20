import 'server-only';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

const COOKIE = 'csnpt-professional-session';
const DURATION = 60 * 60 * 12;
function secret() { return process.env.CSNPT_PROFESSIONAL_SESSION_SECRET || process.env.CSNPT_ADMIN_SESSION_SECRET; }
function sign(payload: string, key: string) { return createHmac('sha256', key).update(payload).digest('hex'); }

export async function createProfessionalSession(practitionerId: string) {
  const key = secret();
  if (!key) throw new Error('Professional session secret is not configured.');
  const expires = String(Math.floor(Date.now() / 1000) + DURATION);
  const payload = `${practitionerId}.${expires}`;
  (await cookies()).set(COOKIE, `${payload}.${sign(payload, key)}`, {
    httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/espace-pro', maxAge: DURATION,
  });
}

export async function getProfessionalSessionId() {
  const key = secret();
  if (!key) return null;
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  const [id, expires, supplied, extra] = token.split('.');
  if (!id || !expires || !supplied || extra || !/^[a-z0-9_-]{10,40}$/i.test(id) || Number(expires) <= Math.floor(Date.now() / 1000)) return null;
  const expected = Buffer.from(sign(`${id}.${expires}`, key));
  const actual = Buffer.from(supplied);
  return actual.length === expected.length && timingSafeEqual(actual, expected) ? id : null;
}

export async function destroyProfessionalSession() {
  (await cookies()).delete(COOKIE);
}
