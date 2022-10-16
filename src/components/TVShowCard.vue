<script setup lang="ts">
import type { Show } from "@/tvAppTypes";

// https://vuejs.org/api/utility-types.html#proptype-t
const props = defineProps<{
  tvShow: Show;
}>();

let thumbnailUri: string;
if (props?.tvShow?.image?.medium) {
  thumbnailUri = new URL(`${props.tvShow.image.medium}`, import.meta.url).href;
} else {
  thumbnailUri = new URL("/src/assets/noimage.png", import.meta.url).href;
}
</script>

<template>
  <div class="card">
    <img
      :src="thumbnailUri"
      :alt="props.tvShow.name"
      :title="props.tvShow.name"
      class="thumbnail"
    />
    <div class="rating">
      <span>Rating:</span> {{ props.tvShow.rating.average || "None" }}
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: #222;
  height: 12rem;
  margin: 10px 0 10px 1rem;
  outline: thin solid #222;
  position: relative;
  width: 6rem;
}
.card:hover {
  cursor: pointer;
  outline: thin solid #fafafa;
}
.rating {
  font-weight: bold;
  color: #fafafa;
  font-size: 0.8rem;
  margin-top: -0.1rem;
  padding: 0 0.5rem;
}
.rating > span {
  color: #eaeaea;
}
.thumbnail {
  height: 10rem;
  width: 6rem;
}

@media (min-width: 1024px) {
}
</style>
