<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import type { Show } from "@/tvAppTypes";
// TODO: Use vue.setup(())
</script>

<template>
  <header>
    <div class="banner">
      <h1>TV-Shows</h1>
    </div>
  </header>
  <nav id="nav-container">
    <RouterLink to="/">TV-Home</RouterLink>
    <RouterLink to="/categories">Categories</RouterLink>
    <RouterLink to="/search">Search</RouterLink>
  </nav>

  <RouterView :tvShows="tvShows" :genres="genres" />
</template>

<script lang="ts">
const tvShowProps = [
  "genres",
  "id",
  "image",
  "name",
  "summary",
  "rating",
  "schedule",
];

const extractTvShowDataByProps = (tvShow: any, props: string[]): Show[] => {
  return props.reduce((aShow: any, prop: string) => {
    if (tvShow && Object.prototype.hasOwnProperty.call(tvShow, prop)) {
      aShow[prop] = tvShow[prop];
    }
    return aShow;
  }, {});
};

const extractGenres = (shows: Show[]): Object => {
  let categoryGenre = new Map();

  shows.forEach((show) => {
    show.genres.forEach((genre) => {
      if (categoryGenre.has(genre)) {
        categoryGenre.set(genre, categoryGenre.get(genre) + 1);
      } else {
        categoryGenre.set(genre, 1);
      }
    });
  });

  return new Map([...categoryGenre.entries()].sort());
};

// TODO: Use vue.setup(())
// Using `export default defineComponent({ ...`
// async mounted () { // HOOK
//   const res = await fetch('./food.json')
//   const data = await res.json()
//   this.inventory = data
// }
const fetchAllShows = async (): Promise<Show[]> => {
  const fetchShows = await fetch("https://api.tvmaze.com/shows");
  const shows = await fetchShows.json();
  return shows.map((show: any) => extractTvShowDataByProps(show, tvShowProps));
};

const sortOnHighestRating = (shows: Show[], ascending = true): void => {
  shows.sort((a: any, b: any): number => {
    if (ascending) {
      return b.rating.average - a.rating.average;
    } else {
      return a.rating.average - b.rating.average;
    }
  });
};

const tvShows = await fetchAllShows();
// Is a MAP, hoe to Type a Map()?
// declare const data: { [index: string]: number|undefined };
// declare const data: Record<string, number | undefined>;
const genres: any = extractGenres(tvShows);

sortOnHighestRating(tvShows);
localStorage.clear(); // Reset demo data session
</script>

<style scoped>
header {
  background-color: var(--vt-c-primair);
  height: 10rem;
  margin-bottom: -2.9rem;
  position: relative;
  width: 100%;
}

nav {
  background-color: var(--color-background-nav);
  box-sizing: border-box;
  padding: 0.5rem 0;
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  width: 100%;
  z-index: 99;
}
nav a {
  display: inline-block;
  padding: 0 1rem;
}
nav > a {
  margin-left: 2rem;
}
nav a.router-link-exact-active {
  background-color: var(--vt-c-primair);
  font-weight: bold;
  border-bottom: thin solid var(--vt-c-secundair);
}

.banner {
  background-image: url(./assets/tv-banner.jpg);
  background-position: center;
  background-size: 100vw;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}
.banner > h1 {
  color: var(--vt-c-secundair);
  font-size: 3em;
  margin: 1rem 1rem 0 2rem;
  text-shadow: 0 0 5px grey;
}

@media (min-width: 1024px) {
}
</style>
