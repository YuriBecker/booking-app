import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ptBR from "./locales/pt-BR.json";

export const supportedLocales = ["en", "pt-BR"] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

export const DEFAULT_LOCALE: SupportedLocale = "en";
export const LOCALE_STORAGE_KEY = "booking-app.locale";

export const localeMetadata: Record<SupportedLocale, { label: string }> = {
  en: { label: "English" },
  "pt-BR": { label: "Português (Brasil)" },
};

export const isSupportedLocale = (value: string | null): value is SupportedLocale =>
  value !== null && supportedLocales.includes(value as SupportedLocale);

const getStoredLocale = (): SupportedLocale | null => {
  try {
    const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return isSupportedLocale(storedLocale) ? storedLocale : null;
  } catch {
    return null;
  }
};

export const detectLocale = (): SupportedLocale => {
  const storedLocale = getStoredLocale();
  if (storedLocale) return storedLocale;

  const browserLocales = typeof navigator === "undefined" ? [] : navigator.languages;
  return browserLocales.some((locale) => locale.toLowerCase().startsWith("pt"))
    ? "pt-BR"
    : DEFAULT_LOCALE;
};

export const setLocale = async (locale: SupportedLocale) => {
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Locale switching must still work when storage is unavailable.
  }

  await i18n.changeLanguage(locale);
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    "pt-BR": { translation: ptBR },
  },
  lng: detectLocale(),
  fallbackLng: DEFAULT_LOCALE,
  interpolation: { escapeValue: false },
});

const updateDocumentLocale = (language: string) => {
  if (typeof document === "undefined") return;
  document.documentElement.lang = language;
  document.title = i18n.t("app.title");
};

i18n.on("languageChanged", updateDocumentLocale);
updateDocumentLocale(i18n.language);

export default i18n;
