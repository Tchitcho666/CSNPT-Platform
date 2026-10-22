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
  const [logoFailed, setLogoFailed] = useState(false);
  const [language, setLanguage] = useState<Lang>(currentLang);

  useEffect(() => {
    let saved = currentLang;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (isLang(stored)) saved = stored;
    } catch {}
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
        <div className="csnpt-global-header-inner mx-auto flex h-24 max-w-[1400px] items-center justify-between px-6">
          
          {/* LOGO AREA - MADE BIGGER AND CLEARER */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="csnpt-brand flex shrink-0 items-center gap-3"
            aria-label={`${t.org} — CSNPT`}
          >
            {!logoFailed && (
              <Image
                src="/csnpt-logo-icon.png"
                alt="CSNPT Logo"
                width={56}
                height={56}
                className="h-14 w-14 object-contain"
                onError={() => setLogoFailed(true)}
                priority
              />
            )}
            <span className="font-serif text-3xl font-bold text-[#0E5A5F] tracking-tight">
              CSNPT
            </span>
          </Link>

          <nav className="csnpt-primary-nav hidden items-center gap-6 lg:flex" aria-label="Navigation principale">
            {links.map((link) =>
              link.href.startsWith("/#") ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="group relative whitespace-nowrap text-[15px] font-medium text-[#14272A] transition-colors hover:text-[#0E5A5F]"
                >
                  {link.label}
                  <span aria-hidden="true" className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#C4623B] transition-all duration-300 group-hover:w-full" />
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative whitespace-nowrap text-[15px] font-medium transition-colors hover:text-[#0E5A5F] ${
                    active(link.href) ? "text-[#0E5A5F]" : "text-[#14272A]"
                  }`}
                >
                  {link.label}
                  <span aria-hidden="true" className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#C4623B] transition-all duration-300 group-hover:w-full" />
                </Link>
              )
            )}
          </nav>

          <div className="csnpt-nav-utilities hidden shrink-0 items-center gap-3 xl:flex">
            <Link href="/#observatory" className="nav-search-link rounded-full p-2 transition hover:bg-black/5" aria-label={t.search} title={t.search}>
              <Search size={18} aria-hidden="true" />
            </Link>
            <button
              type="button"
              onClick={onToggleCalmMode}
              aria-pressed={calmMode}
              title={t.calm}
              className={`flex h-10 items-center gap-1.5 rounded-xl border px-3 text-[12px] font-semibold transition ${
                calmMode ? "border-[#0E5A5F] bg-[#0E5A5F]/10 text-[#0E5A5F]" : "border-gray-200 bg-white/50 text-gray-700 hover:bg-white"
              }`}
            >
              <Eye size={16} />
              {t.calm}
            </button>

            <button
              type="button"
              onClick={onToggleDyslexicFont}
              aria-pressed={dyslexicFont}
              title="Accessible typography"
              className={`flex h-10 items-center gap-1.5 rounded-xl border px-3 text-[12px] font-semibold transition ${
                dyslexicFont ? "border-[#0E5A5F] bg-[#0E5A5F]/10 text-[#0E5A5F]" : "border-gray-200 bg-white/50 text-gray-700 hover:bg-white"
              }`}
            >
              <Type size={16} />
              {t.dys}
            </button>

            <div className="flex h-10 items-center gap-1 rounded-xl border border-gray-200 bg-white/50 p-1">
              <Globe2 size={14} className="mx-1 text-gray-500" />
              {(["fr", "ar", "en"] as Lang[]).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => changeLanguage(lang)}
                  aria-pressed={language === lang}
                  className={`h-8 min-w-8 rounded-lg px-2 text-[11px] font-bold transition ${
                    language === lang ? "bg-[#0E5A5F] text-white shadow-sm" : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {lang === "ar" ? "ع" : lang.toUpperCase()}
                </button>
              ))}
            </div>

            <Link
              href="/espace-pro/login"
              className="flex items-center gap-2 rounded-full bg-[#C4623B] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#A84D2B] shadow-md hover:shadow-lg"
            >
              <ShieldCheck size={16} />
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
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div id="site-mobile-menu" className="csnpt-mobile-menu border-t border-gray-200 bg-[#F7F3EB] xl:hidden">
            <div className="mx-auto grid w-[calc(100%-32px)] max-w-[700px] gap-1 py-4">
               {links.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-lg font-bold text-[#14272A] hover:bg-black/5">
                    {link.label}
                  </Link>
               ))}
              <Link
                href="/espace-pro/login"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#0E5A5F] px-4 py-3 font-bold text-white"
              >
                <ShieldCheck size={18} />
                {t.pro}
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* MOBILE BOTTOM NAV */}
      <nav
        aria-label={language === "ar" ? "التنقل على الهاتف" : "Navigation mobile"}
        className="csnpt-mobile-nav fixed inset-x-0 bottom-0 z-[9999] grid min-h-[68px] grid-cols-5 border-t border-gray-200 bg-[#F7F3EB]/95 px-1 pb-[max(5px,env(safe-area-inset-bottom))] pt-1 backdrop-blur-md xl:hidden"
      >
        <Link href="/" className={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-bold ${active("/") ? "text-[#0E5A5F]" : "text-gray-500"}`}>
          <Home size={20} />
          {t.home}
        </Link>
        <Link href="/trouver" className={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-bold ${active("/trouver") ? "text-[#0E5A5F]" : "text-gray-500"}`}>
          <Search size={20} />
          {t.directory}
        </Link>
        <Link href="/comprendre" className={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-bold ${active("/comprendre") ? "text-[#0E5A5F]" : "text-gray-500"}`}>
          <BookOpen size={20} />
          {t.understand}
        </Link>
        <Link href="/formations" className={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-bold ${active("/formations") ? "text-[#0E5A5F]" : "text-gray-500"}`}>
          <span className="grid h-[20px] w-[20px] place-items-center text-[12px] font-black">F</span>
          {t.training}
        </Link>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-bold ${open ? "text-[#0E5A5F]" : "text-gray-500"}`}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
          {t.menu}
        </button>
      </nav>
    </>
  );
}