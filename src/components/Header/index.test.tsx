import { Booking, BookingStatus } from "@/models/booking";
import { renderWithProviders } from "@/utils/test";
import { screen } from "@testing-library/react";
import Header from "./index";

describe("Header component", () => {
  it("renders correctly", () => {
    renderWithProviders(<Header />);

    // Assert that the logo is rendered correctly
    const logo = screen.getByAltText("hostfully");
    expect(logo).toBeInTheDocument();

    // Assert that the "My Bookings" button is rendered correctly
    const myBookingsButton = screen.getByText("My Bookings");
    expect(myBookingsButton).toBeInTheDocument();

    // Assert that the total bookings count badge is not rendered initially
    const bookingsCountBadge = screen.queryByText(/\d+/);
    expect(bookingsCountBadge).toBeNull();
  });

  it("displays the correct total bookings count badge", () => {
    const bookings: Booking[] = [
      {
        id: "1",
        status: BookingStatus.CANCELLED,
        updatedAt: new Date(2024, 1, 0).toISOString(),
        propertyId: "1",
        checkIn: new Date(2024, 1, 1).toISOString(),
        checkOut: new Date(2024, 1, 5).toISOString(),
        price: 200,
      },
      {
        id: "2",
        status: BookingStatus.CANCELLED,
        updatedAt: new Date(2024, 1, 0).toISOString(),
        propertyId: "2",
        checkIn: new Date(2024, 1, 10).toISOString(),
        checkOut: new Date(2024, 1, 15).toISOString(),
        price: 200,
      },
    ];

    renderWithProviders(<Header />, {
      preloadedState: {
        bookings: {
          bookings: bookings,
        },
      },
    });

    const bookingsCountBadge = screen.queryByText(/\d+/);

    // Assert that the bookings count badge is rendered correctly
    expect(bookingsCountBadge).toHaveTextContent(String(bookings.length));
  });
});
