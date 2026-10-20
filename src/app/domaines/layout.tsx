import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Domaines de la psychomotricité | CSNPT', description: 'Explorez les domaines d’intervention et les contextes de pratique des psychomotriciens.', openGraph: { title: 'Domaines de la psychomotricité | CSNPT', description: 'Les principaux domaines d’intervention du psychomotricien.', images: ['/images/editorial/pillar-espace-gemini.png'] } };
export default function DomainesLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
