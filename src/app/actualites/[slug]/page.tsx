import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsCover from '@/components/news/NewsCover';
import { getDatabaseClient } from '@/lib/server/db';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getDatabaseClient().news.findFirst({ where: { slug, isPublished: true }, select: { title: true, excerpt: true } });
  return article ? { title: `${article.title} — CSNPT`, description: article.excerpt } : { title: 'Actualité — CSNPT' };
}

export default async function ActualiteArticlePage({ params }: Props) {
  const { slug } = await params;
  let article;
  try {
    article = await getDatabaseClient().news.findFirst({ where: { slug, isPublished: true } });
  } catch (error) {
    console.error('News article query failed:', error);
    notFound();
  }
  if (!article) notFound();
  return <>
    <Navbar currentLang="fr" />
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <article className="mx-auto max-w-4xl px-6 py-12 md:px-10 md:py-20">
        <Link href="/actualites" className="text-sm font-semibold text-[var(--teal)] underline underline-offset-4">← Toutes les actualités</Link>
        <p className="mt-10 text-xs font-bold uppercase tracking-[.16em] text-[var(--teal)]">CSNPT · Actualités</p>
        <h1 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">{article.title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">{article.excerpt}</p>
        {article.publishedAt && <time className="mt-5 block text-sm text-[var(--muted)]">{new Intl.DateTimeFormat('fr-TN', { dateStyle: 'long' }).format(article.publishedAt)}</time>}
        <NewsCover src={article.coverImage} className="mt-10 max-h-[560px] min-h-64 w-full object-cover" />
        <div className="mt-10 whitespace-pre-line border-t border-[var(--line)] pt-8 text-base leading-8">{article.content}</div>
      </article>
    </main>
    <Footer currentLang="fr" />
  </>;
}
