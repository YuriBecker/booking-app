export const formatCurrency = (
  value: number,
  options?: Intl.NumberFormatOptions
) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    ...options,
  }).format(value);
};

export const formatDate = (
  date: string | number | Date,
  options?: Intl.DateTimeFormatOptions
) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  }).format(new Date(date));
};
