'use client';

import { type FormEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Lang } from '@/lib/types';
import { submitAdhesion } from '@/app/admin/actions';

const copy = {
  fr: {
    eyebrow: 'CSNPT · ADHÉSION',
    title: 'Rejoindre la CSNPT.',
    intro:
      'Un espace dédié aux psychomotriciens tunisiens qui souhaitent rejoindre la communauté professionnelle et suivre les informations liées à leur adhésion.',
    noteTitle: 'Adhésion professionnelle',
    note:
      'Les modalités, pièces demandées et conditions d’adhésion seront précisées par la CSNPT. Cette page prépare le parcours sans valider automatiquement une adhésion.',
    formEyebrow: 'DEMANDE D’INFORMATION',
    formTitle: 'Préparer votre demande',
            formIntro: 'Renseignez vos coordonnées et joignez les pièces utiles. Votre demande sera transmise au comité pour examen.',
    name: 'Nom et prénom',
    email: 'Adresse e-mail',
    phone: 'Téléphone',
    status: 'Situation professionnelle',
    statusPlaceholder: 'Choisissez une situation',
    statuses: ['Psychomotricien(ne)', 'Étudiant(e)', 'Structure professionnelle', 'Autre'],
    message: 'Votre demande',
    messagePlaceholder: 'Je souhaite obtenir des informations concernant...',
    consent: 'J’accepte que les informations saisies soient utilisées uniquement pour traiter ma demande.',
    send: 'Préparer ma demande',
    required: 'Veuillez remplir les champs obligatoires.',
    invalidEmail: 'Veuillez saisir une adresse e-mail valide.',
    consentRequired: 'Votre consentement est nécessaire.',
            successTitle: 'Demande envoyée',
    successText: 'Votre demande a été envoyée avec succès. Le comité CSNPT la traitera dans les plus brefs délais.',
    newRequest: 'Nouvelle demande',
    infoTitle: 'À savoir',
    infoItems: [
      'L’adhésion définitive dépend de la procédure officielle de la CSNPT.',
      'Les conditions et pièces justificatives peuvent évoluer.',
      'Aucune adhésion n’est confirmée automatiquement depuis cette page.',
    ],
    proTitle: 'Déjà professionnel ?',
    proText: 'Retrouvez les services professionnels et les informations liées à votre activité.',
    proButton: 'Espace professionnel',
    directoryTitle: 'Vous cherchez un psychomotricien ?',
    directoryText: 'Consultez l’annuaire professionnel pour trouver une personne ou une structure référencée.',
    directoryButton: 'Ouvrir l’annuaire',
    back: 'Retour',
  },
  ar: {
    eyebrow: 'CSNPT · الانخراط',
    title: 'انضمّ إلى CSNPT.',
    intro:
      'فضاء مخصّص للأخصائيين في العلاج النفسي الحركي في تونس للانضمام إلى المجتمع المهني ومتابعة المعلومات المتعلقة بالانخراط.',
    noteTitle: 'الانخراط المهني',
    note:
      'الشروط والوثائق وطريقة الانخراط الرسمية تحددها CSNPT. الصفحة هاذي تحضّر الطلب وما تعتبرش انخراط نهائي.',
    formEyebrow: 'طلب معلومات',
    formTitle: 'حضّر طلبك',
    formIntro: 'خلّي معلومات الاتصال واكتب طلبك. الرسالة باش تتحضّر في البريد الإلكتروني.',
    name: 'الاسم واللقب',
    email: 'البريد الإلكتروني',
    phone: 'الهاتف',
    status: 'الوضعية المهنية',
    statusPlaceholder: 'اختار الوضعية',
    statuses: ['أخصائي نفسي حركي', 'طالب', 'هيكل مهني', 'أخرى'],
    message: 'طلبك',
    messagePlaceholder: 'نحب نتحصل على معلومات بخصوص...',
    consent: 'نوافق أن تستعمل المعلومات فقط لمعالجة طلبي.',
    send: 'تحضير الطلب',
    required: 'عمّر الخانات الإجبارية.',
    invalidEmail: 'اكتب بريد إلكتروني صحيح.',
    consentRequired: 'لازم توافق قبل إرسال الطلب.',
    successTitle: 'الطلب تحضّر',
    successText:
      'باش يتحلّ برنامج البريد الإلكتروني والطلب يكون محضّر. راجع المعلومات وبعد أكّد الإرسال.',
    newRequest: 'طلب جديد',
    infoTitle: 'معلومة مهمّة',
    infoItems: [
      'الانخراط النهائي يخضع للإجراء الرسمي متاع CSNPT.',
      'الشروط والوثائق المطلوبة تنجم تتبدّل.',
      'الصفحة هاذي ما تأكّدش الانخراط آلياً.',
    ],
    proTitle: 'إنت مهني؟',
    proText: 'اكتشف الخدمات المهنية والمعلومات المتعلقة بالنشاط المهني.',
    proButton: 'الفضاء المهني',
    directoryTitle: 'تلوّج على أخصائي؟',
    directoryText: 'استعمل الدليل المهني باش تلقى أخصائي أو هيكل مسجّل.',
    directoryButton: 'فتح الدليل',
    back: 'رجوع',
  },
  en: {
    eyebrow: 'CSNPT · MEMBERSHIP',
    title: 'Join CSNPT.',
    intro:
      'A dedicated space for Tunisian psychomotor therapists who wish to join the professional community and follow membership information.',
    noteTitle: 'Professional membership',
    note:
      'Membership terms, required documents and conditions will be specified by CSNPT. This page prepares the request and does not automatically validate membership.',
    formEyebrow: 'INFORMATION REQUEST',
    formTitle: 'Prepare your request',
    formIntro: 'Add your contact details and attach the requested documents. Your request will be sent to the committee for review.',
    name: 'Full name',
    email: 'Email address',
    phone: 'Phone',
    status: 'Professional status',
    statusPlaceholder: 'Choose a status',
    statuses: ['Psychomotor therapist', 'Student', 'Professional structure', 'Other'],
    message: 'Your request',
    messagePlaceholder: 'I would like information about...',
    consent: 'I agree that the information entered may be used only to process my request.',
    send: 'Send my request',
    required: 'Please complete the required fields.',
    invalidEmail: 'Please enter a valid email address.',
    consentRequired: 'Your consent is required.',
    successTitle: 'Request prepared',
    successText:
      'Your request has been recorded. The committee will review your file and follow up according to the current procedure.',
    newRequest: 'New request',
    infoTitle: 'Good to know',
    infoItems: [
      'Final membership depends on the official CSNPT procedure.',
      'Conditions and required documents may change.',
      'This page does not automatically confirm membership.',
    ],
    proTitle: 'Already a professional?',
    proText: 'Find professional services and information related to your activity.',
    proButton: 'Professional area',
    directoryTitle: 'Looking for a psychomotor therapist?',
    directoryText: 'Use the professional directory to find a listed person or structure.',
    directoryButton: 'Open directory',
    back: 'Back',
  },
} as const;

type FormState = {
  name: string;
  email: string;
  phone: string;
  status: string;
  message: string;
  consent: boolean;
};

export default function AdhesionPage() {
  const [lang, setLang] = useState<Lang>('fr');
  const [calmMode, setCalmMode] = useState(false);
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    status: '',
    message: '',
    consent: false,
  });

  const t = copy[lang];

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  function update<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
    setError('');
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.status || !form.message.trim()) {
      setError(t.required);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError(t.invalidEmail);
      return;
    }
    if (!form.consent) {
      setError(t.consentRequired);
      return;
    }
    const formElement = event.currentTarget;
    const payload = new FormData(formElement);
    payload.set('fullName', form.name.trim());
    payload.set('email', form.email.trim());
    payload.set('phone', form.phone.trim());
    payload.set('professionalStatus', form.status);
    payload.set('message', form.message.trim());
    setIsSubmitting(true);
    try {
      const result = await submitAdhesion(payload);
      if (result.success) setSubmitted(true);
      else setError(result.message);
    } catch {
      setError('La demande n?a pas pu ?tre envoy?e. R?essayez dans un instant.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function reset() {
    formRef.current?.reset();
    setForm({
      name: '',
      email: '',
      phone: '',
      status: '',
      message: '',
      consent: false,
    });
    setError('');
    setSubmitted(false);
  }

  return (
    <div className={`min-h-screen bg-[#f7f4ed] text-[#102824] ${dyslexicFont ? 'font-dyslexic' : ''}`}>
      <Navbar
        currentLang={lang}
        onLanguageChange={setLang}
        calmMode={calmMode}
        onToggleCalmMode={() => setCalmMode((value) => !value)}
        dyslexicFont={dyslexicFont}
        onToggleDyslexicFont={() => setDyslexicFont((value) => !value)}
      />

      <main>
        <section className="border-b border-[#ded9cf]">
          <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-10 md:py-24">
            <Link href="/" className="mb-12 inline-flex text-sm font-semibold hover:underline">
              ← {t.back}
            </Link>

            <div className="grid gap-10 lg:grid-cols-[1fr_390px] lg:items-end">
              <div>
                <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#287d78]">
                  {t.eyebrow}
                </p>
                <h1 className="max-w-3xl text-5xl font-black leading-[0.98] tracking-[-0.04em] md:text-7xl">
                  {t.title}
                </h1>
                <p className="mt-7 max-w-2xl text-lg leading-8 text-[#68716e]">
                  {t.intro}
                </p>
              </div>

              <div className="rounded-3xl border border-[#ded9cf] bg-[#f0ede5] p-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#287d78]">
                  CSNPT
                </p>
                <h2 className="mt-4 text-2xl font-black">{t.noteTitle}</h2>
                <p className="mt-4 text-sm leading-7 text-[#68716e]">{t.note}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-6 py-14 md:px-10 md:py-20">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="rounded-3xl border border-[#ded9cf] bg-[#f0ede5] p-7 md:p-10">
              {!submitted ? (
                <>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#287d78]">
                    {t.formEyebrow}
                  </p>
                  <h2 className="mt-3 text-3xl font-black">{t.formTitle}</h2>
                  <p className="mt-3 text-sm leading-7 text-[#68716e]">{t.formIntro}</p>

                  <form ref={formRef} onSubmit={submit} encType="multipart/form-data" className="mt-8 space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <label>
                        <span className="mb-2 block text-sm font-bold">{t.name} *</span>
                        <input
                          name="fullName"
                          required
                          value={form.name}
                          onChange={(e) => update('name', e.target.value)}
                          placeholder={t.name}
                          className="w-full rounded-2xl border border-[#d8d2c8] bg-[#faf8f3] px-4 py-3.5 outline-none focus:border-[#287d78]"
                        />
                      </label>

                      <label>
                        <span className="mb-2 block text-sm font-bold">{t.email} *</span>
                        <input
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => update('email', e.target.value)}
                          placeholder="vous@exemple.tn"
                          className="w-full rounded-2xl border border-[#d8d2c8] bg-[#faf8f3] px-4 py-3.5 outline-none focus:border-[#287d78]"
                        />
                      </label>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <label>
                        <span className="mb-2 block text-sm font-bold">{t.phone}</span>
                        <input
                          name="phone"
                          required
                          value={form.phone}
                          onChange={(e) => update('phone', e.target.value)}
                          placeholder="+216 ..."
                          className="w-full rounded-2xl border border-[#d8d2c8] bg-[#faf8f3] px-4 py-3.5 outline-none focus:border-[#287d78]"
                        />
                      </label>

                      <label>
                        <span className="mb-2 block text-sm font-bold">{t.status} *</span>
                        <select
                          name="professionalStatus"
                          required
                          value={form.status}
                          onChange={(e) => update('status', e.target.value)}
                          className="w-full rounded-2xl border border-[#d8d2c8] bg-[#faf8f3] px-4 py-3.5 outline-none focus:border-[#287d78]"
                        >
                          <option value="">{t.statusPlaceholder}</option>
                          {t.statuses.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>

                    <label>
                      <span className="mb-2 block text-sm font-bold">{t.message} *</span>
                      <textarea
                        name="message"
                        required
                        value={form.message}
                        onChange={(e) => update('message', e.target.value)}
                        placeholder={t.messagePlaceholder}
                        rows={7}
                        className="w-full resize-y rounded-2xl border border-[#d8d2c8] bg-[#faf8f3] px-4 py-3.5 outline-none focus:border-[#287d78]"
                      />
                    </label>

                    <div className="grid gap-4 md:grid-cols-3">
                      {([
                        ['diplomaFile', lang === 'ar' ? '???????' : lang === 'en' ? 'Diploma' : 'Dipl?me'],
                        ['patenteFile', lang === 'ar' ? '?????????' : lang === 'en' ? 'Business licence' : 'Patente'],
                        ['rneFile', 'RNE'],
                      ] as const).map(([name, label]) => (
                        <label key={name} className="grid gap-2 text-sm font-bold">
                          {label} <span className="font-normal text-[#68716e]">PDF, JPG, PNG (Max 8 Mo)</span>
                          <input name={name} type="file" accept="application/pdf,image/jpeg,image/png" className="w-full rounded-xl border border-[#d8d2c8] bg-[#faf8f3] p-3 text-xs file:me-3 file:rounded-full file:border-0 file:bg-[#0E5A5F]/10 file:px-3 file:py-2 file:font-semibold file:text-[#0E5A5F]" />
                        </label>
                      ))}
                    </div>

                    <label className="flex cursor-pointer gap-3 rounded-2xl border border-[#ded9cf] bg-[#faf8f3] p-4 text-sm leading-6">
                      <input
                        name="consent"
                        value="on"
                        type="checkbox"
                        checked={form.consent}
                        onChange={(e) => update('consent', e.target.checked)}
                        className="mt-1 h-4 w-4 accent-[#287d78]"
                      />
                      <span>{t.consent}</span>
                    </label>

                    {error && (
                      <div className="rounded-2xl border border-[#d9a18a] bg-[#fff4ed] px-4 py-3 text-sm font-semibold text-[#8a432d]">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="adhesion-submit rounded-2xl bg-[#C4623B] px-7 py-4 text-sm font-bold text-white hover:opacity-90"
                    >
                      {t.send} ↗
                    </button>
                  </form>
                </>
              ) : (
                <div className="py-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#dcebe6] text-xl text-[#287d78]">
                    ✓
                  </div>
                  <h2 className="mt-6 text-3xl font-black">{t.successTitle}</h2>
                  <p className="mt-4 max-w-xl leading-8 text-[#68716e]">{t.successText}</p>
                  <button
                    onClick={reset}
                    className="mt-8 rounded-2xl border border-[#cfc8bc] bg-[#faf8f3] px-6 py-3.5 text-sm font-bold"
                  >
                    {t.newRequest}
                  </button>
                </div>
              )}
            </div>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-[#ded9cf] bg-[#faf8f3] p-7">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#287d78]">
                  {t.infoTitle}
                </p>
                <div className="mt-6 space-y-4">
                  {t.infoItems.map((item, index) => (
                    <div key={item} className="flex gap-3 text-sm leading-6 text-[#68716e]">
                      <span className="font-black text-[#287d78]">0{index + 1}</span>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-[#174c5d] p-7 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b7ddd7]">
                  CSNPT
                </p>
                <h2 className="mt-4 text-2xl font-black">{t.proTitle}</h2>
                <p className="mt-3 text-sm leading-7 text-white/75">{t.proText}</p>
                <Link
                  href="/espace-pro/login"
                  className="mt-6 inline-flex rounded-2xl bg-[#72aaa3] px-5 py-3 text-sm font-bold text-[#102824]"
                >
                  {t.proButton} ↗
                </Link>
              </div>

              <div className="rounded-3xl border border-[#ded9cf] bg-[#f0ede5] p-7">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#287d78]">
                  CSNPT
                </p>
                <h2 className="mt-4 text-2xl font-black">{t.directoryTitle}</h2>
                <p className="mt-3 text-sm leading-7 text-[#68716e]">{t.directoryText}</p>
                <Link
                  href="/trouver"
                  className="mt-6 inline-flex rounded-2xl border border-[#cfc8bc] px-5 py-3 text-sm font-bold"
                >
                  {t.directoryButton} ↗
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
