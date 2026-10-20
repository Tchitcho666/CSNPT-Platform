import DirectoryPage from '@/components/DirectoryPage';
import { getPublicPractitioners } from '@/lib/services/directory';

type DirectorySearchParams = {
  q?: string | string[];
  gov?: string | string[];
};

export default async function TrouverPage({
  searchParams,
}: {
  searchParams: Promise<DirectorySearchParams>;
}) {
  const params = await searchParams;
  const query = Array.isArray(params.q) ? params.q[0] ?? '' : params.q ?? '';
  const governorate = Array.isArray(params.gov) ? params.gov[0] ?? '' : params.gov ?? '';

  return (
    <DirectoryPage
      key={`${query}:${governorate}`}
      practitioners={await getPublicPractitioners()}
      initialQuery={query}
      initialGovernorate={governorate}
    />
  );
}
