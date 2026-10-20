import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Ressources professionnelles | CSNPT', description: 'Guides, protocoles, documents et outils pour accompagner la pratique des psychomotriciens.', openGraph: { title: 'Ressources professionnelles | CSNPT', description: 'La bibliothèque professionnelle du CSNPT.', images: ['/images/editorial/pillar-espace-gemini.png'] } };
export default function RessourcesLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
