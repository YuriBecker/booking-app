describe("home search page", () => {
  beforeEach(() => {
    //Go to the home page
    cy.visit("http://localhost:3000");
  });

  it("Should show date error", () => {
    //Select check in
    cy.findByText("Select a check in").click();
    cy.findByRole("button", {
      name: /go to next month/i,
    }).click();
    cy.findByText("10").click();
    cy.get("body").type("{esc}");

    //Select wrong check out
    cy.findByText("Select a check out").click();
    cy.findByRole("button", {
      name: /go to next month/i,
    }).click();
    cy.findByText("9").click();
    cy.get("body").type("{esc}");

    //Try to submit
    cy.findByRole("button", {
      name: /search/i,
    }).click();

    //Display date error
    cy.findByText(/check out must be after check in/i).should("exist");
  });

  it("Should redirect to search with correct params values", () => {
    //Select city
    cy.findByRole("combobox").click();
    cy.findByRole("option", {
      name: /los angeles/i,
    }).click();

    //Select check in
    cy.get('[data-cy="check-in-date"]').click();
    cy.findByRole("button", {
      name: /go to next month/i,
    }).click();
    cy.findByText("10").click();
    cy.get("body").type("{esc}");

    //Select check out
    cy.get('[data-cy="check-out-date"]').click();
    cy.findByRole("button", {
      name: /go to next month/i,
    }).click();
    cy.findByText("20").click();
    cy.get("body").type("{esc}");

    //Verify the number of adults and children
    cy.findByRole("spinbutton", {
      name: /number of adults/i,
    }).should("have.value", "1");
    cy.findByRole("spinbutton", {
      name: /number of children/i,
    }).should("have.value", "0");

    //Go to the search page
    cy.findByRole("button", {
      name: /search/i,
    }).click();

    //Verify the url params
    cy.url().should("include", "/search?city=Los+Angeles");
    cy.url().should("include", "numOfAdults=1");
    cy.url().should("include", "numOfChildren=0");
    cy.url().should("include", "checkIn=");
    cy.url().should("include", "checkOut=");
  });
});
