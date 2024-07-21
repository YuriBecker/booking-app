import { propertiesMock, propertyMock } from "../fixtures/properties-mock";

const FIXED_SEARCH_URL =
  "/search?city=&checkIn=2024-07-14T03%3A00%3A00.000Z&checkOut=2024-07-19T03%3A00%3A00.000Z&numOfAdults=1&numOfChildren=0";

describe("booking", () => {
  beforeEach(() => {
    //Mock API
    cy.intercept(
      {
        method: "GET",
        url: `${Cypress.env("apiUrl")}/properties*`,
      },
      propertiesMock
    ).as("getProperties");

    //Mock API
    cy.intercept(
      {
        method: "GET",
        url: `${Cypress.env("apiUrl")}/properties/*`,
      },
      propertyMock
    ).as("getProperty");

    //Go direct to search result of a fixed search
    cy.visit(FIXED_SEARCH_URL);

    //Await for the properties API call
    cy.wait("@getProperties");
  });

  it("Should book the first property", () => {
    //Book the first property on list
    cy.get('[data-cy="properties-list"]')
      .find('[data-cy="property-card"]')
      .first()
      .find('[data-cy="property-card-btn"]')
      .click();
    cy.get('[data-cy="property-card-reserve-btn"]').click();

    //Verify the url
    cy.url().should("include", "/bookings");

    //Await for the property API call
    cy.wait("@getProperty");

    //Verify list length
    cy.get('[data-cy="booking-card"]').should("have.length", 1);
  });

  it("Should delete the booking", () => {
    //Book the first property on list
    cy.get('[data-cy="properties-list"]')
      .find('[data-cy="property-card"]')
      .first()
      .find('[data-cy="property-card-btn"]')
      .click();
    cy.get('[data-cy="property-card-reserve-btn"]').click();

    //Await for the property API call
    cy.wait("@getProperty");

    //Click delete button
    cy.get('[data-cy="booking-card-delete-btn"]').click();

    //Confirm delete
    cy.get('[data-cy="booking-card-confirm-delete-btn"]').click();

    //Verify list length
    cy.get('[data-cy="booking-card"]').should("not.exist");
  });

  it("Should edit the booking", () => {
    //Book the first property on list
    cy.get('[data-cy="properties-list"]')
      .find('[data-cy="property-card"]')
      .first()
      .find('[data-cy="property-card-btn"]')
      .click();
    cy.get('[data-cy="property-card-reserve-btn"]').click();

    //Await for the property API call
    cy.wait("@getProperty");

    //Click edit button
    cy.get('[data-cy="booking-card-edit-btn"]').click();

    //Edit check in date
    cy.get('[data-cy="edit-booking-dialog"]')
      .find('[data-cy="check-in-date"]')
      .click();
    cy.findByRole("button", {
      name: /go to next month/i,
    }).click();
    cy.findByText("5").click();
    cy.get("body").type("{esc}");

    //Edit check out date
    cy.get('[data-cy="edit-booking-dialog"]')
      .find('[data-cy="check-out-date"]')
      .click();
    cy.findByRole("button", {
      name: /go to next month/i,
    }).click();
    cy.findByText("10").click();
    cy.get("body").type("{esc}");

    //Confirm edit
    cy.get('[data-cy="booking-card-confirm-edit-btn"]').click();

    //Verify if booking card has updated dates
    cy.get('[data-cy="booking-card"]').contains("5");
    cy.get('[data-cy="booking-card"]').contains("10");
  });

  it("Should remove booked property from search when dates are booked", () => {
    const property = "Private Entry En-Suite in Geographic City Center";

    //Book the property
    cy.get('[data-cy="properties-list"]')
      .contains(property)
      .closest('[data-cy="property-card"]')
      .find('[data-cy="property-card-btn"]')
      .click();
    cy.get('[data-cy="property-card-reserve-btn"]').click();

    //Await for the property API call
    cy.wait("@getProperty");

    //Verify the url
    cy.url().should("include", "/bookings");

    //Go to search
    cy.visit(FIXED_SEARCH_URL);

    //Await for the API call
    cy.wait("@getProperties");

    //Verify if item is not in the list
    cy.get('[data-cy="properties-list"]').should("not.contain", property);
  });
});
