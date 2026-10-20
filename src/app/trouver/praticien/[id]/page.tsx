import PractitionerProfileView from '@/components/PractitionerProfileView';
import { getPublicPractitionerBySlug } from '@/lib/services/directory';

export default async function PractitionerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PractitionerProfileView profile={(await getPublicPractitionerBySlug(id)) ?? null} />;
}
