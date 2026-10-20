'use server';

import { createAdminSession, destroyAdminSession, isAdminSessionValid } from '@/lib/server/admin-session';
import { getDatabaseClient } from '@/lib/server/db';
import { getGovernorateCenter, spreadCoordinates } from '@/lib/directory-coordinates';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { randomBytes, randomUUID, scryptSync } from 'node:crypto';
import { mkdir, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';

export async function loginAction(formData: FormData) {
  const password = formData.get('password');
  if (typeof password !== 'string' || !(await createAdminSession(password))) {
    redirect('/admin?error=login');
  }
  redirect('/admin');
}

export async function logoutAction() {
  await destroyAdminSession();
  redirect('/admin');
}

async function requireAdmin() {
  if (!(await isAdminSessionValid())) redirect('/admin?error=session');
}

function requiredText(formData: FormData, name: string, maxLength: number) {
  const value = formData.get(name);
  if (typeof value !== 'string' || !value.trim() || value.trim().length > maxLength) {
    throw new Error(`Invalid ${name}`);
  }
  return value.trim();
}

function revalidatePractitioners() {
  revalidatePath('/admin');
  revalidatePath('/trouver');
  revalidateTag('practitioners', 'max');
}

function revalidateEvents() {
  revalidatePath('/admin');
  revalidatePath('/formations');
  revalidateTag('events', 'max');
}

export async function createEvent(formData: FormData): Promise<{ success: boolean; message: string }> {
  await requireAdmin();
  let title: string;
  let description: string | null;
  let type: string;
  let date: Date;
  let startTime: string;
  let endTime: string;
  let locationName: string;
  let audience: string;
  let capacityValue: number;

  try {
    title = requiredText(formData, 'title', 200);
    const descriptionValue = formData.get('description');
    description = typeof descriptionValue === 'string' ? descriptionValue.trim().slice(0, 1000) || null : null;
    type = requiredText(formData, 'type', 80);
    const dateValue = requiredText(formData, 'date', 10);
    startTime = requiredText(formData, 'startTime', 5);
    endTime = requiredText(formData, 'endTime', 5);
    locationName = requiredText(formData, 'locationName', 200);
    audience = requiredText(formData, 'audience', 100);
    capacityValue = Number(formData.get('capacity'));
    date = new Date(`${dateValue}T00:00:00.000Z`);
    const validDate = /^\d{4}-\d{2}-\d{2}$/.test(dateValue) && Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === dateValue;
    const validTimes = /^\d{2}:\d{2}$/.test(startTime) && /^\d{2}:\d{2}$/.test(endTime) && startTime < endTime;
    const validType = ['Formation', 'Séminaire'].includes(type);
    const validAudience = ['Adhérents', 'Public', 'Professionnels'].includes(audience);
    if (!validDate || !validTimes || !validType || !validAudience || !Number.isInteger(capacityValue) || capacityValue < 1 || capacityValue > 100000) {
      return { success: false, message: 'Vérifiez la date, les horaires, le type et la capacité.' };
    }
  } catch {
    return { success: false, message: 'Vérifiez les champs obligatoires.' };
  }

  try {
    await getDatabaseClient().event.create({
      data: { title, description, type, date, startTime, endTime, locationName, capacity: capacityValue, audience, status: 'DRAFT' },
    });
  } catch (error) {
    console.error('Event creation failed:', error);
    return { success: false, message: 'L’événement n’a pas pu être enregistré. Réessayez.' };
  }

  revalidateEvents();
  return { success: true, message: 'Événement créé en brouillon.' };
}

export async function updateEventStatus(id: string, newStatus: string) {
  await requireAdmin();
  if (!id.trim() || id.length > 36 || !['DRAFT', 'PUBLISHED', 'CANCELLED'].includes(newStatus)) {
    redirect('/admin?tab=events&error=invalid');
  }
  try {
    await getDatabaseClient().event.update({ where: { id }, data: { status: newStatus } });
  } catch {
    redirect('/admin?tab=events&error=database');
  }
  revalidateEvents();
}

export async function deleteEvent(id: string) {
  await requireAdmin();
  if (!id.trim() || id.length > 36) redirect('/admin?tab=events&error=invalid');
  try {
    await getDatabaseClient().event.delete({ where: { id } });
  } catch {
    redirect('/admin?tab=events&error=database');
  }
  revalidateEvents();
}

export async function updateRegistrationStatus(id: string, status: string) {
  await requireAdmin();
  if (!id.trim() || id.length > 36 || !['CONFIRMED', 'CANCELLED'].includes(status)) {
    redirect('/admin?tab=registrations&error=invalid');
  }
  try {
    await getDatabaseClient().eventRegistration.update({ where: { id }, data: { status } });
  } catch (error) {
    console.error('Registration status update failed:', error);
    redirect('/admin?tab=registrations&error=database');
  }
  revalidatePath('/admin');
  revalidatePath('/formations');
}

export async function addPractitioner(formData: FormData) {
  await requireAdmin();
  const fullName = requiredText(formData, 'fullName', 200);
  const specialty = requiredText(formData, 'specialty', 200);
  const city = requiredText(formData, 'city', 120);
  const governorate = requiredText(formData, 'governorate', 120);
  const phone = requiredText(formData, 'phone', 40);
  const exactAddress = requiredText(formData, 'exactAddress', 500);
  const emailValue = formData.get('email');
  const email = typeof emailValue === 'string' && emailValue.trim() ? emailValue.trim().toLowerCase() : null;
  const passwordValue = formData.get('initialPassword');
  const initialPassword = typeof passwordValue === 'string' ? passwordValue : '';
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) redirect('/admin?error=invalid');
  if (initialPassword && initialPassword.length < 10) redirect('/admin?error=weak-password');
  if (email && await getDatabaseClient().psychomotricien.findFirst({ where: { email }, select: { id: true } })) redirect('/admin?error=email-exists');
  const { lat, lng } = spreadCoordinates(getGovernorateCenter(governorate, city));
  const passwordHash = initialPassword ? hashProfessionalPassword(initialPassword) : null;

  try {
    await getDatabaseClient().psychomotricien.create({
      data: { fullName, email, passwordHash, specialty, city, governorate, phone, exactAddress, lat, lng, isPublished: false },
    });
  } catch {
    redirect('/admin?error=database');
  }

  revalidatePractitioners();
  redirect('/admin?tab=directory&notice=created');
}

export async function togglePublish(id: string, isPublished: boolean) {
  await requireAdmin();
  if (!id.trim() || id.length > 36) redirect('/admin?error=invalid');
  try {
    await getDatabaseClient().psychomotricien.update({ where: { id }, data: { isPublished } });
  } catch {
    redirect('/admin?error=database');
  }
  revalidatePractitioners();
}

export async function deletePractitioner(id: string) {
  await requireAdmin();
  if (typeof id !== 'string' || !id.trim() || id.length > 36) {
    redirect('/admin?error=invalid');
  }
  try {
    await getDatabaseClient().psychomotricien.delete({ where: { id } });
  } catch {
    redirect('/admin?error=database');
  }
  revalidatePractitioners();
}

export async function deleteDrTestPractitionersAction() {
  await requireAdmin();
  try {
    const result = await getDatabaseClient().psychomotricien.deleteMany({ where: { fullName: 'Dr. Test' } });
    revalidatePractitioners();
    redirect(`/admin?tab=directory&notice=test-records-cleaned&deleted=${result.count}`);
  } catch (error) {
    if (error && typeof error === 'object' && 'digest' in error) throw error;
    console.error('Test practitioner cleanup failed:', error);
    redirect('/admin?tab=directory&error=database');
  }
}

// Compatibility wrappers for the previous dashboard form components.
export async function createPsychomotricienAction(formData: FormData) {
  return addPractitioner(formData);
}

export async function setPractitionerApprovalAction(formData: FormData) {
  const id = requiredText(formData, 'id', 36);
  return togglePublish(id, formData.get('isApproved') === 'true');
}

export async function setAdhesionStatusAction(formData: FormData) {
  await requireAdmin();
  const id = requiredText(formData, 'id', 36);
  const status = formData.get('status');
  if (status !== 'approved' && status !== 'rejected' && status !== 'APPROVED' && status !== 'REJECTED') redirect('/admin?error=invalid');
  try {
    await getDatabaseClient().adhesionRequest.update({ where: { id }, data: { status: status.toUpperCase() } });
  } catch {
    redirect('/admin?error=database');
  }
  revalidatePath('/admin');
  redirect('/admin?tab=memberships');
}

function makeNewsSlug(title: string) {
  const base = title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80) || 'actualite';
  return `${base}-${crypto.randomUUID().slice(0, 8)}`;
}

export async function createNews(formData: FormData): Promise<{ success: boolean; message: string }> {
  await requireAdmin();
  try {
    const title = requiredText(formData, 'title', 200);
    const excerpt = requiredText(formData, 'excerpt', 500);
    const content = requiredText(formData, 'content', 30000);
    const rawCover = formData.get('coverImage');
    const coverImage = typeof rawCover === 'string' && rawCover.trim() ? rawCover.trim().slice(0, 2000) : null;
    if (coverImage) {
      const parsed = new URL(coverImage);
      if (!['https:', 'http:'].includes(parsed.protocol)) throw new Error('Invalid cover image URL');
    }
    await getDatabaseClient().news.create({
      data: { title, slug: makeNewsSlug(title), excerpt, content, coverImage },
    });
    revalidatePath('/admin');
    revalidatePath('/actualites');
    return { success: true, message: 'Article enregistré en brouillon.' };
  } catch (error) {
    console.error('News creation failed:', error);
    return { success: false, message: 'Vérifiez les champs et réessayez.' };
  }
}

export async function setNewsPublished(id: string, isPublished: boolean) {
  await requireAdmin();
  if (!id.trim() || id.length > 36) redirect('/admin?tab=news&error=invalid');
  try {
    await getDatabaseClient().news.update({
      where: { id }, data: { isPublished, publishedAt: isPublished ? new Date() : null },
    });
  } catch (error) {
    console.error('News publish update failed:', error);
    redirect('/admin?tab=news&error=database');
  }
  revalidatePath('/admin');
  revalidatePath('/actualites');
}

export async function deleteNews(id: string) {
  await requireAdmin();
  if (!id.trim() || id.length > 36) redirect('/admin?tab=news&error=invalid');
  try {
    await getDatabaseClient().news.delete({ where: { id } });
  } catch (error) {
    console.error('News deletion failed:', error);
    redirect('/admin?tab=news&error=database');
  }
  revalidatePath('/admin');
  revalidatePath('/actualites');
}

function hashProfessionalPassword(password: string) {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `scrypt$${salt}$${hash}`;
}

const adhesionFileFields = ['diplomaFile', 'patenteFile', 'rneFile'] as const;
type AdhesionFileField = typeof adhesionFileFields[number];

async function savePrivateAdhesionFile(value: FormDataEntryValue | null, requestId: string, kind: AdhesionFileField) {
  if (!(value instanceof File) || value.size === 0) return null;
  if (value.size > 8 * 1024 * 1024) throw new Error('A file exceeds the 8 MB limit.');
  if (!/\.(pdf|jpg|png)$/i.test(value.name)) throw new Error('Unsupported document extension.');
  const supportedTypes: Record<string, string> = { 'application/pdf': 'pdf', 'image/jpeg': 'jpg', 'image/png': 'png' };
  const extension = supportedTypes[value.type];
  if (!extension) throw new Error('Unsupported document format.');
  const buffer = Buffer.from(await value.arrayBuffer());
  const validSignature = extension === 'pdf'
    ? buffer.subarray(0, 5).toString() === '%PDF-'
    : extension === 'png'
      ? buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
      : buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  if (!validSignature) throw new Error('The document content does not match its format.');
  const directory = path.join(process.cwd(), 'private_uploads', 'adhesions');
  await mkdir(directory, { recursive: true });
  const fileName = `${requestId}-${kind}.${extension}`;
  await writeFile(path.join(directory, fileName), buffer, { flag: 'wx', mode: 0o600 });
  return fileName;
}

export async function submitAdhesion(formData: FormData): Promise<{ success: boolean; message: string }> {
  // Silently accept honeypot submissions without saving documents or creating a record.
  if (String(formData.get('website_url') ?? '').trim()) {
    return { success: true, message: 'Votre demande a été envoyée avec succès.' };
  }
  const savedFiles: string[] = [];
  try {
    const fullName = requiredText(formData, 'fullName', 200);
    const email = requiredText(formData, 'email', 254).toLowerCase();
    const phone = requiredText(formData, 'phone', 40);
    const professionalStatus = requiredText(formData, 'professionalStatus', 120);
    const message = requiredText(formData, 'message', 5000);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || formData.get('consent') !== 'on') {
      return { success: false, message: 'Vérifiez votre adresse e-mail et votre consentement.' };
    }
    const requestId = randomUUID();
    const files: Partial<Record<AdhesionFileField, string | null>> = {};
    for (const kind of adhesionFileFields) {
      files[kind] = await savePrivateAdhesionFile(formData.get(kind), requestId, kind);
      if (files[kind]) savedFiles.push(files[kind]!);
    }
    await getDatabaseClient().adhesionRequest.create({
      data: {
        id: requestId, fullName, email, phone, professionalStatus, message,
        diplomaFile: files.diplomaFile, patenteFile: files.patenteFile, rneFile: files.rneFile,
        status: 'PENDING',
      },
    });
    revalidatePath('/admin');
    return { success: true, message: 'Votre demande a été envoyée. Le comité étudiera votre dossier.' };
  } catch (error) {
    console.error('Adhesion submission failed:', error);
    await Promise.all(savedFiles.map((file) => unlink(path.join(process.cwd(), 'private_uploads', 'adhesions', file)).catch(() => undefined)));
    const message = error instanceof Error && error.message.includes('8 MB')
      ? 'Chaque document doit faire 8 Mo maximum.'
      : error instanceof Error && error.message.includes('Unsupported document')
        ? 'Chaque document doit être au format PDF, JPG ou PNG et son contenu doit correspondre à son format.'
        : 'La demande n’a pas pu être enregistrée. Vérifiez les documents puis réessayez.';
    return { success: false, message };
  }
}

