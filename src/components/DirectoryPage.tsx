'use client';

import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import {
  Search,
  MapPin,
  Building2,
  UserCheck,
  ArrowUpRight,
} from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TunisiaLeafletMap from '@/components/directory/TunisiaLeafletMap';
import ClinicModal from '@/components/directory/ClinicModal';

import type { FilterType, Lang, PublicPractitioner } from '@/lib/types';

const copy = {
  fr: {
    title: 'Trouver un psychomotricien.',
    intro:
      'Rechercher un professionnel ou une structure du réseau psychomoteur tunisien.',
    searchPlaceholder:
      'Nom, ville, région ou spécialité',
    all: 'Tous',
    practitioners: 'Praticiens',
    centres: 'Centres',
    result: 'résultat',
    results: 'résultats',
    noResult: 'Aucun résultat trouvé.',
    noResultHint:
      'Essayez un nom, une ville ou une spécialité différente.',
    viewProfile: 'Voir la fiche',
    location: 'Localisation',
    map: 'Voir sur la carte',
    clear: 'Effacer',
  },

  ar: {
    title: 'العثور على أخصائي في علم النفس الحركي.',
    intro:
      'ابحث عن أخصائي أو مركز من شبكة علم النفس الحركي في تونس.',
    searchPlaceholder:
      'الاسم، المدينة، المنطقة أو الاختصاص',
    all: 'الكل',
    practitioners: 'أخصائيون',
    centres: 'مراكز',
    result: 'نتيجة',
    results: 'نتائج',
    noResult: 'لم يتم العثور على نتيجة.',
    noResultHint:
      'جرّب اسمًا أو مدينة أو اختصاصًا مختلفًا.',
    viewProfile: 'عرض الملف',
    location: 'الموقع',
    map: 'عرض على الخريطة',
    clear: 'مسح',
  },

  en: {
    title: 'Find a psychomotrician.',
    intro:
      'Find a professional or centre from the Tunisian psychomotricity network.',
    searchPlaceholder:
      'Name, city, region or specialty',
    all: 'All',
    practitioners: 'Practitioners',
    centres: 'Centres',
    result: 'result',
    results: 'results',
    noResult: 'No result found.',
    noResultHint:
      'Try another name, city or specialty.',
    viewProfile: 'View profile',
    location: 'Location',
    map: 'View on map',
    clear: 'Clear',
  },
};

export default function DirectoryPage({
  practitioners,
  initialQuery,
  initialGovernorate,
}: {
  practitioners: PublicPractitioner[];
  initialQuery: string;
  initialGovernorate: string;
}) {
  const [lang, setLang] =
    useState<Lang>('fr');

  const [calmMode, setCalmMode] =
    useState(false);
  const reduceMotion = useReducedMotion();

  const [dyslexicFont, setDyslexicFont] =
    useState(false);

  const [query, setQuery] =
    useState(initialQuery);

  const [filter, setFilter] =
    useState<FilterType>('all');

  const [governorate, setGovernorate] = useState(initialGovernorate);
  const [contactClinicId, setContactClinicId] = useState<string | null>(null);
  const [contactDetails, setContactDetails] = useState<{
    address: string | null;
    loading: boolean;
  } | null>(null);

  function selectGovernorate(value: string) {
    setGovernorate(value);
    const url = new URL(window.location.href);
    if (value) url.searchParams.set('gov', value);
    else url.searchParams.delete('gov');
    window.history.replaceState({}, '', url);
  }

  useEffect(() => {
    const handleMapSelection = (event: Event) => {
      const value = (event as CustomEvent<string>).detail;
      setGovernorate(typeof value === 'string' ? value : '');
    };
    window.addEventListener('csnpt-governorate-change', handleMapSelection);
    return () => window.removeEventListener('csnpt-governorate-change', handleMapSelection);
  }, []);

  const closeClinicModal = useCallback(() => {
    setContactClinicId(null);
    setContactDetails(null);
  }, []);

  async function revealContact(id: string) {
    setContactClinicId(id);
    setContactDetails({ address: null, loading: true });
    try {
      const response = await fetch(`/api/directory/${encodeURIComponent(id)}/contact`);
      if (!response.ok) throw new Error('Contact unavailable');
      const data = (await response.json()) as { address?: Partial<Record<Lang, string>> };
      setContactDetails({ address: data.address?.[lang] ?? data.address?.fr ?? null, loading: false });
    } catch {
      setContactDetails({ address: null, loading: false });
    }
  }

  const t = copy[lang];

  const isRtl = lang === 'ar';

  /*
   * Keep document language + RTL synchronized.
   */
  useEffect(() => {
    document.documentElement.lang =
      lang;

    document.documentElement.dir =
      isRtl ? 'rtl' : 'ltr';

    document.documentElement.dataset.calm =
      calmMode ? 'true' : 'false';
  }, [lang, isRtl, calmMode]);

  /*
   * Normalize search.
   */
  const normalize = (
    value: string
  ) => {
    return value
      .toLocaleLowerCase()
      .normalize('NFD')
      .replace(
        /[\u0300-\u036f]/g,
        ''
      )
      .trim();
  };

  /*
   * Directory filtering.
   */
  const filteredEntities =
    useMemo(() => {
      const search =
        normalize(query);

      return practitioners.filter(
        (entity) => {
          if (governorate && entity.governorate !== governorate) return false;
          /*
           * Type filter
           */
          if (
            filter !== 'all' &&
            entity.type !== filter
          ) {
            return false;
          }

          /*
           * Empty search =
           * everything matching type.
           */
          if (!search) return true;

          /*
           * Search across all useful fields.
           */
          const values = [
            entity.name,
            entity.roleOrSpecialty.fr,
            entity.roleOrSpecialty.ar,
            entity.roleOrSpecialty.en,

            entity.city.fr,
            entity.city.ar,
            entity.city.en,
          ];

          return values.some(
            (value) =>
              normalize(value).includes(
                search
              )
          );
        }
      );
    }, [query, filter, governorate, practitioners]);

  /*
   * Clear search.
   */
  const clearSearch = () => {
    setQuery('');
  };

  return (
    <div
      className={`csnpt-app ${
        dyslexicFont
          ? 'font-dyslexic'
          : ''
      }`}
      dir={
        isRtl
          ? 'rtl'
          : 'ltr'
      }
    >

      <Navbar
        currentLang={lang}
        onLanguageChange={setLang}
        calmMode={calmMode}
        onToggleCalmMode={() =>
          setCalmMode(
            (value) => !value
          )
        }
        dyslexicFont={dyslexicFont}
        onToggleDyslexicFont={() =>
          setDyslexicFont(
            (value) => !value
          )
        }
      />

      <main
        id="main-content"
        className="
          min-h-screen
          bg-[#FAF7F2]
          text-[#2A2622]
        "
      >

        {/* HEADER */}

        <section
          className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            pt-8
            sm:pt-12
            pb-10
            sm:pb-14
          "
        >

          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-12
              gap-8
              items-end
            "
          >

            {/* LEFT */}

            <div
              className="
                lg:col-span-7
              "
            >

              <h1
                className="
                  max-w-4xl
                  text-4xl
                  sm:text-5xl
                  lg:text-6xl
                  font-extrabold
                  tracking-[-0.04em]
                  leading-[0.98]
                  text-[#182522]
                "
              >
                {t.title}
              </h1>

              <p
                className="
                  mt-5
                  max-w-2xl
                  text-sm
                  sm:text-base
                  leading-relaxed
                  text-[#2A2622]/65
                "
              >
                {t.intro}
              </p>

            </div>

            {/* RIGHT / COUNT */}

            <div
              className="
                lg:col-span-5
                lg:flex
                lg:justify-end
              "
            >

              <div
                className="
                  inline-flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-[#E8DFD5]
                  bg-[#F4EFEA]
                  px-4
                  py-3
                "
              >

                <span
                  className="
                    flex
                    items-center
                    justify-center
                    w-9
                    h-9
                    rounded-xl
                    bg-[#7A9B76]/15
                    text-[#5A8A82]
                  "
                >
                  <UserCheck
                    className="
                      w-4
                      h-4
                    "
                  />
                </span>

                <div>

                  <div
                    className="
                      text-lg
                      font-bold
                      leading-none
                    "
                  >
                    {
                      filteredEntities.length
                    }
                  </div>

                  <div
                    className="
                      mt-1
                      text-[10px]
                      uppercase
                      tracking-wider
                      text-[#2A2622]/50
                    "
                  >
                    {filteredEntities.length >
                    1
                      ? t.results
                      : t.result}
                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* SEARCH + FILTERS */}

        <section
          className="
            border-y
            border-[#E8DFD5]
            bg-[#F4EFEA]/60
          "
        >

          <div
            className="
              max-w-7xl
              mx-auto
              px-4
              sm:px-6
              lg:px-8
              py-5
            "
          >

            <div
              className="
                flex
                flex-col
                lg:flex-row
                gap-4
                lg:items-center
              "
            >

              {/* SEARCH */}

              <div
                className="
                  relative
                  flex-1
                "
              >

                <Search
                  className="
                    absolute
                    start-4
                    top-1/2
                    -translate-y-1/2
                    w-4
                    h-4
                    text-[#5A8A82]
                    pointer-events-none
                  "
                />

                <input
                  type="search"
                  value={query}
                  onChange={(event) =>
                    setQuery(
                      event.target.value
                    )
                  }
                  placeholder={
                    t.searchPlaceholder
                  }
                  aria-label={
                    t.searchPlaceholder
                  }
                  autoComplete="off"
                  className="
                    w-full
                    min-h-[52px]
                    rounded-2xl
                    border
                    border-[#DCD8CE]
                    bg-[#FAF7F2]
                    ps-11
                    pe-12
                    text-sm
                    text-[#182522]
                    outline-none
                    transition-all
                    focus:border-[#5A8A82]
                    focus:ring-2
                    focus:ring-[#5A8A82]/10
                  "
                />

                {query && (
                  <button
                    type="button"
                    onClick={
                      clearSearch
                    }
                    className="
                      absolute
                      end-3
                      top-1/2
                      -translate-y-1/2
                      min-w-[36px]
                      min-h-[36px]
                      rounded-xl
                      text-xs
                      text-[#2A2622]/50
                      hover:bg-[#F0EBE3]
                      hover:text-[#2A2622]
                    "
                    aria-label={
                      t.clear
                    }
                  >
                    ×
                  </button>
                )}

              </div>

              {/* FILTER */}

              <div
                className="
                  flex
                  items-center
                  gap-1
                  rounded-2xl
                  border
                  border-[#DCD8CE]
                  bg-[#FAF7F2]
                  p-1
                  shrink-0
                "
              >

                <button
                  type="button"
                  aria-pressed={
                    filter === 'all'
                  }
                  onClick={() =>
                    setFilter('all')
                  }
                  className={`
                    min-h-[44px]
                    px-4
                    rounded-xl
                    text-xs
                    font-semibold
                    transition-all
                    ${
                      filter ===
                      'all'
                        ? 'bg-[#F0EBE3] text-[#182522] shadow-sm'
                        : 'text-[#2A2622]/55 hover:text-[#2A2622]'
                    }
                  `}
                >
                  {t.all}
                </button>

                <button
                  type="button"
                  aria-pressed={
                    filter ===
                    'praticien'
                  }
                  onClick={() =>
                    setFilter(
                      'praticien'
                    )
                  }
                  className={`
                    min-h-[44px]
                    px-4
                    rounded-xl
                    text-xs
                    font-semibold
                    transition-all
                    inline-flex
                    items-center
                    gap-1.5
                    ${
                      filter ===
                      'praticien'
                        ? 'bg-[#F0EBE3] text-[#182522] shadow-sm'
                        : 'text-[#2A2622]/55 hover:text-[#2A2622]'
                    }
                  `}
                >
                  <UserCheck
                    className="
                      w-3.5
                      h-3.5
                    "
                  />

                  {t.practitioners}
                </button>

                <button
                  type="button"
                  aria-pressed={
                    filter ===
                    'centre'
                  }
                  onClick={() =>
                    setFilter(
                      'centre'
                    )
                  }
                  className={`
                    min-h-[44px]
                    px-4
                    rounded-xl
                    text-xs
                    font-semibold
                    transition-all
                    inline-flex
                    items-center
                    gap-1.5
                    ${
                      filter ===
                      'centre'
                        ? 'bg-[#F0EBE3] text-[#182522] shadow-sm'
                        : 'text-[#2A2622]/55 hover:text-[#2A2622]'
                    }
                  `}
                >
                  <Building2
                    className="
                      w-3.5
                      h-3.5
                    "
                  />

                  {t.centres}
                </button>

              </div>

            </div>

          </div>

        </section>

        <div className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
          <label htmlFor="directory-governorate" className="mb-2 block text-sm font-semibold">
            {lang === 'ar' ? 'الولاية' : lang === 'en' ? 'Governorate' : 'Gouvernorat'}
          </label>
          <select
            id="directory-governorate"
            value={governorate}
            onChange={(event) => selectGovernorate(event.target.value)}
            className="min-h-11 rounded-xl border border-[#DCD8CE] bg-[#FCFCFC] px-3"
          >
            <option value="">{lang === 'ar' ? 'كل الولايات' : lang === 'en' ? 'All governorates' : 'Tous les gouvernorats'}</option>
            {[...new Set(practitioners.map((item) => item.governorate))].sort().map((item) => (
              <option key={item} value={item}>{item.charAt(0).toLocaleUpperCase() + item.slice(1)}</option>
            ))}
          </select>
        </div>

        <div className="mx-auto mt-5 max-w-7xl px-4 sm:px-6 lg:px-8">
          <TunisiaLeafletMap
            currentLang={lang}
            searchQuery={query}
            practitioners={practitioners}
          />
        </div>

        {/* RESULTS */}

        <section
          className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            py-10
            sm:py-14
          "
        >

          {filteredEntities.length ===
          0 ? (
            /* EMPTY */

            <div
              className="
                min-h-[280px]
                flex
                flex-col
                items-center
                justify-center
                text-center
                rounded-3xl
                border
                border-[#E8DFD5]
                bg-[#F4EFEA]
                px-6
              "
            >

              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-[#FAF7F2]
                  border
                  border-[#E8DFD5]
                  flex
                  items-center
                  justify-center
                  text-[#5A8A82]
                "
              >
                <Search
                  className="
                    w-5
                    h-5
                  "
                />
              </div>

              <h2
                className="
                  mt-5
                  text-lg
                  font-bold
                "
              >
                {t.noResult}
              </h2>

              <p
                className="
                  mt-2
                  text-sm
                  text-[#2A2622]/55
                "
              >
                {t.noResultHint}
              </p>

            </div>
          ) : (
            /* RESULTS GRID */

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-5
              "
            >

              {filteredEntities.map(
                (entity, index) => (
                  <motion.div
                    key={entity.id}
                    // Keep the server and first client render identical; only animate
                    // when the card enters view after hydration.
                    initial={false}
                    whileInView={reduceMotion || calmMode ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.45, ease: 'easeOut', delay: reduceMotion || calmMode ? 0 : index * 0.08 }}
                  >
                  <article
                    className="
                      group
                      rounded-3xl
                      border
                      border-[#E8DFD5]
                      bg-[#F4EFEA]
                      p-5
                      sm:p-6
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:shadow-[0_12px_30px_rgba(42,38,34,0.06)]
                    "
                  >

                    {/* TOP */}

                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-4
                      "
                    >

                      <div
                        className={`
                          inline-flex
                          items-center
                          gap-2
                          rounded-full
                          px-3
                          py-1.5
                          text-[10px]
                          font-bold
                          bg-[#C67B5C]/10
                          text-[#C67B5C]
                          border
                          border-[#C67B5C]/20
                        `}
                      >

                        <UserCheck
                          className="
                            w-3
                            h-3
                          "
                        />

                        {t.practitioners}

                      </div>

                    </div>

                    {/* NAME */}

                    <div
                      className="
                        mt-5
                      "
                    >

                      <h2
                        className="
                          text-xl
                          sm:text-2xl
                          font-bold
                          tracking-tight
                          text-[#182522]
                        "
                      >
                        {
                          entity.name
                        }
                      </h2>

                      <p
                        className="
                          mt-1.5
                          text-xs
                          font-semibold
                          text-[#5A8A82]
                        "
                      >
                        {
                          entity
                            .roleOrSpecialty[
                            lang
                          ]
                        }
                      </p>

                    </div>

                    {/* INFO */}

                    <div
                      className="
                        mt-5
                        rounded-2xl
                        border
                        border-[#E8DFD5]/80
                        bg-[#FAF7F2]
                        p-4
                        space-y-3
                      "
                    >

                      <div
                        className="
                          flex
                          items-start
                          gap-3
                          text-xs
                          text-[#2A2622]/70
                        "
                      >

                        <MapPin
                          className="
                            w-4
                            h-4
                            shrink-0
                            text-[#C67B5C]
                          "
                        />

                        <div>

                          <div
                            className="
                              font-semibold
                              text-[#2A2622]
                            "
                          >
                            {entity.governorate.charAt(0).toLocaleUpperCase(lang) + entity.governorate.slice(1)}
                          </div>
                          <a
                            className="mt-1 inline-block text-[#0E5A5F] underline-offset-2 hover:underline"
                            href={`tel:${entity.phone.replace(/[^+\d]/g, '')}`}
                          >
                            {entity.phone}
                          </a>

                        </div>

                      </div>

                    </div>

                    {/* FOOTER */}

                    <div
                      className="
                        mt-5
                        flex
                        items-center
                        justify-between
                        gap-3
                      "
                    >

                      <Link
                        href={`/trouver/praticien/${entity.id}`}
                        className="
                          inline-flex
                          items-center
                          gap-2
                          min-h-[44px]
                          rounded-xl
                          bg-[#5A8A82]
                          px-4
                          py-2
                          text-xs
                          font-semibold
                          text-[#FAF7F2]
                          transition-all
                          hover:bg-[#4E7770]
                        "
                      >

                        {t.viewProfile}

                        <ArrowUpRight
                          className="
                            w-3.5
                            h-3.5
                          "
                        />

                      </Link>

                      <button
                        type="button"
                        onClick={() => void revealContact(entity.id)}
                        className="inline-flex min-h-11 items-center rounded-xl border border-[#0E5A5F] px-4 py-2 text-xs font-semibold text-[#0E5A5F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      >
                        {lang === 'ar' ? 'عرض معلومات الاتصال' : lang === 'en' ? 'View contact details' : 'Voir les coordonnées'}
                      </button>

                    </div>

                  </article>
                  </motion.div>
                )
              )}

            </div>
          )}

        </section>

      </main>

            <ClinicModal
        open={contactClinicId !== null && contactDetails !== null}
        address={contactDetails?.address ?? null}
        loading={contactDetails?.loading ?? false}
        title={lang === 'ar' ? 'معلومات الاتصال' : lang === 'en' ? 'Contact details' : 'Coordonnées'}
        closeLabel={lang === 'ar' ? 'إغلاق' : lang === 'en' ? 'Close' : 'Fermer'}
        loadingLabel={lang === 'ar' ? 'جارٍ التحميل…' : lang === 'en' ? 'Loading…' : 'Chargement…'}
        unavailableLabel={lang === 'ar' ? 'المعلومات غير متاحة.' : lang === 'en' ? 'Details are unavailable.' : 'Coordonnées indisponibles.'}
        direction={isRtl ? 'rtl' : 'ltr'}
        onClose={closeClinicModal}
      />

      <Footer
        currentLang={lang}
      />

    </div>
  );
}
