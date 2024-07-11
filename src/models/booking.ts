export type Booking = {
  id: string;
  userId: string;
  propertyId: string;
  startDate: Date;
  endDate: Date;
  status: BookingStatus;
};

export enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
}
