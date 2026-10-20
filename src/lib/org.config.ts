import type { SiteSettings } from './types';

type PublicOrganizationConfig = Pick<
  SiteSettings,
  'domain' | 'orgNameFr' | 'orgNameAr' | 'orgNameEn' | 'affiliation' | 'contactEmail'
>;

type InternalOrganizationConfig = Omit<SiteSettings, keyof PublicOrganizationConfig>;

export const ORG_CONFIG: PublicOrganizationConfig = {
  domain: 'csnpt.tn',
  orgNameFr: 'Chambre Syndicale Nationale des Psychomotriciens Tunisiens',
  orgNameAr: 'الغرفة النقابية الوطنية لأخصائيي علم النفس الحركي التونسيين',
  orgNameEn: 'National Chamber of Tunisian Psychomotricians',
  affiliation: 'UTICA — Union Tunisienne de l’Industrie, du Commerce et de l’Artisanat',
  contactEmail: 'contact@csnpt.tn',
};

// Internal/unverified contact, location, and bank details are not used for public rendering.
export const INTERNAL_ORG_CONFIG: InternalOrganizationConfig = {
  presidentName: 'Mme Ameni Toumi',
  presidentClinicAddress:
    "Immeuble les Jardins, Bureau 2-3, 2ème étage, Av. les violettes, Jardins d'El Menzah 2, Ariana",
  coordinates: {
    lat: '36.8485° N',
    lng: '10.1650° E',
    elev: '24m',
    geoCode: 'TN-12-ARIANA-MENZAH2',
  },
  presidentPhone: '+216 55 690 409',
  secretariatPhone: '+216 71 820 110',
  bankDetails: {
    bankName: 'Banque de Tunisie (BT) / Agence Cité El Khadra Tunis',
    accountName: 'CSNPT — Chambre Syndicale Nationale Psychomotriciens',
    rib: '08 014 0001234567890 45',
    iban: 'TN59 0801 4000 1234 5678 9045',
    swift: 'BTBKNTNT',
  },
};
