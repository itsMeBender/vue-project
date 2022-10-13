import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import TVShowCategory from "../TVShowCategory.vue";

describe("TVShowCard", () => {
  // TODO: [Vue warn]: Failed to locate Teleport target with selector "#modal-area".
  // Note the target element must exist before the component is mounted
  // i.e. the target cannot be rendered by the component itself, and ideally should be outside of the entire Vue component tree.

  it("renders properly", () => {
    const wrapper = mount(TVShowCategory, {
      props: {
        genre: "testa",
        tvShows: [
          {
            genres: ["testa"],
            id: "tvshow01",
            image: {
              medium: "http://localhost:5173/public/tv-banner-800px.jpg",
              original: "http://localhost:5173/public/tv-banner-800px.jpg",
            },
            name: "Name of tv-show one",
            summary: "A summary of tv-show one",
            rating: {
              average: 5.0,
            },
          },
          {
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
        ],
      },
      async mounted() {
        console.log("TODO: Mount fixture data");
      },
      // data: () => {
      //   return {
      //     tvShow: {} as Show
      // }}
    });

    expect(wrapper.find("h1").text()).toBe("testa");
  });
});
