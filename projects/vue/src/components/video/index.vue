<template>
  <video class="videoBox" :src="props.url" muted controls>
    您的浏览器不支持播放视频
  </video>

  <!-- <video class="videoBox" controls autoplay>
    <source :src="props.url" type="video/mp4" />
    <source :src="props.url" type="video/ogg" />
    您的浏览器不支持视频标签。
  </video> -->
</template>

<script setup lang="ts">
type IProps = {
  url: string
}

const props = defineProps<IProps>()
</script>

<style scoped lang="less">
.videoBox {
  width: 100%;
  height: 100%;
}
</style>
