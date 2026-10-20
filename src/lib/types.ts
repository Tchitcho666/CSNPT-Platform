export type Lang = 'fr' | 'ar' | 'en';

export type FilterType = 'all' | 'praticien' | 'centre';
export type UserTier = 'none' | 'member' | 'accredited' | 'clinic';
export type CatDoc = 'all' | 'bilan' | 'protocole' | 'officiel';
export type MarketplaceTab = 'eq' | 'job' | 'fm';

export interface SiteSettings {
  domain: string;
  orgNameFr: string;
  orgNameAr: string;
  orgNameEn: string;
  affiliation: string;
  presidentName: string;
  presidentClinicAddress: string;
  coordinates: {
    lat: string;
    lng: string;
    elev: string;
    geoCode: string;
  };
  presidentPhone: string;
  secretariatPhone: string;
  contactEmail: string;
  bankDetails: {
    bankName: string;
    accountName: string;
    rib: string;
    iban: string;
    swift: string;
  };
}

export interface MembershipPlan {
  id: UserTier;
  name: Record<Lang, string>;
  tagline: Record<Lang, string>;
  priceTnd: number;
  accentColor: string;
  features: Record<Lang, string[]>;
  isPopular?: boolean;
}

export interface PractitionerEntity {
  id: string;
  type: Exclude<FilterType, 'all'>;
  name: string;
  roleOrSpecialty: Record<Lang, string>;
  city: Record<Lang, string>;
  address: Record<Lang, string>;
  lat: number;
  lng: number;
  phone: string;
  tier: 'gold' | 'emerald';
  matricule: string;
  badge: Record<Lang, string>;
  isPresident?: boolean;
}

/** Safe fields permitted in public practitioner UI props and responses. */
export interface PublicPractitioner {
  id: string;
  type: 'praticien';
  name: string;
  roleOrSpecialty: Record<Lang, string>;
  city: Record<Lang, string>;
  phone: string;
  governorate: string;
  /** Approximate city-center position for public map display; never a clinic address. */
  approximateCoordinates?: { lat: number; lng: number };
}

export interface ClinicalEvent {
  id: string;
  title: Record<Lang, string>;
  category: Record<Lang, string>;
  animators: Record<Lang, string>;
  dateFormatted: Record<Lang, string>;
  targetIsoDate: string;
  timeSlot: string;
  location: Record<Lang, string>;
  governorate: string;
  priceNonMember: number;
  priceMember: number;
  isAccreditedFree: boolean;
  totalSeats: number;
  remainingSeats: number;
}

export interface ClinicalDocument {
  id: string;
  title: Record<Lang, string>;
  author: Record<Lang, string>;
  category: Exclude<CatDoc, 'all'>;
  size: string;
  format: string;
  downloads: number;
  fileName: string;
  isGated: boolean;
}

export interface MarketplaceItem {
  id: string;
  tab: MarketplaceTab;
  title: Record<Lang, string>;
  gov: Record<Lang, string>;
  price: string;
  tag: 'cert' | 'urg';
  phone: string;
  desc: Record<Lang, string>;
}
