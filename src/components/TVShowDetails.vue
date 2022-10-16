<script setup lang="ts">
import type { Show } from "@/tvAppTypes";

// https://vuejs.org/api/utility-types.html#proptype-t
const props = defineProps<{
  tvShow: Show;
}>();

let thumbnailUri: string;
if (props?.tvShow?.image?.original) {
  thumbnailUri = new URL(`${props.tvShow.image.original}`, import.meta.url)
    .href;
} else {
  thumbnailUri = new URL("/src/assets/noimage.png", import.meta.url).href;
}
</script>

<template>
  <div class="card">
    <div class="visual">
      <img
        :src="thumbnailUri"
        :alt="props.tvShow.name"
        :title="props.tvShow.name"
        class="thumbnail"
      />
    </div>
    <div class="info">
      <div class="key__value">
        <label>Title:</label>
        <div>{{ props.tvShow.name }}</div>
      </div>
      <div class="key__value">
        <label>Summary:</label>
        <div v-html="props.tvShow.summary"></div>
      </div>
      <div class="key__value">
        <label>Rating:</label>
        <div>{{ props.tvShow.rating.average || "None" }}</div>
      </div>
      <div class="key__value">
        <label>Air time:</label>
        <div>{{ props.tvShow.schedule.time || "-" }}</div>
      </div>
      <div class="key__value">
        <label>Genre:</label>
        <div>{{ props.tvShow.genres.join(", ") || "-" }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
label {
  display: block;
  width: 6rem;
}

.card {
  display: flex;
  flex-direction: column;
  margin: 0 auto 2rem auto;
  width: 60rem;
}

.info {
  max-width: 30rem;
  padding: 2rem 3rem 0 1rem;
}
.key__value {
  display: flex;
  flex-direction: row;
}
.key__value > label {
  font-size: 70%;
  padding-right: 1rem;
}
.visual {
  margin: 0 1rem;
}
.visual > img {
  max-width: 20rem;
}
@media (min-width: 1024px) {
  .card {
    flex-direction: row;
  }
  .info {
    padding-top: 0;
  }
}
</style>
