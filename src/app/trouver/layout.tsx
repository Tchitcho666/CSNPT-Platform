import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Trouver un psychomotricien | CSNPT', description: 'Recherchez un psychomotricien par ville et gouvernorat dans l’annuaire professionnel du CSNPT.', openGraph: { title: 'Trouver un psychomotricien | CSNPT', description: 'Consultez l’annuaire des psychomotriciens en Tunisie.', images: ['/images/editorial/community-tunisia-gemini.png'] } };

export default function TrouverLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
