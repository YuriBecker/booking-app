export type Property = {
  id: string;
  category: "room" | "entire-home";
  numberOfBeds: number;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  price: Price;
  location: Location;
  capacity: Capacity;
  reviews: Reviews;
  title: string;
  description: string;
  images: string[];
  hostMessage: string;
};

export type Capacity = {
  adults: number;
  children: number;
};

export type Location = {
  city: string;
  state: string;
  countryCode: string;
};

export type Price = {
  perNight: number;
  hasPromotion: boolean;
  promotionalPricePerNight: number | null;
  cleaningFee: number | null;
};

export type Reviews = {
  totalScore: number;
  reviewsCount: number;
};
