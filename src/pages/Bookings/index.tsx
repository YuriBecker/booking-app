import NoData from "@/components/ui/no-data";
import useBookingHandlers from "@/hooks/useBookingHandlers";
import routerPaths from "@/router/paths";
import { useNavigate } from "react-router-dom";
import BookingsBreadcrumb from "./components/Breadcrumb";
import BookCard from "./components/BookCard";

const BookingsPage = () => {
  const navigate = useNavigate();
  const { bookings } = useBookingHandlers();

  const showNoResults = bookings.length === 0;

  if (showNoResults) {
    return (
      <NoData
        className="bg-background container"
        buttonLabel="Find your next stay"
        onClick={() => navigate(routerPaths.home)}
        description="You haven't made any booking reservations yet."
      />
    );
  }

  return (
    <div
      className="container mx-auto px-8 mt-6 lg:mt-14 pb-8"
      data-cy="bookings-list"
    >
      <BookingsBreadcrumb />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {bookings?.map((book) => (
          <BookCard key={book.id} booking={book} />
        ))}
      </div>
    </div>
  );
};

export default BookingsPage;
