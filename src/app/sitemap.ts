import type { MetadataRoute } from 'next';
import { getDatabaseClient } from '@/lib/server/db';
import { getResourceList } from '@/lib/services/resources';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://csnpt.tn').replace(/\/$/, '');
const staticPaths = ['/', '/trouver', '/formations', '/contact', '/adhesion', '/comprendre', '/domaines', '/actualites', '/ressources'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const db = getDatabaseClient();
  const [practitioners, articles] = await Promise.all([
    db.psychomotricien.findMany({ where: { isPublished: true }, select: { id: true, createdAt: true } }),
    db.news.findMany({ where: { isPublished: true }, select: { slug: true, publishedAt: true, createdAt: true } }),
  ]);

  return [
    ...staticPaths.map((path) => ({ url: `${siteUrl}${path}`, changeFrequency: 'weekly' as const, priority: path === '/' ? 1 : 0.7 })),
    ...practitioners.map((record) => ({ url: `${siteUrl}/trouver/praticien/${record.id}`, lastModified: record.createdAt, changeFrequency: 'monthly' as const, priority: 0.6 })),
    ...articles.map((article) => ({ url: `${siteUrl}/actualites/${article.slug}`, lastModified: article.publishedAt ?? article.createdAt, changeFrequency: 'monthly' as const, priority: 0.7 })),
    ...getResourceList().map((resource) => ({ url: `${siteUrl}/ressources/${resource.id}`, changeFrequency: 'monthly' as const, priority: 0.5 })),
  ];
}
