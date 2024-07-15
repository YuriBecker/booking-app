describe("booking", () => {
  beforeEach(() => {
    //Go direct to search result of a fixed search
    cy.visit(
      "http://localhost:3000/search?city=&checkIn=2024-07-14T03%3A00%3A00.000Z&checkOut=2024-07-19T03%3A00%3A00.000Z&numOfAdults=1&numOfChildren=0"
    );
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
});
