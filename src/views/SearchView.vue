<script lang="ts">
import { defineComponent, ref } from "vue";
// import TVShowCard from "@/components/TVShowCard.vue";
import TVShowOverlay from "@/components/TVShowOverlay.vue";
import type { Show } from "@/tvAppTypes";

/* eslint-disable vue/no-setup-props-destructure */ // TODO: Remove flag

// https://www.bezkoder.com/vue-3-typescript-axios/
export default defineComponent({
  components: {
    // TVShowCard,
    TVShowOverlay,
  },

  props: {
    tvShows: {
      // Object as PropType<Show>
      type: Array<Show>,
      required: true,
    },
  },

  setup(props): any {
    const showOverlay = ref<boolean>();

    const toggleOverlay = (): void => {
      showOverlay.value = !showOverlay.value;
    };

    showOverlay.value = false;
    return { showOverlay, toggleOverlay };
  },
});
</script>

<template>
  <main>
    <h1>Search</h1>
    <div class="results">
        <p>Search results</p>
      <!-- <TvShowCard
        v-for="show in tvShows"
        :key="show.id"
        :tvShow="show"
        class="tvShowCard"
        @click="toggleOverlay(show.id)"
      ></TvShowCard> -->
    </div>
    <teleport to="#modal-area">
      <TVShowOverlay
        v-if="showOverlay"
        :tvShow="tvShowDetail"
        :toggle="toggleOverlay"
      ></TVShowOverlay>
    </teleport>
  </main>
</template>

<style scoped>
@media (min-width: 1024px) {
}
</style>
