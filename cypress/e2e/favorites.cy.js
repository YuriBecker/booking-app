import { propertiesMock, propertyMock } from "../fixtures/properties-mock";

const API_URL = "http://localhost:3001";
const FIXED_SEARCH_URL =
  "/search?city=&checkIn=2024-07-14T03%3A00%3A00.000Z&checkOut=2024-07-19T03%3A00%3A00.000Z&numOfAdults=1&numOfChildren=0";

describe("favorites", () => {
  beforeEach(() => {
    cy.clearLocalStorage();

    cy.intercept(
      {
        method: "GET",
        url: `${API_URL}/properties*`,
      },
      propertiesMock
    ).as("getProperties");

    cy.intercept(
      {
        method: "GET",
        url: `${API_URL}/properties/*`,
      },
      propertyMock
    ).as("getProperty");

    cy.visit(FIXED_SEARCH_URL);
    cy.wait("@getProperties");
  });

  it("Should favorite and unfavorite properties", () => {
    const firstPropertyTitle = propertiesMock[0].title;

    cy.get('[data-cy="properties-list"]')
      .contains(firstPropertyTitle)
      .closest('[data-cy="property-card"]')
      .find('[data-cy="property-card-favorite-btn"]')
      .click();

    cy.get('[data-cy="favorites-count-badge"]').should("contain", "1");
    cy.get('[data-cy="header-favorites-link"]').click();

    cy.url().should("include", "/favorites");
    cy.get('[data-cy="favorites-list"]').should("contain", firstPropertyTitle);

    cy.get('[data-cy="favorites-list"]')
      .find('[data-cy="property-card"]')
      .first()
      .find('[data-cy="property-card-favorite-btn"]')
      .click();

    cy.get('[data-cy="favorites-list"]').should("not.exist");
    cy.findByText(/you don't have any favorite properties yet/i).should(
      "exist"
    );
    cy.get('[data-cy="favorites-count-badge"]').should("not.exist");
  });

  it("Should persist favorites after page reload", () => {
    const firstPropertyTitle = propertiesMock[0].title;

    cy.get('[data-cy="properties-list"]')
      .contains(firstPropertyTitle)
      .closest('[data-cy="property-card"]')
      .find('[data-cy="property-card-favorite-btn"]')
      .click();

    cy.get('[data-cy="favorites-count-badge"]').should("contain", "1");
    cy.reload();
    cy.wait("@getProperties");
    cy.get('[data-cy="favorites-count-badge"]').should("contain", "1");

    cy.get('[data-cy="header-favorites-link"]').click();
    cy.url().should("include", "/favorites");
    cy.get('[data-cy="favorites-list"]').should("contain", firstPropertyTitle);

    cy.get('[data-cy="favorites-list"]')
      .find('[data-cy="property-card"]')
      .first()
      .find('[data-cy="property-card-favorite-btn"]')
      .click();
    cy.get('[data-cy="favorites-list"]').should("not.exist");
    cy.findByText(/you don't have any favorite properties yet/i).should(
      "exist"
    );
    cy.get('[data-cy="favorites-count-badge"]').should("not.exist");
  });

  it("Should book a property from favorites page", () => {
    cy.get('[data-cy="properties-list"]')
      .find('[data-cy="property-card"]')
      .first()
      .find('[data-cy="property-card-favorite-btn"]')
      .click();

    cy.get('[data-cy="header-favorites-link"]').click();
    cy.url().should("include", "/favorites");

    cy.get('[data-cy="favorites-list"]')
      .find('[data-cy="property-card"]')
      .first()
      .find('[data-cy="property-card-btn"]')
      .click();

    cy.get('[data-cy="property-card-reserve-btn"]').click();
    cy.url().should("include", "/bookings");
    cy.wait("@getProperty");
    cy.get('[data-cy="booking-card"]').should("have.length", 1);
  });

  it("Should book multiple favorited properties from favorites page", () => {
    cy.get('[data-cy="properties-list"]')
      .find('[data-cy="property-card"]')
      .eq(0)
      .find('[data-cy="property-card-favorite-btn"]')
      .click();

    cy.get('[data-cy="properties-list"]')
      .find('[data-cy="property-card"]')
      .eq(1)
      .find('[data-cy="property-card-favorite-btn"]')
      .click();

    cy.get('[data-cy="favorites-count-badge"]').should("contain", "2");
    cy.get('[data-cy="header-favorites-link"]').click();
    cy.url().should("include", "/favorites");
    cy.get('[data-cy="favorites-list"]')
      .find('[data-cy="property-card"]')
      .should("have.length", 2);

    cy.get('[data-cy="favorites-list"]')
      .find('[data-cy="property-card"]')
      .eq(0)
      .find('[data-cy="property-card-btn"]')
      .click();
    cy.get('[data-cy="property-card-reserve-btn"]').click();
    cy.wait("@getProperty");
    cy.url().should("include", "/bookings");
    cy.get('[data-cy="booking-card"]').should("have.length", 1);

    cy.get('[data-cy="header-favorites-link"]').click();
    cy.get('[data-cy="favorites-list"]')
      .find('[data-cy="property-card"]')
      .eq(1)
      .find('[data-cy="property-card-btn"]')
      .click();
    cy.get('[data-cy="property-card-reserve-btn"]').click();
    cy.wait("@getProperty");
    cy.url().should("include", "/bookings");
    cy.get('[data-cy="booking-card"]').should("have.length", 2);
  });
});
