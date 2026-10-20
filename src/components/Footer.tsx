'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
} from 'lucide-react';
import { Lang } from '@/lib/types';

interface FooterProps {
  currentLang?: Lang;
}

const CONTENT = {
  fr: {
    org: 'Chambre Syndicale Nationale des Psychomotriciens Tunisiens',
    affiliation: 'Corps · Espace · Mouvement',
    description:
      'La CSNPT rassemble et accompagne les professionnels de la psychomotricité en Tunisie.',
    official: 'Domaine officiel',
    presidency: 'SIÈGE PRÉSIDENCE & SECRÉTARIAT',
    address:
      "Immeuble les Jardins, Bureau 2-3, 2ème étage, Av. les violettes, Jardins d'El Menzah 2, Ariana",
    phone: '+216 55 690 409',
    email: 'contact@csnpt.tn',

    institution: 'INSTITUTION',
    institutionLinks: [
      ['Accueil', '/'],
      ['Actualités', '/actualites'],
      ['Contact', '/contact'],
      ['Devenir membre', '/adhesion'],
    ],

    public: 'ACCÈS PUBLIC',
    publicLinks: [
      ['Trouver un psychomotricien', '/trouver'],
      ['Comprendre la psychomotricité', '/comprendre'],
      ["Domaines d'intervention", '/domaines'],
      ['Formations', '/formations'],
      ['Ressources', '/ressources'],
    ],

    information: 'INFORMATIONS',
    informationLinks: [
      ['Confidentialité', '/confidentialite'],
      ['Espace professionnel', '/espace-pro/login'],
      ['Trousse de secours', '/trousse-secours'],
      ['Stages internationaux', '/stages'],
    ],

    membershipTitle: 'Adhésion & cotisation',
    membershipText:
      'Les informations relatives à l’adhésion et au règlement sont communiquées dans l’espace dédié aux professionnels.',
    membershipLink: 'Accéder à l’adhésion',

    copyright:
      'Chambre Syndicale Nationale des Psychomotriciens Tunisiens (CSNPT) © 2026',
    designed: 'Conçu & Développé par',
    architect: 'Lead Architect',
  },

  ar: {
    org: 'الغرفة النقابية الوطنية لأخصائيي النفس الحركي في تونس',
    affiliation: 'الجسد · الفضاء · الحركة',
    description:
      'تجمع الغرفة النقابية الوطنية لأخصائيي النفس الحركي في تونس وتدعم مهنيي الاختصاص.',
    official: 'الموقع الرسمي',
    presidency: 'مقر الرئاسة والأمانة',
    address:
      'عمارة الحدائق، مكتب 2-3، الطابق الثاني، نهج البنفسج، حدائق المنزه 2، أريانة',
    phone: '+216 55 690 409',
    email: 'contact@csnpt.tn',

    institution: 'المؤسسة',
    institutionLinks: [
      ['الرئيسية', '/'],
      ['الأخبار', '/actualites'],
      ['اتصل بنا', '/contact'],
      ['الانخراط', '/adhesion'],
    ],

    public: 'الخدمات العمومية',
    publicLinks: [
      ['البحث عن أخصائي نفس حركي', '/trouver'],
      ['فهم النفس الحركي', '/comprendre'],
      ['مجالات التدخل', '/domaines'],
      ['التكوينات', '/formations'],
      ['الموارد', '/ressources'],
    ],

    information: 'معلومات',
    informationLinks: [
      ['الخصوصية', '/confidentialite'],
      ['الفضاء المهني', '/espace-pro/login'],
      ['حقيبة الإسعاف النفسي الحركي', '/trousse-secours'],
      ['التربصات الدولية', '/stages'],
    ],

    membershipTitle: 'الانخراط والمساهمات',
    membershipText:
      'المعلومات المتعلقة بالانخراط والدفع متوفرة داخل الفضاء المخصص للمهنيين.',
    membershipLink: 'الوصول إلى صفحة الانخراط',

    copyright:
      'الغرفة النقابية الوطنية لأخصائيي النفس الحركي في تونس (CSNPT) © 2026',
    designed: 'تصميم وتطوير',
    architect: 'المهندس الرئيسي',
  },

  en: {
    org: 'National Trade Chamber of Tunisian Psychomotor Therapists',
    affiliation: 'Body · Space · Movement',
    description:
      'CSNPT brings together and supports psychomotor professionals in Tunisia.',
    official: 'Official website',
    presidency: 'PRESIDENCY & SECRETARIAT',
    address:
      "Les Jardins Building, Office 2-3, 2nd floor, Av. Les Violettes, Jardins d'El Menzah 2, Ariana",
    phone: '+216 55 690 409',
    email: 'contact@csnpt.tn',

    institution: 'INSTITUTION',
    institutionLinks: [
      ['Home', '/'],
      ['News', '/actualites'],
      ['Contact', '/contact'],
      ['Membership', '/adhesion'],
    ],

    public: 'PUBLIC ACCESS',
    publicLinks: [
      ['Find a psychomotor therapist', '/trouver'],
      ['Understand psychomotricity', '/comprendre'],
      ['Areas of intervention', '/domaines'],
      ['Training', '/formations'],
      ['Resources', '/ressources'],
    ],

    information: 'INFORMATION',
    informationLinks: [
      ['Privacy', '/confidentialite'],
      ['Professional area', '/espace-pro/login'],
      ['First aid kit', '/trousse-secours'],
      ['International internships', '/stages'],
    ],

    membershipTitle: 'Membership & fees',
    membershipText:
      'Membership and payment information is provided through the dedicated professional area.',
    membershipLink: 'Go to membership',

    copyright:
      'National Trade Chamber of Tunisian Psychomotor Therapists (CSNPT) © 2026',
    designed: 'Designed & Developed by',
    architect: 'Lead Architect',
  },
} as const;

export default function Footer({
  currentLang = 'fr',
}: FooterProps) {
  const t = CONTENT[currentLang];
  const isRtl = currentLang === 'ar';
  const [uticaLogoFailed, setUticaLogoFailed] = useState(false);

  return (
    <footer
      className="csnpt-footer relative border-t border-[#DCD6CB] bg-[#F1EDE5] text-[#182522]"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* TRACE / AXE */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#244A61]/10" />

      <div className="mx-auto w-[min(calc(100%-40px),1440px)]">

        {/* Main footer grid */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">

          {/* Column 1 — Institution */}
          <div className="min-w-0">
            <div className="csnpt-footer-brand">
              <div>
                <div className="text-[17px] font-bold tracking-[0.08em]">
                  CSNPT
                </div>

                <div className="mt-1 max-w-[280px] text-[9px] font-semibold uppercase leading-4 tracking-[0.08em] text-[#64706B]">
                  {t.affiliation}
                </div>
              </div>
            </div>

            <p className="mt-6 max-w-[310px] text-[12px] leading-6 text-[#64706B]">
              {t.org}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-[#DCD6CB] py-3">
              <div className="flex items-center gap-2">
                {!uticaLogoFailed && <img src="/utica-logo.png" alt="UTICA" className="h-8 w-auto" style={{ filter: 'grayscale(100%) sepia(20%) opacity(80%)' }} onError={() => setUticaLogoFailed(true)} />}
                {uticaLogoFailed && <span className="text-sm font-black tracking-[0.12em] text-[#164c5d]">UTICA</span>}
                <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#64706B]">Affilié à l’UTICA</span>
              </div>
              <span aria-hidden="true" className="hidden h-5 w-px bg-[#DCD6CB] sm:block" />
              <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-[#64706B]"><img src="/tunisia-flag.jpg" alt="Drapeau tunisien" className="h-4 w-4 rounded-full object-cover" />Fièrement tunisien</span>
            </div>

            <p className="mt-2 max-w-[310px] text-[12px] leading-6 text-[#64706B]">
              {t.description}
            </p>

            <div className="mt-5 text-[10px] font-mono tracking-[0.08em] text-[#64706B]">
              {t.official} : csnpt.tn
            </div>
          </div>

          {/* Column 2 — Contact */}
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#397B75]">
              {t.presidency}
            </div>

            <div className="mt-5 space-y-4">

              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#BD7252]" />

                <span className="text-[12px] leading-5 text-[#64706B]">
                  {t.address}
                </span>
              </div>

              <a
                href={`tel:${t.phone.replace(/\s/g, '')}`}
                dir="ltr"
                className="group flex items-center gap-3 text-[12px] font-semibold text-[#182522]"
              >
                <Phone className="h-4 w-4 text-[#4E7F78]" />

                <span className="group-hover:underline">
                  {t.phone}
                </span>
              </a>

              <a
                href={`mailto:${t.email}`}
                dir="ltr"
                className="group flex items-center gap-3 text-[12px] font-medium text-[#182522]"
              >
                <Mail className="h-4 w-4 text-[#4E7F78]" />

                <span className="group-hover:underline">
                  {t.email}
                </span>
              </a>

            </div>
          </div>

          {/* Column 3 — Navigation */}
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#397B75]">
              {t.institution}
            </div>

            <nav className="mt-5 space-y-3">
              {t.institutionLinks.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex items-center gap-2 text-[12px] text-[#4D5753] transition-colors hover:text-[#182522]"
                >
                  <span>{label}</span>

                  <ArrowUpRight
                    className={`h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100 ${
                      isRtl ? '-scale-x-100' : ''
                    }`}
                  />
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 4 — Membership / professional */}
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#397B75]">
              {t.membershipTitle}
            </div>

            <div className="mt-4 rounded-2xl border border-[#DCD6CB] bg-[#F8F5EF] p-5">
              <p className="text-[12px] leading-6 text-[#64706B]">
                {t.membershipText}
              </p>

              <Link
                href="/adhesion"
                className="footer-membership-cta mt-5 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#C4623B] px-4 text-[11px] font-semibold tracking-[0.03em] text-[#FBFAF6] transition-transform hover:-translate-y-px focus:outline-none focus:ring-2 focus:ring-[#C4623B] focus:ring-offset-2"
              >
                {t.membershipLink}

                <ArrowUpRight
                  className={`h-4 w-4 ${
                    isRtl ? '-scale-x-100' : ''
                  }`}
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Secondary navigation row */}
        <div className="border-t border-[#DCD6CB] py-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {/* Public */}
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#64706B]">
                {t.public}
              </div>

              <nav className="mt-4 grid gap-2 sm:grid-cols-2">
                {t.publicLinks.map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-[11px] text-[#64706B] transition-colors hover:text-[#182522] hover:underline"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Information */}
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#64706B]">
                {t.information}
              </div>

              <nav className="mt-4 grid gap-2 sm:grid-cols-2">
                {t.informationLinks.map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-[11px] text-[#64706B] transition-colors hover:text-[#182522] hover:underline"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Ground line */}
            <div className="flex items-end lg:justify-end">
              <div className="flex items-center gap-3 text-[10px] text-[#8A8881]">
                <span className="h-px w-10 bg-[#BD7252]" />
                <span>CSNPT · Tunisie</span>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom line */}
        <div className="border-t border-[#DCD6CB] py-6">
          <div className="flex flex-col gap-4 text-[10px] text-[#77756F] md:flex-row md:items-center md:justify-between">

            <div>
              {t.copyright}
            </div>

            <div>
              {t.designed}{' '}
              <span className="font-semibold text-[#182522]">
                Kais Aloui
              </span>{' '}
              · {t.architect}
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
}
