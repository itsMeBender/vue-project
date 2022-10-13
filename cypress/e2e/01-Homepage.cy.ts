// TODO:
// npm install @cypress/vue@next --dev
// The mount function exported by @cypress/vue has the same API for both Vue 2 and Vue 3.
// The mounting options are the same as Vue Test Utils.
// import { mount } from "@cypress/vue"
// import exampleComponent from "../example" // components/TrendingTVShow.vue
// https://docs.cypress.io/api/introduction/api.html

describe("A. My TV-Show", () => {
  it("visits the app root url", () => {
    cy.visit("/");
    cy.contains("h1", "TV-Shows");
  });

  it("shows standard navigation", () => {
    cy.get("header + nav").children().should("have.length", 3);
  });

  it("default navigation is 'TV-Home'", () => {
    cy.get("header + nav")
      .children()
      .each((nav, idx) => {
        if (idx === 0) {
          // Router view HOMEPAGE ACTIVE
          expect(nav.hasClass("router-link-active")).to.eq(true);
          expect(nav.hasClass("router-link-exact-active")).to.eq(true);
        } else {
          // Router view NOT ACTIVE
          expect(nav.hasClass("router-link-active")).to.eq(false);
          expect(nav.hasClass("router-link-exact-active")).to.eq(false);
        }
      });
  });
});

describe("B. Navigating", () => {
  it("starts with the app root url", () => {
    cy.visit("/");
  });

  it("presents these labels", () => {
    cy.get("header + nav > a").each((nav, idx) => {
      const el = nav[0];

      if (el) {
        switch (idx) {
          case 0:
            expect(el.innerText).to.eq("TV-Home");
            break;
          case 1:
            expect(el.innerText).to.eq("Categories");
            break;
          case 2:
            expect(el.innerText).to.eq("Search");
            break;
          default:
            throw new Error("More navigation items found than expected");
        }
      }
    });
  });

  it("to 'Categories'", () => {
    cy.get("header + nav > a:nth-child(2)")
      .click()
      .url()
      .should("eq", "http://localhost:5173/categories");
  });

  it("to 'Categories' has active menu item", () => {
    cy.get("header + nav")
      .children()
      .each((nav, idx) => {
        if (idx === 0) {
          // Router view NOT ACTIVE
          expect(nav.hasClass("router-link-active")).to.eq(false);
          expect(nav.hasClass("router-link-exact-active")).to.eq(false);
        } else if (idx === 1) {
          // ACTIVE
          expect(nav.hasClass("router-link-active")).to.eq(true);
          expect(nav.hasClass("router-link-exact-active")).to.eq(true);
        } else {
          // Router view NOT ACTIVE
          expect(nav.hasClass("router-link-active")).to.eq(false);
          expect(nav.hasClass("router-link-exact-active")).to.eq(false);
        }
      });
  });

  it("to 'Categories' shows correct title", () => {
    cy.get("#app > :nth-child(2)").contains("Categories");
  });

  it("back to 'TV-Home'", () => {
    cy.get("header + nav > a:first-child")
      .click()
      .url()
      .should("eq", "http://localhost:5173/");

    cy.get("main > h1").contains("On air");
  });
});

describe("C. Data for TV-Show", () => {
  beforeEach(() => {
    cy.fixture("tvshows") // Get `./fixture/tvshows.json` data
      .then((vtShowsFixed: []) => {
        expect(vtShowsFixed.length).to.eq(2); // Just to see if data is available
        // TODO: https://www.cypress.io/blog/2021/04/06/getting-start-with-cypress-component-testing-vue-2-3/
      });
  });

  it("TODO: starts with the app root url loading fixture", () => {
    cy.visit("/");
  });
});
