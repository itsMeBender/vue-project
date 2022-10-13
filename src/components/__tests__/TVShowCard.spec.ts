import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import TVShowCard from "../TVShowCard.vue";

describe("TVShowCard", () => {
  // TODO: Using the same fixure data as Cypress
  // See "./cypress/fixtures"
  // const tvShows: Show[] = [];

  it("renders properly", () => {
    const wrapper = mount(TVShowCard, {
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
  });
});
