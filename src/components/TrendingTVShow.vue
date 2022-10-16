<script setup lang="ts">
import type { Show } from "@/tvAppTypes";
import IconZoomIn from "@/components/icons/IconZoomIn.vue";

// https://vuejs.org/api/utility-types.html#proptype-t
const props = defineProps<{
  addShow: any; // click: ((payload: MouseEvent) => void) | undefined
  toggle: any; // click: ((payload: MouseEvent) => void) | undefined
  tvShow: Show;
}>();

let thumbnailUri: string;
if (props?.tvShow?.image?.medium) {
  thumbnailUri = new URL(`${props.tvShow.image.original}`, import.meta.url)
    .href;
} else {
  thumbnailUri = new URL("/src/assets/noimage.png", import.meta.url).href;
}

const addShowToList = () => {
  props.addShow();
};
</script>

<template>
  <div class="container">
    <div class="img__frame">
      <span class="icon" @click="toggle"><IconZoomIn /></span>
      <img
        class="thumbnail"
        @click="toggle"
        :alt="props.tvShow.name"
        :src="thumbnailUri"
        :title="props.tvShow.name"
      />
    </div>
    <div class="title">{{ tvShow.name }}</div>
    <div class="rating"><span>Rating:</span> {{ tvShow.rating.average }}</div>
    <nav>
      <a href="javascript:void(0);" @click="toggle">Zoom</a>
      <router-link :to="`/details/id=${tvShow.id}`">Details</router-link>
      <a href="javascript:void(0);" @click="addShowToList">Watch</a>
    </nav>
  </div>
</template>

<style scoped>
a {
  width: calc(50% - 2em);
  margin: 1em;
  text-align: center;
}

img {
  cursor: pointer;
  display: block;
  width: 100%;
}

nav {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}

.container {
  background-color: var(--vt-c-primair);
  margin: 0 auto;
  max-width: 80vw;
  width: 80vw;
}
.img__frame {
  height: 20rem;
  margin: 0;
  overflow: hidden;
  position: relative;
  width: 100%;
}
.rating {
  font-size: 60%;
  text-align: center;
}
.title {
  font-weight: bold;
  margin-top: 1rem;
  overflow-x: hidden;
  text-align: center;
  white-space: nowrap;
}

@media (prefers-color-scheme: light) {
  .rating, /* TODO: QUAD */
    .title {
    color: var(--vt-c-text-dark-2);
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 40vw;
  }
  .img__frame {
    height: auto;
    margin: 0 auto;
    width: 100%;
  }
  .title {
    font-size: 110%;
  }
}
</style>
