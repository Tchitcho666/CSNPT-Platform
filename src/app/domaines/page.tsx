'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Lang } from '@/lib/types';

const data = {
  fr: {
    eyebrow: 'CSNPT · DOMAINES',
    title: 'Les domaines de la psychomotricité.',
    intro: 'Explorer les principaux contextes dans lesquels le psychomotricien peut intervenir, selon l’âge, les besoins et la situation de la personne.',
    sideLabel: 'Une même approche',
    sideText: 'Chaque accompagnement est adapté à la personne et à son contexte.',
    explore: 'Explorer',
    exploreTitle: 'Des domaines qui évoluent avec les besoins',
    keep: 'À garder en tête',
    keepTitle: 'Pas de parcours unique',
    keepText: 'Le domaine d’intervention ne suffit pas à déterminer à lui seul l’accompagnement. Les objectifs sont définis en fonction de la demande, de l’évaluation, de l’âge et des particularités de chaque personne.',
    ctaLabel: 'Besoin d’un professionnel ?',
    ctaTitle: 'Rechercher dans l’annuaire CSNPT',
    ctaText: 'Trouvez un psychomotricien ou une structure selon les informations disponibles dans l’annuaire.',
    ctaButton: 'Trouver un professionnel',
    domains: [
      ['01', 'Petite enfance', 'Accompagnement autour du développement psychomoteur, des acquisitions et de l’observation du jeune enfant.', ['Développement', 'Motricité', 'Éveil']],
      ['02', 'Enfance & adolescence', 'Interventions pouvant concerner la coordination, l’attention, le rapport au corps et les apprentissages.', ['Coordination', 'Attention', 'Apprentissages']],
      ['03', 'Adulte', 'Accompagnement adapté aux difficultés psychomotrices pouvant apparaître dans différents contextes de vie.', ['Corps', 'Adaptation', 'Autonomie']],
      ['04', 'Personne âgée', 'Approche pouvant contribuer au maintien des capacités, de l’autonomie et du lien entre corps et environnement.', ['Autonomie', 'Mobilité', 'Adaptation']],
      ['05', 'Handicap & troubles du développement', 'Accompagnement individualisé en fonction des besoins, des capacités et du projet de la personne.', ['Individualisation', 'Capacités', 'Projet']],
      ['06', 'Prévention & accompagnement', 'La psychomotricité peut également s’inscrire dans une démarche de prévention, d’observation et d’accompagnement.', ['Prévention', 'Observation', 'Accompagnement']],
    ],
  },
  ar: {
    eyebrow: 'CSNPT · المجالات',
    title: 'مجالات العلاج النفسي الحركي.',
    intro: 'نستكشفو أهم السياقات اللي ينجم فيها الأخصائي النفسي الحركي يتدخل حسب العمر والحاجة ووضعية الشخص.',
    sideLabel: 'نفس المقاربة',
    sideText: 'كل مرافقة تتكيّف مع الشخص والوضعية متاعو.',
    explore: 'استكشف',
    exploreTitle: 'مجالات مختلفة حسب الحاجات',
    keep: 'مهم تعرف',
    keepTitle: 'ما فماش مسار واحد للجميع',
    keepText: 'مجال التدخل وحدو ما يكفيش باش نحددو نوع المرافقة. الأهداف تتحدد حسب الطلب والتقييم والعمر وخصوصيات كل شخص.',
    ctaLabel: 'تلوّج على أخصائي؟',
    ctaTitle: 'البحث في دليل CSNPT',
    ctaText: 'تلقى أخصائي نفسي حركي أو هيكل حسب المعلومات الموجودة في الدليل.',
    ctaButton: 'تلقى أخصائي',
    domains: [
      ['01', 'الطفولة المبكرة', 'مرافقة مرتبطة بالتطور النفسي الحركي والمكتسبات وملاحظة الطفل الصغير.', ['التطور', 'الحركة', 'الإيقاظ']],
      ['02', 'الطفولة والمراهقة', 'تدخلات تنجم تخص التنسيق والانتباه والعلاقة بالجسم والتعلّم.', ['التنسيق', 'الانتباه', 'التعلّم']],
      ['03', 'الكبار', 'مرافقة تتكيّف مع الصعوبات النفسية الحركية اللي تنجم تظهر في سياقات مختلفة من الحياة.', ['الجسم', 'التكيّف', 'الاستقلالية']],
      ['04', 'كبار السن', 'مقاربة تنجم تساهم في المحافظة على القدرات والاستقلالية والعلاقة بين الجسم والمحيط.', ['الاستقلالية', 'الحركة', 'التكيّف']],
      ['05', 'الإعاقة واضطرابات التطور', 'مرافقة فردية حسب الحاجات والقدرات ومشروع الشخص.', ['الفردية', 'القدرات', 'المشروع']],
      ['06', 'الوقاية والمرافقة', 'العلاج النفسي الحركي ينجم يكون زادة في إطار الوقاية والملاحظة والمرافقة.', ['الوقاية', 'الملاحظة', 'المرافقة']],
    ],
  },
  en: {
    eyebrow: 'CSNPT · AREAS',
    title: 'Areas of psychomotor therapy.',
    intro: 'Explore the main contexts in which a psychomotor therapist may work, depending on age, needs and each person’s situation.',
    sideLabel: 'One approach',
    sideText: 'Each form of support is adapted to the person and their context.',
    explore: 'Explore',
    exploreTitle: 'Different areas, depending on needs',
    keep: 'Keep in mind',
    keepTitle: 'There is no single pathway',
    keepText: 'The area of intervention alone does not determine the support provided. Goals depend on the request, assessment, age and individual characteristics.',
    ctaLabel: 'Looking for a professional?',
    ctaTitle: 'Search the CSNPT directory',
    ctaText: 'Find a psychomotor therapist or structure using the information available in the directory.',
    ctaButton: 'Find a professional',
    domains: [
      ['01', 'Early childhood', 'Support related to psychomotor development, acquisitions and observation of young children.', ['Development', 'Motor skills', 'Awareness']],
      ['02', 'Childhood & adolescence', 'Interventions may concern coordination, attention, body awareness and learning.', ['Coordination', 'Attention', 'Learning']],
      ['03', 'Adults', 'Support adapted to psychomotor difficulties that may appear in different life contexts.', ['Body', 'Adaptation', 'Autonomy']],
      ['04', 'Older people', 'An approach that may contribute to maintaining abilities, autonomy and the link between body and environment.', ['Autonomy', 'Mobility', 'Adaptation']],
      ['05', 'Disability & developmental disorders', 'Individualised support based on needs, abilities and the person’s project.', ['Individualisation', 'Abilities', 'Project']],
      ['06', 'Prevention & support', 'Psychomotor therapy can also be part of prevention, observation and support.', ['Prevention', 'Observation', 'Support']],
    ],
  },
} as const;

export default function DomainesPage() {
  const [lang, setLang] = useState<Lang>('fr');
  const [calmMode, setCalmMode] = useState(false);
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const t = data[lang];

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className={`min-h-screen bg-[#f8f6f1] text-[#142522] ${dyslexicFont ? 'font-dyslexic' : ''}`}>
      <Navbar
        currentLang={lang}
        onLanguageChange={setLang}
        calmMode={calmMode}
        onToggleCalmMode={() => setCalmMode((v) => !v)}
        dyslexicFont={dyslexicFont}
        onToggleDyslexicFont={() => setDyslexicFont((v) => !v)}
      />

      <main>
        <section className="border-b border-[#ded9cf]">
          <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-10 md:py-24">
            <div className="grid gap-10 lg:grid-cols-[1fr_390px] lg:items-end">
              <div>
                <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#287d78]">{t.eyebrow}</p>
                <h1 className="max-w-4xl text-5xl font-black leading-[0.96] tracking-[-0.05em] md:text-7xl">{t.title}</h1>
                <p className="mt-7 max-w-3xl text-lg leading-8 text-[#68716e]">{t.intro}</p>
              </div>

              <div className="rounded-3xl border border-[#ded9cf] bg-[#f1eee7] p-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#287d78]">{t.sideLabel}</p>
                <p className="mt-4 text-xl font-bold leading-8">{t.sideText}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-6 py-14 md:px-10 md:py-20">
          <div className="mb-9">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#287d78]">{t.explore}</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-[-0.03em] md:text-4xl">{t.exploreTitle}</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {t.domains.map(([number, title, text, tags]) => (
              <article key={number} className="rounded-3xl border border-[#ded9cf] bg-[#f1eee7] p-7 md:p-8">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-[#5d918a]">{number}</span>
                  <span className="h-2 w-2 rounded-full bg-[#c97c5d]" />
                </div>

                <h3 className="mt-10 text-2xl font-black tracking-[-0.02em]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#68716e]">{text}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-[#d8d3c8] bg-[#faf8f3] px-3 py-1.5 text-xs font-semibold text-[#5f625e]">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-[#ded9cf] bg-[#eeebe4]">
          <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-10 md:py-20">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#287d78]">{t.keep}</p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.03em]">{t.keepTitle}</h2>
              </div>

              <div className="rounded-3xl border border-[#d8d3c8] bg-[#f8f6f1] p-8">
                <p className="text-base leading-8 text-[#555b57]">{t.keepText}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#142522] text-white">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-7 px-6 py-14 md:flex-row md:items-center md:justify-between md:px-10 md:py-16">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#9dc4be]">{t.ctaLabel}</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.03em]">{t.ctaTitle}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#c8d1cf]">{t.ctaText}</p>
            </div>

            <a href="/trouver" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-2xl bg-[#72aaa3] px-6 text-sm font-black text-[#102824] hover:opacity-90">
              {t.ctaButton} ↗
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
