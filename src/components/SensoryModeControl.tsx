"use client";

import { useEffect, useState } from "react";
import useDocumentLanguage from "@/lib/useDocumentLanguage";

type SensoryMode = "standard" | "calm" | "contrast";

const modes: Record<"fr" | "ar" | "en", Array<{ value: SensoryMode; label: string }>> = {
  fr: [
    { value: "standard", label: "Standard" },
    { value: "calm", label: "Calme" },
    { value: "contrast", label: "Contraste" },
  ],
  ar: [
    { value: "standard", label: "عادي" },
    { value: "calm", label: "هادئ" },
    { value: "contrast", label: "تباين" },
  ],
  en: [
    { value: "standard", label: "Standard" },
    { value: "calm", label: "Calm" },
    { value: "contrast", label: "Contrast" },
  ],
};

export default function SensoryModeControl() {
  const [mode, setMode] = useState<SensoryMode>("standard");
  const language = useDocumentLanguage();

  useEffect(() => {
    let initialMode: SensoryMode = "standard";

    try {
      const stored = window.localStorage.getItem("csnpt-sensory");
      if (stored === "calm" || stored === "contrast") initialMode = stored;
    } catch {
      // Use the default mode when browser storage is unavailable.
    }

    document.documentElement.setAttribute("data-sensory-mode", initialMode);
    if (initialMode !== "standard") {
      // Restore the persisted control state after the initial, matching render.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMode(initialMode);
    }
  }, []);

  function selectMode(next: SensoryMode) {
    setMode(next);
    document.documentElement.setAttribute("data-sensory-mode", next);
    try {
      window.localStorage.setItem("csnpt-sensory", next);
    } catch {
      // Keep the in-memory preference when browser storage is unavailable.
    }
  }

  const labels = {
    fr: { group: "Mode sensoriel", legend: "Affichage" },
    ar: { group: "الوضع الحسي", legend: "العرض" },
    en: { group: "Sensory mode", legend: "Display" },
  }[language];

  return (
    <fieldset className="sensory-mode-control" aria-label={labels.group} dir={language === "ar" ? "rtl" : "ltr"}>
      <legend>{labels.legend}</legend>
      <div className="sensory-mode-options">
        {modes[language].map(({ value, label }) => (
          <button
            key={value}
            type="button"
            aria-pressed={mode === value}
            onClick={() => selectMode(value)}
          >
            {label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
