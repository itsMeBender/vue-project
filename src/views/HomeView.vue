<script lang="ts">
import { defineComponent, ref } from "vue";
import TrendingTVShow from "@/components/TrendingTVShow.vue";
import Category from "@/components/TVShowCategory.vue";
import TVShowOverlay from "@/components/TVShowOverlay.vue";
import type { Show } from "@/tvAppTypes";

/* eslint-disable vue/no-setup-props-destructure */ // TODO: Remove flag

// https://www.bezkoder.com/vue-3-typescript-axios/
export default defineComponent({
  components: {
    Category,
    TrendingTVShow,
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
    const watching = ref<Show[]>();
    const randomShow: Show =
      props.tvShows[Math.floor(Math.random() * props.tvShows.length)];

    const toggleOverlay = (): void => {
      showOverlay.value = !showOverlay.value;
    };

    const addShowToList = (): void => {
      let lst: Show[] | undefined = watching.value;
      if (!lst) {
        lst = [];
      }
      lst.push(randomShow);
      localStorage.setItem("watching", JSON.stringify(lst));
      watching.value = lst;
    };

    // TODO: Use PINIA for this
    let stored = localStorage.getItem("watching");
    if (stored) {
      watching.value = JSON.parse(stored);
    } else {
      // First time, dump demo into the `Watch list`.
      let lst: Show[] | undefined = watching.value;
      if (!lst) {
        lst = [];
      }
      lst.push(props.tvShows[Math.floor(Math.random() * props.tvShows.length)]);
      lst.push(props.tvShows[Math.floor(Math.random() * props.tvShows.length)]);
      localStorage.setItem("watching", JSON.stringify(lst));
      watching.value = lst;
    }

    showOverlay.value = false;
    return { addShowToList, randomShow, showOverlay, toggleOverlay, watching };
  },
});
</script>

<template>
  <main>
    <h1>On air soon - {{ randomShow.schedule.time }}</h1>
    <TrendingTVShow
      :addShow="addShowToList"
      :toggle="toggleOverlay"
      :tvShow="randomShow"
    ></TrendingTVShow>
    <Category
      key="selectedShows"
      genre="Your watch list"
      :tvShows="watching"
    ></Category>
    <TVShowOverlay
      v-if="showOverlay"
      :toggle="toggleOverlay"
      :tvShow="randomShow"
    ></TVShowOverlay>
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 0;
}

main {
  margin: 0 auto;
  width: 80vw;
}

@media (min-width: 1024px) {
  main {
    width: 60vw;
  }
}
</style>
