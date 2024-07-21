import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PropertyCard from "./index";
import { Property } from "@/models/property";
import { formatCurrency } from "@/utils/formatters";

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
    const property: Property = {
      id: "1",
      title: "Sample Property",
      description: "This is a sample property",
      images: ["image1.jpg", "image2.jpg"],
      capacity: {
        adults: 2,
        children: 2,
      },
      category: "entire-home",
      hostMessage: "This is a sample host message",
      location: {
        city: "New York",
        state: "NY",
        countryCode: "US",
      },
      reviews: {
        totalScore: 4.5,
        reviewsCount: 10,
      },
      price: {
        perNight: 100,
        hasPromotion: true,
        promotionalPricePerNight: 80,
        cleaningFee: 0,
      },
      numberOfBedrooms: 2,
      numberOfBathrooms: 1,
      numberOfBeds: 2,
    };

    const checkIn = new Date(2024, 1, 1).toISOString();
    const checkOut = new Date(2024, 1, 5).toISOString();

    const user = userEvent.setup();

    render(
      <PropertyCard
        property={property}
        checkIn={checkIn}
        checkOut={checkOut}
        handleBookProperty={() => {}}
      />
    );

    // Assert that the property title is rendered correctly
    expect(screen.getByText(property.title)).toBeVisible();

    // Assert that the property description is rendered correctly
    expect(screen.getByText(property.description)).toBeVisible();

    // Assert that the property price is rendered correctly
    expect(
      screen.getByText(formatCurrency(property.price.perNight))
    ).toBeVisible();

    // Assert that the price has text-decoration-line: line-through
    expect(
      screen.getByText(formatCurrency(property.price.perNight))
    ).toHaveClass("line-through");

    // Assert that the promotional price is rendered correctly
    expect(
      screen.getByText(
        formatCurrency(property.price.promotionalPricePerNight as number)
      )
    ).toBeVisible();

    // Assert that the number of reviews is rendered correctly
    expect(
      screen.getByText(`${property.reviews.reviewsCount} reviews`)
    ).toBeVisible();

    // Assert that the total score is rendered correctly
    expect(screen.getByText(`${property.reviews.totalScore}`)).toBeVisible();

    // Assert that the number of bedrooms is rendered correctly
    expect(
      screen.getByText(`${property.numberOfBedrooms} Bedrooms`)
    ).toBeVisible();

    // Assert that the number of beds is rendered correctly
    expect(screen.getByText(`${property.numberOfBeds} Bed`)).toBeVisible();

    // Assert that the number of bathrooms is rendered correctly
    expect(
      screen.getByText(`${property.numberOfBathrooms} Bathroom`)
    ).toBeVisible();

    // Assert that the host message is rendered correctly after clicking the "Book Now" button
    const button = screen.getByText("Book Now");
    await user.click(button);

    expect(screen.getByText(property.hostMessage)).toBeVisible();

    //Assert that the images are rendered correctly
    const images = screen.getAllByAltText(property.title);
    images.forEach((image) => {
      expect(image).toBeVisible();
      expect(image).toHaveAttribute("src", property.images[0]);
    });
  });

  it("renders correctly a property without promotional price", async () => {
    const property: Property = {
      id: "1",
      title: "Sample Property",
      description: "This is a sample property",
      images: ["image1.jpg", "image2.jpg"],
      capacity: {
        adults: 2,
        children: 2,
      },
      category: "entire-home",
      hostMessage: "This is a sample host message",
      location: {
        city: "New York",
        state: "NY",
        countryCode: "US",
      },
      reviews: {
        totalScore: 4.5,
        reviewsCount: 10,
      },
      price: {
        perNight: 100,
        hasPromotion: false,
        promotionalPricePerNight: 0,
        cleaningFee: 0,
      },
      numberOfBedrooms: 2,
      numberOfBathrooms: 1,
      numberOfBeds: 2,
    };

    const checkIn = new Date(2024, 1, 1).toISOString();
    const checkOut = new Date(2024, 1, 5).toISOString();

    const user = userEvent.setup();

    render(
      <PropertyCard
        property={property}
        checkIn={checkIn}
        checkOut={checkOut}
        handleBookProperty={() => {}}
      />
    );

    // Assert that the property title is rendered correctly
    expect(screen.getByText(property.title)).toBeVisible();

    // Assert that the property description is rendered correctly
    expect(screen.getByText(property.description)).toBeVisible();

    // Assert that the property price is rendered correctly
    expect(
      screen.getByText(formatCurrency(property.price.perNight))
    ).toBeVisible();

    // Assert that the promotional price is not rendered
    expect(
      screen.queryByText(
        formatCurrency(property.price.promotionalPricePerNight as number)
      )
    ).toBeNull();

    // Assert that the number of reviews is rendered correctly
    expect(
      screen.getByText(`${property.reviews.reviewsCount} reviews`)
    ).toBeVisible();

    // Assert that the total score is rendered correctly
    expect(screen.getByText(`${property.reviews.totalScore}`)).toBeVisible();

    // Assert that the number of bedrooms is rendered correctly
    expect(
      screen.getByText(`${property.numberOfBedrooms} Bedrooms`)
    ).toBeVisible();

    // Assert that the number of beds is rendered correctly
    expect(screen.getByText(`${property.numberOfBeds} Bed`)).toBeVisible();

    // Assert that the number of bathrooms is rendered correctly
    expect(
      screen.getByText(`${property.numberOfBathrooms} Bathroom`)
    ).toBeVisible();

    // Assert that the host message is rendered correctly after clicking the "Book Now" button
    const button = screen.getByText("Book Now");
    await user.click(button);

    expect(screen.getByText(property.hostMessage)).toBeVisible();

    //Assert that the images are rendered correctly
    const images = screen.getAllByAltText(property.title);
    images.forEach((image) => {
      expect(image).toBeVisible();
      expect(image).toHaveAttribute("src", property.images[0]);
    });
  });

  it("calls handleBookProperty correctly", async () => {
    const property: Property = {
      id: "1",
      title: "Sample Property",
      description: "This is a sample property",
      images: ["image1.jpg", "image2.jpg"],
      capacity: {
        adults: 2,
        children: 2,
      },
      category: "entire-home",
      hostMessage: "This is a sample host message",
      location: {
        city: "New York",
        state: "NY",
        countryCode: "US",
      },
      reviews: {
        totalScore: 4.5,
        reviewsCount: 10,
      },
      price: {
        perNight: 100,
        hasPromotion: true,
        promotionalPricePerNight: 80,
        cleaningFee: 0,
      },
      numberOfBedrooms: 2,
      numberOfBathrooms: 1,
      numberOfBeds: 2,
    };

    const mockHandleBookProperty = vi.fn();
    const checkIn = new Date(2024, 1, 1).toISOString();
    const checkOut = new Date(2024, 1, 5).toISOString();

    render(
      <PropertyCard
        property={property}
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
    expect(mockHandleBookProperty.mock.calls[0][0]).toEqual(property);
  });
});
