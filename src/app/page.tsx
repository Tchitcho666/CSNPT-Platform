import EditorialHome from "@/components/EditorialHome";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CSNPT | Chambre Syndicale des Psychomotriciens Tunisiens',
  description: 'La plateforme de référence des psychomotriciens tunisiens : annuaire, actualités, formations et ressources professionnelles.',
  openGraph: { title: 'CSNPT | Psychomotricité en Tunisie', description: 'Annuaire, actualités, formations et ressources professionnelles.', images: ['/images/editorial/hero-movement-gemini.png'] },
};

export default function HomePage() {
  return <EditorialHome />;
}
