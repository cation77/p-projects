<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import emitter, { EventCallback } from '@/common/emitter'
const message = ref('')
const loading = ref(true)

const count = ref(0)
const onClick = () => {
  count.value++
  emitter.emit('mouse', { code: 0, msg: `click count--->${count.value}` })
}

const handleEmit = ({ code, msg }: EventCallback) => {
  if (code === 0) {
    message.value = msg
  }
}

onMounted(() => {
  setTimeout(() => (loading.value = false), 1500)
  emitter.on('mouse', handleEmit)
})

onBeforeUnmount(() => {
  emitter.off('mouse', handleEmit)
})
</script>

<template>
  <div @click="onClick">send mitt msg 点击</div>
  <div class="read-the-docs" v-loading="loading">
    <p>received from APP: {{ message }}</p>
    <input type="text" v-focus="true" />
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
