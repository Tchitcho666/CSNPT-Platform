"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Eye,
  Globe2,
  Home,
  Menu,
  Search,
  ShieldCheck,
  Type,
  X,
} from "lucide-react";
import { Lang } from "@/lib/types";

interface NavbarProps {
  currentLang?: Lang;
  onLanguageChange?: (lang: Lang) => void;
  calmMode?: boolean;
  onToggleCalmMode?: () => void;
  dyslexicFont?: boolean;
  onToggleDyslexicFont?: () => void;
}

const STORAGE_KEY = "csnpt-language";

const labels = {
  fr: {
    org: "Chambre Syndicale Nationale des Psychomotriciens Tunisiens",
    tagline: "Corps · Espace · Mouvement",
    home: "Accueil",
    observe: "Observatoire",
    understand: "Comprendre",
    domains: "Domaines",
    directory: "Trouver",
    training: "Formations",
    news: "Actualités",
    resources: "Ressources",
    pro: "Espace pro",
    chamber: "La Chambre",
    calm: "Apaisé",
    dys: "Aa",
    menu: "Menu",
    search: "Rechercher un professionnel",
  },
  ar: {
    org: "الغرفة النقابية الوطنية لأخصائيي النفس الحركي في تونس",
    tagline: "الجسد · الفضاء · الحركة",
    home: "الرئيسية",
    observe: "المرصد",
    understand: "فهم الاختصاص",
    domains: "المجالات",
    directory: "العثور على أخصائي",
    training: "التكوينات",
    news: "الأخبار",
    resources: "الموارد",
    pro: "الفضاء المهني",
    chamber: "الغرفة",
    calm: "هادئ",
    dys: "Aa",
    menu: "القائمة",
    search: "البحث عن أخصائي",
  },
  en: {
    org: "National Trade Chamber of Tunisian Psychomotor Therapists",
    tagline: "Body · Space · Movement",
    home: "Home",
    observe: "Observatory",
    understand: "Understand",
    domains: "Domains",
    directory: "Find",
    training: "Training",
    news: "News",
    resources: "Resources",
    pro: "Professional",
    chamber: "The Chamber",
    calm: "Calm",
    dys: "Aa",
    menu: "Menu",
    search: "Find a professional",
  },
};

function isLang(value: string | null): value is Lang {
  return value === "fr" || value === "ar" || value === "en";
}

export default function Navbar({
  currentLang = "fr",
  onLanguageChange,
  calmMode = false,
  onToggleCalmMode,
  dyslexicFont = false,
  onToggleDyslexicFont,
}: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState<Lang>(currentLang);

  useEffect(() => {
    let saved = currentLang;

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (isLang(stored)) saved = stored;
    } catch {}

    // Restore browser-only preference after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLanguage(saved);
  }, [currentLang]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.dataset.csnptLanguage = language;
    document.documentElement.dataset.csnptReady = "true";
    onLanguageChange?.(language);
  }, [language, onLanguageChange]);

  useEffect(() => {
    // Close the transient menu when navigation changes the route.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  function changeLanguage(lang: Lang) {
    setLanguage(lang);

    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {}

  }

  const t = labels[language];

  const links = [
    { href: "/#observatory", label: t.observe },
    { href: "/#understand", label: t.understand },
    { href: "/#domains", label: t.domains },
    { href: "/trouver", label: t.directory },
    { href: "/formations", label: t.training },
    { href: "/actualites", label: t.news },
    { href: "/ressources", label: t.resources },
    { href: "/la-chambre", label: t.chamber },
  ];

  const active = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="csnpt-global-header sticky top-0 z-50 w-full border-b border-[#14272A]/10 bg-[#F7F3EB]/90 backdrop-blur-md transition-all">
        <div className="csnpt-global-header-inner mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="csnpt-brand flex shrink-0 items-center gap-3"
            aria-label={`${t.org} — CSNPT`}
          >
            <Image src="/csnpt-logo-icon.png" alt="" width={40} height={40} className="h-10 w-10 object-contain" />
            <span className="font-serif text-2xl font-bold text-[#0E5A5F]">CSNPT</span>
          </Link>

          <nav className="csnpt-primary-nav hidden items-center gap-8 lg:flex" aria-label="Navigation principale">
            {links.map((link) =>
              link.href.startsWith("/#") ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="group relative whitespace-nowrap text-sm font-medium text-[#14272A] transition-colors hover:text-[#0E5A5F]"
                >
                  {link.label}<span aria-hidden="true" className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#C4623B] transition-all duration-300 group-hover:w-full" />
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active(link.href) ? "page" : undefined}
                  className={`group relative whitespace-nowrap text-sm font-medium transition-colors hover:text-[#0E5A5F] ${
                    active(link.href)
                      ? "text-[#0E5A5F]"
                      : "text-[#14272A]"
                  }`}
                >
                  {link.label}<span aria-hidden="true" className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#C4623B] transition-all duration-300 group-hover:w-full" />
                </Link>
              )
            )}
          </nav>

          <div className="csnpt-nav-utilities hidden shrink-0 items-center gap-3 xl:flex">
            <Link href="/#observatory" className="nav-search-link rounded-full p-2 transition hover:bg-black/5" aria-label={t.search} title={t.search}>
              <Search size={17} aria-hidden="true" />
            </Link>
            <button
              type="button"
              onClick={onToggleCalmMode}
              aria-pressed={calmMode}
              title={t.calm}
              className={`flex h-10 items-center gap-1.5 rounded-xl border px-3 text-[11px] font-semibold ${
                calmMode
                  ? "border-[var(--teal)] bg-[var(--surface-soft)]"
                  : "border-[var(--line)] bg-[var(--paper-2)]"
              }`}
            >
              <Eye size={15} />
              {t.calm}
            </button>

            <button
              type="button"
              onClick={onToggleDyslexicFont}
              aria-pressed={dyslexicFont}
              title="Accessible typography"
              className={`flex h-10 items-center gap-1.5 rounded-xl border px-3 text-[11px] font-semibold ${
                dyslexicFont
                  ? "border-[var(--teal)] bg-[var(--surface-soft)]"
                  : "border-[var(--line)] bg-[var(--paper-2)]"
              }`}
            >
              <Type size={15} />
              {t.dys}
            </button>

            <div className="flex h-10 items-center gap-1 rounded-xl border border-[var(--line)] bg-[var(--paper-2)] p-1">
              <Globe2 size={14} className="mx-1 text-[var(--muted)]" />
              {(["fr", "ar", "en"] as Lang[]).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => changeLanguage(lang)}
                  aria-pressed={language === lang}
                  aria-label={lang === "ar" ? "العربية" : lang === "fr" ? "Français" : "English"}
                  className={`h-8 min-w-8 rounded-lg px-2 text-[10px] font-bold ${
                    language === lang
                      ? "bg-[var(--surface-soft)] text-[var(--ink)]"
                      : "text-[var(--muted)]"
                  }`}
                >
                  {lang === "ar" ? "ع" : lang.toUpperCase()}
                </button>
              ))}
            </div>

            <Link
              href="/espace-pro/login"
              className="flex items-center gap-2 rounded-full bg-[#C4623B] px-5 py-2 font-medium text-white transition-colors hover:bg-[#A84D2B]"
            >
              <ShieldCheck size={15} />
              {t.pro}
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="site-mobile-menu"
            aria-label={t.menu}
            className="ms-auto grid h-11 w-11 place-items-center rounded-full border border-[#14272A]/10 bg-white/60 transition hover:bg-black/5 xl:hidden"
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        {open && (
          <div id="site-mobile-menu" className="csnpt-mobile-menu border-t border-[var(--line)] bg-[var(--paper)] xl:hidden">
            <div className="mx-auto grid w-[calc(100%-32px)] max-w-[700px] gap-1 py-3">
              <Link href="/" onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 font-bold hover:bg-[var(--surface-soft)]">
                {t.home}
              </Link>
              <Link href="/#observatory" onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 font-bold hover:bg-[var(--surface-soft)]">
                {t.observe}
              </Link>
              <Link href="/#understand" onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 font-bold hover:bg-[var(--surface-soft)]">
                {t.understand}
              </Link>
              <Link href="/#domains" onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 font-bold hover:bg-[var(--surface-soft)]">
                {t.domains}
              </Link>
              <Link href="/trouver" onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 font-bold hover:bg-[var(--surface-soft)]">
                {t.directory}
              </Link>
              <Link href="/formations" onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 font-bold hover:bg-[var(--surface-soft)]">
                {t.training}
              </Link>
              <Link href="/actualites" onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 font-bold hover:bg-[var(--surface-soft)]">
                {t.news}
              </Link>
              <Link href="/ressources" onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 font-bold hover:bg-[var(--surface-soft)]">
                {t.resources}
              </Link>

              <Link
                href="/espace-pro/login"
                onClick={() => setOpen(false)}
                className="mt-1 flex items-center gap-2 rounded-xl bg-[var(--teal)] px-4 py-3 font-bold text-white"
              >
                <ShieldCheck size={16} />
                {t.pro}
              </Link>

              <div className="mt-2 flex flex-wrap items-center gap-2 border-t border-[var(--line)] pt-3">
                {(["fr", "ar", "en"] as Lang[]).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => changeLanguage(lang)}
                    aria-pressed={language === lang}
                    className={`rounded-lg border px-3 py-2 text-xs font-bold ${
                      language === lang
                        ? "border-[var(--teal)] bg-[var(--teal)] text-white"
                        : "border-[var(--line)] bg-[var(--paper-2)]"
                    }`}
                  >
                    {lang === "ar" ? "العربية" : lang.toUpperCase()}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={onToggleCalmMode}
                  aria-pressed={calmMode}
                  className="flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--paper-2)] px-3 py-2 text-xs font-bold"
                >
                  <Eye size={15} />
                  {t.calm}
                </button>

                <button
                  type="button"
                  onClick={onToggleDyslexicFont}
                  aria-pressed={dyslexicFont}
                  className="flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--paper-2)] px-3 py-2 text-xs font-bold"
                >
                  <Type size={15} />
                  {t.dys}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <nav
        aria-label={language === "ar" ? "التنقل على الهاتف" : "Navigation mobile"}
        className="csnpt-mobile-nav fixed inset-x-0 bottom-0 z-[9999] grid min-h-[68px] grid-cols-5 border-t border-[var(--line)] bg-[var(--paper)]/95 px-1 pb-[max(5px,env(safe-area-inset-bottom))] pt-1 backdrop-blur-md xl:hidden"
      >
        <Link
          href="/"
          className={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-bold ${
            active("/") ? "bg-[var(--surface-soft)] text-[var(--teal)]" : "text-[var(--muted)]"
          }`}
        >
          <Home size={19} />
          {t.home}
        </Link>

        <Link
          href="/trouver"
          className={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-bold ${
            active("/trouver") ? "bg-[var(--surface-soft)] text-[var(--teal)]" : "text-[var(--muted)]"
          }`}
        >
          <Search size={19} />
          {t.directory}
        </Link>

        <Link
          href="/comprendre"
          className={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-bold ${
            active("/comprendre") ? "bg-[var(--surface-soft)] text-[var(--teal)]" : "text-[var(--muted)]"
          }`}
        >
          <BookOpen size={19} />
          {t.understand}
        </Link>

        <Link
          href="/formations"
          className={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-bold ${
            active("/formations") ? "bg-[var(--surface-soft)] text-[var(--teal)]" : "text-[var(--muted)]"
          }`}
        >
          <span className="grid h-[19px] w-[19px] place-items-center text-[11px] font-black">F</span>
          {t.training}
        </Link>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-bold ${
            open ? "bg-[var(--surface-soft)] text-[var(--teal)]" : "text-[var(--muted)]"
          }`}
        >
          {open ? <X size={19} /> : <Menu size={19} />}
          {t.menu}
        </button>
      </nav>
    </>
  );
}
