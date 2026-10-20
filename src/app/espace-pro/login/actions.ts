'use server';

import { scryptSync, timingSafeEqual } from 'node:crypto';
import { redirect } from 'next/navigation';
import { getDatabaseClient } from '@/lib/server/db';
import { createProfessionalSession } from '@/lib/server/professional-session';

function verifyPassword(password: string, stored: string | null) {
  if (!stored) return false;
  const [scheme, salt, encoded] = stored.split('$');
  if (scheme !== 'scrypt' || !salt || !encoded) return false;
  const expected = Buffer.from(encoded, 'hex');
  const actual = scryptSync(password, salt, expected.length);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export async function professionalLogin(formData: FormData) {
  const identifier = String(formData.get('identifier') ?? '').trim();
  const password = String(formData.get('password') ?? '');
  if (!identifier || password.length < 1 || identifier.length > 254 || password.length > 256) redirect('/espace-pro/login?error=invalid');
  const practitioner = await getDatabaseClient().psychomotricien.findFirst({
    where: { OR: [{ email: identifier.toLowerCase() }, { phone: identifier }] },
    select: { id: true, passwordHash: true },
  });
  if (!practitioner || !verifyPassword(password, practitioner.passwordHash)) redirect('/espace-pro/login?error=invalid');
  try {
    await createProfessionalSession(practitioner.id);
  } catch (error) {
    console.error('Professional session creation failed:', error);
    redirect('/espace-pro/login?error=unavailable');
  }
  redirect('/espace-pro/dashboard');
}
