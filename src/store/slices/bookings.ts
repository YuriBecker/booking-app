import { Booking, BookingStatus } from "@/models/booking";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type BookingsState = {
  bookings: Booking[];
};

const initialState: BookingsState = {
  bookings: [],
};

export const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    addBooking: (
      state,
      action: PayloadAction<Omit<Booking, "id" | "status" | "updatedAt">>
    ) => {
      //To simulate a async status change
      const status =
        Math.random() < 0.5 ? BookingStatus.PENDING : BookingStatus.CONFIRMED;

      state.bookings.unshift({
        id: crypto.randomUUID(),
        updatedAt: new Date().toISOString(),
        status,
        ...action.payload,
      });
    },
    removeBooking: (state, action: PayloadAction<string>) => {
      state.bookings = state.bookings.filter(
        (booking) => booking.id !== action.payload
      );
    },
    editBooking: (state, action: PayloadAction<Booking>) => {
      const { id } = action.payload;
      const index = state.bookings.findIndex((booking) => booking.id === id);

      if (index !== -1) {
        state.bookings[index] = action.payload;
      }
    },
  },
});

export const { addBooking, editBooking, removeBooking } = bookingsSlice.actions;
export default bookingsSlice.reducer;
