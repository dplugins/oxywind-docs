<script lang="ts">
interface MediaPress {
  url: string
  img: string
  name: string
}

// shared data across instances so we load only once
let data = $ref<MediaPress[]>()
let pending = false
</script>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'


let container = $ref<HTMLElement>()
let visible = $ref(false)

onMounted(async () => {
  // only render when entering view
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        visible = true
        observer.disconnect()
      }
    },
    { rootMargin: '0px 0px 300px 0px' }
  )
  observer.observe(container)
  onUnmounted(() => observer.disconnect())

  // load data
  if (!pending) {
    pending = true
    data = await (await fetch(`/data/featured.json`)).json()
  }
})
</script>

<template>
  <div
    ref="container"
    class="featured-container silver landing"
  >
    <template v-if="data && visible">
      <a
        v-for="{ url, img, name } of data"
        class="featured-item"
        :href="url"
        target="_blank"
        rel="featureded noopener"
      >
        <img :src="`${img}`" :alt="name" />
      </a>
    </template>
    <a
      href="/featured/"
      class="featured-item action"
      >Your logo</a
    >
  </div>
</template>

<style scoped>
.featured-container {
  --max-width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--max-width), 1fr));
  column-gap: 4px;
}

.featured-container.platinum {
  --max-width: 240px;
}
.featured-container.gold {
  --max-width: 180px;
}
.featured-container.silver {
  --max-width: 140px;
}

.featured-item {
  margin: 2px 0;
  background-color: var(--vt-c-white-soft);
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 2px;
  transition: background-color 0.2s ease;
  height: calc(var(--max-width) / 2 - 6px);
}
.featured-item.action {
  font-size: 11px;
  color: var(--vt-c-text-3);
}
.featured-item img {
  max-width: calc(var(--max-width) - 30px);
  max-height: calc(var(--max-width) / 2 - 20px);
}
.special .featured-item {
  height: 160px;
}
.special .featured-item img {
  max-width: 300px;
  max-height: 150px;
}

/* dark mode */
.dark .aside .featured-item,
.dark .landing .featured-item {
  background-color: var(--vt-c-bg-soft);
}
.aside .featured-item img,
.landing .featured-item img {
  transition: filter 0.2s ease;
}
.dark .aside .featured-item img,
.dark .landing .featured-item img {
  filter: grayscale(1) invert(1);
}
.dark .aside .featured-item:hover,
.dark .landing .featured-item:hover {
  color: var(--vt-c-indigo);
  background-color: var(--vt-c-white-mute);
}
.dark .featured-item:hover img {
  filter: none;
}

/* aside mode (on content pages) */
.featured-container.platinum.aside {
  --max-width: 110px;
  column-gap: 1px;
}
.aside .featured-item {
  margin: 1px 0;
}
.aside .special .featured-item {
  width: 100%;
  height: 60px;
}
.aside .special .featured-item img {
  width: 120px;
}
.aside .platinum .featured-item {
  width: 111px;
  height: 50px;
}
.aside .platinum .featured-item img {
  max-width: 88px;
}

/* narrow, aside will be hidden under this state so it's mutually exclusive */
@media (max-width: 720px) {
  .featured-container.platinum {
    --max-width: 180px;
  }
  .featured-container.gold {
    --max-width: 140px;
  }
  .featured-container.silver {
    --max-width: 120px;
  }
}

@media (max-width: 480px) {
  .featured-container.platinum {
    --max-width: 150px;
  }
  .featured-container.gold {
    --max-width: 120px;
  }
  .featured-container.silver {
    --max-width: 100px;
  }
}
</style>
