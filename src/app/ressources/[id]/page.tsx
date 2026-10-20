import ResourceDetailView from '@/components/ResourceDetailView';
import { getResourceList } from '@/lib/services/resources';

export default async function ResourceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const resource = getResourceList().find((item) => item.id === id) ?? null;
  return <ResourceDetailView resource={resource} />;
}
