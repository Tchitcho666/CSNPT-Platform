import { getDatabaseClient } from '@/lib/server/db';
import NewsIndex from '@/components/news/NewsIndex';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Actualités de la psychomotricité | CSNPT',
  description: 'Les actualités, annonces et informations de la Chambre Syndicale Nationale des Psychomotriciens Tunisiens.',
  openGraph: { title: 'Actualités | CSNPT', description: 'Les actualités et annonces du CSNPT.', images: ['/images/editorial/community-tunisia-gemini.png'] },
};

export const dynamic = 'force-dynamic';

export default async function ActualitesPage() {
  let articles: { id: string; title: string; slug: string; excerpt: string; coverImage: string | null; publishedAt: Date | null }[] = [];
  try {
    articles = await getDatabaseClient().news.findMany({
      where: { isPublished: true },
      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
      select: { id: true, title: true, slug: true, excerpt: true, coverImage: true, publishedAt: true },
    });
  } catch (error) {
    console.error('Published news query failed:', error);
  }
  return <NewsIndex articles={articles.map((article) => ({ ...article, publishedAt: article.publishedAt?.toISOString() ?? null }))} />;
}
