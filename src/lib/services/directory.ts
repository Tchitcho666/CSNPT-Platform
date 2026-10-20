import 'server-only';

import { getDatabaseClient } from '@/lib/server/db';
import { getGovernorateCenter } from '@/lib/directory-coordinates';
import type { PublicPractitioner } from '../types';

export async function getPublicPractitioners(): Promise<PublicPractitioner[]> {
  const records = await getDatabaseClient().psychomotricien.findMany({
    where: { isPublished: true },
    orderBy: { fullName: 'asc' },
  });

  return records.map((record) => {
    const fallbackCoordinates = getGovernorateCenter(record.governorate, record.city);
    return {
      id: record.id,
      type: 'praticien',
      name: record.fullName,
      roleOrSpecialty: { fr: record.specialty, ar: record.specialty, en: record.specialty },
      city: { fr: record.city, ar: record.city, en: record.city },
      phone: record.phone,
      governorate: record.governorate,
      approximateCoordinates: {
        lat: record.lat ?? fallbackCoordinates.lat,
        lng: record.lng ?? fallbackCoordinates.lng,
      },
    };
  });
}

export async function getPublicPractitionerBySlug(slug: string) {
  return (await getPublicPractitioners()).find((practitioner) => practitioner.id === slug);
}

export async function getPublicPractitionerContactBySlug(slug: string) {
  const record = await getDatabaseClient().psychomotricien.findFirst({
    where: { id: slug, isPublished: true },
    select: { exactAddress: true },
  });
  if (!record) return null;
  return { address: { fr: record.exactAddress, ar: record.exactAddress, en: record.exactAddress } };
}
