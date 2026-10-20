'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import useDocumentLanguage from '@/lib/useDocumentLanguage';

type ChatMessage = { role: 'user' | 'model'; text: string };

class LocalizedChatError extends Error {}

const copy = {
  fr: {
    title: 'Assistant CSNPT',
    subtitle: 'À votre écoute',
    close: 'Fermer la conversation',
    conversation: 'Conversation',
    welcome: 'Bonjour ! Posez votre question à l’assistant CSNPT.',
    thinking: 'L’assistant rédige une réponse…',
    input: 'Votre message',
    placeholder: 'Écrivez votre message…',
    send: 'Envoyer le message',
    open: 'Ouvrir l’assistant CSNPT',
    closeLauncher: 'Fermer l’assistant CSNPT',
    notConfigured: 'L’assistant n’est pas encore configuré.',
    invalid: 'Le message ne peut pas être envoyé. Vérifiez son contenu.',
    unavailable: 'L’assistant ne peut pas répondre pour le moment. Réessayez.',
  },
  ar: {
    title: 'مساعد CSNPT',
    subtitle: 'في خدمتكم',
    close: 'إغلاق المحادثة',
    conversation: 'المحادثة',
    welcome: 'مرحباً! اطرح سؤالك على مساعد CSNPT.',
    thinking: 'المساعد يكتب إجابة…',
    input: 'رسالتك',
    placeholder: 'اكتب رسالتك…',
    send: 'إرسال الرسالة',
    open: 'فتح مساعد CSNPT',
    closeLauncher: 'إغلاق مساعد CSNPT',
    notConfigured: 'المساعد غير مُعدّ بعد.',
    invalid: 'تعذّر إرسال الرسالة. يُرجى التحقق من محتواها.',
    unavailable: 'لا يستطيع المساعد الرد حالياً. حاول مرة أخرى.',
  },
  en: {
    title: 'CSNPT assistant',
    subtitle: 'Here to help',
    close: 'Close conversation',
    conversation: 'Conversation',
    welcome: 'Hello! Ask the CSNPT assistant a question.',
    thinking: 'The assistant is writing a reply…',
    input: 'Your message',
    placeholder: 'Write your message…',
    send: 'Send message',
    open: 'Open CSNPT assistant',
    closeLauncher: 'Close CSNPT assistant',
    notConfigured: 'The assistant is not configured yet.',
    invalid: 'The message could not be sent. Check its contents.',
    unavailable: 'The assistant cannot reply right now. Please try again.',
  },
} as const;

export default function SensoryChatbot() {
  const language = useDocumentLanguage();
  const t = copy[language];
  const isRtl = language === 'ar';
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.documentElement.dataset.chatOpen = String(open);
    return () => {
      delete document.documentElement.dataset.chatOpen;
    };
  }, [open]);

  useEffect(() => {
    const log = logRef.current;
    if (!log) return;
    const reduceMotion =
      document.documentElement.dataset.sensoryMode === 'calm' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    log.scrollTo({ top: log.scrollHeight, behavior: reduceMotion ? 'auto' : 'smooth' });
  }, [messages, busy, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft.trim();
    if (!text || busy) return;

    const history = messages;
    setDraft('');
    setError('');
    setMessages(current => [...current, { role: 'user', text }]);
    setBusy(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      });
      const result = (await response.json()) as { reply?: string };
      if (!response.ok) {
        if (response.status === 503) throw new LocalizedChatError(t.notConfigured);
        if (response.status === 400) throw new LocalizedChatError(t.invalid);
        throw new LocalizedChatError(t.unavailable);
      }
      if (!result.reply?.trim()) throw new LocalizedChatError(t.unavailable);
      setMessages(current => [...current, { role: 'model', text: result.reply!.trim() }]);
    } catch (cause) {
      setError(cause instanceof LocalizedChatError ? cause.message : t.unavailable);
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  }

  return (
    <div className="sensory-chatbot" dir={isRtl ? 'rtl' : 'ltr'}>
      {open && (
        <section id="chat-panel" className="chat-panel" role="dialog" aria-modal="false" aria-labelledby="chat-title">
          <header className="chat-header">
            <div>
              <h2 id="chat-title">{t.title}</h2>
              <p>{t.subtitle}</p>
            </div>
            <button className="icon-button" type="button" onClick={() => setOpen(false)} aria-label={t.close}>
              <X size={19} aria-hidden="true" />
            </button>
          </header>

          <div className="chat-log" ref={logRef} aria-live="polite" aria-label={t.conversation}>
            {messages.length === 0 && <p className="chat-welcome">{t.welcome}</p>}
            {messages.map((item, index) => (
              <div className={`chat-message ${item.role}`} key={`${index}-${item.role}`}>
                {item.text}
              </div>
            ))}
            {busy && <div className="chat-message model" role="status">{t.thinking}</div>}
            {error && <p className="chat-error" role="alert">{error}</p>}
          </div>

          <form className="chat-form" onSubmit={sendMessage}>
            <label className="sr-only" htmlFor="chat-message">{t.input}</label>
            <input
              ref={inputRef}
              id="chat-message"
              value={draft}
              onChange={event => setDraft(event.target.value)}
              placeholder={t.placeholder}
              maxLength={4000}
              disabled={busy}
              autoComplete="off"
            />
            <button className="send-button" type="submit" disabled={!draft.trim() || busy} aria-label={t.send}>
              <Send size={18} aria-hidden="true" />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className="chat-launcher"
        aria-label={open ? t.closeLauncher : t.open}
        aria-expanded={open}
        aria-controls="chat-panel"
        onClick={() => setOpen(value => !value)}
      >
        {open ? <X size={23} aria-hidden="true" /> : <MessageCircle size={23} aria-hidden="true" />}
      </button>

      <style jsx>{`
        .sensory-chatbot { position: fixed; z-index: 10000; inset-inline-end: 1.25rem; bottom: 1.25rem; display: flex; flex-direction: column; align-items: flex-end; gap: .75rem; color: var(--ink, #14272A); font-family: var(--font-body, Arial, sans-serif); }
        .chat-launcher { width: 3.5rem; height: 3.5rem; display: grid; place-items: center; border: 0; border-radius: 50%; color: var(--white, #FCFCFC); background: var(--teal, #0E5A5F); box-shadow: 0 8px 24px rgb(16 40 36 / 20%); cursor: pointer; transition: transform 160ms ease, box-shadow 160ms ease; }
        .chat-launcher:hover { transform: translateY(-2px); box-shadow: 0 11px 28px rgb(16 40 36 / 26%); }
        .chat-launcher:focus-visible, .icon-button:focus-visible, .send-button:focus-visible { outline: 3px solid var(--teal, #0E5A5F); outline-offset: 3px; }
        .chat-panel { display: flex; flex-direction: column; width: min(23rem, calc(100vw - 2rem)); height: min(34rem, calc(100dvh - 7rem)); overflow: hidden; border: 1px solid var(--line, #d6d5ca); border-radius: 1.2rem; background: var(--paper, #F6F1E9); box-shadow: 0 16px 48px rgb(16 40 36 / 20%); }
        .chat-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; padding: 1rem 1.1rem; color: var(--white, #FCFCFC); background: var(--teal, #0E5A5F); }
        .chat-header h2 { margin: 0; font-size: 1rem; font-weight: 700; }
        .chat-header p { margin: .25rem 0 0; font-size: .8rem; opacity: .9; }
        .icon-button { display: grid; place-items: center; width: 2.5rem; min-width: 2.5rem; height: 2.5rem; border: 0; border-radius: 2px; color: inherit; background: transparent; cursor: pointer; }
        .chat-log { flex: 1; overflow-y: auto; display: flex; flex-direction: column; align-items: flex-start; gap: .75rem; padding: 1rem; background: var(--paper, #F6F1E9); }
        .chat-welcome { margin: 0; padding: .8rem .9rem; border-radius: .75rem .75rem .75rem .2rem; background: var(--paper-2, #FCFCFC); font-size: .9rem; line-height: 1.6; }
        .chat-message { max-width: 88%; padding: .7rem .85rem; border-radius: .75rem; white-space: pre-wrap; overflow-wrap: anywhere; font-size: .9rem; line-height: 1.6; }
        .chat-message.user { align-self: flex-end; border-end-end-radius: .2rem; color: var(--white, #FCFCFC); background: var(--teal, #0E5A5F); }
        .chat-message.model { border-end-start-radius: .2rem; background: var(--paper-2, #FCFCFC); }
        .chat-error { margin: 0; color: #8b342a; font-size: .82rem; }
        .chat-form { display: flex; gap: .5rem; padding: .8rem; border-top: 1px solid var(--line, #d6d5ca); background: var(--paper-2, #FCFCFC); }
        .chat-form input { flex: 1; min-width: 0; border: 1px solid var(--line, #d6d5ca); border-radius: .3rem; padding: .7rem .8rem; color: var(--ink, #14272A); background: var(--paper-2, #FCFCFC); font: inherit; font-size: .9rem; }
        .chat-form input:focus-visible { outline: 2px solid var(--teal, #0E5A5F); outline-offset: 1px; }
        .send-button { display: grid; place-items: center; width: 2.75rem; min-width: 2.75rem; min-height: 2.75rem; border: 0; border-radius: .3rem; color: var(--white, #FCFCFC); background: var(--teal, #0E5A5F); cursor: pointer; }
        .send-button:disabled { cursor: not-allowed; opacity: .55; }
        .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
        :global(html[dir='rtl']) .chat-welcome { border-radius: .75rem .75rem .2rem .75rem; }
        :global(html[dir='rtl']) .send-button svg { transform: scaleX(-1); }
        @media (prefers-reduced-motion: reduce) { .chat-launcher { transition: none; } .chat-launcher:hover { transform: none; } }
        :global(html[data-sensory-mode='calm']) .sensory-chatbot *, :global(html[data-sensory-mode='calm']) .sensory-chatbot *::before, :global(html[data-sensory-mode='calm']) .sensory-chatbot *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
        @media (max-width: 639px) { .chat-panel { height: min(34rem, calc(100dvh - 10rem)); } }
      `}</style>
    </div>
  );
}
