'use server';

import { redirect } from 'next/navigation';
import { destroyProfessionalSession, getProfessionalSessionId } from '@/lib/server/professional-session';

export async function professionalLogout() {
  if (await getProfessionalSessionId()) await destroyProfessionalSession();
  redirect('/espace-pro/login');
}
