'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Lang } from '@/lib/types';

const content = {
  fr: {
    eyebrow: 'CSNPT · ESPACE PROFESSIONNEL',
    title: 'Votre espace professionnel.',
    intro:
      'Un espace dédié aux psychomotriciens tunisiens pour gérer leur présence professionnelle, accéder aux services de la CSNPT et retrouver les ressources utiles à leur pratique.',
    accessTitle: 'Accès professionnel',
    accessHeading: 'Connexion bientôt disponible',
    accessText:
      'La connexion sécurisée et la gestion du compte seront ajoutées dans la prochaine étape de la plateforme.',
    servicesEyebrow: 'SERVICES',
    servicesTitle: 'Ce que vous trouverez ici',
    services: [
      {
        title: 'Gérer mon profil',
        text: 'Mettre à jour vos informations professionnelles et votre fiche dans l’annuaire.',
        label: 'Accéder au profil',
        disabled: true,
      },
      {
        title: 'Espace adhérent',
        text: 'Retrouver les informations liées à votre adhésion et à votre relation avec la CSNPT.',
        label: 'Bientôt disponible',
        disabled: true,
      },
      {
        title: 'Formations',
        text: 'Consulter les formations proposées et suivre les informations liées aux rendez-vous professionnels.',
        label: 'Voir les formations',
        href: '/formations',
      },
      {
        title: 'Documents professionnels',
        text: 'Accéder aux ressources, documents et informations utiles à votre pratique.',
        label: 'Voir les ressources',
        href: '/ressources',
      },
    ],
    helpEyebrow: 'BESOIN D’AIDE ?',
    helpTitle: 'Une question concernant votre espace professionnel ?',
    helpText: 'Contactez la CSNPT pour toute demande professionnelle.',
    helpButton: 'Contacter la CSNPT',
    directoryTitle: 'Vous cherchez un psychomotricien ?',
    directoryText: 'Consultez l’annuaire professionnel pour trouver une personne ou une structure référencée.',
    directoryButton: 'Ouvrir l’annuaire',
  },
  ar: {
    eyebrow: 'CSNPT · الفضاء المهني',
    title: 'فضاؤك المهني.',
    intro:
      'فضاء مخصّص للأخصائيين في العلاج النفسي الحركي في تونس لإدارة حضورهم المهني والوصول إلى خدمات CSNPT والموارد المفيدة للممارسة.',
    accessTitle: 'دخول مهني',
    accessHeading: 'الدخول باش يكون متاح قريب',
    accessText:
      'الدخول الآمن وإدارة الحساب باش يتضافوا في المرحلة الجاية من المنصة.',
    servicesEyebrow: 'الخدمات',
    servicesTitle: 'شنوة تلقى هنا',
    services: [
      {
        title: 'إدارة الملف المهني',
        text: 'حدّث معلوماتك المهنية والبطاقة متاعك في الدليل.',
        label: 'الدخول للملف',
        disabled: true,
      },
      {
        title: 'فضاء المنخرط',
        text: 'تابع المعلومات المتعلقة بالانخراط والعلاقة مع CSNPT.',
        label: 'متاح قريب',
        disabled: true,
      },
      {
        title: 'التكوينات',
        text: 'شوف التكوينات والمواعيد المهنية المتاحة.',
        label: 'شوف التكوينات',
        href: '/formations',
      },
      {
        title: 'الوثائق المهنية',
        text: 'الوصول إلى الموارد والوثائق والمعلومات المفيدة للممارسة.',
        label: 'شوف الموارد',
        href: '/ressources',
      },
    ],
    helpEyebrow: 'تحتاج مساعدة؟',
    helpTitle: 'عندك سؤال على الفضاء المهني؟',
    helpText: 'اتصل بـ CSNPT لأي طلب مهني.',
    helpButton: 'اتصل بـ CSNPT',
    directoryTitle: 'تلوّج على أخصائي نفسي حركي؟',
    directoryText: 'استعمل الدليل المهني باش تلقى أخصائي أو هيكل مسجّل.',
    directoryButton: 'فتح الدليل',
  },
  en: {
    eyebrow: 'CSNPT · PROFESSIONAL AREA',
    title: 'Your professional area.',
    intro:
      'A dedicated space for Tunisian psychomotor therapists to manage their professional presence, access CSNPT services and find useful practice resources.',
    accessTitle: 'Professional access',
    accessHeading: 'Login coming soon',
    accessText:
      'Secure login and account management will be added in the next stage of the platform.',
    servicesEyebrow: 'SERVICES',
    servicesTitle: 'What you will find here',
    services: [
      {
        title: 'Manage my profile',
        text: 'Update your professional information and your directory profile.',
        label: 'Access profile',
        disabled: true,
      },
      {
        title: 'Member area',
        text: 'Find information related to your membership and your relationship with CSNPT.',
        label: 'Coming soon',
        disabled: true,
      },
      {
        title: 'Training',
        text: 'Browse available training and professional appointments.',
        label: 'View training',
        href: '/formations',
      },
      {
        title: 'Professional documents',
        text: 'Access resources, documents and information useful to your practice.',
        label: 'View resources',
        href: '/ressources',
      },
    ],
    helpEyebrow: 'NEED HELP?',
    helpTitle: 'A question about your professional area?',
    helpText: 'Contact CSNPT for any professional request.',
    helpButton: 'Contact CSNPT',
    directoryTitle: 'Looking for a psychomotor therapist?',
    directoryText: 'Use the professional directory to find a listed person or structure.',
    directoryButton: 'Open directory',
  },
} as const;

export default function EspaceProfessionnelPage() {
  const [lang, setLang] = useState<Lang>('fr');
  const [calmMode, setCalmMode] = useState(false);
  const [dyslexicFont, setDyslexicFont] = useState(false);

  const t = content[lang];

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className={`min-h-screen bg-[#f7f4ed] text-[#102824] ${dyslexicFont ? 'font-dyslexic' : ''}`}>
      <Navbar
        currentLang={lang}
        onLanguageChange={setLang}
        calmMode={calmMode}
        onToggleCalmMode={() => setCalmMode((value) => !value)}
        dyslexicFont={dyslexicFont}
        onToggleDyslexicFont={() => setDyslexicFont((value) => !value)}
      />

      <main>
        <section className="border-b border-[#ded9cf]">
          <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-10 md:py-24">
            <div className="grid gap-10 lg:grid-cols-[1fr_390px] lg:items-end">
              <div>
                <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#287d78]">
                  {t.eyebrow}
                </p>
                <h1 className="max-w-4xl text-5xl font-black leading-[0.96] tracking-[-0.05em] md:text-7xl">
                  {t.title}
                </h1>
                <p className="mt-7 max-w-3xl text-lg leading-8 text-[#68716e]">
                  {t.intro}
                </p>
              </div>

              <div className="rounded-3xl border border-[#ded9cf] bg-[#f0ede5] p-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#287d78]">
                  {t.accessTitle}
                </p>
                <h2 className="mt-4 text-2xl font-black">{t.accessHeading}</h2>
                <p className="mt-4 text-sm leading-7 text-[#68716e]">{t.accessText}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-6 py-14 md:px-10 md:py-20">
          <div className="mb-9">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#287d78]">
              {t.servicesEyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] md:text-4xl">
              {t.servicesTitle}
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {t.services.map((service) => (
              <article
                key={service.title}
                className="rounded-3xl border border-[#ded9cf] bg-[#f0ede5] p-7 md:p-8"
              >
                <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-2xl border border-[#d8d2c8] bg-[#faf8f3] text-xs font-black text-[#287d78]">
                  CS
                </div>

                <h3 className="text-2xl font-black">{service.title}</h3>
                <p className="mt-4 min-h-[72px] text-sm leading-7 text-[#68716e]">
                  {service.text}
                </p>

                {'disabled' in service ? (
                  <span className="mt-7 inline-flex min-h-11 items-center rounded-2xl border border-[#d8d2c8] bg-[#faf8f3] px-5 text-sm font-bold text-[#858079]">
                    {service.label}
                  </span>
                ) : (
                  <Link
                    href={service.href}
                    className="mt-7 inline-flex min-h-11 items-center rounded-2xl border border-[#cfc8bc] bg-[#faf8f3] px-5 text-sm font-bold hover:bg-white"
                  >
                    {service.label} ↗
                  </Link>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-[#ded9cf] bg-[#174c5d] text-white">
          <div className="mx-auto grid max-w-[1280px] gap-8 px-6 py-14 md:px-10 md:py-16 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#b7ddd7]">
                {t.helpEyebrow}
              </p>
              <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-[-0.03em] md:text-4xl">
                {t.helpTitle}
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/70">{t.helpText}</p>
            </div>

            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#72aaa3] px-6 text-sm font-black text-[#102824] hover:opacity-90"
            >
              {t.helpButton} ↗
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-6 py-12 md:px-10 md:py-16">
          <div className="grid gap-6 rounded-3xl border border-[#ded9cf] bg-[#f0ede5] p-7 md:grid-cols-[1fr_auto] md:items-center md:p-9">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#287d78]">
                CSNPT
              </p>
              <h2 className="mt-3 text-2xl font-black md:text-3xl">{t.directoryTitle}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#68716e]">
                {t.directoryText}
              </p>
            </div>

            <Link
              href="/trouver"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-[#cfc8bc] bg-[#faf8f3] px-6 text-sm font-black"
            >
              {t.directoryButton} ↗
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
