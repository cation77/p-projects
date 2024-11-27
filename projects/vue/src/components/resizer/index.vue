<template>
  <span
    role="presentation"
    class="myResizerBox"
    :class="props.class"
    :dir="props.direction"
    @mouseup="onMouseUp"
    @mousedown="onMouseDown"
  >
  </span>
</template>
<script setup lang="ts">
import { defineExpose } from 'vue'

interface IProps {
  shouldResize?: boolean
  class?: string
  direction?: 'ltr' | 'rtl' // ltr 从左到右（Left-to-Right）| rtl 从右到左（Right-to-Left）
}

const props = withDefaults(defineProps<IProps>(), {
  direction: 'ltr'
})

const emits = defineEmits<{
  (e: 'mousemove', event: MouseEvent): void
}>()

const moveEvent = (event: MouseEvent) => {
  emits('mousemove', event)
}

const onMouseDown = () => {
  //鼠标按下
  if (props.shouldResize) {
    window.addEventListener('mousemove', moveEvent)
  }
}

const removeListener = () => {
  //鼠标松开
  window.removeEventListener('mousemove', moveEvent)
}

const onMouseUp = () => {
  removeListener()
}

defineExpose({
  removeListener
})
</script>
<style lang="less" scoped>
.myResizerBox {
  width: 8px;
  height: 100%;
  position: absolute;
  border-left: 2px solid rgba(0, 0, 0, 0);
  border-right: 2px solid rgba(0, 0, 0, 0);
  background: rgba(44, 174, 255, 1);
  cursor: col-resize;
  z-index: 111;
}
</style>
