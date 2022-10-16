<script lang="ts">
import { defineComponent, ref } from "vue";
import IconSearch from "@/components/icons/IconSearch.vue";
import TVShowCard from "@/components/TVShowCard.vue";
import TVShowOverlay from "@/components/TVShowOverlay.vue";
import type { Show } from "@/tvAppTypes";

/* eslint-disable vue/no-setup-props-destructure */ // TODO: Remove flag

// https://www.bezkoder.com/vue-3-typescript-axios/
export default defineComponent({
  components: {
    TVShowCard,
    IconSearch,
    TVShowOverlay,
  },
  props: {},
  setup(): any {
    const showOverlay = ref<boolean>();
    const searchfor = ref<string>();
    const tvShowDetail = ref<Show>();
    const tvShows = ref<Show[]>();

    const tvShowProps = [
      // TODO: Code duplication
      "genres",
      "id",
      "image",
      "name",
      "summary",
      "rating",
      "schedule",
    ];

    // TODO: Code duplication
    const extractTvShowDataByProps = (tvShow: any, props: string[]): Show[] => {
      return props.reduce((aShow: any, prop: string) => {
        if (tvShow && Object.prototype.hasOwnProperty.call(tvShow, prop)) {
          aShow[prop] = tvShow[prop];
        }
        return aShow;
      }, {});
    };

    // TODO: Code duplication
    // Messy code ID number vs String
    const getTvShowById = (id: string): Show => {
      const selecteShow = tvShows.value!.find((show: Show) => {
        return show.id.toString() === id;
      });
      if (selecteShow) {
        return selecteShow;
      } else {
        // TODO: Create an empty show with a warning
        return {} as Show;
      }
    };

    const toggleOverlay = (id: any): void => {
      showOverlay.value = !showOverlay.value;
      if (typeof id === "number") {
        tvShowDetail.value = getTvShowById(id.toString());
      }
    };

    // TODO: Code duplication
    const fetchShowQuery = async (uri: string): Promise<Show[]> => {
      const fetchShows = await fetch(uri);
      const shows = await fetchShows.json();
      return shows.map((data: any) =>
        extractTvShowDataByProps(data.show, tvShowProps)
      );
    };

    const startSearch = async () => {
      let uri = "https://api.tvmaze.com/search/shows?q=" + searchfor.value;
      try {
        uri = decodeURI(uri);
        tvShows.value = await fetchShowQuery(uri);
      } catch (e) {
        alert(e);
      }
    };

    showOverlay.value = false;
    return {
      searchfor,
      showOverlay,
      startSearch,
      toggleOverlay,
      tvShows,
      tvShowDetail,
    };
  },
});
</script>

<template>
  <main>
    <h1>
      Search for <span>'{{ searchfor }}'</span>
    </h1>
    <div class="results">
      <form name="fullSearch" @submit.prevent="startSearch">
        <fieldset>
          <input
            v-model="searchfor"
            type="text"
            placeholder="Enter tv-show search"
          />
          <button :disabled="!searchfor"><IconSearch /></button>
        </fieldset>
      </form>
      <div class="search__result">
        <TVShowCard
          v-for="show in tvShows"
          :key="show.id"
          :tvShow="show"
          class="tvShowCard"
          @click="toggleOverlay(show.id)"
        ></TVShowCard>
      </div>
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
button {
  height: 2.5rem;
  padding: 0 1rem;
}
button:disabled svg {
  fill: var(--vt-c-text-light-2);
}

fieldset {
  border: 0;
  margin: 0 auto;
  padding: 0;
  width: fit-content;
}
form {
  border: none;
  width: auto;
}

h1 {
  text-align: center;
}
h1 > span {
  font-weight: 200;
  font-style: italic;
}

input {
  border: none;
  display: inline-block;
  font-size: 1.5rem;
  height: 2rem;
  padding: 0.2rem 1rem;
}
input:focus {
  outline: none;
}

svg {
  transform: scale(1.6);
}

.search__result {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  width: 100%;
}

@media (min-width: 1024px) {
  fieldset {
    margin: 0 0 0 1rem;
  }

  h1 {
    padding-left: 1rem;
    text-align: initial;
  }

  .search__result {
    justify-content: flex-start;
  }
}
</style>
