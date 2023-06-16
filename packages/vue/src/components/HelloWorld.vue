<script setup lang="ts">
import { ref, onMounted } from 'vue'
import emitter from '@/common/emitter'
const message = ref('')

onMounted(() => {
  emitter.on('mouse', ({ code, msg }) => {
    if (code === 0) {
      message.value = msg
    }
  })
})
</script>

<template>
  <div>received from APP: {{ message }}</div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
