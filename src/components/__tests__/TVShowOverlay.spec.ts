import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import TVShowOverlay from "../TVShowOverlay.vue";

describe("TVShowCard", () => {
  // TODO: Using the same fixure data as Cypress
  // See "./cypress/fixtures"
  // const tvShows: Show[] = [];

  let psp = false; // It works, but probably not clean

  it("renders properly", () => {
    const wrapper = mount(TVShowOverlay, {
      props: {
        tvShow: {
          genres: ["testa", "testb"],
          id: "tvshow02",
          image: {
            medium: "http://localhost:5173/public/tv-banner-800px.jpg",
            original: "http://localhost:5173/public/tv-banner-800px.jpg",
          },
          name: "Name of tv-show two",
          summary: "A summary of tv-show two",
          rating: {
            average: 10.0,
          },
        },
        toggle: () => {
          psp = !psp;
        },
      },
      async mounted() {
        console.log("TODO: Mount fixture data");
      },
      // data: () => {
      //   return {
      //     tvShow: {} as Show
      // }}
    });

    expect(wrapper.find("img").attributes("src")).toBe(
      "http://localhost:5173/public/tv-banner-800px.jpg"
    );

    expect(wrapper.find("img").attributes("title")).toBe("Name of tv-show two");
    expect(wrapper.find("img").attributes("alt")).toBe("Name of tv-show two");

    wrapper.find("img").trigger("click");
    expect(psp).toBe(true);

    wrapper.find("button").trigger("click");
    expect(psp).toBe(false);
  });
});
