'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useDocumentLanguage from '@/lib/useDocumentLanguage';
import type { Lang } from '@/lib/types';
import NewsCover from '@/components/news/NewsCover';

export type NewsArticlePreview = { id: string; title: string; slug: string; excerpt: string; coverImage: string | null; publishedAt: string | null };

const labels: Record<Lang, { eyebrow: string; title: string; intro: string; empty: string; read: string }> = {
  fr: { eyebrow: 'CSNPT · PUBLICATIONS', title: 'Actualités CSNPT', intro: 'La vie institutionnelle et les publications de la chambre.', empty: 'Aucune actualité publiée pour le moment.', read: 'Lire l’article' },
  ar: { eyebrow: 'CSNPT · المستجدات', title: 'مستجدات CSNPT', intro: 'الحياة المؤسسية ومنشورات الغرفة.', empty: 'لا توجد مستجدات منشورة حالياً.', read: 'قراءة المقال' },
  en: { eyebrow: 'CSNPT · NEWS', title: 'CSNPT news', intro: 'Institutional life and publications from the chamber.', empty: 'There are no published articles yet.', read: 'Read article' },
};

export default function NewsIndex({ articles }: { articles: NewsArticlePreview[] }) {
  const language = useDocumentLanguage();
  const t = labels[language];
  const rtl = language === 'ar';
  return <>
    <Navbar currentLang={language} />
    <main dir={rtl ? 'rtl' : 'ltr'} className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <header className="border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1180px] px-6 py-14 md:px-10 md:py-20">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-[var(--teal)]">{t.eyebrow}</p>
          <h1 className="mt-5 font-serif text-5xl leading-[1.02] md:text-7xl">{t.title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--muted)]">{t.intro}</p>
        </div>
      </header>
      <section className="mx-auto max-w-[1180px] px-6 py-10 md:px-10 md:py-14" aria-label={t.title}>
        {articles.length === 0 ? <p className="border-y border-[var(--line)] py-12 text-[var(--muted)]">{t.empty}</p> : (
          <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {articles.map((article, index) => <article key={article.id} className={`grid gap-6 py-8 md:gap-10 ${index === 0 ? 'md:grid-cols-[1.1fr_.9fr] md:py-10' : 'md:grid-cols-[minmax(180px,0.7fr)_1.3fr] md:py-7'}`}>
              <Link href={`/actualites/${article.slug}`} aria-label={`${t.read}: ${article.title}`} className="block overflow-hidden bg-[var(--surface-soft)]"><NewsCover src={article.coverImage} className={`w-full object-cover ${index === 0 ? 'aspect-[16/9] md:aspect-[4/3]' : 'aspect-[16/9] md:aspect-[5/3]'}`} /></Link>
              <div className="flex flex-col justify-center">
                <time className="text-xs font-semibold uppercase tracking-[.14em] text-[var(--teal)]">{article.publishedAt ? new Intl.DateTimeFormat(language === 'ar' ? 'ar-TN' : language === 'en' ? 'en' : 'fr-TN', { dateStyle: 'long' }).format(new Date(article.publishedAt)) : ''}</time>
                <h2 className={`mt-3 font-serif leading-tight ${index === 0 ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl'}`}><Link className="hover:text-[var(--teal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--teal)]" href={`/actualites/${article.slug}`}>{article.title}</Link></h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)]">{article.excerpt}</p>
                <Link href={`/actualites/${article.slug}`} className="mt-5 inline-flex min-h-11 w-fit items-center border-b border-[var(--teal)] text-sm font-semibold text-[var(--teal)]">{t.read}<span className="ms-2" aria-hidden="true">↗</span></Link>
              </div>
            </article>)}
          </div>
        )}
      </section>
    </main>
    <Footer currentLang={language} />
  </>;
}
