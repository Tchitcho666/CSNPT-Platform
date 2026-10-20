'use client';



import React, { useEffect, useMemo, useState, useTransition } from 'react';
import type { FormEvent } from 'react';

import Navbar from '@/components/Navbar';

import Footer from '@/components/Footer';

import { Lang } from '@/lib/types';
import { registerForEvent } from '@/app/actions/events';





type PublishedEvent = {
  id: string;
  title: string;
  description: string | null;
  type: string;
  date: string;
  startTime: string;
  endTime: string;
  locationName: string;
  capacity: number;
  audience: string;
};


const copy = {

  fr: {

    eyebrow: 'FORMATIONS',

    title: 'Apprendre, pratiquer, progresser.',

    intro:

      'Les formations et rendez-vous professionnels de la CSNPT, organisés autour du temps, de la pratique et du développement professionnel.',

    upcoming: 'Prochains rendez-vous',

    filters: 'Filtrer',

    all: 'Tous',

    training: 'Formations',

    seminar: 'Séminaires',

    workshop: 'Ateliers',

    webinar: 'Webinaires',

    congress: 'Congrès',

    mode: 'Mode',

    place: 'Lieu',

    audience: 'Public',

    level: 'Niveau',

    accreditation: 'Accréditation',

    duration: 'Durée',

    seats: 'Places',

    available: 'Ouvert',

    limited: 'Places limitées',

    full: 'Complet',

    ended: 'Terminé',

    register: 'S’inscrire',

    waitlist: 'Liste d’attente',

    details: 'Détails',

    close: 'Fermer',

    registration: 'Inscription',

    fullName: 'Nom complet',

    email: 'E-mail',

    phone: 'Téléphone',

    specialty: 'Spécialité',

    submitRegistration: 'Envoyer ma demande',

    registrationSuccess: 'Votre demande a été envoyée avec succès. Le comité validera votre inscription.',

    confirmText:

      'Vous allez préparer une demande d’inscription pour cette session. Confirmez pour continuer.',

    confirm: 'Préparer la demande',

    cancel: 'Annuler',

    prepared: 'Demande préparée',

    preparedText:

      'La demande est prête pour la prochaine étape de validation. Aucun envoi réel n’est effectué pour le moment.',

    noResults: 'Aucune formation ne correspond à ces critères.',

    professional:

      'Les formations réservées aux membres peuvent nécessiter une connexion à l’espace professionnel.',

    publicData:

      'Les informations affichées ici sont des données de démonstration en attendant les données officielles de la CSNPT.',

    home: 'Accueil',

    find: 'Trouver',

    understand: 'Comprendre',

    menu: 'Menu',

  },



  ar: {

    eyebrow: 'التكوينات',

    title: 'نتعلم، نمارس، نتقدم.',

    intro:

      'التكوينات والمواعيد المهنية التابعة لـ CSNPT، منظمة حسب الوقت والممارسة والتطور المهني.',

    upcoming: 'المواعيد القادمة',

    filters: 'التصفية',

    all: 'الكل',

    training: 'تكوينات',

    seminar: 'ندوات',

    workshop: 'ورشات',

    webinar: 'ندوات عن بعد',

    congress: 'مؤتمرات',

    mode: 'النمط',

    place: 'المكان',

    audience: 'الفئة المستهدفة',

    level: 'المستوى',

    accreditation: 'الاعتماد',

    duration: 'المدة',

    seats: 'الأماكن',

    available: 'مفتوح',

    limited: 'أماكن محدودة',

    full: 'مكتمل',

    ended: 'انتهى',

    register: 'التسجيل',

    waitlist: 'قائمة الانتظار',

    details: 'التفاصيل',

    close: 'إغلاق',

    registration: 'التسجيل',

    fullName: 'الاسم الكامل',

    email: 'البريد الإلكتروني',

    phone: 'الهاتف',

    specialty: 'الاختصاص',

    submitRegistration: 'إرسال الطلب',

    registrationSuccess: 'تم إرسال طلبك بنجاح. سيقوم اللجنة بالمصادقة على تسجيلك.',

    confirmText:

      'باش نحضّرو طلب تسجيل في هالحصة. أكّد باش تواصل.',

    confirm: 'تحضير الطلب',

    cancel: 'إلغاء',

    prepared: 'تم إعداد الطلب',

    preparedText:

      'الطلب حاضر للمرحلة القادمة من المصادقة. حاليًا ما يتم حتى إرسال حقيقي.',

    noResults: 'ما ثماش تكوين يطابق هالمعايير.',

    professional:

      'التكوينات المخصصة للأعضاء قد تتطلب الدخول إلى الفضاء المهني.',

    publicData:

      'المعلومات المعروضة هنا تجريبية إلى حين إدماج المعطيات الرسمية لـ CSNPT.',

    home: 'الرئيسية',

    find: 'البحث',

    understand: 'نفهمو',

    menu: 'القائمة',

  },



  en: {

    eyebrow: 'TRAINING',

    title: 'Learn, practice, progress.',

    intro:

      'CSNPT training sessions and professional events organized around time, practice and professional development.',

    upcoming: 'Upcoming sessions',

    filters: 'Filter',

    all: 'All',

    training: 'Training',

    seminar: 'Seminars',

    workshop: 'Workshops',

    webinar: 'Webinars',

    congress: 'Congress',

    mode: 'Mode',

    place: 'Location',

    audience: 'Audience',

    level: 'Level',

    accreditation: 'Accreditation',

    duration: 'Duration',

    seats: 'Seats',

    available: 'Open',

    limited: 'Limited places',

    full: 'Full',

    ended: 'Ended',

    register: 'Register',

    waitlist: 'Waitlist',

    details: 'Details',

    close: 'Close',

    registration: 'Registration',

    fullName: 'Full name',

    email: 'Email',

    phone: 'Phone',

    specialty: 'Specialty',

    submitRegistration: 'Send my request',

    registrationSuccess: 'Your request was sent successfully. The committee will review your registration.',

    confirmText:

      'You are about to prepare a registration request for this session. Confirm to continue.',

    confirm: 'Prepare request',

    cancel: 'Cancel',

    prepared: 'Request prepared',

    preparedText:

      'The request is ready for the next validation step. No real submission is made yet.',

    noResults: 'No session matches these filters.',

    professional:

      'Member-only training may require signing in to the professional area.',

    publicData:

      'The information displayed here is demonstration data pending official CSNPT data.',

    home: 'Home',

    find: 'Find',

    understand: 'Understand',

    menu: 'Menu',

  },

};



export default function FormationsPage() {

  const [lang, setLang] = useState<Lang>('fr');

  const [publishedEvents, setPublishedEvents] = useState<PublishedEvent[]>([]);

  const [calmMode, setCalmMode] = useState(false);

  const [dyslexicFont, setDyslexicFont] = useState(false);



  const [filter, setFilter] = useState<'all' | 'training' | 'seminar'>('all');

  const [registrationEventId, setRegistrationEventId] = useState<string | null>(null);

  const [registrationFeedback, setRegistrationFeedback] = useState<{ eventId: string; success: boolean; message: string } | null>(null);

  const [registrationPending, startRegistration] = useTransition();



  const t = copy[lang];



  useEffect(() => {

    document.documentElement.lang = lang;

    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    document.documentElement.dataset.calm = calmMode

      ? 'true'

      : 'false';

  }, [lang, calmMode]);

  useEffect(() => {
    let active = true;
    fetch('/api/events', { cache: 'no-store' })
      .then(response => response.ok ? response.json() : Promise.reject(new Error('Events unavailable')))
      .then((payload: { events?: PublishedEvent[] }) => {
        if (active) setPublishedEvents(Array.isArray(payload.events) ? payload.events : []);
      })
      .catch(() => {
        if (active) setPublishedEvents([]);
      });
    return () => { active = false; };
  }, []);



  const filteredEvents = useMemo(() => {
    if (filter === 'all') return publishedEvents;
    const expectedType = filter === 'training' ? 'formation' : 'seminaire';
    return publishedEvents.filter(event => event.type.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('fr').includes(expectedType));
  }, [filter, publishedEvents]);

  function handleRegistrationSubmit(event: FormEvent<HTMLFormElement>, eventId: string) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.set('eventId', eventId);
    setRegistrationFeedback(null);
    startRegistration(async () => {
      const result = await registerForEvent(formData);
      setRegistrationFeedback({ eventId, success: result.success, message: result.success ? t.registrationSuccess : result.message });
    });
  }


  return (

    <div

      className={`csnpt-app ${

        dyslexicFont ? 'font-dyslexic' : ''

      }`}

    >

      <Navbar

        currentLang={lang}

        onLanguageChange={setLang}

        calmMode={calmMode}

        onToggleCalmMode={() =>

          setCalmMode(value => !value)

        }

        dyslexicFont={dyslexicFont}

        onToggleDyslexicFont={() =>

          setDyslexicFont(value => !value)

        }

      />



      <main id="main-content">

        <section className="formations-page">

          <div className="formations-container">

            <div

              className="formations-axis"

              aria-hidden="true"

            />



            <header className="formations-intro">

              <div>

                <span className="formations-eyebrow">

                  {t.eyebrow}

                </span>



                <h1>{t.title}</h1>



                <p>{t.intro}</p>

              </div>



              <div

                className="formations-intro-mark"

                aria-hidden="true"

              >

                <span />

                <span />

                <span />

              </div>

            </header>



            <section

              className="formations-toolbar"

              aria-label={t.filters}

            >

              <div className="filter-label">

                {t.filters}

              </div>



              <div className="formation-filters">

                {[

                  ['all', t.all],

                  ['training', t.training],

                  ['seminar', t.seminar],

                ].map(([value, label]) => (

                  <button

                    key={value}

                    type="button"

                    className={`formation-filter ${

                      filter === value ? 'selected' : ''

                    }`}

                    aria-pressed={filter === value}

                    onClick={() =>

                      setFilter(

                        value as

                          | 'all'

                          | 'training'

                          | 'seminar'

                      )

                    }

                  >

                    <span className="filter-dot" />

                    {label}

                  </button>

                ))}

              </div>

            </section>



            <section className="timeline-section" aria-labelledby="events-timeline-title">
              <div className="section-heading">
                <div>
                  <span className="small-kicker">CSNPT</span>
                  <h2 id="events-timeline-title">{t.upcoming}</h2>
                </div>
                <span className="result-count">{filteredEvents.length}</span>
              </div>

              <div className="formation-timeline">
                {filteredEvents.map((event, index) => {
                  const eventDate = new Date(event.date);
                  const locale = lang === 'ar' ? 'ar-TN' : lang === 'en' ? 'en-TN' : 'fr-TN';
                  const day = new Intl.DateTimeFormat(locale, { day: '2-digit', timeZone: 'UTC' }).format(eventDate);
                  const month = new Intl.DateTimeFormat(locale, { month: 'long', timeZone: 'UTC' }).format(eventDate);
                  const year = new Intl.DateTimeFormat(locale, { year: 'numeric', timeZone: 'UTC' }).format(eventDate);

                  return (
                    <article className="formation-row" key={event.id}>
                      <div className="timeline-node" aria-hidden="true">
                        <span className="timeline-dot" />
                        {index < filteredEvents.length - 1 && <span className="timeline-line" />}
                      </div>

                      <div className="formation-date" dir="ltr">
                        <strong>{day}</strong>
                        <span>{month}</span>
                        <small>{year}</small>
                      </div>

                      <div className="formation-main">
                        <div className="formation-topline">
                          <span className="event-type-badge">{event.type}</span>
                          <span className="formation-status status-open"><span />{t.available}</span>
                        </div>
                        <h3>{event.title}</h3>
                        {event.description && <p>{event.description}</p>}

                        <div className="formation-meta">
                          <span><b>{t.place}:</b> {event.locationName}</span>
                          <span><b>{t.audience}:</b> {event.audience}</span>
                          <span><b>{t.seats}:</b> {event.capacity}</span>
                          <span dir="ltr"><b>{t.mode}:</b> {event.startTime}–{event.endTime}</span>
                        </div>

                        <div className="formation-actions">
                          <button
                            type="button"
                            className="event-register-button"
                            aria-expanded={registrationEventId === event.id}
                            aria-controls={`event-registration-${event.id}`}
                            onClick={() => {
                              setRegistrationFeedback(null);
                              setRegistrationEventId(current => current === event.id ? null : event.id);
                            }}
                          >
                            {t.register}<span aria-hidden="true">?</span>
                          </button>
                        </div>

                        {registrationEventId === event.id && (
                          <div className="event-registration-form" id={`event-registration-${event.id}`} role="region" aria-label={t.registration}>
                            {registrationFeedback?.eventId === event.id && registrationFeedback.success ? (
                              <div className="registration-success" role="status">
                                <span className="success-mark" aria-hidden="true">?</span>
                                <div><strong>{t.registration}</strong><p>{registrationFeedback.message}</p></div>
                              </div>
                            ) : (
                              <form onSubmit={formEvent => handleRegistrationSubmit(formEvent, event.id)}>
                                <fieldset disabled={registrationPending} className="event-registration-fields">
                                  <legend>{t.registration}</legend>
                                  <label>{t.fullName}<input name="fullName" autoComplete="name" required maxLength={200} /></label>
                                  <label>{t.email}<input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
                                  <label>{t.phone}<input name="phone" type="tel" autoComplete="tel" required maxLength={40} /></label>
                                  <label>{t.specialty}<input name="specialty" autoComplete="organization-title" maxLength={200} /></label>
                                  {registrationFeedback?.eventId === event.id && !registrationFeedback.success && <p className="registration-error" role="alert">{registrationFeedback.message}</p>}
                                  <div className="confirm-actions">
                                    <button type="button" className="secondary-action" disabled={registrationPending} onClick={() => setRegistrationEventId(null)}>{t.close}</button>
                                    <button type="submit" className="event-register-button" disabled={registrationPending}>
                                      {registrationPending && <span className="registration-spinner" aria-hidden="true" />}
                                      {registrationPending ? `${t.submitRegistration}…` : t.submitRegistration}
                                    </button>
                                  </div>
                                </fieldset>
                              </form>
                            )}
                          </div>
                        )}

                      </div>
                    </article>
                  );
                })}
              </div>

              {filteredEvents.length === 0 && <div className="formation-empty">{t.noResults}</div>}
            </section>

          </div>

        </section>

      </main>



      <Footer currentLang={lang} />
<style jsx>{`

        .formations-page {

          --blue: #00488d;

          --sage: #8daf82;

          --terracotta: #da7b46;

          --ink: #17232d;

          --muted: #66727b;

          --line: #dfe5e8;

          --paper: #fcfcfa;

          --soft: #f3f5f2;



          background: var(--paper);

          color: var(--ink);

          min-height: 100vh;

          padding: 64px 20px 100px;

        }



        .formations-container {

          max-width: 1180px;

          margin: 0 auto;

          position: relative;

        }



        .formations-axis {

          position: absolute;

          top: 18px;

          bottom: 80px;

          inset-inline-start: 30px;

          width: 1px;

          background: var(--line);

          pointer-events: none;

          z-index: 0;

        }



        .formations-intro {

          display: grid;

          grid-template-columns: 1fr 220px;

          gap: 60px;

          align-items: end;

          padding: 20px 0 64px 76px;

          border-bottom: 1px solid var(--line);

          position: relative;

          z-index: 1;

        }



        .formations-eyebrow,

        .small-kicker,

        .filter-label {

          font-size: 12px;

          letter-spacing: 0.14em;

          text-transform: uppercase;

          font-weight: 700;

          color: var(--blue);

        }



        .formations-intro h1 {

          margin: 12px 0 18px;

          max-width: 780px;

          font-size: clamp(38px, 5vw, 68px);

          line-height: 0.98;

          letter-spacing: -0.04em;

          font-weight: 700;

        }



        .formations-intro p {

          max-width: 720px;

          margin: 0;

          color: var(--muted);

          font-size: 18px;

          line-height: 1.65;

        }



        .formations-intro-mark {

          height: 130px;

          position: relative;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 18px;

        }



        .formations-intro-mark span {

          display: block;

          border: 1.5px solid var(--blue);

          border-radius: 50%;

        }



        .formations-intro-mark span:nth-child(1) {

          width: 88px;

          height: 88px;

        }



        .formations-intro-mark span:nth-child(2) {

          width: 52px;

          height: 52px;

          margin-inline-start: -54px;

          border-color: var(--terracotta);

        }



        .formations-intro-mark span:nth-child(3) {

          width: 16px;

          height: 16px;

          margin-inline-start: -32px;

          background: var(--sage);

          border: none;

        }



        .formations-toolbar {

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 30px;

          padding: 24px 0 30px 76px;

          border-bottom: 1px solid var(--line);

          position: relative;

          z-index: 1;

        }



        .formation-filters {

          display: flex;

          flex-wrap: wrap;

          justify-content: flex-end;

          gap: 8px;

        }



        .formation-filter {

          min-height: 44px;

          padding: 8px 14px;

          border: 1px solid var(--line);

          border-radius: 999px;

          background: white;

          color: var(--ink);

          cursor: pointer;

          font: inherit;

          display: inline-flex;

          align-items: center;

          gap: 8px;

          touch-action: manipulation;

        }



        .formation-filter:hover,

        .formation-filter.selected {

          border-color: var(--blue);

          background: #eef4f8;

        }



        .filter-dot {

          width: 7px;

          height: 7px;

          border-radius: 50%;

          background: #b8c2c8;

        }



        .formation-filter.selected .filter-dot {

          background: var(--terracotta);

        }



        .timeline-section {

          padding: 56px 0 20px 76px;

          position: relative;

          z-index: 1;

        }



        .section-heading {

          display: flex;

          align-items: end;

          justify-content: space-between;

          margin-bottom: 34px;

        }



        .section-heading h2 {

          margin: 8px 0 0;

          font-size: 32px;

          letter-spacing: -0.025em;

        }



        .result-count {

          width: 40px;

          height: 40px;

          border: 1px solid var(--line);

          border-radius: 50%;

          display: grid;

          place-items: center;

          color: var(--blue);

          font-weight: 700;

        }



        .formation-row {

          position: relative;

          display: grid;

          grid-template-columns: 74px 130px minmax(0, 1fr);

          gap: 26px;

          padding: 0 0 48px;

          min-height: 190px;

        }



        .timeline-node {

          position: relative;

          display: flex;

          justify-content: center;

        }



        .timeline-dot {

          width: 13px;

          height: 13px;

          margin-top: 8px;

          border-radius: 50%;

          background: var(--paper);

          border: 2px solid var(--blue);

          position: relative;

          z-index: 2;

        }



        .timeline-line {

          position: absolute;

          top: 20px;

          bottom: 0;

          width: 1px;

          background: var(--line);

        }



        .formation-date {

          padding-top: 0;

          display: flex;

          flex-direction: column;

        }



        .formation-date strong {

          font-size: 46px;

          line-height: 0.95;

          letter-spacing: -0.05em;

        }



        .formation-date span {

          margin-top: 8px;

          font-size: 13px;

          letter-spacing: 0.12em;

          color: var(--terracotta);

          font-weight: 800;

        }



        .formation-date small {

          margin-top: 4px;

          color: var(--muted);

        }



        .formation-main {

          border-bottom: 1px solid var(--line);

          padding-bottom: 28px;

          min-width: 0;

        }



        .formation-topline {

          display: flex;

          justify-content: space-between;

          align-items: center;

          gap: 15px;

          margin-bottom: 10px;

        }



        .formation-type {

          font-size: 13px;

          color: var(--blue);

          font-weight: 700;

        }


        .event-type-badge {

          display: inline-flex;

          align-items: center;

          width: fit-content;

          min-height: 30px;

          padding: 5px 12px;

          border: 1px solid rgba(196, 98, 59, 0.28);

          border-radius: 999px;

          background: rgba(196, 98, 59, 0.09);

          color: var(--terracotta);

          font-size: 12px;

          font-weight: 800;

          letter-spacing: 0.035em;

        }



        .event-register-button {

          display: inline-flex;

          align-items: center;

          justify-content: center;

          gap: 12px;

          min-height: 46px;

          padding: 10px 20px;

          border: 1px solid #0e5a5f;

          border-radius: 999px;

          background: #0e5a5f;

          color: #fff;

          font: inherit;

          font-weight: 700;

          cursor: pointer;

          transition: background-color 160ms ease, border-color 160ms ease, transform 160ms ease;

        }



        .event-register-button:hover:not(:disabled) {

          background: #0a484c;

          border-color: #0a484c;

          transform: translateY(-1px);

        }



        .event-register-button:focus-visible {

          outline: 3px solid rgba(196, 98, 59, 0.55);

          outline-offset: 3px;

        }



        .event-register-button:disabled {

          cursor: default;

          opacity: 0.72;

        }



        .formation-status {

          display: inline-flex;

          align-items: center;

          gap: 7px;

          font-size: 12px;

          font-weight: 700;

        }



        .formation-status > span {

          width: 7px;

          height: 7px;

          border-radius: 50%;

          background: currentColor;

        }



        .status-open {

          color: #47733e;

        }



        .status-limited {

          color: var(--terracotta);

        }



        .status-full {

          color: #7a6460;

        }



        .status-ended {

          color: #8a9398;

        }



        .formation-main h3 {

          margin: 0 0 10px;

          font-size: clamp(23px, 2.5vw, 32px);

          line-height: 1.12;

          letter-spacing: -0.025em;

        }



        .formation-main > p {

          margin: 0;

          max-width: 780px;

          color: var(--muted);

          line-height: 1.6;

        }



        .formation-meta {

          display: flex;

          flex-wrap: wrap;

          gap: 12px 24px;

          margin-top: 20px;

          color: var(--muted);

          font-size: 14px;

        }



        .formation-meta b {

          color: var(--ink);

        }



        .formation-actions {

          display: flex;

          align-items: center;

          gap: 20px;

          margin-top: 24px;

        }



        .text-action,

        .primary-action,

        .secondary-action {

          min-height: 44px;

          font: inherit;

          cursor: pointer;

          touch-action: manipulation;

        }



        .text-action {

          border: 0;

          background: transparent;

          color: var(--blue);

          padding: 8px 0;

          font-weight: 700;

        }



        .text-action span {

          display: inline-block;

          margin-inline-start: 8px;

        }



        .primary-action {

          border: 1px solid var(--blue);

          background: var(--blue);

          color: white;

          border-radius: 4px;

          padding: 10px 18px;

          font-weight: 700;

        }



        .primary-action:disabled {

          cursor: default;

          opacity: 0.65;

        }



        .secondary-action {

          border: 1px solid var(--line);

          background: white;

          color: var(--ink);

          border-radius: 4px;

          padding: 10px 18px;

          font-weight: 700;

        }



        .formation-expanded {

          display: grid;

          grid-template-columns: repeat(3, 1fr);

          gap: 1px;

          background: var(--line);

          border: 1px solid var(--line);

          margin-top: 24px;

        }



        .formation-expanded > div {

          background: white;

          padding: 18px;

        }



        .formation-expanded span {

          display: block;

          color: var(--muted);

          font-size: 12px;

          margin-bottom: 6px;

        }



        .formation-expanded strong {

          font-size: 15px;

        }



        .registration-confirm {

          margin-top: 20px;

          padding: 20px;

          background: var(--soft);

          border-inline-start: 3px solid var(--terracotta);

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 24px;

        }



        .event-registration-form {

          margin-top: 20px;

          padding: clamp(16px, 3vw, 24px);

          background: var(--soft);

          border: 1px solid var(--line);

          border-inline-start: 3px solid var(--terracotta);

        }



        .event-registration-fields {

          display: grid;

          grid-template-columns: repeat(2, minmax(0, 1fr));

          gap: 14px;

          width: 100%;

          min-width: 0;

          margin: 0;

          padding: 0;

          border: 0;

        }



        .event-registration-fields legend {

          grid-column: 1 / -1;

          margin-bottom: 2px;

          font-family: var(--font-serif);

          font-size: 20px;

          font-weight: 700;

          color: var(--ink);

        }



        .event-registration-fields label {

          display: grid;

          min-width: 0;

          gap: 6px;

          color: var(--ink);

          font-size: 13px;

          font-weight: 650;

        }



        .event-registration-fields input {

          width: 100%;

          min-height: 44px;

          padding: 9px 12px;

          border: 1px solid var(--line);

          border-radius: 6px;

          background: #fff;

          color: var(--ink);

          font: inherit;

        }



        .event-registration-fields input:focus-visible {

          outline: 3px solid rgb(14 90 95 / 25%);

          border-color: var(--blue);

          outline-offset: 1px;

        }



        .event-registration-fields input:disabled {

          opacity: 0.65;

        }



        .event-registration-fields .confirm-actions,

        .event-registration-fields .registration-error {

          grid-column: 1 / -1;

        }



        .registration-error {

          margin: 0;

          color: #9b2c25;

          font-size: 14px;

        }



        .registration-spinner {

          width: 15px;

          height: 15px;

          border: 2px solid rgb(255 255 255 / 45%);

          border-top-color: #fff;

          border-radius: 50%;

          animation: registration-spin 700ms linear infinite;

        }



        @keyframes registration-spin {

          to { transform: rotate(360deg); }

        }



        @media (max-width: 600px) {

          .event-registration-fields { grid-template-columns: minmax(0, 1fr); }

        }



        @media (prefers-reduced-motion: reduce) {

          .registration-spinner { animation: none; }

        }



        .registration-confirm strong,

        .registration-success strong {

          font-size: 15px;

        }



        .registration-confirm p,

        .registration-success p {

          margin: 5px 0 0;

          color: var(--muted);

          line-height: 1.5;

          font-size: 14px;

        }



        .confirm-actions {

          display: flex;

          gap: 8px;

          flex-shrink: 0;

        }



        .registration-success {

          margin-top: 20px;

          padding: 18px;

          display: flex;

          align-items: flex-start;

          gap: 12px;

          background: #f0f5ee;

          border-inline-start: 3px solid var(--sage);

        }



        .success-mark {

          width: 28px;

          height: 28px;

          border-radius: 50%;

          background: var(--sage);

          color: white;

          display: grid;

          place-items: center;

          flex-shrink: 0;

          font-weight: 800;

        }



        .formation-empty {

          padding: 40px;

          text-align: center;

          border: 1px dashed var(--line);

          color: var(--muted);

        }



        .formation-note {

          margin: 30px 0 0 76px;

          padding: 20px;

          display: flex;

          gap: 14px;

          align-items: flex-start;

          background: #f4f7f8;

          border: 1px solid var(--line);

        }



        .note-mark {

          width: 24px;

          height: 24px;

          border: 1px solid var(--blue);

          border-radius: 50%;

          display: grid;

          place-items: center;

          color: var(--blue);

          font-size: 13px;

          font-weight: 800;

          flex-shrink: 0;

        }



        .formation-note p {

          margin: 0;

          color: var(--muted);

          line-height: 1.55;

          font-size: 14px;

        }



        .demo-notice {

          margin: 18px 0 0 76px;

          color: #7c858a;

          font-size: 12px;

          line-height: 1.5;

        }



        button:focus-visible,

        a:focus-visible {

          outline: 2px solid var(--blue);

          outline-offset: 3px;

        }



        /*

         * MOBILE NAV

         * مخبي في desktop

         */

        .mobile-bottom-nav {

          display: none;

        }



        /*

         * العربية:

         * الخط العمودي متاع الـTimeline ما يدخلش فوق المحتوى العربي.

         */

        :global(html[dir='rtl']) .formations-axis {

          display: none;

        }



        :global(html[data-calm='true']) .formations-page {

          --terracotta: #b47a58;

          --sage: #82947b;

        }



        :global(.font-dyslexic) .formations-page {

          font-family: Arial, sans-serif;

        }



        @media (max-width: 800px) {

          .formations-page {

            padding: 32px 16px 110px;

          }



          .formations-axis {

            inset-inline-start: 12px;

          }



          .formations-intro {

            grid-template-columns: 1fr;

            padding: 20px 0 40px 40px;

            gap: 20px;

          }



          .formations-intro h1 {

            font-size: 40px;

          }



          .formations-intro p {

            font-size: 16px;

          }



          .formations-intro-mark {

            display: none;

          }



          .formations-toolbar {

            display: block;

            padding: 20px 0 24px 40px;

          }



          .filter-label {

            display: block;

            margin-bottom: 12px;

          }



          .formation-filters {

            justify-content: flex-start;

          }



          .timeline-section {

            padding: 40px 0 20px 40px;

          }



          .formation-row {

            grid-template-columns: 48px minmax(0, 1fr);

            gap: 16px;

          }



          .formation-date {

            grid-column: 1;

            grid-row: 1;

          }



          .formation-main {

            grid-column: 2;

            grid-row: 1;

          }



          .timeline-node {

            position: absolute;

            inset-inline-start: -34px;

            top: 0;

            bottom: 0;

          }



          .formation-date strong {

            font-size: 34px;

          }



          .formation-date span {

            font-size: 11px;

          }



          .formation-meta {

            display: grid;

            gap: 8px;

          }



          .formation-actions {

            flex-direction: column;

            align-items: stretch;

          }



          .text-action {

            text-align: start;

          }



          .primary-action {

            width: 100%;

          }



          .formation-expanded {

            grid-template-columns: 1fr;

          }



          .registration-confirm {

            flex-direction: column;

            align-items: stretch;

          }



          .confirm-actions {

            display: grid;

            grid-template-columns: 1fr 1fr;

          }



          .formation-note,

          .demo-notice {

            margin-inline-start: 40px;

          }



          /*

           * FIX TOUCH:

           * الـbar فوق كل شيء

           * وما فما حتى عنصر ينجم يحجبها

           */

          .mobile-bottom-nav {

            position: fixed;

            z-index: 99999;



            display: grid;

            grid-template-columns: repeat(5, minmax(0, 1fr));



            inset-inline: 0;

            bottom: 0;



            min-height: 68px;



            padding: 6px 8px

              calc(6px + env(safe-area-inset-bottom));



            background: rgba(252, 252, 250, 0.98);



            border-top: 1px solid var(--line);



            box-shadow:

              0 -4px 20px rgba(23, 35, 45, 0.08);



            pointer-events: auto;

            touch-action: manipulation;



            -webkit-tap-highlight-color: transparent;



            isolation: isolate;

          }



          /*

           * كل زر/link عندو touch area واضح

           */

          .mobile-bottom-link {

            position: relative;

            z-index: 100000;



            min-width: 44px;

            min-height: 56px;



            margin: 0;

            padding: 6px 3px;



            border: 0;

            border-radius: 8px;



            background: transparent;



            color: #66727b;

            text-decoration: none;



            display: flex;

            flex-direction: column;

            align-items: center;

            justify-content: center;



            gap: 4px;



            font-family: inherit;

            font-size: 10px;

            line-height: 1.1;



            cursor: pointer;



            pointer-events: auto;

            touch-action: manipulation;



            -webkit-user-select: none;

            user-select: none;

            -webkit-tap-highlight-color: transparent;

          }



          .mobile-bottom-link:active {

            background: #eef4f8;

            color: var(--blue);

          }



          .mobile-bottom-link.active {

            color: var(--blue);

            background: #eef4f8;

          }



          .mobile-nav-icon {

            display: block;



            width: 22px;

            height: 22px;



            font-size: 18px;

            line-height: 22px;



            text-align: center;



            font-weight: 700;



            pointer-events: none;

          }



          .mobile-bottom-link span:last-child {

            pointer-events: none;

          }



          .mobile-bottom-link.active

            .mobile-nav-icon {

            color: var(--terracotta);

          }



          /*

           * في RTL:

           * الـgrid يتقلب طبيعيًا مع direction.

           */

          :global(html[dir='rtl'])

            .mobile-bottom-nav {

            direction: rtl;

          }



          /*

           * نخلي المحتوى الأخير ما يختفيش وراء الـbar

           */

          .formations-page {

            padding-bottom: 120px;

          }

        }



        @media (max-width: 480px) {

          .formations-intro h1 {

            font-size: 34px;

          }



          .formation-main h3 {

            font-size: 23px;

          }



          .formation-topline {

            align-items: flex-start;

            flex-direction: column;

          }



          .formation-date strong {

            font-size: 29px;

          }



          .formation-filters {

            display: grid;

            grid-template-columns: 1fr 1fr;

          }



          .formation-filter {

            justify-content: center;

          }



          .mobile-bottom-nav {

            min-height: 70px;

          }



          .mobile-bottom-link {

            min-height: 58px;

            font-size: 9px;

          }

        }



        @media (prefers-reduced-motion: reduce) {

          .formations-page * {

            scroll-behavior: auto !important;

            transition: none !important;

          }

        }

      `}</style>

    </div>

  );

}
