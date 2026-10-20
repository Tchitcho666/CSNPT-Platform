'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Lang } from '@/lib/types';

const data = {
  fr: {
    eyebrow: 'CSNPT · COMPRENDRE',
    title: 'Comprendre la psychomotricité.',
    intro: 'Des repères simples pour comprendre la psychomotricité, son champ d’intervention et la place du psychomotricien.',
    remember: 'À retenir',
    rememberText: 'Le corps, le mouvement et la vie psychique sont considérés ensemble.',
    fundamentals: 'Les fondamentaux',
    fundamentalsTitle: 'Une approche globale de la personne',
    situationsLabel: 'Situations',
    situationsTitle: 'Des besoins variés',
    situationsText: 'Le champ de la psychomotricité est large. Les objectifs de l’accompagnement dépendent de la personne et de sa situation.',
    faqLabel: 'Questions fréquentes',
    faqTitle: 'Les repères essentiels',
    further: 'Aller plus loin',
    furtherTitle: 'Trouver un psychomotricien',
    furtherText: 'Utilisez l’annuaire professionnel pour rechercher un psychomotricien ou une structure.',
    directory: 'Ouvrir l’annuaire',
    sections: [
      ['01', 'La psychomotricité, c’est quoi ?', 'La psychomotricité considère la personne dans son ensemble et s’intéresse aux liens entre le corps, le mouvement, les émotions, les relations et les capacités d’adaptation.'],
      ['02', 'À qui s’adresse-t-elle ?', 'Elle peut accompagner les enfants, les adolescents, les adultes et les personnes âgées selon leurs besoins et leur situation. L’accompagnement est adapté à chaque personne.'],
      ['03', 'Comment se déroule l’accompagnement ?', 'Le psychomotricien commence par comprendre la demande et observer les différentes dimensions psychomotrices. Un accompagnement peut ensuite être proposé selon les besoins identifiés.'],
    ],
    situations: [
      'Développement psychomoteur de l’enfant',
      'Difficultés de coordination et de motricité',
      'Attention, régulation et organisation',
      'Schéma corporel et représentation du corps',
      'Émotions, confiance et adaptation',
      'Accompagnement à différents âges de la vie',
    ],
    faq: [
      ['Quand consulter un psychomotricien ?', 'Une consultation peut être envisagée lorsqu’une difficulté liée au développement, au mouvement, à la coordination, à l’attention ou à l’adaptation est observée. Le professionnel pourra préciser la démarche adaptée.'],
      ['La psychomotricité concerne-t-elle uniquement les enfants ?', 'Non. La psychomotricité peut accompagner différentes étapes de la vie. Les objectifs et les modalités sont adaptés à l’âge, aux besoins et au contexte de chaque personne.'],
      ['Comment trouver un psychomotricien en Tunisie ?', 'Vous pouvez utiliser l’annuaire professionnel du CSNPT pour rechercher un professionnel ou une structure selon les informations disponibles.'],
    ],
  },
  ar: {
    eyebrow: 'CSNPT · فهم العلاج النفسي الحركي',
    title: 'نفهمو العلاج النفسي الحركي.',
    intro: 'معلومات أساسية وبسيطة باش نفهمو العلاج النفسي الحركي، مجاله ودور الأخصائي.',
    remember: 'مهم تعرف',
    rememberText: 'الجسم والحركة والحياة النفسية يتشافوا مع بعضهم.',
    fundamentals: 'الأساسيات',
    fundamentalsTitle: 'مقاربة شاملة للشخص',
    situationsLabel: 'الحالات',
    situationsTitle: 'احتياجات مختلفة',
    situationsText: 'مجال العلاج النفسي الحركي واسع، والأهداف تختلف حسب الشخص ووضعيتو.',
    faqLabel: 'أسئلة متكررة',
    faqTitle: 'المعلومات الأساسية',
    further: 'أكثر معلومات',
    furtherTitle: 'تلقى أخصائي نفسي حركي',
    furtherText: 'استعمل الدليل المهني باش تلوّج على أخصائي أو هيكل.',
    directory: 'فتح الدليل',
    sections: [
      ['01', 'شنوة هو العلاج النفسي الحركي؟', 'العلاج النفسي الحركي يشوف الشخص ككل ويركّز على العلاقة بين الجسم والحركة والمشاعر والعلاقات والقدرة على التكيّف.'],
      ['02', 'لشكون يتوجّه؟', 'ينجم يرافق الأطفال والمراهقين والكبار وكبار السن حسب حاجتهم ووضعيتهم. المرافقة تتكيّف مع كل شخص.'],
      ['03', 'كيفاش تصير المرافقة؟', 'الأخصائي يبدأ بفهم الطلب وملاحظة الجوانب النفسية الحركية المختلفة، وبعد يقترح مرافقة حسب الحاجات الموجودة.'],
    ],
    situations: [
      'التطور النفسي الحركي للطفل',
      'صعوبات التنسيق والحركة',
      'الانتباه والتنظيم',
      'مخطط الجسم وتمثّل الجسم',
      'المشاعر والثقة والتكيّف',
      'المرافقة في مختلف مراحل العمر',
    ],
    faq: [
      ['وقتاش نمشيو لأخصائي نفسي حركي؟', 'تنجم تتطرح الاستشارة كي تظهر صعوبة مرتبطة بالتطور أو الحركة أو التنسيق أو الانتباه أو التكيّف. الأخصائي يوضّح المسار المناسب.'],
      ['العلاج النفسي الحركي للصغار برك؟', 'لا. ينجم يرافق مراحل مختلفة من العمر، والأهداف والطريقة تتبدّل حسب العمر والحاجة والسياق.'],
      ['كيفاش نلقى أخصائي نفسي حركي في تونس؟', 'تنجم تستعمل الدليل المهني متاع CSNPT للبحث على أخصائي أو هيكل حسب المعلومات المتوفرة.'],
    ],
  },
  en: {
    eyebrow: 'CSNPT · UNDERSTAND',
    title: 'Understanding psychomotor therapy.',
    intro: 'Simple reference points to understand psychomotor therapy, its field of practice and the role of the professional.',
    remember: 'Key point',
    rememberText: 'The body, movement and psychological life are considered together.',
    fundamentals: 'Fundamentals',
    fundamentalsTitle: 'A whole-person approach',
    situationsLabel: 'Situations',
    situationsTitle: 'Different needs',
    situationsText: 'Psychomotor therapy covers a broad field. Goals depend on each person and their situation.',
    faqLabel: 'Frequently asked questions',
    faqTitle: 'Essential reference points',
    further: 'Go further',
    furtherTitle: 'Find a psychomotor therapist',
    furtherText: 'Use the professional directory to search for a therapist or structure.',
    directory: 'Open directory',
    sections: [
      ['01', 'What is psychomotor therapy?', 'Psychomotor therapy considers the person as a whole and focuses on links between the body, movement, emotions, relationships and adaptation.'],
      ['02', 'Who is it for?', 'It can support children, adolescents, adults and older people according to their needs and situation. Support is adapted to each person.'],
      ['03', 'How does support work?', 'The professional first understands the request and observes different psychomotor dimensions. Support can then be proposed according to identified needs.'],
    ],
    situations: [
      'Child psychomotor development',
      'Coordination and motor difficulties',
      'Attention, regulation and organisation',
      'Body schema and body representation',
      'Emotions, confidence and adaptation',
      'Support at different stages of life',
    ],
    faq: [
      ['When should someone consult a psychomotor therapist?', 'A consultation may be considered when a difficulty related to development, movement, coordination, attention or adaptation is observed. The professional can clarify the appropriate approach.'],
      ['Is psychomotor therapy only for children?', 'No. It can support different stages of life. Goals and methods are adapted to age, needs and context.'],
      ['How can I find a psychomotor therapist in Tunisia?', 'You can use the CSNPT professional directory to search for a professional or structure using the available information.'],
    ],
  },
} as const;

export default function ComprendrePage() {
  const [lang, setLang] = useState<Lang>('fr');
  const [calmMode, setCalmMode] = useState(false);
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const t = data[lang];

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

              <div className="rounded-3xl border border-[#ded9cf] bg-[#f0ede5] p-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#287d78]">{t.remember}</p>
                <p className="mt-4 text-xl font-bold leading-8">{t.rememberText}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-6 py-14 md:px-10 md:py-20">
          <div className="mb-9">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#287d78]">{t.fundamentals}</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-[-0.03em] md:text-4xl">{t.fundamentalsTitle}</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {t.sections.map(([number, title, text]) => (
              <article key={number} className="rounded-3xl border border-[#ded9cf] bg-[#f0ede5] p-7 md:p-8">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-[#5d918a]">{number}</span>
                  <span className="h-2 w-2 rounded-full bg-[#c97c5d]" />
                </div>
                <h3 className="mt-12 text-xl font-black leading-7">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#68716e]">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-[#ded9cf] bg-[#eeebe4]">
          <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-10 md:py-20">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#287d78]">{t.situationsLabel}</p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.03em]">{t.situationsTitle}</h2>
                <p className="mt-4 max-w-md text-sm leading-7 text-[#68716e]">{t.situationsText}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {t.situations.map((item, index) => (
                  <div key={item} className="flex min-h-16 items-center gap-4 rounded-2xl border border-[#d9d4ca] bg-[#f8f6f1] px-5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#d8d3c8] text-xs font-bold text-[#4f817b]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[980px] px-6 py-14 md:px-10 md:py-20">
          <div className="mb-9">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#287d78]">{t.faqLabel}</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] md:text-4xl">{t.faqTitle}</h2>
          </div>

          <div className="space-y-3">
            {t.faq.map(([question, answer]) => (
              <details key={question} className="group rounded-2xl border border-[#ded9cf] bg-[#f0ede5] px-5 py-4">
                <summary className="cursor-pointer list-none pr-8 text-base font-bold">
                  {question}
                  <span className="float-right text-xl font-normal text-[#5d918a] transition group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-3xl pb-2 pt-4 text-sm leading-7 text-[#68716e]">{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="border-t border-[#ded9cf] bg-[#142522] text-white">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-7 px-6 py-14 md:flex-row md:items-center md:justify-between md:px-10 md:py-16">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#9dc4be]">{t.further}</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.03em]">{t.furtherTitle}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#c8d1cf]">{t.furtherText}</p>
            </div>

            <a href="/trouver" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-2xl bg-[#72aaa3] px-6 text-sm font-black text-[#102824] hover:opacity-90">
              {t.directory} ↗
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
