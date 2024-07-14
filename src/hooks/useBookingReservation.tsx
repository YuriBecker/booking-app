import { Booking } from "@/models/booking";
import { RootState } from "@/store";
import { addBooking, removeBooking } from "@/store/slices/bookings";
import { useDispatch, useSelector } from "react-redux";

const useBookingReservation = () => {
  const dispatch = useDispatch();

  const bookings =
    useSelector((state: RootState) => state.bookings.bookings) || [];

  const verifyIfPropertyIsAvailable = (
    propertyId: string,
    checkIn: string,
    checkOut: string
  ) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    return !bookings.some((booking) => {
      if (booking.propertyId !== propertyId) return false;

      const bookingCheckInDate = new Date(booking.checkIn);
      const bookingCheckOutDate = new Date(booking.checkOut);

      return (
        checkInDate < bookingCheckOutDate && checkOutDate > bookingCheckInDate
      );
    });
  };

  const handleAddBooking = (
    propertyId: string,
    checkIn: string,
    checkOut: string,
    price: number
  ) => {
    if (!verifyIfPropertyIsAvailable(propertyId, checkIn, checkOut)) {
      throw new Error("Property is already booked between these dates");
    }

    dispatch(
      addBooking({
        propertyId,
        checkIn,
        checkOut,
        price,
      })
    );
  };

  const handleRemoveBooking = (id: Booking["id"]) => {
    dispatch(removeBooking(id));
  };

  return {
    bookings,
    verifyIfPropertyIsAvailable,
    handleAddBooking,
    handleRemoveBooking,
  };
};

export default useBookingReservation;
