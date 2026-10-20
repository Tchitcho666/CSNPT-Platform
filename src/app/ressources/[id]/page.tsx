import ResourceDetailView from '@/components/ResourceDetailView';
import { getResourceList } from '@/lib/services/resources';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const resource = getResourceList().find((item) => item.id === id);
  if (!resource) return { title: 'Ressource introuvable | CSNPT', description: 'Cette ressource professionnelle est introuvable.' };
  const title = `${resource.title.fr} | Ressources CSNPT`;
  const description = resource.description.fr;
  return { title, description, openGraph: { title, description, images: ['/images/editorial/pillar-espace-gemini.png'] } };
}

export default async function ResourceDetailPage({ params }: Props) {
  const { id } = await params;
  const resource = getResourceList().find((item) => item.id === id) ?? null;
  if (!resource) notFound();
  return <ResourceDetailView resource={resource} />;
}
