export type ResourceLanguage = "fr" | "ar" | "en";
export type ResourceType = "guide" | "protocol" | "official" | "tool";

export type ListedResource = {
  id: string;
  type: ResourceType;
  title: Record<ResourceLanguage, string>;
  description: Record<ResourceLanguage, string>;
  tags: string[];
  format: string;
  size?: string;
};

export const STATIC_RESOURCE_LIST: ListedResource[] = [
  {
    id: "guide-pratique-psychomotricite",
    type: "guide",
    title: {
      fr: "Guide pratique de la psychomotricité",
      ar: "دليل تطبيقي في العلاج النفسي الحركي",
      en: "Practical guide to psychomotor therapy",
    },
    description: {
      fr: "Repères essentiels pour comprendre les pratiques et le champ professionnel.",
      ar: "مؤشرات أساسية لفهم الممارسات والمجال المهني.",
      en: "Essential reference points for understanding professional practice.",
    },
    tags: ["Pratique", "Profession"],
    format: "PDF",
    size: "2,4 Mo",
  },
  {
    id: "bilan-psychomoteur",
    type: "guide",
    title: {
      fr: "Repères pour le bilan psychomoteur",
      ar: "مؤشرات التقييم النفسي الحركي",
      en: "Psychomotor assessment reference points",
    },
    description: {
      fr: "Une base de travail pour structurer l'observation et le bilan psychomoteur.",
      ar: "قاعدة عمل لتنظيم الملاحظة والتقييم النفسي الحركي.",
      en: "A working base for structuring observation and psychomotor assessment.",
    },
    tags: ["Bilan", "Évaluation"],
    format: "PDF",
    size: "1,8 Mo",
  },
  {
    id: "document-reference-csnp",
    type: "official",
    title: {
      fr: "Document de référence professionnel",
      ar: "وثيقة مرجعية مهنية",
      en: "Professional reference document",
    },
    description: {
      fr: "Document de référence destiné à structurer les repères professionnels.",
      ar: "وثيقة مرجعية لتنظيم المؤشرات المهنية.",
      en: "Reference material for organizing professional standards.",
    },
    tags: ["CSNPT", "Référence"],
    format: "PDF",
    size: "3,1 Mo",
  },
  {
    id: "observation-enfant",
    type: "tool",
    title: {
      fr: "Fiche pratique — observation de l’enfant",
      ar: "بطاقة تطبيقية — ملاحظة الطفل",
      en: "Practical sheet — child observation",
    },
    description: {
      fr: "Support de travail pour organiser les observations cliniques.",
      ar: "أداة عمل لتنظيم الملاحظات السريرية.",
      en: "A working tool for organizing clinical observations.",
    },
    tags: ["Enfant", "Observation"],
    format: "PDF",
    size: "840 Ko",
  },
  {
    id: "reperes-ethiques",
    type: "official",
    title: {
      fr: "Repères éthiques et professionnels",
      ar: "مؤشرات أخلاقية ومهنية",
      en: "Ethical and professional reference points",
    },
    description: {
      fr: "Repères pour accompagner la pratique professionnelle et les responsabilités associées.",
      ar: "مؤشرات لمرافقة الممارسة المهنية والمسؤوليات المرتبطة بها.",
      en: "Reference points supporting professional practice and responsibilities.",
    },
    tags: ["Éthique", "Profession"],
    format: "PDF",
    size: "1,2 Mo",
  },
  {
    id: "developpement-psychomoteur",
    type: "protocol",
    title: {
      fr: "Repères pour le développement psychomoteur",
      ar: "مؤشرات لتنظيم التطور النفسي الحركي",
      en: "Psychomotor development reference points",
    },
    description: {
      fr: "Repères pour organiser l'observation du développement psychomoteur.",
      ar: "مؤشرات لتنظيم ملاحظة التطور النفسي الحركي.",
      en: "Reference points for organizing psychomotor development observation.",
    },
    tags: ["Développement", "Observation"],
    format: "PDF",
    size: "2,0 Mo",
  },
];

export type ResourceDetail = {
  id: string;
  type: string;
  title: string;
  description: string;
  tags: string[];
  format: string;
  size: string;
};

export const STATIC_RESOURCE_DETAILS: ResourceDetail[] = [
  {
    id: "guide-pratique-psychomotricite",
    type: "Guide",
    title: "Guide pratique de la psychomotricité",
    description:
      "Repères essentiels pour comprendre les pratiques et le champ professionnel.",
    tags: ["Pratique", "Profession"],
    format: "PDF",
    size: "2,4 Mo",
  },
  {
    id: "bilan-psychomoteur",
    type: "Guide",
    title: "Repères pour le bilan psychomoteur",
    description:
      "Une base de travail pour structurer l’observation et le bilan psychomoteur.",
    tags: ["Bilan", "Évaluation"],
    format: "PDF",
    size: "1,8 Mo",
  },
  {
    id: "document-reference-csnp",
    type: "Document officiel",
    title: "Document de référence professionnel",
    description:
      "Document de référence destiné à structurer les repères professionnels.",
    tags: ["CSNPT", "Référence"],
    format: "PDF",
    size: "3,1 Mo",
  },
  {
    id: "observation-enfant",
    type: "Outil",
    title: "Fiche pratique — observation de l’enfant",
    description:
      "Support de travail pour organiser les observations cliniques.",
    tags: ["Enfant", "Observation"],
    format: "PDF",
    size: "840 Ko",
  },
  {
    id: "reperes-ethiques",
    type: "Document officiel",
    title: "Repères éthiques et professionnels",
    description:
      "Repères pour accompagner la pratique professionnelle et les responsabilités associées.",
    tags: ["Éthique", "Profession"],
    format: "PDF",
    size: "1,2 Mo",
  },
  {
    id: "developpement-psychomoteur",
    type: "Protocole",
    title: "Repères pour le développement psychomoteur",
    description:
      "Repères pour organiser l’observation du développement psychomoteur.",
    tags: ["Développement", "Observation"],
    format: "PDF",
    size: "2,0 Mo",
  },
];
