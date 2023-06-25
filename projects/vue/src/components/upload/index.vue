<template>
  <div>
    <input ref="inputEl" type="file" />
    <button @click="handleUpload">上传</button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import pLimit from '@pnpm-monorepo/p-limit'
import useUpload from './upload'
import type { ResponseResult } from './types'

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
  // const url = 'http://localhost:3333/upload'
  // return fetch(url, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'multipart/form-data'
  //   },
  //   body: data
  // }).then((response) => response.json())
  console.log('uploadFile', data.get('name'))
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      // 模拟错误
      reject({
        code: 0,
        msg: `Service Error: ${data.get('name')}`,
        result: data.get('name')
      })
    } else {
      setTimeout(() => {
        resolve({ code: 200, msg: '', result: data })
      }, 500)
    }
  })
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
  console.log('mergeFile', result.hash)
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
  console.log('确定上传--->', inputEl.value)
  console.log(inputEl.value?.files)
  const file = inputEl.value?.files?.[0]
  // 文件分片, 每片大小 1K
  file && upload(file, 1 * 1000)
}
</script>

<style scoped></style>
