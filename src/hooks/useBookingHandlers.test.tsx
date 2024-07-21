import useBookingHandlers from "@/hooks/useBookingHandlers";
import { bookingMock, bookingsMock } from "@/mocks/data";

import { renderHook } from "@testing-library/react";
import { addDays } from "date-fns";

vi.mock("react-redux", () => ({
  useDispatch: vitest.fn(),
  useSelector: vitest.fn((selectorFn) =>
    selectorFn({ bookings: { bookings: bookingsMock } })
  ),
}));

describe("useBookingHandlers", () => {
  afterEach(() => {
    vitest.clearAllMocks();
  });

  it("should return all bookings from redux store", () => {
    const { result } = renderHook(() => useBookingHandlers());

    expect(result.current.bookings).toEqual(bookingsMock);
  });

  describe("verifyIfPropertyIsAvailable function", () => {
    it("should return all bookings", () => {
      const { result } = renderHook(() => useBookingHandlers());

      expect(result.current.bookings).toEqual(bookingsMock);
    });

    describe("using bookings from redux store", () => {
      const overlappingScenarios = [
        {
          description:
            "should return that a property is not available when dates overlap at the beginning using redux state",
          propertyId: bookingsMock[0].propertyId,
          checkIn: addDays(bookingsMock[0].checkIn, -1).toISOString(),
          checkOut: addDays(bookingsMock[0].checkIn, 2).toISOString(),
          expected: false,
        },
        {
          description:
            "should return that a property is not available when dates overlap at the end",
          propertyId: bookingsMock[0].propertyId,
          checkIn: addDays(bookingsMock[0].checkOut, -1).toISOString(),
          checkOut: addDays(bookingsMock[0].checkOut, 1).toISOString(),
          expected: false,
        },
        {
          description:
            "should return that a property is not available when dates are completely within an existing booking",
          propertyId: bookingsMock[1].propertyId,
          checkIn: bookingsMock[1].checkIn,
          checkOut: bookingsMock[1].checkOut,
          expected: false,
        },
        {
          description:
            "should return that a property is available when dates are outside any existing booking",
          propertyId: bookingsMock[0].propertyId,
          checkIn: addDays(bookingsMock[0].checkOut, 1).toISOString(),
          checkOut: addDays(bookingsMock[0].checkOut, 5).toISOString(),
          expected: true,
        },
        {
          description:
            "should return that a property is available when there is no booking for the property",
          propertyId: "NOT-BOOKED-PROPERTY",
          checkIn: bookingsMock[1].checkIn,
          checkOut: bookingsMock[1].checkOut,
          expected: true,
        },
      ];

      overlappingScenarios.forEach(
        ({ description, propertyId, checkIn, checkOut, expected }) => {
          it(description, () => {
            const { result } = renderHook(() => useBookingHandlers());

            const isAvailable = result.current.verifyIfPropertyIsAvailable({
              propertyId,
              checkIn,
              checkOut,
            });

            expect(isAvailable).toBe(expected);
          });
        }
      );
    });

    describe("using bookings from function params", () => {
      const overlappingScenarios = [
        {
          description:
            "should return that a property is not available when dates overlap at the beginning when passing bookings as argument",
          propertyId: bookingMock.propertyId,
          checkIn: addDays(bookingMock.checkIn, -1).toISOString(),
          checkOut: addDays(bookingMock.checkOut, 2).toISOString(),
          expected: false,
          bookings: [bookingMock],
        },
        {
          description:
            "should return that a property is not available when dates overlap at the end when passing bookings as argument",
          propertyId: bookingMock.propertyId,
          checkIn: addDays(bookingMock.checkOut, -1).toISOString(),
          checkOut: addDays(bookingMock.checkOut, 1).toISOString(),
          expected: false,
          bookings: [bookingMock],
        },
        {
          description:
            "should return that a property is not available when dates are completely within an existing booking when passing bookings as argument",
          propertyId: bookingsMock[1].propertyId,
          checkIn: bookingsMock[1].checkIn,
          checkOut: bookingsMock[1].checkOut,
          expected: false,
        },
        {
          description:
            "should return that a property is available when dates are outside any existing booking when passing bookings as argument",
          propertyId: bookingMock.propertyId,
          checkIn: addDays(bookingMock.checkOut, 1).toISOString(),
          checkOut: addDays(bookingMock.checkOut, 5).toISOString(),
          expected: true,
          bookings: [bookingMock],
        },
        {
          description:
            "should return that a property is available when there is no booking for the property when passing bookings as argument",
          propertyId: "NOT-BOOKED-PROPERTY",
          checkIn: bookingMock.checkIn,
          checkOut: bookingMock.checkOut,
          expected: true,
          bookings: [bookingMock],
        },
      ];

      overlappingScenarios.forEach(
        ({
          description,
          propertyId,
          checkIn,
          checkOut,
          expected,
          bookings = bookingsMock,
        }) => {
          it(description, () => {
            const { result } = renderHook(() => useBookingHandlers());

            const isAvailable = result.current.verifyIfPropertyIsAvailable({
              propertyId,
              checkIn,
              checkOut,
              bookings,
            });

            expect(isAvailable).toBe(expected);
          });
        }
      );
    });
  });
});
