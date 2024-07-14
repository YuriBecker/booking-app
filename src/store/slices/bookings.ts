import { Booking, BookingStatus } from "@/models/booking";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface BookingsState {
  bookings: Booking[];
}

const initialState: BookingsState = {
  bookings: [],
};

export const counterSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    addBooking: (
      state,
      action: PayloadAction<Omit<Booking, "id" | "status" | "createdAt">>
    ) => {
      state.bookings.push({
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        status:
          //To simulate a async approval
          Math.random() < 0.5 ? BookingStatus.PENDING : BookingStatus.CONFIRMED,
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

export const { addBooking, editBooking, removeBooking } = counterSlice.actions;
export default counterSlice.reducer;
