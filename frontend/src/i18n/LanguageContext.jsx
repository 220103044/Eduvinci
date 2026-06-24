import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "./translations";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return "tr";
    return window.localStorage.getItem("ev-lang") || "tr";
  });

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
    window.localStorage.setItem("ev-lang", lang);
  }, [lang]);

  const t = useMemo(() => {
    const dict = translations[lang] || translations.tr;
    return (path) => {
      const parts = path.split(".");
      let cur = dict;
      for (const p of parts) {
        if (cur && typeof cur === "object" && p in cur) cur = cur[p];
        else return path;
      }
      return cur;
    };
  }, [lang]);

  const toggle = () => setLang((l) => (l === "tr" ? "en" : "tr"));

  const value = useMemo(() => ({ lang, setLang, toggle, t }), [lang, t]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
