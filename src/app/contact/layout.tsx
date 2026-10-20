import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Contacter le CSNPT | Psychomotriciens Tunisiens', description: 'Contactez la Chambre Syndicale Nationale des Psychomotriciens Tunisiens pour toute question ou demande d’information.', openGraph: { title: 'Contact | CSNPT', description: 'Coordonnées et formulaire de contact du CSNPT.', images: ['/images/editorial/community-tunisia-gemini.png'] } };
export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
