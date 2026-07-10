export const BOOKING_AVAILABILITY_CONFLICT =
  "Property is already booked between these dates";

export const isBookingAvailabilityConflict = (error: unknown) =>
  error instanceof Error && error.message === BOOKING_AVAILABILITY_CONFLICT;
