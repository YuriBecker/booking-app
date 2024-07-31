import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BookDrawerButton from ".";
import { formatCurrency, formatDate } from "@/utils/formatters";
import {
  notPromotionalPropertyMock,
  promotionalPropertyMock,
} from "@/mocks/data";

describe("BookDrawerButton component", () => {
  const mockHandleBookProperty = vi.fn();
  const mockCheckInDate = new Date(2024, 1, 1).toISOString();
  const mockCheckOutDate = new Date(2024, 1, 5).toISOString();

  beforeAll(() => {
    //Mock JsDom not implemented functions
    window.HTMLElement.prototype.setPointerCapture = vi.fn();
    window.scrollTo = vi.fn();
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it("renders the 'Book Now' button correctly", () => {
    render(
      <BookDrawerButton
        property={notPromotionalPropertyMock}
        checkInDate={mockCheckInDate}
        checkOutDate={mockCheckOutDate}
        handleBookProperty={mockHandleBookProperty}
      />
    );
    expect(screen.getByText("Book Now")).toBeVisible();
  });

  it("opens the drawer and render correctly a not promotional property", async () => {
    render(
      <BookDrawerButton
        property={notPromotionalPropertyMock}
        checkInDate={mockCheckInDate}
        checkOutDate={mockCheckOutDate}
        handleBookProperty={mockHandleBookProperty}
      />
    );
    const user = userEvent.setup();

    await user.click(screen.getByText("Book Now"));

    // Assert that the property title is rendered correctly
    expect(screen.getByText(notPromotionalPropertyMock.title)).toBeVisible();

    // Assert that the property description is rendered correctly
    expect(
      screen.getByText(notPromotionalPropertyMock.description)
    ).toBeVisible();

    // Assert that the property price is rendered correctly
    expect(
      screen.getByText(
        formatCurrency(notPromotionalPropertyMock.price.perNight)
      )
    ).toBeVisible();

    // Assert that the promotional price is not rendered
    expect(
      screen.queryByText(
        formatCurrency(
          notPromotionalPropertyMock.price.promotionalPricePerNight as number
        )
      )
    ).toBeNull();

    // Assert that the number of reviews is rendered correctly
    expect(
      screen.getByText(
        `${notPromotionalPropertyMock.reviews.reviewsCount} reviews`
      )
    ).toBeVisible();

    // Assert that the total score is rendered correctly
    expect(
      screen.getByText(`${notPromotionalPropertyMock.reviews.totalScore}`)
    ).toBeVisible();

    // Assert that the number of bedrooms is rendered correctly
    expect(
      screen.getByText(
        `${notPromotionalPropertyMock.numberOfBedrooms} Bedrooms`
      )
    ).toBeVisible();

    // Assert that the number of beds is rendered correctly
    expect(
      screen.getByText(`${notPromotionalPropertyMock.numberOfBeds} Bed`)
    ).toBeVisible();

    // Assert that the number of bathrooms is rendered correctly
    expect(
      screen.getByText(
        `${notPromotionalPropertyMock.numberOfBathrooms} Bathroom`
      )
    ).toBeVisible();

    //Assert that the image are rendered correctly
    const image = screen.getByAltText(notPromotionalPropertyMock.title);
    expect(image).toHaveAttribute("src", notPromotionalPropertyMock.images[0]);
    expect(image).toBeVisible();

    // Assert that check-in is rendered correctly
    expect(
      screen.getByText(`Check-in: ${formatDate(mockCheckInDate)}`)
    ).toBeVisible();

    // Assert that check-out is rendered correctly
    expect(
      screen.getByText(`Check-out: ${formatDate(mockCheckOutDate)}`)
    ).toBeVisible();

    // Assert that the capacity info is rendered correctly
    expect(
      screen.getByText(`${notPromotionalPropertyMock.capacity.adults} Adults`)
    ).toBeVisible();
    expect(
      screen.getByText(
        `${notPromotionalPropertyMock.capacity.children} Children`
      )
    ).toBeVisible();

    // Assert that the location info is rendered correctly
    expect(
      screen.getByText(
        `${notPromotionalPropertyMock.location.city}, ${notPromotionalPropertyMock.location.state}, ${notPromotionalPropertyMock.location.countryCode}`
      )
    ).toBeVisible();
  });

  it("opens the drawer and render correctly a promotional property", async () => {
    render(
      <BookDrawerButton
        property={promotionalPropertyMock}
        checkInDate={mockCheckInDate}
        checkOutDate={mockCheckOutDate}
        handleBookProperty={mockHandleBookProperty}
      />
    );
    const user = userEvent.setup();

    await user.click(screen.getByText("Book Now"));

    // Assert that the property title is rendered correctly
    expect(screen.getByText(promotionalPropertyMock.title)).toBeVisible();

    // Assert that the property description is rendered correctly
    expect(screen.getByText(promotionalPropertyMock.description)).toBeVisible();

    // Assert that the property price is rendered correctly
    expect(
      screen.getByText(formatCurrency(promotionalPropertyMock.price.perNight))
    ).toBeVisible();

    // Assert that the price has text-decoration-line: line-through
    expect(
      screen.getByText(formatCurrency(promotionalPropertyMock.price.perNight))
    ).toHaveClass("line-through");

    // Assert that the promotional price is rendered correctly
    expect(
      screen.getByText(
        formatCurrency(
          promotionalPropertyMock.price.promotionalPricePerNight as number
        )
      )
    ).toBeVisible();

    // Assert that the number of reviews is rendered correctly
    expect(
      screen.getByText(
        `${promotionalPropertyMock.reviews.reviewsCount} reviews`
      )
    ).toBeVisible();

    // Assert that the total score is rendered correctly
    expect(
      screen.getByText(`${promotionalPropertyMock.reviews.totalScore}`)
    ).toBeVisible();

    // Assert that the number of bedrooms is rendered correctly
    expect(
      screen.getByText(`${promotionalPropertyMock.numberOfBedrooms} Bedrooms`)
    ).toBeVisible();

    // Assert that the number of beds is rendered correctly
    expect(
      screen.getByText(`${promotionalPropertyMock.numberOfBeds} Bed`)
    ).toBeVisible();

    // Assert that the number of bathrooms is rendered correctly
    expect(
      screen.getByText(`${promotionalPropertyMock.numberOfBathrooms} Bathroom`)
    ).toBeVisible();

    //Assert that the image are rendered correctly
    const image = screen.getByAltText(promotionalPropertyMock.title);
    expect(image).toHaveAttribute("src", promotionalPropertyMock.images[0]);
    expect(image).toBeVisible();

    // Assert that check-in is rendered correctly
    expect(
      screen.getByText(`Check-in: ${formatDate(mockCheckInDate)}`)
    ).toBeVisible();

    // Assert that check-out is rendered correctly
    expect(
      screen.getByText(`Check-out: ${formatDate(mockCheckOutDate)}`)
    ).toBeVisible();

    // Assert that the capacity info is rendered correctly
    expect(
      screen.getByText(`${promotionalPropertyMock.capacity.adults} Adults`)
    ).toBeVisible();
    expect(
      screen.getByText(`${promotionalPropertyMock.capacity.children} Children`)
    ).toBeVisible();

    // Assert that the location info is rendered correctly
    expect(
      screen.getByText(
        `${promotionalPropertyMock.location.city}, ${promotionalPropertyMock.location.state}, ${promotionalPropertyMock.location.countryCode}`
      )
    ).toBeVisible();
  });

  it("calls handleBookProperty when Reserve button is clicked", async () => {
    render(
      <BookDrawerButton
        property={notPromotionalPropertyMock}
        checkInDate={mockCheckInDate}
        checkOutDate={mockCheckOutDate}
        handleBookProperty={mockHandleBookProperty}
      />
    );

    const user = userEvent.setup();

    await user.click(screen.getByText("Book Now"));
    await user.click(screen.getByText("Reserve"));

    expect(mockHandleBookProperty).toHaveBeenCalled();
    expect(mockHandleBookProperty.mock.calls).toHaveLength(1);
  });
});
