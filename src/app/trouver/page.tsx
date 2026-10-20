import DirectoryPage from '@/components/DirectoryPage';
import { getDatabaseClient } from '@/lib/server/db';
import { getGovernorateCenter } from '@/lib/directory-coordinates';
import type { PublicPractitioner } from '@/lib/types';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trouver un psychomotricien en Tunisie | CSNPT',
  description: 'Recherchez un psychomotricien par ville et gouvernorat dans l’annuaire professionnel du CSNPT.',
  openGraph: { title: 'Trouver un psychomotricien | CSNPT', description: 'Consultez l’annuaire des psychomotriciens en Tunisie.', images: ['/images/editorial/community-tunisia-gemini.png'] },
};

export const dynamic = 'force-dynamic';

type DirectorySearchParams = {
  q?: string | string[];
  gov?: string | string[];
};

export default async function TrouverPage({
  searchParams,
}: {
  searchParams: Promise<DirectorySearchParams>;
}) {
  const params = await searchParams;
  const query = Array.isArray(params.q) ? params.q[0] ?? '' : params.q ?? '';
  const governorate = Array.isArray(params.gov) ? params.gov[0] ?? '' : params.gov ?? '';

  const records = await getDatabaseClient().psychomotricien.findMany({ where: { isPublished: true }, orderBy: { fullName: 'asc' } });
  const practitioners: PublicPractitioner[] = records.map((record) => {
    const fallback = getGovernorateCenter(record.governorate, record.city);
    return { id: record.id, type: 'praticien', name: record.fullName, roleOrSpecialty: { fr: record.specialty, ar: record.specialty, en: record.specialty }, city: { fr: record.city, ar: record.city, en: record.city }, phone: record.phone, governorate: record.governorate, approximateCoordinates: { lat: record.lat ?? fallback.lat, lng: record.lng ?? fallback.lng } };
  });
  return (
    <DirectoryPage
      key={`${query}:${governorate}`}
      practitioners={practitioners}
      initialQuery={query}
      initialGovernorate={governorate}
    />
  );
}
