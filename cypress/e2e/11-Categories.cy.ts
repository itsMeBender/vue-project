// TODO:
// npm install @cypress/vue@next --dev
// The mount function exported by @cypress/vue has the same API for both Vue 2 and Vue 3.
// The mounting options are the same as Vue Test Utils.
// import { mount } from "@cypress/vue"
// import exampleComponent from "../example" // components/TrendingTVShow.vue
// https://docs.cypress.io/api/introduction/api.html

describe("A. TODO - Category", () => {
  it("visits the app root url", () => {
    cy.visit("/");
    cy.contains("h1", "TV-Shows");

    // Navigate to Categories
    cy.get("header + nav > a:nth-child(2)")
    .click()
    .url()
    .should("eq", "http://localhost:5173/categories");
  });

});
