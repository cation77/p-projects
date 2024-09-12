<template>
  <div class="virtual-list-container" ref="containerRef">
    <div class="list" ref="listRef" :style="scrollStyle">
      <div class="item" v-for="i in renderList" :id="String(i.id)" :key="i.id">
        <slot name="item" :item="i"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, reactive, onMounted, onUnmounted } from 'vue'
import { throttle } from '@pnpm-monorepo/shared'
import { nextTick } from 'vue'

type IProps = {
  // 预测高度
  estimatedHeight: number
  //数据源
  list: any[]
}

interface IPosInfo {
  // 当前pos对应的元素索引
  index: number
  // top 和 bottom 数值的参照物是 list
  // 元素顶部所处位置
  top: number
  // 元素底部所处位置
  bottom: number
  // 元素高度
  height: number
  // 自身对比高度差：判断是否需要更新
  dHeight: number
}

const props = defineProps<IProps>()

const emits = defineEmits<{
  getMoreData: []
}>()
// container DOM
const containerRef = ref<HTMLDivElement>()
// list DOM
const listRef = ref<HTMLDivElement>()

const positions = ref<IPosInfo[]>([])

const state = reactive({
  // 容器高度
  viewHeight: 0,
  // 列表高度
  listHeight: 0,
  // 起始索引
  startIndex: 0,
  // 最大容纳量
  maxCount: 0,
  // 缓存上次计算长度
  preLen: 0
})

const endIndex = computed(() =>
  Math.min(props.list.length, state.startIndex + state.maxCount)
)

const renderList = computed(() =>
  props.list.slice(state.startIndex, endIndex.value)
)

const offsetDis = computed(() => {
  return state.startIndex > 0 ? positions.value[state.startIndex - 1].bottom : 0
})

const scrollStyle = computed(() => ({
  height: `${state.listHeight - offsetDis.value}px`,
  transform: `translate3d(0, ${offsetDis.value}px, 0)`
}))

const initPosition = () => {
  const pos: IPosInfo[] = []
  const disLen = props.list.length - state.preLen
  const currentLen = positions.value.length
  const preBottom = positions.value[currentLen - 1]?.bottom || 0
  for (let i = 0; i < disLen; i++) {
    const item = props.list[state.preLen + i]
    pos.push({
      index: item.id,
      height: props.estimatedHeight,
      top: preBottom
        ? preBottom + i * props.estimatedHeight
        : item.id + props.estimatedHeight,
      bottom: preBottom
        ? preBottom + (i + 1) * props.estimatedHeight
        : (item.id + 1) * props.estimatedHeight,
      dHeight: 0
    })
  }
  positions.value = [...positions.value, ...pos]
  state.preLen = props.list.length
}

const init = () => {
  state.viewHeight = containerRef.value?.offsetHeight ?? 0
  state.maxCount = Math.ceil(state.viewHeight / props.estimatedHeight) + 1
}

const handleScroll = throttle(() => {
  const { scrollTop, clientHeight, scrollHeight } = containerRef.value!
  state.startIndex = binarySearch(positions.value, scrollTop || 0)
  // 触底加载更多
  const bottom = scrollHeight - clientHeight - scrollTop
  if (bottom < 20) {
    emits('getMoreData')
  }
})

watch(
  () => state.startIndex,
  () => {
    setPosition()
  }
)

watch(
  () => props.list.length,
  () => {
    initPosition()
    nextTick(() => {
      setPosition()
    })
  }
)

const destory = () => {
  containerRef.value &&
    containerRef.value.removeEventListener('scroll', handleScroll)
}

const setPosition = () => {
  const nodes = listRef.value?.children
  if (!nodes || !nodes.length) return
  ;[...nodes].forEach((node) => {
    const rect = node.getBoundingClientRect()
    const item = positions.value[node.id]
    const dHeight = item.height - rect.height // 预测 item 高度与真实 item 高度的差值
    if (dHeight) {
      item.height = rect.height
      item.bottom = item.bottom - dHeight
      item.dHeight = dHeight
    }
  })
  const startId = +nodes[0].id
  const len = positions.value.length
  let startHeight = positions.value[startId].dHeight
  for (let i = startId + 1; i < len; i++) {
    const item = positions.value[i]
    item.top = positions.value[i - 1].bottom
    item.bottom = item.bottom - startHeight
    if (item.dHeight !== 0) {
      startHeight += item.dHeight
      item.dHeight = 0
    }
  }
  state.listHeight = positions.value[len - 1].bottom
}

const binarySearch = (list: IPosInfo[], value: number) => {
  let left = 0,
    right = list.length - 1,
    templateIndex = -1
  while (left < right) {
    const mid = Math.floor((left + right) / 2)
    const midVal = list[mid].bottom
    if (midVal === value) {
      return mid + 1
    } else if (midVal < value) {
      left = mid + 1
    } else if (midVal > value) {
      if (templateIndex === -1 || templateIndex > mid) {
        templateIndex = mid
      }
      right = mid
    }
  }
  return templateIndex
}

onMounted(() => {
  init()
  initPosition()
  if (containerRef.value) {
    containerRef.value.addEventListener('scroll', handleScroll)
  }
})

onUnmounted(() => {
  destory()
})
</script>
<style scoped lang="less">
/* 容器布局并设置具体的宽高 */
.virtual-list-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  /* 作为虚拟列表组件宽高由父组件决定，注意这里需要保证垂直方向有滚动条 */
  .item {
    width: 100%;
  }
}
</style>
