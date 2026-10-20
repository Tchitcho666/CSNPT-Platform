'use client';

import { useEffect, useRef } from 'react';

export default function ClinicModal({
  open,
  address,
  loading,
  title,
  closeLabel,
  loadingLabel,
  unavailableLabel,
  direction = 'ltr',
  onClose,
}: {
  open: boolean;
  address: string | null;
  loading: boolean;
  title: string;
  closeLabel: string;
  loadingLabel: string;
  unavailableLabel: string;
  direction?: 'ltr' | 'rtl';
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previousFocusRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100001] grid place-items-center bg-black/60 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="clinic-dialog-title"
        dir={direction}
        tabIndex={-1}
        className="w-full max-w-lg rounded-2xl border border-[#DCD8CE] bg-[#FCFCFC] p-6 text-[#14272A] shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="clinic-dialog-title" className="text-xl font-bold">{title}</h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="min-h-11 min-w-11 rounded-lg border border-[#DCD8CE]"
            aria-label={closeLabel}
          >×</button>
        </div>
        <p className="mt-5 leading-7" aria-live="polite">
          {loading ? loadingLabel : address ?? unavailableLabel}
        </p>
      </section>
    </div>
  );
}
