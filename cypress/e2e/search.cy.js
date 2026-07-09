describe("home search page", () => {
  beforeEach(() => {
    //Go to the home page
    cy.visit("/");
  });

  it("Should show date error", () => {
    //Select check in
    cy.findByText("Select a check in").click();
    cy.findByRole("button", {
      name: /go to next month/i,
    }).click();
    cy.findAllByText("10").first().click();

    //Select wrong check out
    cy.findByText("Select a check out").click();
    cy.findByRole("button", {
      name: /go to next month/i,
    }).click();
    cy.findAllByText("9").first().click();

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
    cy.findAllByText("10").first().click();

    //Select check out
    cy.get('[data-cy="check-out-date"]').click();
    cy.findByRole("button", {
      name: /go to next month/i,
    }).click();
    cy.findAllByText("20").first().click();

    //Verify the initial number of adults and children
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

const SEARCH_RESULTS_URL =
  "/search?city=&checkIn=2024-07-14T03%3A00%3A00.000Z&checkOut=2024-07-19T03%3A00%3A00.000Z&numOfAdults=1&numOfChildren=0";

const searchResultsProperties = [
  {
    hostMessage: "Welcome",
    id: "default-first",
    category: "entire-home",
    numberOfBeds: 1,
    numberOfBedrooms: 1,
    numberOfBathrooms: 1,
    price: {
      perNight: 320,
      hasPromotion: true,
      promotionalPricePerNight: 110,
    },
    location: {
      city: "Los Angeles",
      state: "California",
      countryCode: "us",
    },
    capacity: {
      adults: 2,
      children: 1,
    },
    reviews: {
      totalScore: 4.2,
      reviewsCount: 12,
    },
    title: "Default First Villa",
    description: "First property in API order",
    images: ["https://example.com/default-first.jpg"],
  },
  {
    hostMessage: "Welcome",
    id: "default-second",
    category: "entire-home",
    numberOfBeds: 1,
    numberOfBedrooms: 1,
    numberOfBathrooms: 1,
    price: {
      perNight: 180,
      hasPromotion: false,
      promotionalPricePerNight: null,
    },
    location: {
      city: "Los Angeles",
      state: "California",
      countryCode: "us",
    },
    capacity: {
      adults: 2,
      children: 1,
    },
    reviews: {
      totalScore: 4.9,
      reviewsCount: 20,
    },
    title: "Default Second Bungalow",
    description: "Second property in API order",
    images: ["https://example.com/default-second.jpg"],
  },
  {
    hostMessage: "Welcome",
    id: "default-third",
    category: "entire-home",
    numberOfBeds: 1,
    numberOfBedrooms: 1,
    numberOfBathrooms: 1,
    price: {
      perNight: 240,
      hasPromotion: true,
      promotionalPricePerNight: 90,
    },
    location: {
      city: "Los Angeles",
      state: "California",
      countryCode: "us",
    },
    capacity: {
      adults: 2,
      children: 1,
    },
    reviews: {
      totalScore: 4.5,
      reviewsCount: 15,
    },
    title: "Default Third Studio",
    description: "Third property in API order",
    images: ["https://example.com/default-third.jpg"],
  },
];

const assertPropertyOrder = (titles) => {
  cy.get('[data-cy="property-card"]').then(($cards) => {
    const actualTitles = [...$cards].map((card) =>
      card.querySelector("h3").textContent
    );

    expect(actualTitles).to.deep.equal(titles);
  });
};

describe("search results sorting", () => {
  beforeEach(() => {
    cy.clearLocalStorage();

    cy.intercept(
      {
        method: "GET",
        url: `${Cypress.env("apiUrl")}/properties*`,
      },
      searchResultsProperties
    ).as("getProperties");
  });

  it("uses rating as the default order and sorts by effective price", () => {
    cy.visit(SEARCH_RESULTS_URL);
    cy.wait("@getProperties");

    cy.findByRole("radio", { name: /rating: high to low/i }).should(
      "have.attr",
      "aria-checked",
      "true"
    );
    cy.url().should("not.include", "sort=");
    assertPropertyOrder([
      "Default Second Bungalow",
      "Default Third Studio",
      "Default First Villa",
    ]);

    cy.findByRole("radio", { name: /price: low to high/i }).click();

    cy.url().should("include", "sort=price_asc");
    assertPropertyOrder([
      "Default Third Studio",
      "Default First Villa",
      "Default Second Bungalow",
    ]);

    cy.go("back");

    cy.findByRole("radio", { name: /rating: high to low/i }).should(
      "have.attr",
      "aria-checked",
      "true"
    );
    assertPropertyOrder([
      "Default Second Bungalow",
      "Default Third Studio",
      "Default First Villa",
    ]);
  });

  it("applies shared sort URLs and removes sort when Rating is selected", () => {
    cy.visit(`${SEARCH_RESULTS_URL}&sort=price_desc`);
    cy.wait("@getProperties");

    cy.findByRole("radio", { name: /price: high to low/i }).should(
      "have.attr",
      "aria-checked",
      "true"
    );
    assertPropertyOrder([
      "Default Second Bungalow",
      "Default First Villa",
      "Default Third Studio",
    ]);

    cy.findByRole("radio", { name: /rating: high to low/i }).click();

    cy.url().should("not.include", "sort=");
    assertPropertyOrder([
      "Default Second Bungalow",
      "Default Third Studio",
      "Default First Villa",
    ]);
  });

  it("treats invalid sort URLs as rating without rewriting the URL", () => {
    cy.visit(`${SEARCH_RESULTS_URL}&sort=unknown`);
    cy.wait("@getProperties");

    cy.findByRole("radio", { name: /rating: high to low/i }).should(
      "have.attr",
      "aria-checked",
      "true"
    );
    cy.url().should("include", "sort=unknown");
    assertPropertyOrder([
      "Default Second Bungalow",
      "Default Third Studio",
      "Default First Villa",
    ]);
  });
});
