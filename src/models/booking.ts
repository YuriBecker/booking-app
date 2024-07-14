export type Booking = {
  id: string;
  propertyId: string;
  checkIn: string;
  checkOut: string;
  status: BookingStatus;
  price: number;
  createdAt: string;
};

export enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
}
