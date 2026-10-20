export type Coordinates = { lat: number; lng: number };

const governorateCenters: Record<string, Coordinates> = {
  tunis: { lat: 36.8065, lng: 10.1815 },
  ariana: { lat: 36.8665, lng: 10.1644 },
  'ben arous': { lat: 36.7435, lng: 10.2319 },
  manouba: { lat: 36.8081, lng: 10.0963 },
  nabeul: { lat: 36.4513, lng: 10.7357 },
  zaghouan: { lat: 36.4029, lng: 10.1429 },
  bizerte: { lat: 37.2744, lng: 9.8739 },
  beja: { lat: 36.7256, lng: 9.1817 },
  jendouba: { lat: 36.5011, lng: 8.7802 },
  kef: { lat: 36.1742, lng: 8.7049 },
  siliana: { lat: 36.0849, lng: 9.3708 },
  sousse: { lat: 35.8256, lng: 10.6084 },
  monastir: { lat: 35.7643, lng: 10.8113 },
  mahdia: { lat: 35.5047, lng: 11.0622 },
  sfax: { lat: 34.7406, lng: 10.7603 },
  kairouan: { lat: 35.6781, lng: 10.0963 },
  kasserine: { lat: 35.1676, lng: 8.8365 },
  'sidi bouzid': { lat: 35.0382, lng: 9.4858 },
  gabes: { lat: 33.8815, lng: 10.0982 },
  medenine: { lat: 33.3549, lng: 10.5055 },
  tataouine: { lat: 32.9297, lng: 10.4518 },
  gafsa: { lat: 34.425, lng: 8.7842 },
  tozeur: { lat: 33.9197, lng: 8.1335 },
  kebili: { lat: 33.7044, lng: 8.969 },
};

const cityAliases: Record<string, string> = {
  hammamet: 'nabeul',
  'ben arous': 'ben arous',
  'le kef': 'kef',
};

const arabicAliases: Record<string, string> = {
  'تونس': 'tunis', 'أريانة': 'ariana', 'بن عروس': 'ben arous', 'منوبة': 'manouba',
  'نابل': 'nabeul', 'زغوان': 'zaghouan', 'بنزرت': 'bizerte', 'باجة': 'beja',
  'جندوبة': 'jendouba', 'الكاف': 'kef', 'سليانة': 'siliana', 'سوسة': 'sousse',
  'المنستير': 'monastir', 'المهدية': 'mahdia', 'صفاقس': 'sfax', 'القيروان': 'kairouan',
  'القصرين': 'kasserine', 'سيدي بوزيد': 'sidi bouzid', 'قابس': 'gabes', 'مدنين': 'medenine',
  'تطاوين': 'tataouine', 'قفصة': 'gafsa', 'توزر': 'tozeur', 'قبلي': 'kebili',
};

export function normalizeGovernorate(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('fr')
    .replace(/^gouvernorat\s+(?:(?:de|du)\s+|d['’]\s*|l['’]\s*)?/, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getGovernorateCenter(governorate: string, city = ''): Coordinates {
  const governorateKey = normalizeGovernorate(governorate);
  const cityKey = normalizeGovernorate(city);
  const alias = cityAliases[cityKey];
  const arabicGovernorate = arabicAliases[governorate.trim()];
  const arabicCity = arabicAliases[city.trim()];
  return governorateCenters[governorateKey] ??
    governorateCenters[arabicGovernorate ?? ''] ??
    governorateCenters[alias ?? ''] ??
    governorateCenters[cityKey] ??
    governorateCenters[arabicCity ?? ''] ??
    { lat: 34, lng: 9 };
}

export function spreadCoordinates(center: Coordinates): Coordinates {
  // Distribute records around a governorate centre without implying an exact clinic address.
  const offset = () => (Math.random() - 0.5) * 0.05;
  return { lat: center.lat + offset(), lng: center.lng + offset() };
}
