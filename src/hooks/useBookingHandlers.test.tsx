import useBookingHandlers from "@/hooks/useBookingHandlers";
import { Booking, BookingStatus } from "@/models/booking";
import { renderHook } from "@testing-library/react";
import { addDays } from "date-fns";

const mockBookings: Booking[] = [
  {
    id: "1",
    propertyId: "111",
    checkIn: new Date(2024, 0, 1).toISOString(),
    checkOut: new Date(2024, 0, 10).toISOString(),
    price: 100,
    status: BookingStatus.PENDING,
    updatedAt: new Date(2024, 10, 10).toISOString(),
  },
  {
    id: "2",
    propertyId: "222",
    checkIn: new Date(2024, 1, 5).toISOString(),
    checkOut: new Date(2024, 1, 15).toISOString(),
    price: 200,
    status: BookingStatus.PENDING,
    updatedAt: new Date(2024, 10, 10).toISOString(),
  },
];

const mockBook: Booking = {
  id: "3",
  propertyId: "333",
  checkIn: new Date(2024, 11, 20).toISOString(),
  checkOut: new Date(2024, 11, 25).toISOString(),
  price: 300,
  status: BookingStatus.PENDING,
  updatedAt: new Date(2024, 11, 10).toISOString(),
};

vi.mock("react-redux", () => ({
  useDispatch: vitest.fn(),
  useSelector: vitest.fn((selectorFn) =>
    selectorFn({ bookings: { bookings: mockBookings } })
  ),
}));

describe("useBookingHandlers", () => {
  afterEach(() => {
    vitest.clearAllMocks();
  });

  it("should return all bookings from redux store", () => {
    const { result } = renderHook(() => useBookingHandlers());

    expect(result.current.bookings).toEqual(mockBookings);
  });

  describe("verifyIfPropertyIsAvailable function", () => {
    it("should return all bookings", () => {
      const { result } = renderHook(() => useBookingHandlers());

      expect(result.current.bookings).toEqual(mockBookings);
    });

    describe("using bookings from redux store", () => {
      const overlappingScenarios = [
        {
          description:
            "should return that a property is not available when dates overlap at the beginning using redux state",
          propertyId: mockBookings[0].propertyId,
          checkIn: addDays(mockBookings[0].checkIn, -1).toISOString(),
          checkOut: addDays(mockBookings[0].checkIn, 2).toISOString(),
          expected: false,
        },
        {
          description:
            "should return that a property is not available when dates overlap at the end",
          propertyId: mockBookings[0].propertyId,
          checkIn: addDays(mockBookings[0].checkOut, -1).toISOString(),
          checkOut: addDays(mockBookings[0].checkOut, 1).toISOString(),
          expected: false,
        },
        {
          description:
            "should return that a property is not available when dates are completely within an existing booking",
          propertyId: mockBookings[1].propertyId,
          checkIn: mockBookings[1].checkIn,
          checkOut: mockBookings[1].checkOut,
          expected: false,
        },
        {
          description:
            "should return that a property is available when dates are outside any existing booking",
          propertyId: mockBookings[0].propertyId,
          checkIn: addDays(mockBookings[0].checkOut, 1).toISOString(),
          checkOut: addDays(mockBookings[0].checkOut, 5).toISOString(),
          expected: true,
        },
        {
          description:
            "should return that a property is available when there is no booking for the property",
          propertyId: "NOT-BOOKED-PROPERTY",
          checkIn: mockBookings[1].checkIn,
          checkOut: mockBookings[1].checkOut,
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
          propertyId: mockBook.propertyId,
          checkIn: addDays(mockBook.checkIn, -1).toISOString(),
          checkOut: addDays(mockBook.checkOut, 2).toISOString(),
          expected: false,
          bookings: [mockBook],
        },
        {
          description:
            "should return that a property is not available when dates overlap at the end when passing bookings as argument",
          propertyId: mockBook.propertyId,
          checkIn: addDays(mockBook.checkOut, -1).toISOString(),
          checkOut: addDays(mockBook.checkOut, 1).toISOString(),
          expected: false,
          bookings: [mockBook],
        },
        {
          description:
            "should return that a property is not available when dates are completely within an existing booking when passing bookings as argument",
          propertyId: mockBookings[1].propertyId,
          checkIn: mockBookings[1].checkIn,
          checkOut: mockBookings[1].checkOut,
          expected: false,
        },
        {
          description:
            "should return that a property is available when dates are outside any existing booking when passing bookings as argument",
          propertyId: mockBook.propertyId,
          checkIn: addDays(mockBook.checkOut, 1).toISOString(),
          checkOut: addDays(mockBook.checkOut, 5).toISOString(),
          expected: true,
          bookings: [mockBook],
        },
        {
          description:
            "should return that a property is available when there is no booking for the property when passing bookings as argument",
          propertyId: "NOT-BOOKED-PROPERTY",
          checkIn: mockBook.checkIn,
          checkOut: mockBook.checkOut,
          expected: true,
          bookings: [mockBook],
        },
      ];

      overlappingScenarios.forEach(
        ({
          description,
          propertyId,
          checkIn,
          checkOut,
          expected,
          bookings = mockBookings,
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
