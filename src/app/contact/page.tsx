'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Lang } from '@/lib/types';

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
  consent: boolean;
};

const text = {
  fr: {
    eyebrow: 'CONTACT',
    title: 'Contacter la CSNPT',
    intro: 'Une question, une demande d’information ou un sujet concernant la psychomotricité en Tunisie ? Écrivez-nous.',
    formTitle: 'Votre message',
    formIntro: 'Les champs marqués d’un * sont obligatoires.',
    name: 'Nom et prénom',
    namePlaceholder: 'Votre nom et prénom',
    email: 'Adresse e-mail',
    emailPlaceholder: 'vous@exemple.tn',
    subject: 'Sujet',
    subjectPlaceholder: 'Choisissez un sujet',
    subjects: ['Information générale', 'Annuaire professionnel', 'Formation', 'Adhésion', 'Document ou ressource', 'Autre'],
    message: 'Message',
    messagePlaceholder: 'Écrivez votre message...',
    consent: 'J’accepte que les informations saisies soient utilisées uniquement pour traiter ma demande.',
    privacy: 'Consulter la politique de confidentialité',
    required: 'Veuillez remplir tous les champs obligatoires.',
    invalidEmail: 'Veuillez saisir une adresse e-mail valide.',
    consentRequired: 'Votre consentement est nécessaire pour envoyer le message.',
    send: 'Envoyer le message',
    sending: 'Envoi...',
    directTitle: 'Nous contacter directement',
    phone: 'Téléphone',
    emailLabel: 'E-mail',
    address: 'Adresse',
    response: 'Délai de réponse',
    responseText: 'Le délai dépend de la nature de votre demande. Une réponse sera apportée dès que possible.',
    directoryTitle: 'Vous cherchez un professionnel ?',
    directoryText: 'Pour trouver un psychomotricien ou une structure référencée, utilisez directement l’annuaire.',
    directoryButton: 'Ouvrir l’annuaire',
    professionalTitle: 'Vous êtes professionnel ?',
    professionalText: 'L’espace professionnel regroupera les services liés au profil, à l’adhésion et à la pratique.',
    professionalButton: 'Espace professionnel',
    successTitle: 'Votre message a été envoyé avec succès',
    successText: 'La CSNPT a bien reçu votre message.',
    newMessage: 'Écrire un nouveau message',
    back: 'Retour',
  },
  ar: {
    eyebrow: 'اتصال',
    title: 'اتصل بـ CSNPT',
    intro: 'عندك سؤال أو طلب معلومات أو موضوع يخصّ الاختصاص في تونس؟ ابعث لنا رسالة.',
    formTitle: 'رسالتك',
    formIntro: 'الخانات المعلّمة بـ * إجبارية.',
    name: 'الاسم واللقب',
    namePlaceholder: 'اكتب الاسم واللقب',
    email: 'البريد الإلكتروني',
    emailPlaceholder: 'you@example.tn',
    subject: 'الموضوع',
    subjectPlaceholder: 'اختار الموضوع',
    subjects: ['معلومات عامة', 'الدليل المهني', 'التكوين', 'الانخراط', 'وثيقة أو مورد', 'موضوع آخر'],
    message: 'الرسالة',
    messagePlaceholder: 'اكتب رسالتك...',
    consent: 'نوافق أن تستعمل المعلومات المدخلة فقط لمعالجة طلبي.',
    privacy: 'الاطلاع على سياسة الخصوصية',
    required: 'عمّر الخانات الإجبارية الكل.',
    invalidEmail: 'اكتب بريد إلكتروني صحيح.',
    consentRequired: 'لازم توافق قبل إرسال الرسالة.',
    send: 'إرسال الرسالة',
    sending: 'جارٍ الإرسال...',
    directTitle: 'اتصل بنا مباشرة',
    phone: 'الهاتف',
    emailLabel: 'البريد الإلكتروني',
    address: 'العنوان',
    response: 'مدة الرد',
    responseText: 'مدة الرد تختلف حسب طبيعة الطلب. باش يتم الرد في أقرب وقت ممكن.',
    directoryTitle: 'تلوّج على أخصائي؟',
    directoryText: 'استعمل الدليل المهني باش تلقى أخصائي أو مركز.',
    directoryButton: 'فتح الدليل',
    professionalTitle: 'إنت مهني؟',
    professionalText: 'الفضاء المهني باش يجمع الخدمات المتعلقة بالملف المهني والانخراط والممارسة.',
    professionalButton: 'الفضاء المهني',
    successTitle: 'تم إرسال رسالتك بنجاح',
    successText: 'توصلت CSNPT برسالتك.',
    newMessage: 'اكتب رسالة أخرى',
    back: 'رجوع',
  },
  en: {
    eyebrow: 'CONTACT',
    title: 'Contact CSNPT',
    intro: 'Have a question, an information request, or a topic related to psychomotricity in Tunisia? Send us a message.',
    formTitle: 'Your message',
    formIntro: 'Fields marked with * are required.',
    name: 'Full name',
    namePlaceholder: 'Your full name',
    email: 'Email address',
    emailPlaceholder: 'you@example.tn',
    subject: 'Subject',
    subjectPlaceholder: 'Choose a subject',
    subjects: ['General information', 'Professional directory', 'Training', 'Membership', 'Document or resource', 'Other'],
    message: 'Message',
    messagePlaceholder: 'Write your message...',
    consent: 'I agree that the information entered may be used only to process my request.',
    privacy: 'Read the privacy policy',
    required: 'Please complete all required fields.',
    invalidEmail: 'Please enter a valid email address.',
    consentRequired: 'Your consent is required before sending the message.',
    send: 'Send message',
    sending: 'Sending...',
    directTitle: 'Contact us directly',
    phone: 'Phone',
    emailLabel: 'Email',
    address: 'Address',
    response: 'Response time',
    responseText: 'Response time depends on the nature of your request. We will respond as soon as possible.',
    directoryTitle: 'Looking for a professional?',
    directoryText: 'Use the professional directory to find a psychomotor therapist or a listed structure.',
    directoryButton: 'Open directory',
    professionalTitle: 'Are you a professional?',
    professionalText: 'The professional area will bring together profile, membership and practice services.',
    professionalButton: 'Professional area',
    successTitle: 'Your message was sent successfully',
    successText: 'CSNPT has received your message.',
    newMessage: 'Write another message',
    back: 'Back',
  },
} as const;

export default function ContactPage() {
  const [lang, setLang] = useState<Lang>('fr');
  const [calmMode, setCalmMode] = useState(false);
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
    consent: false,
  });
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const t = text[lang];

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  function update<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
    setError('');
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const honeypot = String(new FormData(event.currentTarget).get('website_url') ?? '');

    if (!form.name.trim() || !form.email.trim() || !form.subject || !form.message.trim()) {
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

    setSending(true);
    setError('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, website_url: honeypot, name: form.name.trim(), email: form.email.trim(), message: form.message.trim() }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || 'Votre message n’a pas pu être envoyé.');
      setForm({ name: '', email: '', subject: '', message: '', consent: false });
      setSubmitted(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Votre message n’a pas pu être envoyé. Réessayez.');
    } finally {
      setSending(false);
    }
  }

  function resetForm() {
    setForm({ name: '', email: '', subject: '', message: '', consent: false });
    setError('');
    setSubmitted(false);
  }

  return (
    <div
      className={`min-h-screen bg-[#f7f4ed] text-[#102824] ${
        dyslexicFont ? 'font-dyslexic' : ''
      }`}
    >
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
            <Link
              href="/"
              className="mb-12 inline-flex text-sm font-semibold text-[#163f4f] hover:underline"
            >
              ← {t.back}
            </Link>

            <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
              <div>
                <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#287d78]">
                  CSNPT · {t.eyebrow}
                </p>
                <h1 className="max-w-3xl text-5xl font-black leading-[0.98] tracking-[-0.04em] md:text-7xl">
                  {t.title}
                </h1>
                <p className="mt-7 max-w-2xl text-lg leading-8 text-[#68716e]">
                  {t.intro}
                </p>
              </div>

              <div className="rounded-3xl border border-[#ded9cf] bg-[#f0ede5] p-7">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#287d78]">
                  CSNPT
                </p>
                <p className="mt-4 text-xl font-bold leading-8">
                  {t.directTitle}
                </p>
                <p className="mt-5 text-sm leading-7 text-[#68716e]">
                  contact@csnpt.tn
                </p>
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
                    CONTACT
                  </p>
                  <h2 className="mt-3 text-3xl font-black tracking-[-0.03em]">
                    {t.formTitle}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[#68716e]">
                    {t.formIntro}
                  </p>

                  <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <input type="text" name="website_url" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: 'none' }} />
                    <div className="grid gap-6 md:grid-cols-2">
                      <label htmlFor="contact-name" className="block">
                        <span className="mb-2 block text-sm font-semibold">{t.name} *</span>
                        <input
                          id="contact-name"
                          name="name"
                          required
                          maxLength={200}
                          value={form.name}
                          onChange={(e) => update('name', e.target.value)}
                          placeholder={t.namePlaceholder}
                          className="w-full rounded-2xl border border-[#d8d2c8] bg-[#faf8f3] px-4 py-3.5 outline-none transition focus:border-[#287d78]"
                        />
                      </label>

                      <label htmlFor="contact-email" className="block">
                        <span className="mb-2 block text-sm font-semibold">{t.email} *</span>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          required
                          maxLength={254}
                          value={form.email}
                          onChange={(e) => update('email', e.target.value)}
                          placeholder={t.emailPlaceholder}
                          className="w-full rounded-2xl border border-[#d8d2c8] bg-[#faf8f3] px-4 py-3.5 outline-none transition focus:border-[#287d78]"
                        />
                      </label>
                    </div>

                    <label htmlFor="contact-subject" className="block">
                      <span className="mb-2 block text-sm font-semibold">{t.subject} *</span>
                      <select
                        id="contact-subject"
                        name="subject"
                        required
                        value={form.subject}
                        onChange={(e) => update('subject', e.target.value)}
                        className="w-full rounded-2xl border border-[#d8d2c8] bg-[#faf8f3] px-4 py-3.5 outline-none focus:border-[#287d78]"
                      >
                        <option value="">{t.subjectPlaceholder}</option>
                        {t.subjects.map((subject) => (
                          <option key={subject} value={subject}>
                            {subject}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label htmlFor="contact-message" className="block">
                      <span className="mb-2 block text-sm font-semibold">{t.message} *</span>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        maxLength={5000}
                        value={form.message}
                        onChange={(e) => update('message', e.target.value)}
                        placeholder={t.messagePlaceholder}
                        rows={7}
                        className="w-full resize-y rounded-2xl border border-[#d8d2c8] bg-[#faf8f3] px-4 py-3.5 outline-none focus:border-[#287d78]"
                      />
                    </label>

                    <label htmlFor="contact-consent" className="flex cursor-pointer gap-3 rounded-2xl border border-[#ded9cf] bg-[#faf8f3] p-4 text-sm leading-6">
                      <input
                        id="contact-consent"
                        name="consent"
                        type="checkbox"
                        required
                        checked={form.consent}
                        onChange={(e) => update('consent', e.target.checked)}
                        className="mt-1 h-4 w-4 accent-[#287d78]"
                      />
                      <span>{t.consent} <Link href="/confidentialite" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#287d78] underline">{t.privacy}</Link></span>
                    </label>

                    {error && (
                      <div role="alert" aria-live="polite" className="rounded-2xl border border-[#d9a18a] bg-[#fff4ed] px-4 py-3 text-sm font-semibold text-[#8a432d]">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={sending}
                      className="rounded-2xl bg-[#164c5d] px-7 py-4 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-60"
                    >
                      {sending ? t.sending : t.send}
                    </button>
                  </form>
                </>
              ) : (
                <div role="status" aria-live="polite" className="py-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#dcebe6] text-xl text-[#287d78]">
                    ✓
                  </div>
                  <h2 className="mt-6 text-3xl font-black">{t.successTitle}</h2>
                  <p className="mt-4 max-w-xl leading-8 text-[#68716e]">
                    {t.successText}
                  </p>
                  <button
                    onClick={resetForm}
                    className="mt-8 rounded-2xl border border-[#cfc8bc] bg-[#faf8f3] px-6 py-3.5 text-sm font-bold"
                  >
                    {t.newMessage}
                  </button>
                </div>
              )}
            </div>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-[#ded9cf] bg-[#f0ede5] p-7">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#287d78]">
                  {t.directTitle}
                </p>
                <div className="mt-7 space-y-6 text-sm">
                  <div>
                    <p className="font-bold">{t.phone}</p>
                    <a href="tel:+21655590409" className="mt-1 block text-[#68716e] hover:underline">
                      +216 55 690 409
                    </a>
                  </div>
                  <div>
                    <p className="font-bold">{t.emailLabel}</p>
                    <a href="mailto:contact@csnpt.tn" className="mt-1 block text-[#68716e] hover:underline">
                      contact@csnpt.tn
                    </a>
                  </div>
                  <div>
                    <p className="font-bold">{t.address}</p>
                    <p className="mt-1 leading-6 text-[#68716e]">
                      Immeuble les Jardins, Bureau 2-3, 2ème étage, Av. les Violettes, Jardins d’El Menzah 2, Ariana
                    </p>
                  </div>
                  <div>
                    <p className="font-bold">{t.response}</p>
                    <p className="mt-1 leading-6 text-[#68716e]">{t.responseText}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-[#174c5d] p-7 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b7ddd7]">
                  CSNPT
                </p>
                <h2 className="mt-4 text-2xl font-black">{t.directoryTitle}</h2>
                <p className="mt-3 text-sm leading-7 text-white/75">{t.directoryText}</p>
                <Link
                  href="/trouver"
                  className="mt-6 inline-flex rounded-2xl bg-[#72aaa3] px-5 py-3 text-sm font-bold text-[#102824]"
                >
                  {t.directoryButton} ↗
                </Link>
              </div>

              <div className="rounded-3xl border border-[#ded9cf] bg-[#faf8f3] p-7">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#287d78]">
                  CSNPT
                </p>
                <h2 className="mt-4 text-2xl font-black">{t.professionalTitle}</h2>
                <p className="mt-3 text-sm leading-7 text-[#68716e]">{t.professionalText}</p>
                <Link
                  href="/espace-pro/login"
                  className="mt-6 inline-flex rounded-2xl border border-[#cfc8bc] px-5 py-3 text-sm font-bold"
                >
                  {t.professionalButton} ↗
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
