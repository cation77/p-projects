<script setup lang="ts">
import { ref } from 'vue'
import emitter from '@/common/emitter'
import HelloWorld from './components/HelloWorld.vue'
import Upload from './components/upload/index.vue'

const count = ref(0)
const onClick = () => {
  count.value++
  emitter.emit('mouse', { code: 0, msg: `click count--->${count.value}` })
}
</script>

<template>
  <div @click="onClick">send mitt msg 点击</div>
  <HelloWorld />
  <Upload />
</template>

<style scoped></style>
