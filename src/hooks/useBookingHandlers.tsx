import { Booking } from "@/models/booking";
import { RootState } from "@/store";
import {
  addBooking,
  editBooking,
  removeBooking,
} from "@/store/slices/bookings";
import { removeTimeFromDate } from "@/utils/dates";
import { useDispatch, useSelector } from "react-redux";

const useBookingHandlers = () => {
  const dispatch = useDispatch();

  const allBookings =
    useSelector((state: RootState) => state.bookings.bookings) || [];

  const verifyIfPropertyIsAvailable = ({
    propertyId,
    checkIn,
    checkOut,
    bookings = allBookings,
  }: {
    propertyId: Booking["propertyId"];
    checkIn: Booking["checkIn"];
    checkOut: Booking["checkOut"];
    bookings?: Booking[];
  }) => {
    const checkInDate = removeTimeFromDate(new Date(checkIn));

    const checkOutDate = removeTimeFromDate(new Date(checkOut));

    return !bookings.some((booking) => {
      if (booking.propertyId !== propertyId) return false;

      const bookingCheckInDate = new Date(booking.checkIn);
      const bookingCheckOutDate = new Date(booking.checkOut);

      const isOverlapping =
        checkInDate <= bookingCheckOutDate &&
        checkOutDate >= bookingCheckInDate;

      return isOverlapping;
    });
  };

  const handleAddBooking = ({
    propertyId,
    checkIn,
    checkOut,
    price,
  }: {
    propertyId: Booking["propertyId"];
    checkIn: Booking["checkIn"];
    checkOut: Booking["checkOut"];
    price: Booking["price"];
  }) => {
    if (!verifyIfPropertyIsAvailable({ propertyId, checkIn, checkOut })) {
      throw new Error("Property is already booked between these dates");
    }

    const checkInWithoutTime = removeTimeFromDate(
      new Date(checkIn)
    ).toISOString();

    const checkOutDateWithoutTime = removeTimeFromDate(
      new Date(checkOut)
    ).toISOString();

    dispatch(
      addBooking({
        propertyId,
        checkIn: checkInWithoutTime,
        checkOut: checkOutDateWithoutTime,
        price,
      })
    );
  };

  const handleRemoveBooking = (id: Booking["id"]) => {
    dispatch(removeBooking(id));
  };

  const handleEditBooking = (updatedBooking: Booking) => {
    const filteredBookings = allBookings.filter(
      (book) => book.id !== updatedBooking.id
    );

    if (
      !verifyIfPropertyIsAvailable({
        propertyId: updatedBooking.propertyId,
        checkIn: updatedBooking.checkIn,
        checkOut: updatedBooking.checkOut,
        bookings: filteredBookings,
      })
    ) {
      throw new Error("Property is already booked between these dates");
    }

    const checkInWithoutTime = removeTimeFromDate(
      new Date(updatedBooking.checkIn)
    ).toISOString();

    const checkOutDateWithoutTime = removeTimeFromDate(
      new Date(updatedBooking.checkOut)
    ).toISOString();

    const formattedBooking = {
      ...updatedBooking,
      checkIn: checkInWithoutTime,
      checkOut: checkOutDateWithoutTime,
    };

    dispatch(editBooking(formattedBooking));
  };

  return {
    bookings: allBookings,
    verifyIfPropertyIsAvailable,
    handleAddBooking,
    handleRemoveBooking,
    handleEditBooking,
  };
};

export default useBookingHandlers;
