<script setup lang="ts">
import Category from "@/components/TVShowCategory.vue";
import type { Show } from "@/tvAppTypes";

const props = defineProps<{
  tvShows: Show[];
  genres: any;
}>();

const filterOnGenres = (shows: Show[], genreFilter: string[]): Show[] => {
  const showOnGenre = shows.filter((show: Show) => {
    let hit = false;
    show.genres.forEach((genre) => {
      hit = hit || genreFilter.includes(genre);
    });
    return hit; // Add to the GENRE list
  });
  return showOnGenre;
};
</script>

<template>
  <h1>Categories</h1>
  <Category
    v-for="genre in props.genres.keys()"
    :key="genre"
    :genre="genre"
    :tvShows="filterOnGenres(props.tvShows, [genre])"
  ></Category>
</template>

<style scoped>
h1 {
  text-align: center;
}
@media (min-width: 1024px) {
  h1 {
    padding-left: 1rem;
    text-align: initial;
  }
}
</style>
