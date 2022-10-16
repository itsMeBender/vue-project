<script setup lang="ts">
import type { Show } from "@/tvAppTypes";
import IconClose from "@/components/icons/IconClose.vue";

// https://vuejs.org/api/utility-types.html#proptype-t
const props = defineProps<{
  tvShow: Show;
  toggle: any; // click: ((payload: MouseEvent) => void) | undefined
}>();

let tvImg: string;
if (props?.tvShow?.image?.original) {
  tvImg = new URL(`${props.tvShow.image.original}`, import.meta.url).href;
} else {
  tvImg = new URL("/src/assets/noimage.png", import.meta.url).href;
}
</script>

<template>
  <div id="overlay" v-if="props.tvShow">
    <div class="dialog">
      <span @click="toggle" class="icon"><IconClose /></span>
      <div class="content">
        <img
          :src="tvImg"
          :alt="props.tvShow.name"
          :title="props.tvShow.name"
          class="thumbnail"
          @click="toggle"
        />
        <h1>{{ props.tvShow.name }}</h1>
        <div v-html="props.tvShow.summary"></div>
        <nav>
          <button @click="toggle">Close</button>
          <router-link :to="`/details/id=${tvShow.id}`" class="btn__details"
            >Details</router-link
          >
        </nav>
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  cursor: pointer;
  width: 100%;
}

nav {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}

.btn__details,
button {
  width: calc(50% - 2em);
  margin: 1em;
  text-align: center;
}

.dialog {
  background-color: var(--color-background-overlay);
  color: var(--color-text);
  display: block;
  height: 80vh;
  margin: 4rem auto 4rem auto;
  max-width: 30rem;
  overflow-y: scroll;
  padding: 1rem 1rem 4rem 1rem;
  position: relative;
  width: 70vw;
}

#overlay {
  background-color: var(--color-background-overlay);
  bottom: 0;
  display: block; /* Hidden by default */
  height: 100%; /* Full height (cover the whole page) */
  left: 0;
  position: fixed; /* Sit on top of the page content */
  right: 0;
  top: 0;
  width: 100%; /* Full width (cover the whole page) */
  z-index: 199; /* Specify a stack order in case you're using a different order for other elements */
}

@media (min-width: 1024px) {
}
</style>
