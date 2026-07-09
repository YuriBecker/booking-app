import { Property } from "@/models/property";
import {
  getPropertySortOption,
  sortProperties,
  SortOption,
} from "./sortProperties";

const createProperty = (
  id: string,
  {
    perNight,
    promotionalPricePerNight = null,
    totalScore,
  }: {
    perNight: number;
    promotionalPricePerNight?: number | null;
    totalScore: number;
  }
): Property => ({
  id,
  title: id,
  description: id,
  images: ["image.jpg"],
  capacity: {
    adults: 2,
    children: 1,
  },
  category: "entire-home",
  hostMessage: "Welcome",
  location: {
    city: "Los Angeles",
    state: "California",
    countryCode: "us",
  },
  reviews: {
    totalScore,
    reviewsCount: 10,
  },
  price:
    promotionalPricePerNight === null
      ? {
          perNight,
          hasPromotion: false,
          promotionalPricePerNight: null,
          cleaningFee: null,
        }
      : {
          perNight,
          hasPromotion: true,
          promotionalPricePerNight,
          cleaningFee: null,
        },
  numberOfBedrooms: 1,
  numberOfBathrooms: 1,
  numberOfBeds: 1,
});

const properties = [
  createProperty("api-first", {
    perNight: 300,
    promotionalPricePerNight: 120,
    totalScore: 4.2,
  }),
  createProperty("api-second", {
    perNight: 180,
    totalScore: 4.8,
  }),
  createProperty("api-third", {
    perNight: 250,
    promotionalPricePerNight: 90,
    totalScore: 4.5,
  }),
];

describe("sortProperties", () => {
  it("falls back to rating order for invalid sort values", () => {
    expect(sortProperties(properties, "newest" as SortOption).map(({ id }) => id)).toEqual([
      "api-second",
      "api-third",
      "api-first",
    ]);
  });

  it("sorts by effective displayed price from low to high", () => {
    expect(sortProperties(properties, SortOption.PRICE_ASC).map(({ id }) => id)).toEqual([
      "api-third",
      "api-first",
      "api-second",
    ]);
  });

  it("sorts by effective displayed price from high to low", () => {
    expect(sortProperties(properties, SortOption.PRICE_DESC).map(({ id }) => id)).toEqual([
      "api-second",
      "api-first",
      "api-third",
    ]);
  });

  it("sorts by rating from high to low", () => {
    expect(sortProperties(properties, SortOption.RATING_DESC).map(({ id }) => id)).toEqual([
      "api-second",
      "api-third",
      "api-first",
    ]);
  });

  it("normalizes missing or invalid URL sort values to rating", () => {
    expect(getPropertySortOption(null)).toBe(SortOption.RATING_DESC);
    expect(getPropertySortOption("rating_desc")).toBe(SortOption.RATING_DESC);
    expect(getPropertySortOption("unknown")).toBe(SortOption.RATING_DESC);
  });
});
