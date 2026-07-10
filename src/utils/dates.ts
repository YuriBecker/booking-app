import type { SupportedLocale } from "@/i18n";

type DateInput = Date | string | number;

export const addDays = (date: DateInput, amount: number) => {
  const result = new Date(date instanceof Date ? date.getTime() : date);
  result.setDate(result.getDate() + amount);
  return result;
};

export const formatLongDate = (date: Date, locale: SupportedLocale = "en") =>
  new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

export const removeTimeFromDate = (date: Date) => {
  return new Date(date.toDateString());
};
