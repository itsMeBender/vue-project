<script lang="ts">
import { defineComponent, ref } from "vue";
import IconExpandLess from "@/components/icons/IconExpandLess.vue";
import IconExpandMore from "@/components/icons/IconExpandMore.vue";
import TvShowCard from "@/components/TVShowCard.vue";
import TVShowOverlay from "@/components/TVShowOverlay.vue";
import type { Show } from "@/tvAppTypes";

/* eslint-disable vue/no-setup-props-destructure */

// https://www.bezkoder.com/vue-3-typescript-axios/
export default defineComponent({
  components: {
    IconExpandLess,
    IconExpandMore,
    TvShowCard,
    TVShowOverlay,
  },
  props: {
    genre: {
      type: String,
      required: true,
    },
    tvShows: {
      type: Array<Show>, // Object as PropType<Show>,
      required: true,
    },
  },
  setup(props): any {
    // TODO: Getting problems to keep the reactivity on the prop:
    // const myShows = toRef(props, 'tvShows');
    // const { tvShows: myShows } = toRefs(props);
    // https://stackoverflow.com/questions/69855836/props-gotten-directly-from-vue-3-setup-are-not-reactive
    const myShows = props.tvShows; // TODO: Add genre filter, if time

    const showOverlay = ref<boolean>();
    const viewCardsHorizontal = ref<boolean>();
    const tvShowDetail = ref<Show | undefined>();

    const getTvShowById = (id: string): Show => {
      const selecteShow = myShows.find((show: Show) => {
        return show.id === id;
      });
      if (selecteShow) {
        return selecteShow;
      } else {
        // TODO: Create an empty show with a warning
        return {} as Show;
      }
    };

    const toggleOverlay = (id: string): void => {
      showOverlay.value = !showOverlay.value;
      tvShowDetail.value = getTvShowById(id);
    };

    const toggleCardView = (): void => {
      viewCardsHorizontal.value = !viewCardsHorizontal.value;
    };

    showOverlay.value = false;
    viewCardsHorizontal.value = true;

    return {
      myShows,
      tvShowDetail,
      showOverlay,
      toggleCardView,
      toggleOverlay,
      viewCardsHorizontal,
    };
  },
});
</script>

<template>
  <div class="titlebar">
    <h1>{{ genre }}</h1>
    <IconExpandLess v-if="!viewCardsHorizontal" @click="toggleCardView" />
    <IconExpandMore v-if="viewCardsHorizontal" @click="toggleCardView" />
  </div>
  <div class="moviesInCategory" :class="{ vertical: !viewCardsHorizontal }">
    <TvShowCard
      v-for="show in myShows"
      :key="show.id"
      :tvShow="show"
      class="tvShowCard"
      @click="toggleOverlay(show.id)"
    ></TvShowCard>
  </div>
  <teleport to="#modal-area">
    <TVShowOverlay
      v-if="showOverlay"
      :tvShow="tvShowDetail"
      :toggle="toggleOverlay"
    ></TVShowOverlay>
  </teleport>
</template>

<style scoped>
h1 {
  font-size: 120%;
  margin-bottom: 0;
  text-align: center;
}
.titlebar > svg {
  display: block;
  position: absolute;
  top: 0.5rem;
  right: 1rem;
}
.titlebar > svg:hover {
  cursor: pointer;
  fill: var(--vt-c-secundair);
}

.moviesInCategory {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  overflow-x: scroll;
  width: 100%;
}
.moviesInCategory.vertical {
  flex-wrap: wrap;
  overflow-x: auto;
}

.titlebar {
  border-bottom: thin solid var(--vt-c-primair);
  box-sizing: border-box;
  margin: 0 1rem;
  position: relative;
}

@media (min-width: 1024px) {
  h1 {
    text-align: initial;
  }
}
</style>
