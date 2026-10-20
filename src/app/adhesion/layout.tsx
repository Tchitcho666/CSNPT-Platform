import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Adhérer au CSNPT | Devenir membre', description: 'Découvrez l’adhésion à la Chambre Syndicale Nationale des Psychomotriciens Tunisiens et déposez votre demande.', openGraph: { title: 'Adhésion | CSNPT', description: 'Rejoignez le réseau professionnel du CSNPT.', images: ['/images/editorial/community-tunisia-gemini.png'] } };
export default function AdhesionLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
