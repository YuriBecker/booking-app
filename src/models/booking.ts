export type Booking = {
  id: string;
  propertyId: string;
  checkIn: string;
  checkOut: string;
  status: BookingStatus;
  price: number;
  updatedAt: string;
};

export enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
}
