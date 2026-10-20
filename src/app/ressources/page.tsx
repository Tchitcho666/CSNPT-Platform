/* 
 * CSNPT — Ressources
 * Remplacement complet de src/app/ressources/page.tsx
 */

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  FileText,
  Filter,
  Search,
  Wrench,
} from "lucide-react";

import {
  getResourceList,
  type ResourceLanguage,
  type ResourceType,
} from '@/lib/services/resources';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useDocumentLanguage from '@/lib/useDocumentLanguage';

const resources = getResourceList();

const categories: Array<{
  id: "all" | ResourceType;
  fr: string;
  ar: string;
  en: string;
}> = [
  { id: "all", fr: "Tout", ar: "الكل", en: "All" },
  { id: "guide", fr: "Guides", ar: "أدلة", en: "Guides" },
  { id: "protocol", fr: "Protocoles", ar: "بروتوكولات", en: "Protocols" },
  { id: "official", fr: "Documents officiels", ar: "وثائق رسمية", en: "Official documents" },
  { id: "tool", fr: "Outils", ar: "أدوات", en: "Tools" },
];

const copy = {
  fr: {
    eyebrow: "CSNPT · BIBLIOTHÈQUE PROFESSIONNELLE",
    title: "Ressources professionnelles",
    intro:
      "Guides, protocoles, documents et outils pour accompagner la pratique des psychomotriciens.",
    search: "Rechercher",
    placeholder: "Titre, thème, type...",
    results: "ressources",
    noResults: "Aucune ressource trouvée",
    noResultsText: "Essayez un autre terme ou une autre catégorie.",
    read: "Consulter",
    type: {
      guide: "Guide",
      protocol: "Protocole",
      official: "Document officiel",
      tool: "Outil",
    },
    noteTitle: "À savoir",
    note:
      "Certaines ressources peuvent être destinées aux professionnels et soumises à des conditions d’accès.",
    formationTitle: "Aller plus loin avec les formations",
    formationText:
      "Découvrez les formations et parcours disponibles sur la plateforme.",
    formationLink: "Découvrir les formations",
  },
  ar: {
    eyebrow: "CSNPT · المكتبة المهنية",
    title: "الموارد المهنية",
    intro: "أدلة وبروتوكولات ووثائق وأدوات لمرافقة ممارسة العلاج النفسي الحركي.",
    search: "بحث",
    placeholder: "العنوان، الموضوع، النوع...",
    results: "موارد",
    noResults: "لا توجد موارد",
    noResultsText: "جرّب كلمة أخرى أو تصنيفًا آخر.",
    read: "الاطلاع",
    type: {
      guide: "دليل",
      protocol: "بروتوكول",
      official: "وثيقة رسمية",
      tool: "أداة",
    },
    noteTitle: "ملاحظة",
    note: "قد تكون بعض الموارد مخصّصة للمهنيين وتخضع لشروط وصول.",
    formationTitle: "اكتشف التكوينات",
    formationText: "اكتشف التكوينات والمسارات المتاحة على المنصة.",
    formationLink: "اكتشاف التكوينات",
  },
  en: {
    eyebrow: "CSNPT · PROFESSIONAL LIBRARY",
    title: "Professional resources",
    intro:
      "Guides, protocols, documents and tools supporting psychomotor practice.",
    search: "Search",
    placeholder: "Title, topic, type...",
    results: "resources",
    noResults: "No resources found",
    noResultsText: "Try another term or category.",
    read: "View",
    type: {
      guide: "Guide",
      protocol: "Protocol",
      official: "Official document",
      tool: "Tool",
    },
    noteTitle: "Good to know",
    note:
      "Some resources may be intended for professionals and subject to access conditions.",
    formationTitle: "Go further with training",
    formationText: "Explore training opportunities available on the platform.",
    formationLink: "Discover training",
  },
} as const;

export default function RessourcesPage() {
  const language = useDocumentLanguage() as ResourceLanguage;
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | ResourceType>("all");

  const t = copy[language];

  const filteredResources = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return resources.filter((resource) => {
      const matchesCategory =
        category === "all" || resource.type === category;

      if (!matchesCategory) return false;
      if (!normalized) return true;

      const searchable = [
        resource.title.fr,
        resource.title.ar,
        resource.title.en,
        resource.description.fr,
        resource.description.ar,
        resource.description.en,
        resource.tags.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(normalized);
    });
  }, [category, query]);

  return (
    <>
    <Navbar currentLang={language} />
    <main dir={language === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-[#f7f4ed] text-[#12231f]">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[#173f50] focus:px-5 focus:py-3 focus:text-sm focus:text-white"
      >
        Aller au contenu
      </a>

      {/* Intro */}
      <section
        id="contenu"
        className="border-b border-[#dedbd2] px-5 pb-12 pt-10 sm:px-8 sm:pb-16 sm:pt-12 lg:px-12 lg:pb-16 lg:pt-14"
      >
        <div className="mx-auto max-w-[1180px]">
          <div className="max-w-[780px]">
            <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2c746f]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d77a4f]" />
              {t.eyebrow}
            </div>

            <h1 className="max-w-[760px] text-[46px] font-black leading-[0.98] tracking-[-0.045em] sm:text-[60px] lg:text-[72px]">
              {t.title}
            </h1>

            <p className="mt-6 max-w-[650px] text-[16px] leading-7 text-[#64706c] sm:text-[18px]">
              {t.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Search + filters */}
      <section className="border-b border-[#dedbd2] bg-[#f3f0e8] px-5 py-5 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative min-w-0 flex-1">
            <Search
              size={19}
              strokeWidth={1.8}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#43847e]"
            />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="search"
              aria-label={t.search}
              placeholder={t.placeholder}
              className="h-14 w-full rounded-2xl border border-[#d8d5cd] bg-[#fbfaf6] pl-12 pr-4 text-[15px] text-[#12231f] outline-none transition focus:border-[#43847e] focus:ring-2 focus:ring-[#43847e]/10"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:max-w-[620px]">
            <Filter
              size={17}
              className="mr-1 shrink-0 text-[#64706c]"
              aria-hidden="true"
            />

            {categories.map((item) => {
              const active = category === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCategory(item.id)}
                  className={`shrink-0 rounded-full border px-4 py-2.5 text-sm transition ${
                    active
                      ? "border-[#173f50] bg-[#173f50] text-white"
                      : "border-[#d8d5cd] bg-[#fbfaf6] text-[#45524e] hover:border-[#43847e]"
                  }`}
                >
                  {item[language]}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm text-[#73807b]">
                {filteredResources.length} {t.results}
              </p>
            </div>
          </div>

          {filteredResources.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2">
              {filteredResources.map((resource) => (
                <article
                  key={resource.id}
                  className="group flex min-h-[260px] flex-col rounded-[26px] border border-[#dedbd2] bg-[#fbfaf6] p-6 transition hover:-translate-y-0.5 hover:border-[#aebdb8] sm:p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e7eeea] text-[#2c746f]">
                      {resource.type === "tool" ? (
                        <Wrench size={20} strokeWidth={1.8} />
                      ) : resource.type === "guide" ? (
                        <BookOpen size={20} strokeWidth={1.8} />
                      ) : (
                        <FileText size={20} strokeWidth={1.8} />
                      )}
                    </div>

                    <span className="rounded-full bg-[#f0eee7] px-3 py-1.5 text-[11px] font-medium text-[#5e6a66]">
                      {t.type[resource.type]}
                    </span>
                  </div>

                  <div className="mt-6">
                    <h2 className="max-w-[540px] text-[25px] font-bold leading-tight tracking-[-0.025em]">
                      {resource.title[language]}
                    </h2>

                    <p className="mt-3 max-w-[560px] text-[15px] leading-6 text-[#68736f]">
                      {resource.description[language]}
                    </p>
                  </div>

                  <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-7">
                    <div className="flex flex-wrap gap-2">
                      {resource.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[#dedbd2] px-2.5 py-1 text-[11px] text-[#65716d]"
                        >
                          {tag}
                        </span>
                      ))}
                      <span className="rounded-full border border-[#dedbd2] px-2.5 py-1 text-[11px] text-[#65716d]">
                        {resource.format}
                        {resource.size ? ` · ${resource.size}` : ""}
                      </span>
                    </div>

                    <Link
                      href={`/ressources/${resource.id}`}
                      className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#173f50] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#204f62]"
                    >
                      {t.read}
                      <ArrowUpRight size={16} strokeWidth={1.8} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-[26px] border border-dashed border-[#cbc8c0] bg-[#fbfaf6] px-6 py-16 text-center">
              <h2 className="text-2xl font-bold">{t.noResults}</h2>
              <p className="mt-3 text-[#6d7874]">{t.noResultsText}</p>
            </div>
          )}
        </div>
      </section>

      {/* Notes + training */}
      <section className="border-t border-[#dedbd2] bg-[#f3f0e8] px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1180px] gap-5 lg:grid-cols-[1fr_1fr]">
          <aside className="rounded-[24px] border border-[#dedbd2] bg-[#fbfaf6] p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2c746f]">
              {t.noteTitle}
            </p>
            <p className="mt-4 max-w-[540px] text-[15px] leading-7 text-[#65716d]">
              {t.note}
            </p>
          </aside>

          <div className="rounded-[24px] bg-[#173f50] p-6 text-white sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b7d5d0]">
              CSNPT · Formation
            </p>
            <h2 className="mt-4 text-2xl font-bold tracking-[-0.02em]">
              {t.formationTitle}
            </h2>
            <p className="mt-3 max-w-[540px] text-[15px] leading-7 text-white/75">
              {t.formationText}
            </p>

            <Link
              href="/formations"
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#173f50] transition hover:bg-[#f0eee7]"
            >
              {t.formationLink}
              <ArrowUpRight size={16} strokeWidth={1.8} />
            </Link>
          </div>
        </div>
      </section>
    </main>
    <Footer currentLang={language} />
    </>
  );
}
