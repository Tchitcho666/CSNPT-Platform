"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Leaf,
  MapPin,
  Search,
  Sun,
  UserPlus,
  Users,
} from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import MagneticButton from "@/components/ui/MagneticButton";
import type { Lang } from "@/lib/types";

type Copy = {
  skip: string;
  kicker: string;
  title: string;
  titleEmphasis: string;
  intro: string;
  searchLabel: string;
  searchPlaceholder: string;
  searchSubmit: string;
  directoryHint: string;
  imageDescription: string;
  artworkLabel: string;
  annotationLabels: string[];
  pillarsEyebrow: string;
  pillarsTitle: string;
  pillarsIntro: string;
  discover: string;
  servicesEyebrow: string;
  servicesTitle: string;
  communityEyebrow: string;
  communityTitle: string;
  themes: [string, string, string];
  communityLink: string;
  architectureAlt: string;
  architectureCaption: string;
  communityOutro: string;
  pillars: Array<{ title: string; description: string; href: string }>;
  services: Array<{ title: string; description: string; href: string }>;
};

const copy: Record<Lang, Copy> = {
  fr: {
    skip: "Aller au contenu principal",
    kicker: "CORPS · ESPACE · MOUVEMENT",
    title: "Le corps",
    titleEmphasis: "en mouvement.",
    intro: "La psychomotricité en Tunisie — comprendre, trouver, évoluer.",
    searchLabel: "Rechercher un psychomotricien",
    searchPlaceholder: "Rechercher un psychomotricien",
    searchSubmit: "Trouver un psychomotricien",
    directoryHint: "Explorer l’annuaire",
    imageDescription: "Une scène de jeu et d’équilibre, composée comme un collage éditorial.",
    artworkLabel: "Une trajectoire relie le corps, l’espace et le mouvement.",
    annotationLabels: ["Équilibre", "Perception", "Coordination", "Jeu", "Émotion", "Autonomie"],
    pillarsEyebrow: "Une approche en mouvement",
    pillarsTitle: "Trois repères, un même élan.",
    pillarsIntro: "Le corps, l’espace et le mouvement se répondent dans l’expérience psychomotrice.",
    discover: "Explorer",
    servicesEyebrow: "Les ressources de la chambre",
    servicesTitle: "Entrer dans la plateforme",
    communityEyebrow: "La CSNPT · Tunisie",
    communityTitle: "Une communauté au service du développement des personnes, tout au long de la vie.",
    themes: ["Une profession au service de tous", "Enfants · Adultes · Personnes âgées", "Prévention · Inclusion · Qualité de vie"],
    communityLink: "Découvrir l’adhésion",
    architectureAlt: "Porte traditionnelle ouvrant sur une cour tunisienne lumineuse.",
    architectureCaption: "Des lieux pour se rencontrer et avancer.",
    communityOutro: "Des espaces pour grandir ensemble",
    pillars: [
      { title: "CORPS", description: "Tonus, posture, perceptions et expressions : le corps comme point de départ.", href: "/comprendre" },
      { title: "ESPACE", description: "Explorer, s’orienter et trouver sa place dans son environnement.", href: "/domaines" },
      { title: "MOUVEMENT", description: "Le geste et le mouvement au fil du développement et des rencontres.", href: "/comprendre" },
    ],
    services: [
      { title: "Annuaire", description: "Trouvez un psychomotricien.", href: "/trouver" },
      { title: "Formations", description: "Découvrez les formations.", href: "/formations" },
      { title: "Adhésion", description: "Rejoignez la chambre.", href: "/adhesion" },
      { title: "Bibliothèque", description: "Ressources et publications.", href: "/ressources" },
    ],
  },
  ar: {
    skip: "انتقل إلى المحتوى الرئيسي",
    kicker: "الجسد · الفضاء · الحركة",
    title: "الجسد",
    titleEmphasis: "في حركة.",
    intro: "علم النفس الحركي في تونس — للفهم والبحث والتطور.",
    searchLabel: "البحث عن أخصائي في علم النفس الحركي",
    searchPlaceholder: "ابحث عن أخصائي في علم النفس الحركي",
    searchSubmit: "ابحث عن أخصائي",
    directoryHint: "استكشف الدليل",
    imageDescription: "مشهد للعب والتوازن بتكوين فني تحريري.",
    artworkLabel: "مسار يصل بين الجسد والفضاء والحركة.",
    annotationLabels: ["التوازن", "الإدراك", "التنسيق", "اللعب", "العاطفة", "الاستقلالية"],
    pillarsEyebrow: "مقاربة حركية",
    pillarsTitle: "ثلاثة معالم، ونبض واحد.",
    pillarsIntro: "يتفاعل الجسد والفضاء والحركة في التجربة الحركية النفسية.",
    discover: "اكتشف",
    servicesEyebrow: "موارد الغرفة",
    servicesTitle: "استكشف المنصة",
    communityEyebrow: "الغرفة النقابية · تونس",
    communityTitle: "مجتمع يدعم نمو الأشخاص في مختلف مراحل الحياة.",
    themes: ["مهنة في خدمة الجميع", "الأطفال · البالغون · كبار السن", "الوقاية · الإدماج · جودة الحياة"],
    communityLink: "معلومات الانخراط",
    architectureAlt: "باب تقليدي يفتح على فناء تونسي مضيء.",
    architectureCaption: "أماكن للقاء والتقدم.",
    communityOutro: "مساحات للنمو معًا",
    pillars: [
      { title: "الجسد", description: "التوتر العضلي والوضعية والإدراك والتعبير: الجسد نقطة الانطلاق.", href: "/comprendre" },
      { title: "الفضاء", description: "استكشاف البيئة والتوجه فيها وإيجاد المكان المناسب.", href: "/domaines" },
      { title: "الحركة", description: "الحركة والإيماءة خلال النمو واللقاءات.", href: "/comprendre" },
    ],
    services: [
      { title: "الدليل", description: "ابحث عن أخصائي.", href: "/trouver" },
      { title: "التكوينات", description: "اكتشف التكوينات.", href: "/formations" },
      { title: "الانخراط", description: "انضم إلى الغرفة.", href: "/adhesion" },
      { title: "المكتبة", description: "الموارد والمنشورات.", href: "/ressources" },
    ],
  },
  en: {
    skip: "Skip to main content",
    kicker: "BODY · SPACE · MOVEMENT",
    title: "The body",
    titleEmphasis: "in motion.",
    intro: "Psychomotricity in Tunisia — understand, find, grow.",
    searchLabel: "Find a psychomotrician",
    searchPlaceholder: "Search for a psychomotrician",
    searchSubmit: "Find a psychomotrician",
    directoryHint: "Explore the directory",
    imageDescription: "A scene of play and balance arranged as an editorial collage.",
    artworkLabel: "A trajectory connects body, space and movement.",
    annotationLabels: ["Balance", "Perception", "Coordination", "Play", "Emotion", "Autonomy"],
    pillarsEyebrow: "An approach in motion",
    pillarsTitle: "Three points, one impulse.",
    pillarsIntro: "Body, space and movement meet in psychomotor experience.",
    discover: "Explore",
    servicesEyebrow: "Chamber resources",
    servicesTitle: "Explore the platform",
    communityEyebrow: "CSNPT · Tunisia",
    communityTitle: "A community supporting people’s development throughout life.",
    themes: ["A profession serving everyone", "Children · Adults · Older people", "Prevention · Inclusion · Quality of life"],
    communityLink: "Membership information",
    architectureAlt: "A traditional doorway opens onto a sunlit Tunisian courtyard.",
    architectureCaption: "Places to meet and move forward.",
    communityOutro: "Spaces to grow together",
    pillars: [
      { title: "BODY", description: "Tone, posture, perception and expression: the body as a starting point.", href: "/comprendre" },
      { title: "SPACE", description: "Explore, orient yourself and find your place in the environment.", href: "/domaines" },
      { title: "MOVEMENT", description: "Gesture and movement through development and connection.", href: "/comprendre" },
    ],
    services: [
      { title: "Directory", description: "Find a psychomotrician.", href: "/trouver" },
      { title: "Training", description: "Discover training.", href: "/formations" },
      { title: "Membership", description: "Join the chamber.", href: "/adhesion" },
      { title: "Library", description: "Resources and publications.", href: "/ressources" },
    ],
  },
};

const serviceIcons = [MapPin, GraduationCap, UserPlus, BookOpen];
const themeIcons = [Users, Leaf, Sun];
const filterLinks = [
  { fr: "Par ville", ar: "حسب المدينة", en: "By city", href: "/trouver" },
  { fr: "Par approche", ar: "حسب النهج", en: "By approach", href: "/domaines" },
  { fr: "Par public", ar: "حسب الفئة", en: "By audience", href: "/trouver" },
  { fr: "Carte interactive", ar: "الخريطة التفاعلية", en: "Interactive map", href: "/trouver" },
] as const;

function MovementCollage({ content, isRtl }: { content: Copy; isRtl: boolean }) {
  return (
    <figure className="editorial-collage relative mx-auto w-full" aria-label={content.artworkLabel}>
      <div className="collage-calm-ground" aria-hidden="true"><span /></div>
      <div className="collage-image-frame relative pr-12" style={{ maskImage: "linear-gradient(to right, transparent 0%, black 25%, black 100%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 25%, black 100%)" }}>
        <Image
          src="/images/editorial/hero-movement-gemini.png"
          width={2752}
          height={1536}
          sizes="(max-width: 1100px) 100vw, 58vw"
          priority
          alt={content.imageDescription}
          className="editorial-collage-image object-cover opacity-90 saturate-[0.85] mix-blend-multiply"
        />
      </div>
      <div className="absolute right-0 top-0 bottom-0 hidden lg:flex items-center justify-end z-20 pr-4">
        <div style={{ transform: "rotate(180deg)", writingMode: "vertical-rl" }} className="text-sm text-[#14272A] italic font-serif tracking-widest py-12 bg-gradient-to-l from-[#F7F3EB] via-[#F7F3EB]/80 to-transparent" lang={isRtl ? "ar" : "fr"}>
          {content.annotationLabels.join(" · ")}
        </div>
      </div>
    </figure>
  );
}

const pillarAssets = ["corps", "espace", "mouvement"] as const;

function PillarIllustration({ index }: { index: number }) {
  return (
    <Image
      src={`/images/editorial/pillar-${pillarAssets[index]}-gemini.png`}
      width={2048}
      height={2048}
      sizes="(max-width: 700px) 90vw, 30vw"
      alt=""
      loading="lazy"
      className="pillar-illustration mix-blend-multiply opacity-90 saturate-[0.85] bg-transparent shadow-none border-0"
    />
  );
}

export default function EditorialHome() {
  const [language, setLanguage] = useState<Lang>("fr");
  const [sensoryMode, setSensoryMode] = useState<"standard" | "calm" | "contrast">("standard");
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const onLanguageChange = useCallback((next: Lang) => setLanguage(next), []);
  const content = copy[language];
  const isRtl = language === "ar";

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("csnpt-sensory");
      // Restore persisted accessibility preference after the initial matching render.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored === "calm" || stored === "contrast") setSensoryMode(stored);
    } catch {
      // Keep the standard mode when storage is unavailable.
    }
  }, []);

  function handleCalmToggle() {
    const current = document.documentElement.getAttribute("data-sensory-mode");
    const next = current === "calm" ? "standard" : "calm";
    setSensoryMode(next);
    document.documentElement.setAttribute("data-sensory-mode", next);
    try { window.localStorage.setItem("csnpt-sensory", next); } catch {}
  }

  function handleDyslexicToggle() {
    setDyslexicFont((enabled) => !enabled);
    document.documentElement.classList.toggle("font-dyslexic", !dyslexicFont);
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    const input = event.currentTarget.elements.namedItem("q");
    if (input instanceof HTMLInputElement) input.value = input.value.trim();
  }

  return (
    <>
      <a className="home-skip-link" href="#main-content">{content.skip}</a>
      <Navbar
        currentLang={language}
        onLanguageChange={onLanguageChange}
        calmMode={sensoryMode === "calm"}
        onToggleCalmMode={handleCalmToggle}
        dyslexicFont={dyslexicFont}
        onToggleDyslexicFont={handleDyslexicToggle}
      />
      <main id="main-content" className="editorial-home" dir={isRtl ? "rtl" : "ltr"}>
        <section className="editorial-hero grid grid-cols-12 items-center gap-8 bg-[#F7F3EB] px-8 pt-12 pb-24 lg:pt-16" aria-labelledby="home-title">
          <div className="hero-copy col-span-12 lg:col-span-5">
            <p className="hero-kicker mb-6 text-sm font-bold tracking-[0.2em]">{content.kicker}</p>
            <h1 id="home-title" className="font-serif text-7xl leading-none text-[#14272A]">
              {content.title}<br />
              <span className="italic text-[#0E5A5F]">{content.titleEmphasis}</span>
            </h1>
            <p className="hero-intro mt-6 text-xl text-gray-700">{content.intro}</p>
            <form action="/trouver" method="get" className="hero-search mt-8 flex w-full max-w-lg items-center gap-3 rounded-full border border-gray-100 bg-white p-2 shadow-lg" onSubmit={handleSearch} role="search">
              <Search aria-hidden="true" size={21} className="ms-3 shrink-0 text-[#0E5A5F]" />
              <label className="sr-only" htmlFor="home-directory-query">{content.searchLabel}</label>
              <input id="home-directory-query" type="search" name="q" placeholder={content.searchPlaceholder} aria-label={content.searchLabel} className="min-w-0 flex-1 border-0 bg-transparent px-1 text-sm outline-none" />
              <MagneticButton type="submit" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0E5A5F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#09474b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4623B]">
                <span>{content.searchSubmit}</span><ArrowRight size={17} aria-hidden="true" className="rtl:rotate-180" />
              </MagneticButton>
            </form>
            <nav className="hero-quick-links mt-4 flex flex-wrap gap-2" aria-label={content.directoryHint}>
              {filterLinks.map((item) => (
                <Link key={item.href + item.fr} href={item.href} className="rounded-full bg-[#EAE3D9] px-4 py-1.5 text-sm text-gray-600 transition hover:bg-[#ddd3c5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E5A5F]">
                  {item[language]}
                </Link>
              ))}
            </nav>
          </div>
          <div className="hero-art-wrap col-span-12 min-w-0 lg:col-span-7">
            <MovementCollage content={content} isRtl={isRtl} />
            <p className="sr-only">{content.imageDescription}</p>
          </div>
        </section>

        <section id="understand" className="home-pillars-restored" aria-labelledby="pillars-title">
          <div className="home-restored-heading">
            <p className="home-restored-eyebrow">{content.pillarsEyebrow}</p>
            <h2 id="pillars-title">{content.pillarsTitle}</h2>
            <p>{content.pillarsIntro}</p>
          </div>
          <div id="domains" className="pillar-list-restored grid grid-cols-1 md:grid-cols-3">
            {content.pillars.map((pillar, index) => (
              <article className="pillar-card-restored group" key={pillar.title}>
                <div className="pillar-image-restored">
                    <PillarIllustration index={index} />
                </div>
                <div className="pillar-copy-restored">
                  <p className="pillar-index-restored">0{index + 1}</p>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.description}</p>
                  <Link href={pillar.href} aria-label={`${content.discover} : ${pillar.title}`}>
                    {content.discover}<ArrowRight size={16} aria-hidden="true" className="rtl:rotate-180" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="observatory" className="home-actions-restored" aria-labelledby="services-title">
          <div className="home-restored-heading home-actions-heading">
            <p className="home-restored-eyebrow">{content.servicesEyebrow}</p>
            <h2 id="services-title">{content.servicesTitle}</h2>
          </div>
          <nav aria-label={content.servicesTitle} className="service-list-restored grid grid-cols-1 md:grid-cols-4">
            {content.services.map((service, index) => {
              const Icon = serviceIcons[index];
              return (
                <Link href={service.href} className="service-card-restored group" key={service.title}>
                  <span className={`service-icon-restored service-icon-${index + 1}`}><Icon size={23} strokeWidth={1.6} aria-hidden="true" /></span>
                  <span className="service-copy-restored"><strong>{service.title}</strong><small>{service.description}</small></span>
                  <ArrowRight className="service-arrow-restored rtl:rotate-180" size={18} aria-hidden="true" />
                </Link>
              );
            })}
          </nav>
        </section>

        <section className="community-banner relative mt-8 bg-[#0E5A5F] text-white" aria-labelledby="community-title">
          <div className="community-inner grid grid-cols-1 items-stretch lg:grid-cols-[1.15fr_1.7fr_.9fr]">
            <div className="community-copy">
              <Image src="/images/editorial/community-tunisia-gemini.png" width={2528} height={1696} sizes="(max-width: 899px) 100vw, 32vw" alt="" loading="lazy" className="community-art-left-image" />
              <div className="community-copy-content">
                <p className="section-eyebrow">{content.communityEyebrow}</p>
                <h2 id="community-title">{content.communityTitle}</h2>
                <Link href="/adhesion" className="community-cta">{content.communityLink}<ArrowRight size={17} aria-hidden="true" className="rtl:rotate-180" /></Link>
              </div>
            </div>
            <ul className="community-themes grid grid-cols-1 md:grid-cols-3">
              {content.themes.map((theme, index) => {
                const Icon = themeIcons[index];
                return <li key={theme}><Icon size={25} strokeWidth={1.3} aria-hidden="true" /><span>{theme}</span></li>;
              })}
            </ul>
            <div className="community-doorway">
              <Image src="/images/editorial/community-tunisia-gemini.png" width={2528} height={1696} sizes="(max-width: 899px) 100vw, 25vw" alt="" loading="lazy" className="community-art-right-image object-cover opacity-30" style={{ opacity: 0.3 }} />
              <p className="community-outro text-white drop-shadow-md" style={{ color: "#fff", textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>{content.communityOutro}</p>
            </div>
          </div>
        </section>
      </main>
      <Footer currentLang={language} />
    </>
  );
}
