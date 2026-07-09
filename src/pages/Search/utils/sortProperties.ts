import { Property } from "@/models/property";

export enum SortOption {
  PRICE_ASC = "price_asc",
  PRICE_DESC = "price_desc",
  RATING_DESC = "rating_desc",
}

export const SORT_OPTIONS = [
  {
    value: SortOption.PRICE_ASC,
    label: "Price: low to high",
  },
  {
    value: SortOption.PRICE_DESC,
    label: "Price: high to low",
  },
  {
    value: SortOption.RATING_DESC,
    label: "Rating: high to low",
  },
];

export const getPropertySortOption = (
  sortValue: string | null
): SortOption => {
  if (
    sortValue === SortOption.PRICE_ASC ||
    sortValue === SortOption.PRICE_DESC ||
    sortValue === SortOption.RATING_DESC
  ) {
    return sortValue;
  }

  return SortOption.RATING_DESC;
};

const getEffectiveNightlyPrice = (property: Property) => {
  if (property.price.hasPromotion) {
    return property.price.promotionalPricePerNight;
  }

  return property.price.perNight;
};

export const sortProperties = (
  properties: Property[],
  sortOption: SortOption
): Property[] => {
  const sortedProperties = [...properties];

  switch (sortOption) {
    case SortOption.PRICE_ASC:
      return sortedProperties.sort(
        (propertyA, propertyB) =>
          getEffectiveNightlyPrice(propertyA) - getEffectiveNightlyPrice(propertyB)
      );
    case SortOption.PRICE_DESC:
      return sortedProperties.sort(
        (propertyA, propertyB) =>
          getEffectiveNightlyPrice(propertyB) - getEffectiveNightlyPrice(propertyA)
      );
    case SortOption.RATING_DESC:
      return sortedProperties.sort(
        (propertyA, propertyB) =>
          propertyB.reviews.totalScore - propertyA.reviews.totalScore
      );
    default:
      return sortedProperties.sort(
        (propertyA, propertyB) =>
          propertyB.reviews.totalScore - propertyA.reviews.totalScore
      );
  }
};
