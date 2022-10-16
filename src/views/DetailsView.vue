<script setup lang="ts">
import TVShowDetails from "@/components/TVShowDetails.vue";
import type { Show } from "@/tvAppTypes";

import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps<{
  tvShows: Show[];
  genres: any;
}>();

// TODO: make connection to API, prove of concept
const findLocalShow = (id: string): Show | undefined => {
  const tvShow: Show | undefined = props.tvShows.find((show: Show) => {
    return show.id.toString() === id;
  });
  return tvShow;
};

const myShow = findLocalShow(
  router.currentRoute.value.params.id.toString().substring(3)
);
</script>

<template>
  <h1>Details</h1>
  <TVShowDetails v-if="myShow" :tvShow="myShow"></TVShowDetails>
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
