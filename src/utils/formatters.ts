import type { SupportedLocale } from "@/i18n";

export const formatCurrency = (
  value: number,
  localeOrOptions: SupportedLocale | Intl.NumberFormatOptions = "en",
  options?: Intl.NumberFormatOptions
) => {
  const locale = typeof localeOrOptions === "string" ? localeOrOptions : "en";
  const formatOptions = typeof localeOrOptions === "string" ? options : localeOrOptions;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    ...formatOptions,
  }).format(value);
};

export const formatDate = (
  date: string | number | Date,
  localeOrOptions: SupportedLocale | Intl.DateTimeFormatOptions = "en",
  options?: Intl.DateTimeFormatOptions
) => {
  const locale = typeof localeOrOptions === "string" ? localeOrOptions : "en";
  const formatOptions = typeof localeOrOptions === "string" ? options : localeOrOptions;

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...formatOptions,
  }).format(new Date(date));
};
