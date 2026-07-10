import {
  BOOKING_AVAILABILITY_CONFLICT,
  isBookingAvailabilityConflict,
} from "./booking-errors";

describe("isBookingAvailabilityConflict", () => {
  it("only identifies the known availability-conflict error", () => {
    expect(
      isBookingAvailabilityConflict(new Error(BOOKING_AVAILABILITY_CONFLICT))
    ).toBe(true);
    expect(isBookingAvailabilityConflict(new Error("Storage is unavailable"))).toBe(
      false
    );
    expect(isBookingAvailabilityConflict(new Error())).toBe(false);
    expect(isBookingAvailabilityConflict("Property is already booked between these dates")).toBe(false);
  });
});
