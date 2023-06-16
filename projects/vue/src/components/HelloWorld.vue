<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import emitter, { EventCallback } from '@/common/emitter'
const message = ref('')

const handleEmit = ({ code, msg }: EventCallback) => {
  if (code === 0) {
    message.value = msg
  }
}

onMounted(() => {
  emitter.on('mouse', handleEmit)
})

onBeforeUnmount(() => {
  emitter.off('mouse', handleEmit)
})
</script>

<template>
  <div class="read-the-docs">received from APP: {{ message }}</div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
