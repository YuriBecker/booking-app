import BookCard from "@/components/book-card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import NoData from "@/components/ui/no-data";
import useBookingReservation from "@/hooks/useBookingReservation";
import routerPaths from "@/router/paths";

import { Link, useNavigate } from "react-router-dom";

const BookingsPage = () => {
  const navigate = useNavigate();
  const { bookings } = useBookingReservation();

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
    <div className="container mx-auto px-8 mt-6 lg:mt-14 pb-8">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={routerPaths.home}>Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>My Bookings</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {bookings?.map((book) => (
          <BookCard key={book.id} booking={book} />
        ))}
      </div>
    </div>
  );
};

export default BookingsPage;
