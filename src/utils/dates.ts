export const removeTimeFromDate = (date: Date) => {
  return new Date(date.toDateString());
};
