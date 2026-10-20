import type { Lang } from '../types';

export type FormationStatus = 'open' | 'limited' | 'full' | 'ended';



export type Formation = {

  id: string;

  date: {

    day: string;

    month: Record<Lang, string>;

    year: string;

  };

  title: Record<Lang, string>;

  description: Record<Lang, string>;

  type: Record<Lang, string>;

  mode: Record<Lang, string>;

  location: Record<Lang, string>;

  level: Record<Lang, string>;

  accreditation: Record<Lang, string>;

  status: FormationStatus;

  seats: number;

  duration: Record<Lang, string>;

};

export const STATIC_FORMATIONS: Formation[] = [

  {

    id: 'approche-sensorielle',

    date: {

      day: '15',

      month: {

        fr: 'NOV',

        ar: 'نوفمبر',

        en: 'NOV',

      },

      year: '2026',

    },

    title: {

      fr: 'Approche sensorielle en psychomotricité',

      ar: 'المقاربة الحسية في العلاج النفسي الحركي',

      en: 'Sensory approach in psychomotricity',

    },

    description: {

      fr: 'Formation consacrée à l’intégration des médiations sensorielles dans la pratique psychomotrice.',

      ar: 'تكوين حول إدماج الوسائط الحسية في الممارسة النفسية الحركية.',

      en: 'Training focused on integrating sensory mediation into psychomotor practice.',

    },

    type: {

      fr: 'Formation',

      ar: 'تكوين',

      en: 'Training',

    },

    mode: {

      fr: 'Présentiel',

      ar: 'حضوري',

      en: 'In person',

    },

    location: {

      fr: 'Tunis',

      ar: 'تونس',

      en: 'Tunis',

    },

    level: {

      fr: 'Professionnels',

      ar: 'المهنيون',

      en: 'Professionals',

    },

    accreditation: {

      fr: 'Accréditation à confirmer',

      ar: 'الاعتماد في طور التأكيد',

      en: 'Accreditation to be confirmed',

    },

    status: 'limited',

    seats: 8,

    duration: {

      fr: '1 journée',

      ar: 'يوم واحد',

      en: '1 day',

    },

  },



  {

    id: 'troubles-neurodeveloppement',

    date: {

      day: '03',

      month: {

        fr: 'DÉC',

        ar: 'ديسمبر',

        en: 'DEC',

      },

      year: '2026',

    },

    title: {

      fr: 'Les troubles du neurodéveloppement',

      ar: 'اضطرابات النمو العصبي',

      en: 'Neurodevelopmental disorders',

    },

    description: {

      fr: 'Webinaire d’information et d’échange autour des troubles du neurodéveloppement et de leur prise en charge.',

      ar: 'ندوة عبر الإنترنت حول اضطرابات النمو العصبي والتكفل بها.',

      en: 'An online session about neurodevelopmental disorders and their management.',

    },

    type: {

      fr: 'Webinaire',

      ar: 'ندوة عن بعد',

      en: 'Webinar',

    },

    mode: {

      fr: 'En ligne',

      ar: 'عن بعد',

      en: 'Online',

    },

    location: {

      fr: 'En ligne',

      ar: 'عن بعد',

      en: 'Online',

    },

    level: {

      fr: 'Tout public professionnel',

      ar: 'المهنيون',

      en: 'Professional audience',

    },

    accreditation: {

      fr: 'Non précisée',

      ar: 'غير محدد',

      en: 'Not specified',

    },

    status: 'open',

    seats: 50,

    duration: {

      fr: '2 heures',

      ar: 'ساعتان',

      en: '2 hours',

    },

  },



  {

    id: 'congres-national',

    date: {

      day: '20',

      month: {

        fr: 'JAN',

        ar: 'جانفي',

        en: 'JAN',

      },

      year: '2027',

    },

    title: {

      fr: 'Congrès national de psychomotricité',

      ar: 'المؤتمر الوطني للعلاج النفسي الحركي',

      en: 'National Psychomotricity Congress',

    },

    description: {

      fr: 'Rendez-vous professionnel destiné aux échanges, communications et rencontres autour de la psychomotricité en Tunisie.',

      ar: 'موعد مهني للتبادل والعروض واللقاءات حول العلاج النفسي الحركي في تونس.',

      en: 'A professional event for exchanges, presentations and networking around psychomotricity in Tunisia.',

    },

    type: {

      fr: 'Congrès',

      ar: 'مؤتمر',

      en: 'Congress',

    },

    mode: {

      fr: 'Présentiel',

      ar: 'حضوري',

      en: 'In person',

    },

    location: {

      fr: 'Sousse',

      ar: 'سوسة',

      en: 'Sousse',

    },

    level: {

      fr: 'Professionnels',

      ar: 'المهنيون',

      en: 'Professionals',

    },

    accreditation: {

      fr: 'À définir',

      ar: 'سيتم تحديده',

      en: 'To be defined',

    },

    status: 'open',

    seats: 120,

    duration: {

      fr: '2 jours',

      ar: 'يومان',

      en: '2 days',

    },

  },



  {

    id: 'atelier-bilan',

    date: {

      day: '12',

      month: {

        fr: 'FÉV',

        ar: 'فيفري',

        en: 'FEB',

      },

      year: '2027',

    },

    title: {

      fr: 'Atelier : structurer un bilan psychomoteur',

      ar: 'ورشة: تنظيم التقييم النفسي الحركي',

      en: 'Workshop: structuring a psychomotor assessment',

    },

    description: {

      fr: 'Atelier pratique autour de la structuration, de la restitution et de la lecture clinique du bilan.',

      ar: 'ورشة تطبيقية حول تنظيم التقييم وقراءة نتائجه سريريًا وتقديمها.',

      en: 'Practical workshop on structuring, interpreting and presenting a psychomotor assessment.',

    },

    type: {

      fr: 'Atelier',

      ar: 'ورشة',

      en: 'Workshop',

    },

    mode: {

      fr: 'Présentiel',

      ar: 'حضوري',

      en: 'In person',

    },

    location: {

      fr: 'Tunis',

      ar: 'تونس',

      en: 'Tunis',

    },

    level: {

      fr: 'Intermédiaire',

      ar: 'متوسط',

      en: 'Intermediate',

    },

    accreditation: {

      fr: 'À confirmer',

      ar: 'في انتظار التأكيد',

      en: 'To be confirmed',

    },

    status: 'full',

    seats: 0,

    duration: {

      fr: '1 journée',

      ar: 'يوم واحد',

      en: '1 day',

    },

  },

];
