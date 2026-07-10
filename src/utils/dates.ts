type DateInput = Date | string | number;

const longDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});

const getOrdinalSuffix = (day: number) => {
  const lastTwoDigits = day % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return "th";
  }

  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const addDays = (date: DateInput, amount: number) => {
  const result = new Date(date instanceof Date ? date.getTime() : date);
  result.setDate(result.getDate() + amount);
  return result;
};

export const formatLongDate = (date: Date) => {
  const formattedParts = longDateFormatter.formatToParts(date);
  const month = formattedParts.find((part) => part.type === "month")?.value;
  const year = formattedParts.find((part) => part.type === "year")?.value;
  const day = date.getDate();

  return `${month} ${day}${getOrdinalSuffix(day)}, ${year}`;
};

export const removeTimeFromDate = (date: Date) => {
  return new Date(date.toDateString());
};
