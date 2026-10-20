import { 
    MembershipPlan, 
    PractitionerEntity, 
  } from './types';
  
  export const I18N_DATA = {
    fr: {
      domainTag: 'csnpt.tn • Plateforme Nationale UTICA',
      navHome: 'Accueil',
      navRegistry: 'Observatoire',
      navPricing: 'Abonnements',
      navLibrary: 'Protocoles',
      navEvents: 'Billetterie UTICA',
      navTrousse: 'Trousse Clinique',
      heroH1Pre: 'Le corps s’exprime,',
      heroH1Main: 'L’esprit s’équilibre.',
      heroSub:
        'L’instance de référence affiliée à l’UTICA : fédérer les psychomotriciens, cartographier les centres conventionnés, étalonner les bilans et certifier les pratiques en Tunisie.',
      ctaRegistry: 'Explorer l’Observatoire',
      ctaPricing: 'Devenir Membre Agréé',
      accreditedBanner: '+128 Praticiens & 46 Centres Conventionnés inscrits au registre national',
      calmBtn: 'Mode Apaisé',
      dysBtn: 'Police Adaptée',
    },
    ar: {
      domainTag: 'csnpt.tn • المنصة الوطنية الرسمية UTICA',
      navHome: 'الرئيسية',
      navRegistry: 'المرصد الجغرافي',
      navPricing: 'الانخراط والاعتماد',
      navLibrary: 'المكتبة السريرية',
      navEvents: 'تكوينات UTICA',
      navTrousse: 'حقيبة الطوارئ',
      heroH1Pre: 'الجسد يعبّر،',
      heroH1Main: 'والفكر يتوازن.',
      heroSub:
        'الهيكل النقابي الوطني الجامع تحت إشراف الاتحاد التونسي للصناعة والتجارة (UTICA): تأطير أخصائيي العلاج النفسي الحركي، تقنين المراكز، ضبط الاختبارات وتنظيم الدورات العلمية.',
      ctaRegistry: 'استكشاف المرصد والخريطة',
      ctaPricing: 'تفعيل الاعتماد النقابي',
      accreditedBanner: '+128 أخصائياً و 46 مركزاً معتمداً بالرائد النقابي الرسمي',
      calmBtn: 'الوضع الهادئ',
      dysBtn: 'خط ميسر',
    },
    en: {
      domainTag: 'csnpt.tn • Republic of Tunisia • UTICA',
      navHome: 'Home',
      navRegistry: 'Observatory',
      navPricing: 'Membership',
      navLibrary: 'Protocols',
      navEvents: 'Events & Booking',
      navTrousse: 'Clinical Kit',
      heroH1Pre: 'The body expresses,',
      heroH1Main: 'The mind finds balance.',
      heroSub:
        'The official statutory union affiliated with UTICA: certifying psychomotor specialists, mapping centers, and ensuring rigorous developmental therapy in Tunisia.',
      ctaRegistry: 'Registry & Map',
      ctaPricing: 'Get Accredited',
      accreditedBanner: '+128 Practitioners & 46 Clinics Accredited to date',
      calmBtn: 'Calm Mode',
      dysBtn: 'Accessible Font',
    },
  };
  
  export const PLANS: MembershipPlan[] = [
    {
      id: 'member',
      name: { fr: 'Praticien Membre', ar: 'أخصائي ممارس منخرط', en: 'Member Practitioner' },
      tagline: {
        fr: 'Indexation officielle et accès complet aux échelles d’évaluation',
        ar: 'تسجيل رسمي وولوج كامل لشبكات واختبارات التقييم',
        en: 'Official indexing and unrestricted diagnostic batteries access',
      },
      priceTnd: 180,
      accentColor: 'border-sensory-teal',
      features: {
        fr: [
          'Référencement standard dans l’annuaire national CSNPT',
          'Badge membre certifié vérifiable en ligne',
          'Accès complet aux protocoles cliniques et épreuves de bilan',
          'Tarif préférentiel (-40%) sur tous les séminaires UTICA',
        ],
        ar: [
          'إدراج رسمي في الدليل الوطني لأخصائيي علم النفس الحركي',
          'شارة عضوية معتمدة قابلة للتأكد الفوري عبر المنصة',
          'ولوج كامل للمكتبة السريرية وشبكات التقييم والمناشير',
          'تخفيض بنسبة 40% على دورات ومؤتمرات UTICA',
        ],
        en: [
          'Official listing in the CSNPT National Directory',
          'Verified digital membership credential',
          'Full access to clinical test matrices & batteries',
          'Member discounted rate (-40%) on UTICA seminars',
        ],
      },
    },
    {
      id: 'accredited',
      name: {
        fr: 'Praticien Accrédité & Référent',
        ar: 'أخصائي معتمد وممارس مرجعي',
        en: 'Accredited Lead Practitioner',
      },
      tagline: {
        fr: 'Accréditation institutionnelle avec Sceau d’Or officiel',
        ar: 'الاعتماد النقابي والمهني السامي مع الختم الرقمي الذهبي',
        en: 'Statutory clinical accreditation with institutional gold seal',
      },
      priceTnd: 450,
      isPopular: true,
      accentColor: 'border-sensory-terracotta',
      features: {
        fr: [
          'Tous les avantages du plan Praticien Membre',
          'Attribution d’un matricule national officiel (CSNPT-2026-XXXX)',
          'Mise en avant prioritaire sur la carte interactive',
          'Accès gratuit garanti aux séminaires cliniques annuels',
        ],
        ar: [
          'كافة امتيازات باقة الممارس المنخرط',
          'إسناد معرف رقمي رسمي بالرائد النقابي (CSNPT-2026-XXXX)',
          'أولوية ظهور بالختم المعتمد على الخريطة التفاعلية',
          'دخول مجاني بالكامل للملتقيات والندوات العلمية بالـ UTICA',
        ],
        en: [
          'All features of the Member Practitioner plan',
          'Statutory national matricule assignment (CSNPT-2026-XXXX)',
          'Priority spotlight ranking on the interactive map',
          'Complimentary 100% access to clinical training seminars',
        ],
      },
    },
    {
      id: 'clinic',
      name: {
        fr: 'Institution / Clinique Spécialisée',
        ar: 'مؤسسة / مركز تأهيل متخصص',
        en: 'Specialized Center / Clinic',
      },
      tagline: {
        fr: 'Pour centres de rééducation, instituts et cliniques pédiatriques',
        ar: 'لمراكز التأهيل متعدد الاختصاصات والمعاهد الخاصة',
        en: 'For multi-practitioner clinics and therapeutic institutes',
      },
      priceTnd: 1200,
      accentColor: 'border-sensory-sage',
      features: {
        fr: [
          'Indexation complète de l’établissement et du plateau technique',
          'Enregistrement groupé jusqu’à 6 psychomotriciens conventionnés',
          'Publication prioritaire d’offres de recrutement AVS/Pro',
          'Assistance juridique et conventionnement institutionnel UTICA',
        ],
        ar: [
          'تسجيل واعتماد شامل للمركز وتجهيزاته الطبية والحركية',
          'إدراج جماعي لما يصل إلى 6 أخصائيين عاملين بالمؤسسة',
          'نشر مجاني وأولوي لإعلانات انتداب مرافقي الدمج المدرسي AVS',
          'مرافقة قانونية ونقابية معتمدة تحت إشراف منظمة الأعراف UTICA',
        ],
        en: [
          'Full institutional indexing of technical and sensory apparatus',
          'Multi-practitioner registry bundle (up to 6 licensed specialists)',
          'Priority posting of specialized AVS recruitment listings',
          'Statutory legal advisory and formal UTICA institutional patronage',
        ],
      },
    },
  ];
  
  export const PRACTITIONERS: PractitionerEntity[] = [
    {
      id: 'p1',
      type: 'praticien',
      name: 'Mme Ameni Toumi',
      roleOrSpecialty: {
        fr: 'Psychomotricienne Senior • Présidente CSNPT',
        ar: 'أخصائية أولى في العلاج النفسي الحركي • رئيسة الغرفة الوطنية',
        en: 'Senior Psychomotrician • CSNPT President',
      },
      city: { fr: 'Ariana', ar: 'أريانة', en: 'Ariana' },
      address: {
        fr: "Immeuble les Jardins, Bureau 2-3, 2ème étage, Av. les violettes, Jardins d'El Menzah 2, Ariana",
        ar: 'عمارة الحدائق، مكتب 2-3، الطابق 2، نهج البنفسج، حدائق المنزه 2، أريانة',
        en: "Les Jardins Bldg, Suite 2-3, Violettes Ave, Jardins d'El Menzah 2, Ariana",
      },
      lat: 36.8485,
      lng: 10.165,
      phone: '+216 55 690 409',
      tier: 'gold',
      matricule: 'CSNPT-2026-PRES-001',
      badge: {
        fr: 'Cabinet Référent Présidence',
        ar: 'المقر الرئاسي المعتمد',
        en: 'Presidential Reference Clinic',
      },
      isPresident: true,
    },
    {
      id: 'c1',
      type: 'centre',
      name: "Centre d'Éveil et de Réadaptation Psychomotrice",
      roleOrSpecialty: {
        fr: 'Centre Multidisciplinaire Conventionné',
        ar: 'مركز متخصص في التأهيل النفسي الحركي',
        en: 'Conventioned Multidisciplinary Center',
      },
      city: { fr: 'Tunis', ar: 'تونس', en: 'Tunis' },
      address: {
        fr: 'Avenue de la Liberté, Tunis Centre',
        ar: 'شارع الحرية، تونس العاصمة',
        en: 'Liberte Avenue, Tunis Center',
      },
      lat: 36.812,
      lng: 10.18,
      phone: '+216 71 840 220',
      tier: 'emerald',
      matricule: 'CSNPT-CTR-2026-004',
      badge: {
        fr: 'Centre Agréé & Équipé CSNPT',
        ar: 'مركز معتمد ومجهز طبياً',
        en: 'CSNPT Accredited Center',
      },
    },
  ];
