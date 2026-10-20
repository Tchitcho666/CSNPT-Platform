'use server';

import { getDatabaseClient } from '@/lib/server/db';
import { revalidatePath } from 'next/cache';

export type InternshipState = { success: boolean; message: string };

export async function submitInternshipRequest(_previous: InternshipState, formData: FormData): Promise<InternshipState> {
  const fullName = formData.get('fullName');
  const email = formData.get('email');
  const country = formData.get('country');
  const university = formData.get('university');
  const level = formData.get('level');
  const cvUrl = formData.get('cvUrl');
  const motivationLetter = formData.get('motivationLetter');
  if ([fullName, email, country, university, level, motivationLetter].some((value) => typeof value !== 'string' || !value.trim())) {
    return { success: false, message: 'Veuillez renseigner tous les champs obligatoires.' };
  }
  const values = [fullName, email, country, university, level, motivationLetter] as string[];
  if (values.some((value) => value.trim().length > 5000) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email as string)) {
    return { success: false, message: 'Vérifiez les informations saisies et votre adresse e-mail.' };
  }
  let normalizedCvUrl: string | null = null;
  if (typeof cvUrl === 'string' && cvUrl.trim()) {
    try {
      const parsed = new URL(cvUrl.trim());
      if (!['https:', 'http:'].includes(parsed.protocol) || parsed.href.length > 2000) throw new Error('invalid url');
      normalizedCvUrl = parsed.href;
    } catch {
      return { success: false, message: 'Le lien vers votre CV doit être une adresse web valide.' };
    }
  }
  try {
    await getDatabaseClient().internshipRequest.create({
      data: {
        fullName: (fullName as string).trim().slice(0, 200),
        email: (email as string).trim().toLowerCase().slice(0, 254),
        country: (country as string).trim().slice(0, 120),
        university: (university as string).trim().slice(0, 200),
        level: (level as string).trim().slice(0, 80),
        cvUrl: normalizedCvUrl,
        motivationLetter: (motivationLetter as string).trim().slice(0, 5000),
      },
    });
    revalidatePath('/admin');
    return { success: true, message: 'Votre demande de stage a bien été envoyée. Le comité vous contactera par email.' };
  } catch (error) {
    console.error('Internship request creation failed:', error);
    return { success: false, message: 'Votre demande n’a pas pu être enregistrée. Veuillez réessayer plus tard.' };
  }
}
