import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PropertyCard from "./index";
import { formatCurrency } from "@/utils/formatters";
import {
  notPromotionalPropertyMock,
  promotionalPropertyMock,
} from "@/mocks/data";

describe("PropertyCard component", () => {
  beforeAll(() => {
    //Mock JsDom not implemented functions
    window.HTMLElement.prototype.hasPointerCapture = vi.fn();
    window.HTMLElement.prototype.setPointerCapture = vi.fn();
    window.scrollTo = vi.fn();
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it("renders correctly a property with promotional price", async () => {
    const checkIn = new Date(2024, 1, 1).toISOString();
    const checkOut = new Date(2024, 1, 5).toISOString();

    const user = userEvent.setup();

    render(
      <PropertyCard
        property={promotionalPropertyMock}
        checkIn={checkIn}
        checkOut={checkOut}
        handleBookProperty={() => {}}
      />
    );

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

    // Assert that the host message is rendered correctly after clicking the "Book Now" button
    const button = screen.getByText("Book Now");
    await user.click(button);

    expect(screen.getByText(promotionalPropertyMock.hostMessage)).toBeVisible();

    //Assert that the images are rendered correctly
    const images = screen.getAllByAltText(promotionalPropertyMock.title);
    images.forEach((image) => {
      expect(image).toBeVisible();
      expect(image).toHaveAttribute("src", promotionalPropertyMock.images[0]);
    });
  });

  it("renders correctly a property without promotional price", async () => {
    const checkIn = new Date(2024, 1, 1).toISOString();
    const checkOut = new Date(2024, 1, 5).toISOString();

    const user = userEvent.setup();

    render(
      <PropertyCard
        property={notPromotionalPropertyMock}
        checkIn={checkIn}
        checkOut={checkOut}
        handleBookProperty={() => {}}
      />
    );

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

    // Assert that the host message is rendered correctly after clicking the "Book Now" button
    const button = screen.getByText("Book Now");
    await user.click(button);
    expect(
      screen.getByText(notPromotionalPropertyMock.hostMessage)
    ).toBeVisible();
  });

  it("calls handleBookProperty correctly", async () => {
    const mockHandleBookProperty = vi.fn();
    const checkIn = new Date(2024, 1, 1).toISOString();
    const checkOut = new Date(2024, 1, 5).toISOString();

    render(
      <PropertyCard
        property={promotionalPropertyMock}
        checkIn={checkIn}
        checkOut={checkOut}
        handleBookProperty={mockHandleBookProperty}
      />
    );

    const user = userEvent.setup();

    const button = screen.getByText("Book Now");
    await user.click(button);

    const drawerButton = screen.getByText("Reserve");
    await user.click(drawerButton);

    expect(mockHandleBookProperty.mock.calls).toHaveLength(1);
    expect(mockHandleBookProperty.mock.calls[0][0]).toEqual(
      promotionalPropertyMock
    );
  });
});
