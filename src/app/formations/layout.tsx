import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Formations en psychomotricité | CSNPT', description: 'Découvrez les formations et événements professionnels proposés par le CSNPT.', openGraph: { title: 'Formations | CSNPT', description: 'Formations et événements professionnels en psychomotricité.', images: ['/images/editorial/pillar-corps-gemini.png'] } };
export default function FormationsLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
