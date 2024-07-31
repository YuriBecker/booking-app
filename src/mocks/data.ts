import { Booking, BookingStatus } from "@/models/booking";
import { Property } from "@/models/property";

export const promotionalPropertyMock: Property = {
  id: crypto.randomUUID(),
  title: "Sample Property",
  description: "This is a sample property",
  images: ["image1.jpg", "image2.jpg"],
  capacity: {
    adults: 2,
    children: 2,
  },
  category: "entire-home",
  hostMessage: "This is a sample host message",
  location: {
    city: "New York",
    state: "NY",
    countryCode: "US",
  },
  reviews: {
    totalScore: 4.5,
    reviewsCount: 10,
  },
  price: {
    perNight: 100,
    hasPromotion: true,
    promotionalPricePerNight: 80,
    cleaningFee: 0,
  },
  numberOfBedrooms: 2,
  numberOfBathrooms: 1,
  numberOfBeds: 2,
};

export const notPromotionalPropertyMock: Property = {
  id: crypto.randomUUID(),
  title: "Sample Property",
  description: "This is a sample property",
  images: ["image1.jpg", "image2.jpg"],
  capacity: {
    adults: 2,
    children: 2,
  },
  category: "entire-home",
  hostMessage: "This is a sample host message",
  location: {
    city: "New York",
    state: "NY",
    countryCode: "US",
  },
  reviews: {
    totalScore: 4.5,
    reviewsCount: 10,
  },
  price: {
    perNight: 100,
    hasPromotion: false,
    promotionalPricePerNight: null,
    cleaningFee: 0,
  },
  numberOfBedrooms: 2,
  numberOfBathrooms: 1,
  numberOfBeds: 2,
};

export const bookingMock: Booking = {
  checkIn: new Date(2024, 1, 1).toISOString(),
  checkOut: new Date(2024, 1, 5).toISOString(),
  propertyId: crypto.randomUUID(),
  id: crypto.randomUUID(),
  price: 80,
  status: BookingStatus.CONFIRMED,
  updatedAt: new Date(2024, 1, 0).toISOString(),
};

export const bookingsMock: Booking[] = [
  {
    checkIn: new Date(2024, 1, 1).toISOString(),
    checkOut: new Date(2024, 1, 5).toISOString(),
    propertyId: crypto.randomUUID(),
    id: crypto.randomUUID(),
    price: 80,
    status: BookingStatus.CONFIRMED,
    updatedAt: new Date(2024, 1, 0).toISOString(),
  },
  {
    checkIn: new Date(2024, 2, 1).toISOString(),
    checkOut: new Date(2024, 2, 5).toISOString(),
    propertyId: crypto.randomUUID(),
    id: crypto.randomUUID(),
    price: 100,
    status: BookingStatus.CANCELLED,
    updatedAt: new Date(2024, 2, 0).toISOString(),
  },
  {
    checkIn: new Date(2024, 3, 1).toISOString(),
    checkOut: new Date(2024, 3, 5).toISOString(),
    propertyId: crypto.randomUUID(),
    id: crypto.randomUUID(),
    price: 120,
    status: BookingStatus.PENDING,
    updatedAt: new Date(2024, 3, 0).toISOString(),
  },
];
