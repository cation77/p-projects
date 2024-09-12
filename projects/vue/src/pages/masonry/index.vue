<template>
  <div class="masonry-list-container">
    <FsEstimatedVirtualList
      :list="mockList"
      :estimated-height="60"
      @getMoreData="addData"
    >
      <template #item="{ item }">
        <div class="list-item">{{ item.id }} - {{ item.content }}</div>
      </template>
    </FsEstimatedVirtualList>
    <!-- <mockVirtualList
      :data-source="mockList"
      :estimated-height="120"
      @getMoreData="addData"
    >
      <template #item="{ item }">
        <div class="list-item">{{ item.id }} - {{ item.content }}</div>
      </template>
    </mockVirtualList> -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Mock from 'mockjs'
import FsEstimatedVirtualList from '@/components/virtualList/virtualList.vue'
// import mockVirtualList from '@/components/virtualList/mock.vue'

const mockList = ref<
  Array<{
    id: number
    content: string
  }>
>([])

const addData = () => {
  setTimeout(() => {
    const newData = []
    for (let i = 0; i < 1000; i++) {
      const len: number = mockList.value.length + newData.length
      newData.push({
        id: len,
        content: Mock.mock('@csentence(40, 360)') // 内容
      })
    }
    mockList.value = [...mockList.value, ...newData]
  }, 0)
}

onMounted(() => {
  addData()
})
</script>

<style scoped lang="less">
.masonry-list-container {
  width: 100vw;
  height: 100vh;
}
.list-item {
  border: 1px solid #000;
  padding: 10px;
  letter-spacing: 0.1em;
  margin-top: 8px;
}
</style>
