'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useDocumentLanguage from '@/lib/useDocumentLanguage';
import type { ListedResource } from '@/lib/data/resources.static';

const copy = {
  fr: { back: 'Retour aux ressources', eyebrow: 'BIBLIOTHÈQUE PROFESSIONNELLE', about: 'À propos de cette ressource', access: 'Accès', unavailable: 'Fichier non disponible', notice: 'Le fichier de cette ressource n’est pas disponible pour le moment.', browse: 'Explorer toutes les ressources', missing: 'Ressource introuvable', missingText: 'Cette ressource n’est pas disponible dans la bibliothèque actuelle.' },
  ar: { back: 'العودة إلى الموارد', eyebrow: 'المكتبة المهنية', about: 'حول هذا المورد', access: 'الوصول', unavailable: 'الملف غير متاح', notice: 'ملف هذا المورد غير متاح في الوقت الحالي.', browse: 'استكشاف كل الموارد', missing: 'المورد غير موجود', missingText: 'هذا المورد غير متاح في المكتبة الحالية.' },
  en: { back: 'Back to resources', eyebrow: 'PROFESSIONAL LIBRARY', about: 'About this resource', access: 'Access', unavailable: 'File unavailable', notice: 'The file for this resource is not available yet.', browse: 'Browse all resources', missing: 'Resource not found', missingText: 'This resource is not available in the current library.' },
} as const;

export default function ResourceDetailView({ resource }: { resource: ListedResource | null }) {
  const language = useDocumentLanguage();
  const t = copy[language];
  const isRtl = language === 'ar';

  return (
    <>
      <Navbar currentLang={language} />
      <main dir={isRtl ? 'rtl' : 'ltr'} className="min-h-[70vh] bg-[var(--paper)] text-[var(--ink)]">
        {!resource ? (
          <section className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-24">
            <p className="text-xs font-bold uppercase tracking-[.15em] text-[var(--teal)]">CSNPT · {t.eyebrow}</p>
            <h1 className="mt-5 text-5xl md:text-7xl">{t.missing}</h1>
            <p className="mt-5 text-[var(--muted)]">{t.missingText}</p>
            <Link href="/ressources" className="mt-8 inline-flex min-h-11 items-center border-b border-[var(--teal)] font-semibold text-[var(--teal)]">{t.back}</Link>
          </section>
        ) : (
          <>
            <section className="border-b border-[var(--line)]">
              <div className="mx-auto max-w-5xl px-6 py-12 md:px-10 md:py-20">
                <Link href="/ressources" className="inline-flex min-h-11 items-center border-b border-[var(--line)] text-sm font-semibold text-[var(--teal)]">{t.back}</Link>
                <p className="mt-10 text-xs font-bold uppercase tracking-[.15em] text-[var(--teal)]">{t.eyebrow} · {resource.type}</p>
                <h1 className="mt-5 max-w-4xl text-5xl leading-[1.05] md:text-7xl">{resource.title[language]}</h1>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">{resource.description[language]}</p>
              </div>
            </section>
            <section className="mx-auto grid max-w-5xl gap-10 px-6 py-12 md:grid-cols-[1fr_18rem] md:px-10 md:py-16">
              <div className="border-t border-[var(--teal)] pt-4">
                <h2 className="text-2xl">{t.about}</h2>
                <p className="mt-4 leading-7 text-[var(--muted)]">{resource.description[language]}</p>
                <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--muted)]">
                  {resource.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </div>
              <aside className="border-t border-[var(--line)] pt-4">
                <h2 className="text-xs font-bold uppercase tracking-[.15em]">{t.access}</h2>
                <p className="mt-4 text-sm text-[var(--muted)]">{resource.format}{resource.size ? ` · ${resource.size}` : ''}</p>
                <p className="mt-6 border-s-2 border-[var(--terracotta)] ps-4 py-2 text-sm font-semibold" role="status">{t.unavailable}</p>
                <p className="mt-3 text-xs leading-5 text-[var(--muted)]">{t.notice}</p>
              </aside>
            </section>
            <section className="bg-[var(--teal)] text-white">
              <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
                <h2 className="text-2xl md:text-3xl">{t.browse}</h2>
                <Link href="/ressources" className="inline-flex min-h-11 items-center border-b border-white/70 font-semibold">{t.back}</Link>
              </div>
            </section>
          </>
        )}
      </main>
      <Footer currentLang={language} />
    </>
  );
}
