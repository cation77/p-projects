<template>
  <div class="masonry">
    <div class="item" v-for="item in list" :key="item.id">
      <img :src="item.img" alt="" class="imgBox" />
      <h2 class="title">{{ item.title }}</h2>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import img1 from '@/assets/masonry/img1.jpg'
import img2 from '@/assets/masonry/img2.jpg'
import img3 from '@/assets/masonry/img3.jpg'
import img4 from '@/assets/masonry/img4.jpg'
import img5 from '@/assets/masonry/img5.jpg'
import img6 from '@/assets/masonry/img6.jpg'
import img7 from '@/assets/masonry/img7.jpg'
import img8 from '@/assets/masonry/img8.jpg'
import img9 from '@/assets/masonry/img9.jpg'
import img10 from '@/assets/masonry/img10.jpg'
import img11 from '@/assets/masonry/img11.jpg'
import img12 from '@/assets/masonry/img12.jpg'

type masonryItem = {
  id: number
  img: string
  title: string
  content: string
}

const mockImgs = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12
]

const list = ref<masonryItem[]>([])

const randomNum = () => {
  return Math.floor(Math.random() * 12) + 1
}

const mockList = () => {
  for (let i = 1; i <= 31; i++) {
    list.value.push({
      id: i,
      img: mockImgs[randomNum()] || mockImgs[0],
      title: 'Title Goes Here',
      content:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis quod et deleniti nobis quasi ad, adipisci perferendis totam, ducimus incidunt dolore aut, quae quaerat architecto quisquam repudiandae amet nostrum quidem?'
    })
  }
}

onMounted(() => mockList())
</script>
<style lang="less" scoped>
.masonry {
  width: 1900px; // 默认宽度
  margin: 100px auto; // 内容居中
  columns: 2; // 默认列数
  column-gap: 30px; // 列间距
  overflow-y: auto;

  .item {
    width: 100%;
    // break-inside CSS 属性设置生成的盒子内部的页面、栏或区域应有的中断行为
    // 默认情况下，图像和其标题之间可能会发生中断，这不是我们想要的。为了避免这种情况
    // 默认 auto 允许（但不强制）在主框中插入任何中断（页、栏或区域）
    break-inside: avoid; // avoid 避免在主框中插入任何中断（页、栏或区域）
    margin-bottom: 30px;

    .imgBox {
      width: 100%;
      height: 300px;
      // min-height: 200px;
      // max-height: 700px;
    }

    .title {
      padding: 8px 0;
    }
  }
}

// ipad pro:
@media screen and (min-width: 1024px) and (max-width: 1439.98px) {
  .masonry {
    width: 96vw;
    columns: 3;
    column-gap: 20px;
  }
}
// ipad:
@media screen and (min-width: 768px) and (max-width: 1023.98px) {
  .masonry {
    width: 96vw;
    columns: 2;
    column-gap: 20px;
  }
}
// mobile:
@media screen and (max-width: 767.98px) {
  .masonry {
    width: 96vw;
    columns: 1;
  }
}
</style>
