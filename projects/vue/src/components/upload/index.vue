<template>
  <div>
    <input ref="inputEl" type="file" />
    <button @click="handleUpload" v-loading="loading">上传</button>
    <button @click="mergeFile">合并</button>
    <a :href="download" download="HQC_Plant.ywt">测试静态文件下载</a>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import pLimit from '@pnpm-monorepo/p-limit'
import useUpload from './upload'
import type { ResponseResult } from './types'

const download = `http://localhost:8080/static/files/HQC_Plant.ywt`
const filename = ref('')
const loading = ref(false)
const [result, upload] = useUpload()
const inputEl = ref<HTMLInputElement | undefined>()

watch(
  () => result.percentage,
  (val) => {
    if (val === 100) {
      execUpload()
    }
  }
)

const uploadFile = (data: FormData): Promise<ResponseResult> => {
  // 请求上传 url
  const url = 'http://localhost:8080/api/upload'
  // const obj = { name: 'tom' }
  return fetch(url, {
    method: 'POST',
    body: data
    // headers: {
    // 'Content-Type': 'applcation/json'
    // 'Content-Type': 'application/x-www-form-urlencoded'
    // 'Content-Type': 'multipart/form-data'
    // },
  }).then((response) => response.json())
  // console.log('uploadFile', data.get('name'))
  // return new Promise((resolve, reject) => {
  //   if (Math.random() > 0.5) {
  //     // 模拟错误
  //     reject({
  //       code: 0,
  //       msg: `Service Error: ${data.get('name')}`,
  //       result: data.get('name')
  //     })
  //   } else {
  //     setTimeout(() => {
  //       resolve({ code: 200, msg: '', result: data })
  //     }, 500)
  //   }
  // })
}

const concurrentUpload = async (hash: string, fileChunks: Blob[]) => {
  const limit = pLimit(3)
  const requests = fileChunks.map((chunk, index) => {
    const form = new FormData()
    form.append('hash', hash)
    form.append('name', `${hash}_${index}`)
    form.append('chunk', chunk)
    return limit(uploadFile, form)
  })

  Promise.all(requests)
    .then(() => {
      mergeFile()
    })
    .catch((err) => {
      console.log('upload error', err)
    })
}

const mergeFile = () => {
  // 完成分片上传，合并文件
  const url = `http://localhost:8080/api/upload/merge?hash=${
    result.hash
  }&filename=${filename.value || '文档'}`
  fetch(url)
    .then((response) => response.json())
    .then((res) => {
      loading.value = false
      console.log('mergeFile--->', res)
    })
}

const execUpload = async () => {
  const { hash, fileChunks } = result
  const shouldUpload = await verifyFile(result.hash)
  console.log('shouldUpload--->', shouldUpload)
  if (shouldUpload) {
    concurrentUpload(hash, fileChunks)
  }
}

const verifyFile = async (hash: string) => {
  console.log('verifyFile hash', hash)
  return !(Math.random() > 0.999)
}

const handleUpload = () => {
  const files = inputEl.value?.files || ([] as File[])
  filename.value = files[0]?.name || ''
  const file = inputEl.value?.files?.[0]
  // 文件分片, 每片大小 1M
  if (file) {
    loading.value = true
    upload(file, 1000 * 1000)
  }
}
</script>

<style scoped></style>
