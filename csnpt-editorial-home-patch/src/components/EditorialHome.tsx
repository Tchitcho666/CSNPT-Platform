import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Leaf,
  MapPin,
  Search,
  Sun,
  User,
  UserPlus,
  Users,
} from "lucide-react";

const pillars = [
  {
    number: "01",
    title: "CORPS",
    description:
      "Le corps comme point de départ : tonus, posture, schéma corporel, perceptions et expressions.",
    href: "/comprendre",
    icon: "body",
  },
  {
    number: "02",
    title: "ESPACE",
    description:
      "L’espace pour explorer, s’orienter et se situer dans le monde.",
    href: "/domaines",
    icon: "space",
  },
  {
    number: "03",
    title: "MOUVEMENT",
    description:
      "Le mouvement comme moteur de développement, d’apprentissage et de lien.",
    href: "/comprendre",
    icon: "movement",
  },
];

const services = [
  {
    title: "Annuaire",
    description: "Trouvez un psychomotricien près de chez vous.",
    href: "/trouver",
    icon: MapPin,
    tone: "mint",
  },
  {
    title: "Formations",
    description: "Découvrez les formations et événements.",
    href: "/formations",
    icon: GraduationCap,
    tone: "peach",
  },
  {
    title: "Adhésion",
    description: "Rejoignez la chambre et bénéficiez de ses services.",
    href: "/adhesion",
    icon: UserPlus,
    tone: "sage",
  },
  {
    title: "Bibliothèque",
    description: "Ressources, outils et publications pour les professionnels.",
    href: "/ressources",
    icon: BookOpen,
    tone: "clay",
  },
];

function MovementArtwork() {
  return (
    <div
      className="editorial-artwork relative mx-auto w-full max-w-[780px]"
      aria-label="Illustration abstraite du corps en mouvement"
      role="img"
    >
      <div className="art-paper-shape absolute inset-[7%_7%_4%_4%] rounded-[46%_54%_48%_52%] bg-[#EAE2D4]" />
      <div className="art-terra-circle absolute left-[29%] top-[5%] aspect-square w-[42%] rounded-full bg-[#C4623B]" />
      <div className="art-teal-leaf absolute right-[10%] top-[21%] h-[39%] w-[18%] rotate-[35deg] rounded-[100%_0_100%_0] bg-[#0E5A5F]" />
      <div className="art-photo-one calm-hidden absolute left-[24%] top-[12%] h-[68%] w-[47%] overflow-hidden rounded-[48%_48%_18%_18%]">
        <img
          src="https://images.unsplash.com/photo-1544413660-299165566b1d?q=80&w=900&auto=format&fit=crop"
          alt=""
          className="h-full w-full object-cover object-center mix-blend-multiply opacity-80"
          loading="eager"
        />
      </div>
      <div className="art-photo-two calm-hidden absolute bottom-[7%] right-[10%] h-[35%] w-[27%] overflow-hidden rounded-t-[48%]">
        <img
          src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=700&auto=format&fit=crop"
          alt=""
          className="h-full w-full object-cover object-center mix-blend-multiply opacity-75"
          loading="lazy"
        />
      </div>
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 760 590"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M8 150 C120 145 106 295 250 348 S455 355 510 220 S665 85 748 105"
          stroke="#C4623B"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M15 455 C155 440 150 330 285 385 S450 520 535 420 S665 340 755 375"
          stroke="#0E5A5F"
          strokeWidth="2"
          strokeLinecap="round"
          opacity=".8"
        />
        <path
          d="M95 180 C120 55 300 30 430 85 S630 210 620 360"
          stroke="#0E5A5F"
          strokeWidth="1.5"
          opacity=".28"
        />
        {[ [108, 251], [250, 348], [510, 220], [535, 420] ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" fill="#F6F1E9" stroke="#0E5A5F" strokeWidth="2" />
        ))}
        <g fill="#C4623B">
          <circle cx="78" cy="225" r="3" />
          <circle cx="90" cy="205" r="3" />
          <circle cx="102" cy="185" r="3" />
          <circle cx="114" cy="165" r="3" />
          <circle cx="126" cy="145" r="3" />
        </g>
      </svg>
      <p className="absolute right-[-1%] top-[23%] hidden font-serif text-[clamp(14px,1.2vw,20px)] italic leading-[1.55] text-[#14272A] xl:block">
        Équilibre
        <br />
        Perception
        <br />
        Coordination
        <br />
        Jeu
        <br />
        Émotion
        <br />
        Autonomie
      </p>
      <span className="absolute bottom-[2%] left-[8%] font-sans text-[9px] uppercase tracking-[.32em] text-[#14272A]/75">
        Des trajectoires pour toute une vie
      </span>
    </div>
  );
}

function PillarIllustration({ kind }: { kind: string }) {
  if (kind === "body") {
    return (
      <svg viewBox="0 0 160 125" className="h-28 w-36" fill="none" aria-hidden="true">
        <path d="M79 8 C75 26 87 29 83 44 L80 74 C80 90 94 102 104 113" stroke="#14272A" strokeWidth="1.5" />
        <path d="M61 8 C66 26 53 31 58 46 L62 73 C63 90 51 101 42 113" stroke="#14272A" strokeWidth="1.5" />
        <path d="M80 43 C68 47 68 61 76 72 M62 45 C72 53 70 68 61 77" stroke="#0E5A5F" strokeWidth="2" />
        <path d="M10 96 C35 80 47 84 64 97 S104 111 145 79" stroke="#C4623B" strokeWidth="2" />
        <path d="M17 110 C39 98 48 108 64 116 S104 112 127 94" stroke="#0E5A5F" strokeWidth="1.5" opacity=".7" />
      </svg>
    );
  }
  if (kind === "space") {
    return (
      <svg viewBox="0 0 160 125" className="h-28 w-36" fill="none" aria-hidden="true">
        <path d="M12 102 C45 70 60 114 90 83 S129 45 151 35" stroke="#0E5A5F" strokeWidth="1.5" />
        <path d="M32 107 L75 68 L119 107" stroke="#C4623B" strokeWidth="1.5" />
        <path d="M75 68 V107 M32 107 H119" stroke="#14272A" strokeWidth="1.2" opacity=".65" />
        <circle cx="75" cy="43" r="10" fill="#0E5A5F" />
        <path d="M75 53 L63 76 L82 84 L94 65 M64 76 L47 83 M82 84 L72 104" stroke="#0E5A5F" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 160 125" className="h-28 w-36" fill="none" aria-hidden="true">
      <path d="M3 83 C38 83 32 42 68 54 S105 102 157 45" stroke="#C4623B" strokeWidth="2" />
      <circle cx="76" cy="28" r="10" fill="#C4623B" />
      <path d="M76 39 L72 65 L53 81 M72 65 L96 76 L112 57 M72 65 L60 101 M72 65 L95 105" stroke="#0E5A5F" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 110 C45 93 62 117 87 108 S127 92 151 105" stroke="#0E5A5F" strokeWidth="1.5" opacity=".65" />
    </svg>
  );
}

export default function EditorialHome() {
  return (
    <main className="editorial-home min-h-screen overflow-hidden bg-[#F6F1E9] text-[#14272A]">
      <header className="relative z-20 border-b border-[#14272A]/15">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-6 px-5 py-5 md:px-10 xl:px-14">
          <Link href="/" className="group min-w-[170px]" aria-label="CSNPT — Accueil">
            <span className="block font-serif text-[38px] leading-none tracking-[-.06em] text-[#0E5A5F]">CSNPT</span>
            <span className="mt-2 block max-w-[245px] text-[8px] font-semibold uppercase leading-[1.35] tracking-[.12em]">
              Chambre syndicale nationale des psychomotriciens tunisiens
            </span>
          </Link>

          <nav className="hidden items-center gap-5 text-[13px] font-medium lg:flex xl:gap-7" aria-label="Navigation principale">
            <Link className="editorial-nav-link" href="/comprendre">Comprendre</Link>
            <Link className="editorial-nav-link" href="/trouver">Annuaire</Link>
            <Link className="editorial-nav-link" href="/formations">Formations</Link>
            <Link className="editorial-nav-link" href="/ressources">Ressources</Link>
            <Link className="editorial-nav-link" href="/actualites">Actualités</Link>
            <Link className="editorial-nav-link" href="/contact">Contact</Link>
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <Link href="/trouver" aria-label="Rechercher" className="rounded-full p-2 transition hover:bg-[#0E5A5F]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E5A5F]">
              <Search size={22} strokeWidth={1.7} />
            </Link>
            <Link href="/espace-pro" className="hidden items-center gap-2 rounded-full border border-[#14272A]/60 px-5 py-3 text-sm transition hover:bg-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E5A5F] sm:inline-flex">
              <User size={17} strokeWidth={1.6} />
              Espace pro
            </Link>
            <Link href="/ar" className="border-l border-[#C4623B] pl-4 text-sm font-semibold text-[#0E5A5F] hover:underline" lang="ar">
              العربية
            </Link>
          </div>
        </div>
      </header>

      <section className="editorial-hero mx-auto grid max-w-[1500px] grid-cols-1 items-center gap-8 px-5 pb-10 pt-10 md:px-10 lg:grid-cols-12 lg:gap-5 lg:pb-12 lg:pt-12 xl:px-14">
        <div className="relative z-10 lg:col-span-5">
          <p className="mb-5 text-[11px] font-bold uppercase tracking-[.25em] text-[#C4623B]">Corps <span className="px-2">·</span> Espace <span className="px-2">·</span> Mouvement</p>
          <h1 className="font-serif text-[clamp(58px,7.2vw,112px)] leading-[.83] tracking-[-.065em] text-[#14272A]">
            Le corps
            <br />
            <span className="mt-3 inline-block font-serif italic tracking-[-.07em] text-[#0E5A5F]">en mouvement.</span>
          </h1>
          <p className="mt-7 max-w-[540px] font-sans text-lg leading-relaxed text-[#465557] md:text-xl">
            La psychomotricité en Tunisie — comprendre, trouver, évoluer.
          </p>
          <form action="/trouver" method="get" className="mt-7 flex w-full max-w-[690px] items-center gap-2 rounded-full border border-[#14272A]/15 bg-white p-2 shadow-[0_5px_20px_rgba(20,39,42,.07)] focus-within:border-[#0E5A5F]/60">
            <Search className="ml-2 shrink-0 text-[#14272A]" size={21} strokeWidth={1.7} />
            <input
              type="search"
              name="q"
              placeholder="Rechercher un psychomotricien"
              aria-label="Rechercher un psychomotricien"
              className="min-w-0 flex-1 bg-transparent px-1 py-3 text-sm text-[#14272A] outline-none placeholder:text-[#687577]"
            />
            <button type="submit" className="hidden shrink-0 items-center gap-2 rounded-full bg-[#0E5A5F] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#09474B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4623B] sm:inline-flex">
              Trouver un psychomotricien <ArrowRight size={17} />
            </button>
            <button type="submit" aria-label="Lancer la recherche" className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#0E5A5F] p-3 text-white sm:hidden">
              <ArrowRight size={18} />
            </button>
          </form>
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-[#465557]">
            <Link href="/trouver" className="rounded-full border border-[#14272A]/10 px-4 py-2 transition hover:border-[#0E5A5F]/40 hover:bg-white/70">Par ville</Link>
            <Link href="/domaines" className="rounded-full border border-[#14272A]/10 px-4 py-2 transition hover:border-[#0E5A5F]/40 hover:bg-white/70">Par approche</Link>
            <Link href="/trouver" className="rounded-full border border-[#14272A]/10 px-4 py-2 transition hover:border-[#0E5A5F]/40 hover:bg-white/70">Par public</Link>
            <Link href="/observatoire" className="rounded-full border border-[#14272A]/10 px-4 py-2 transition hover:border-[#0E5A5F]/40 hover:bg-white/70">Carte interactive</Link>
          </div>
        </div>
        <div className="relative min-h-[330px] lg:col-span-7 lg:min-h-[510px] xl:min-h-[600px]">
          <MovementArtwork />
          <div className="absolute right-[4%] top-[2%] hidden border-t border-[#C4623B] pt-2 text-[9px] font-bold uppercase tracking-[.2em] sm:block">01 / Étude du mouvement</div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1500px] grid-cols-1 border-t border-[#14272A]/20 px-5 pb-8 pt-6 sm:grid-cols-2 md:px-10 lg:grid-cols-3 xl:px-14" aria-label="Les trois piliers">
        {pillars.map((pillar, index) => (
          <article key={pillar.number} className={`group relative flex min-h-[220px] flex-col border-[#14272A]/15 py-5 sm:px-5 lg:min-h-[205px] lg:px-7 ${index !== 0 ? "sm:border-l" : ""} ${index === 2 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
            <span className="text-[10px] font-bold tracking-[.2em] text-[#C4623B]">{pillar.number}</span>
            <div className="mt-1 flex items-start justify-between gap-3">
              <div>
                <h2 className="font-serif text-2xl text-[#0E5A5F]">{pillar.title}</h2>
                <span className="mt-2 block h-[2px] w-7 bg-[#C4623B]" />
              </div>
              <PillarIllustration kind={pillar.icon} />
            </div>
            <p className="mt-auto max-w-[340px] pr-12 text-sm leading-relaxed text-[#465557]">{pillar.description}</p>
            <Link href={pillar.href} aria-label={`Découvrir : ${pillar.title.toLowerCase()}`} className="absolute bottom-4 right-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#14272A]/70 transition group-hover:border-[#0E5A5F] group-hover:bg-[#0E5A5F] group-hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4623B]">
              <ArrowDownRight size={19} />
            </Link>
          </article>
        ))}
      </section>

      <section className="mx-auto grid max-w-[1500px] grid-cols-1 gap-3 px-5 pb-8 sm:grid-cols-2 md:px-10 lg:grid-cols-4 xl:px-14" aria-label="Accès rapides">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <Link key={service.title} href={service.href} className="group flex min-h-[116px] items-center justify-between gap-3 rounded-2xl border border-[#14272A]/5 bg-white/90 p-4 shadow-[0_3px_14px_rgba(20,39,42,.035)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_9px_24px_rgba(20,39,42,.09)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E5A5F] sm:p-5">
              <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${service.tone === "mint" ? "bg-[#DCE9E6] text-[#0E5A5F]" : service.tone === "peach" ? "bg-[#FBE2D1] text-[#C4623B]" : service.tone === "sage" ? "bg-[#DDE2CE] text-[#334E43]" : "bg-[#F0DFD2] text-[#A95331]"}`}>
                <Icon size={28} strokeWidth={1.5} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-serif text-xl font-semibold text-[#0E5A5F]">{service.title}</span>
                <span className="mt-1 block text-xs leading-relaxed text-[#59686A]">{service.description}</span>
              </span>
              <ArrowRight className="shrink-0 text-[#C4623B] transition-transform group-hover:translate-x-1" size={18} />
            </Link>
          );
        })}
      </section>

      <section className="relative isolate overflow-hidden bg-[#0E5A5F] text-white">
        <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-8 px-5 py-10 md:px-10 lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-12 xl:px-14">
          <div className="relative z-10 lg:col-span-4">
            <h2 className="max-w-[460px] font-serif text-3xl leading-tight tracking-[-.025em] md:text-4xl">
              Une communauté au service du développement des personnes, tout au long de la vie.
            </h2>
            <span className="mt-5 block h-[2px] w-8 bg-[#C4623B]" />
          </div>
          <div className="relative z-10 grid grid-cols-1 gap-5 sm:grid-cols-3 lg:col-span-5">
            <div className="flex items-center gap-3 border-white/25 sm:flex-col sm:justify-center sm:border-l sm:px-4 sm:text-center">
              <Users size={27} strokeWidth={1.4} />
              <p className="max-w-[180px] text-xs leading-relaxed">Une profession au service de tous</p>
            </div>
            <div className="flex items-center gap-3 border-white/25 sm:flex-col sm:justify-center sm:border-l sm:px-4 sm:text-center">
              <Leaf size={27} strokeWidth={1.4} />
              <p className="max-w-[180px] text-xs leading-relaxed">Enfants · Adultes · Personnes âgées</p>
            </div>
            <div className="flex items-center gap-3 border-white/25 sm:flex-col sm:justify-center sm:border-l sm:px-4 sm:text-center">
              <Sun size={27} strokeWidth={1.4} />
              <p className="max-w-[180px] text-xs leading-relaxed">Prévention · Inclusion · Qualité de vie</p>
            </div>
          </div>
          <div className="calm-hidden relative min-h-[210px] overflow-hidden rounded-[45%_0_0_0] lg:col-span-3 lg:min-h-[290px]">
            <img
              src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=900&auto=format&fit=crop"
              alt="Architecture méditerranéenne et porte traditionnelle"
              className="absolute inset-0 h-full w-full object-cover mix-blend-luminosity opacity-75"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[#0E5A5F]/35 mix-blend-multiply" />
            <p className="absolute bottom-4 right-4 max-w-[170px] text-right font-serif text-2xl italic leading-tight">Des espaces pour grandir ensemble</p>
          </div>
        </div>
      </section>
    </main>
  );
}
