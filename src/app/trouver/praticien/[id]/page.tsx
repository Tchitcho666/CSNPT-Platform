import PractitionerProfileView from '@/components/PractitionerProfileView';
import { getDatabaseClient } from '@/lib/server/db';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getGovernorateCenter } from '@/lib/directory-coordinates';

type Props = { params: Promise<{ id: string }> };

async function getPractitioner(id: string) {
  return getDatabaseClient().psychomotricien.findFirst({ where: { id, isPublished: true } });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const practitioner = await getPractitioner(id);
  if (!practitioner) return { title: 'Profil introuvable | CSNPT', description: 'Ce profil professionnel est introuvable.' };
  const title = `${practitioner.fullName} — Psychomotricien à ${practitioner.city} | CSNPT`;
  const description = `${practitioner.fullName}, ${practitioner.specialty} à ${practitioner.city}, ${practitioner.governorate}. Consultez l’annuaire du CSNPT.`;
  return { title, description, openGraph: { title, description, images: ['/images/editorial/community-tunisia-gemini.png'] } };
}

export default async function PractitionerPage({ params }: Props) {
  const { id } = await params;
  const record = await getPractitioner(id);
  if (!record) notFound();
  const fallback = getGovernorateCenter(record.governorate, record.city);
  return <PractitionerProfileView profile={{ id: record.id, type: 'praticien', name: record.fullName, roleOrSpecialty: { fr: record.specialty, ar: record.specialty, en: record.specialty }, city: { fr: record.city, ar: record.city, en: record.city }, phone: record.phone, governorate: record.governorate, approximateCoordinates: { lat: record.lat ?? fallback.lat, lng: record.lng ?? fallback.lng } }} />;
}
