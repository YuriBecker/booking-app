import type { TFunction } from "i18next";

export const getCityOptions = (t: TFunction) => [
  {
    value: "",
    label: t("home.flexible"),
  },
  {
    value: "Los Angeles",
    label: "Los Angeles",
  },
  {
    value: "San Diego",
    label: "San Diego",
  },
  {
    value: "San Francisco",
    label: "San Francisco",
  },
];
