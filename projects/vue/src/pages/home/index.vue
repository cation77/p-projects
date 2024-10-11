<template>
  <div class="py-5 text-2xl">Home page</div>
  <div class="flex">
    <RouterLink
      class="mx-4 bg-white border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 rounded"
      to="/chat"
    >
      chat-page
    </RouterLink>
    <RouterLink
      class="mx-4 bg-white border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 rounded"
      to="/masonry/list"
    >
      masonry-list
    </RouterLink>
    <RouterLink
      class="mx-4 bg-white border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 rounded"
      to="/masonry/columns"
    >
      masonry-columns
    </RouterLink>
  </div>

  <div
    @click="onScreenshot"
    class="fixed top-5 right-5 bg-white border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 rounded"
  >
    屏幕截屏
  </div>
</template>
<script setup lang="ts">
import { screenshot } from '@pnpm-monorepo/shared'

const onScreenshot = () => {
  screenshot()
    .then((res) => {
      console.log(res)
    })
    .catch((e) => {
      console.error(e)
    })
}
</script>
