'use client';

import { useSyncExternalStore } from 'react';
import type { Lang } from '@/lib/types';

function isLang(value: string): value is Lang {
  return value === 'fr' || value === 'ar' || value === 'en';
}

function subscribe(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang'],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Lang {
  const current = document.documentElement.lang;
  return isLang(current) ? current : 'fr';
}

function getServerSnapshot(): Lang {
  return 'fr';
}

export default function useDocumentLanguage(): Lang {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
