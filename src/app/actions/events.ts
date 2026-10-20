'use server';

import { revalidatePath } from 'next/cache';
import { getDatabaseClient } from '@/lib/server/db';

export type RegistrationResult = { success: true; message: string } | { success: false; message: string };

export async function registerForEvent(formData: FormData): Promise<RegistrationResult> {
  const eventId = formData.get('eventId');
  const fullName = formData.get('fullName');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const specialty = formData.get('specialty');

  if (
    typeof eventId !== 'string' || !eventId.trim() || eventId.length > 36 ||
    typeof fullName !== 'string' || !fullName.trim() || fullName.trim().length > 200 ||
    typeof email !== 'string' || email.trim().length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
    typeof phone !== 'string' || !phone.trim() || phone.trim().length > 40 ||
    (typeof specialty !== 'string' || specialty.trim().length > 200)
  ) {
    return { success: false, message: 'Vérifiez les informations saisies puis réessayez.' };
  }

  const normalizedEmail = email.trim().toLocaleLowerCase('en');
  const db = getDatabaseClient();

  try {
    const event = await db.event.findUnique({
      where: { id: eventId },
      select: { id: true, status: true, capacity: true },
    });
    if (!event || event.status !== 'PUBLISHED') {
      return { success: false, message: 'Les inscriptions à cet événement ne sont pas ouvertes.' };
    }

    const existing = await db.eventRegistration.findFirst({
      where: { eventId, email: normalizedEmail, status: { not: 'CANCELLED' } },
      select: { id: true },
    });
    if (existing) {
      return { success: false, message: 'Une demande existe déjà pour cette adresse e-mail.' };
    }

    const activeRegistrations = await db.eventRegistration.count({
      where: { eventId, status: { in: ['PENDING', 'CONFIRMED'] } },
    });
    if (activeRegistrations >= event.capacity) {
      return { success: false, message: 'Cet événement a atteint sa capacité maximale.' };
    }

    await db.eventRegistration.create({
      data: {
        eventId,
        fullName: fullName.trim(),
        email: normalizedEmail,
        phone: phone.trim(),
        specialty: specialty.trim() || null,
        status: 'PENDING',
      },
    });

    revalidatePath('/admin');
    return {
      success: true,
      message: 'Votre demande a été envoyée avec succès. Le comité validera votre inscription.',
    };
  } catch (error) {
    console.error('Event registration failed:', error);
    return { success: false, message: 'Votre demande n’a pas pu être envoyée. Réessayez plus tard.' };
  }
}

