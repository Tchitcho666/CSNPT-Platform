import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Comprendre la psychomotricité | CSNPT', description: 'Comprenez la psychomotricité, ses pratiques et le rôle du psychomotricien en Tunisie.', openGraph: { title: 'Comprendre la psychomotricité | CSNPT', description: 'Repères sur la psychomotricité et ses domaines d’intervention.', images: ['/images/editorial/pillar-mouvement-gemini.png'] } };
export default function ComprendreLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
