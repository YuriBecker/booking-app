import { BookingStatus } from "@/models/booking";
import bookingsReducer, {
  addBooking,
  BookingsState,
  editBooking,
  removeBooking,
} from "@/store/slices/bookings";

describe("bookings slice", () => {
  it("should add a booking", () => {
    const initialState: BookingsState = { bookings: [] };
    const booking = {
      propertyId: "a4e03536-8fe1-449a-ba2f-3a57129c584c",
      checkIn: "2024-07-15T03:00:00.000Z",
      checkOut: "2024-07-18T03:00:00.000Z",
      price: 217,
    };

    const nextState = bookingsReducer(initialState, addBooking(booking));

    expect(nextState.bookings).toHaveLength(1);
    expect(nextState.bookings[0]).toEqual({
      ...booking,
      id: expect.any(String),
      updatedAt: expect.any(String),
      status: expect.any(String),
    });
  });

  it("should add a booking in the start of the list", () => {
    const initialState: BookingsState = {
      bookings: [
        {
          id: "1",
          updatedAt: "2024-07-14T18:03:25.754Z",
          status: BookingStatus.PENDING,
          propertyId: "a4e03536-8fe1-449a-ba2f-3a57129c584c",
          checkIn: "2024-07-15T03:00:00.000Z",
          checkOut: "2024-07-18T03:00:00.000Z",
          price: 217,
        },
      ],
    };

    const newBooking = {
      propertyId: "a4e03536-8fe1-449a-ba2f-3a57129c584c",
      checkIn: "2024-07-05T03:00:00.000Z",
      checkOut: "2024-07-08T03:00:00.000Z",
      price: 217,
    };

    const nextState = bookingsReducer(initialState, addBooking(newBooking));

    expect(nextState.bookings).toHaveLength(2);
    expect(nextState.bookings[0]).toEqual({
      ...newBooking,
      id: expect.any(String),
      updatedAt: expect.any(String),
      status: expect.any(String),
    });
    expect(nextState.bookings[0].id).not.toBe(initialState.bookings[0].id);
  });

  it("should remove a booking", () => {
    const initialState: BookingsState = {
      bookings: [
        {
          id: "1",
          updatedAt: "2024-07-14T18:03:25.754Z",
          status: BookingStatus.PENDING,
          propertyId: "a4e03536-8fe1-449a-ba2f-3a57129c584c",
          checkIn: "2024-07-15T03:00:00.000Z",
          checkOut: "2024-07-18T03:00:00.000Z",
          price: 217,
        },
        {
          id: "2",
          updatedAt: "2024-07-14T18:03:25.754Z",
          status: BookingStatus.PENDING,
          propertyId: "a4e03536-8fe1-449a-ba2f-3a57129c584c",
          checkIn: "2024-07-15T03:00:00.000Z",
          checkOut: "2024-07-18T03:00:00.000Z",
          price: 217,
        },
      ],
    };

    const nextState = bookingsReducer(initialState, removeBooking("1"));

    expect(nextState.bookings).toHaveLength(1);
    expect(nextState.bookings[0].id).toBe("2");
  });

  it("should edit a booking", () => {
    const initialState: BookingsState = {
      bookings: [
        {
          id: "1",
          updatedAt: "2024-07-14T18:03:25.754Z",
          status: BookingStatus.PENDING,
          propertyId: "a4e03536-8fe1-449a-ba2f-3a57129c584c",
          checkIn: "2024-07-15T03:00:00.000Z",
          checkOut: "2024-07-18T03:00:00.000Z",
          price: 217,
        },
        {
          id: "2",
          updatedAt: "2024-07-14T18:03:25.754Z",
          status: BookingStatus.PENDING,
          propertyId: "a4e03536-8fe1-449a-ba2f-3a57129c584c",
          checkIn: "2024-07-15T03:00:00.000Z",
          checkOut: "2024-07-18T03:00:00.000Z",
          price: 217,
        },
      ],
    };
    const updatedBooking = {
      id: "1",
      updatedAt: "2024-07-14T18:03:25.754Z",
      status: BookingStatus.PENDING,
      propertyId: "a4e03536-8fe1-449a-ba2f-3a57129c584c",
      checkIn: "2024-07-19T03:00:00.000Z",
      checkOut: "2024-07-23T03:00:00.000Z",
      price: 217,
    };

    const nextState = bookingsReducer(
      initialState,
      editBooking(updatedBooking)
    );

    expect(nextState.bookings).toHaveLength(2);
    expect(nextState.bookings[0]).toEqual(updatedBooking);
  });
});
