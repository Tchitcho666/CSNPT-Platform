'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useDocumentLanguage from '@/lib/useDocumentLanguage';

const copy = {
  fr: {
    eyebrow: 'CSNPT · RESSOURCES',
    title: 'Trousse sensorielle',
    description: 'Cette page est réservée aux ressources rapides de la plateforme.',
    empty: 'Aucun contenu pour le moment',
  },
  ar: {
    eyebrow: 'CSNPT · الموارد',
    title: 'الموارد السريعة',
    description: 'هذه الصفحة مخصّصة للموارد السريعة على المنصة.',
    empty: 'لا تتوفر وثائق في الوقت الحالي.',
  },
  en: {
    eyebrow: 'CSNPT · RESOURCES',
    title: 'Quick resources',
    description: 'This page is reserved for quick resources on the platform.',
    empty: 'No documents are available here yet.',
  },
} as const;

export default function TrousseSecoursPage() {
  const language = useDocumentLanguage();
  const t = copy[language];

  return (
    <>
      <Navbar currentLang={language} />
      <main dir={language === 'ar' ? 'rtl' : 'ltr'} className="min-h-[70vh] bg-[var(--paper)] px-6 py-16 text-[var(--ink)] md:px-10 md:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--teal)]">{t.eyebrow}</p>
          <h1 className="mt-5 max-w-4xl text-5xl leading-[1.05] md:text-7xl">{t.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">{t.description}</p>
          <p className="mt-12 max-w-2xl border-s-2 border-[var(--terracotta)] ps-5 py-2 text-sm leading-7 text-[var(--muted)]" role="status">
            {t.empty}
          </p>
        </div>
      </main>
      <Footer currentLang={language} />
    </>
  );
}
