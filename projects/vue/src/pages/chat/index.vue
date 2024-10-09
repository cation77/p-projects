<template>
  <div>
    <div>
      <button @click="openSSE">开启SSE</button>
      <button @click="closeSSE">关闭SSE</button>
    </div>
    <div>{{ article }}</div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const article = ref('')
const sourceSSE = ref<EventSource | null>(null)
const abortRef = ref<AbortController | null>(null)

// 使用 EventSource 开启 SSE 服务
// 只支持 GET 请求方法
const openEvent = () => {
  const source = new EventSource('http://localhost:8080/chat/typing')
  source.onmessage = (event) => {
    article.value += event.data
  }
  source.onerror = (error) => {
    console.error('Error:', error)
    source.close()
  }

  sourceSSE.value = source
}

const closeEvent = () => {
  sourceSSE.value?.close()
}

const getFetch = async () => {
  return await fetch('http://localhost:8080/chat/typing', {
    signal: abortRef.value?.signal,
    headers: {
      Accept: 'text/event-stream'
    }
  })
}

const postFetch = async () => {
  const randomIndex = Math.floor(Math.random() * 4)
  return await fetch('http://localhost:8080/chat/randomTyping', {
    method: 'POST',
    body: JSON.stringify({ index: randomIndex }),
    signal: abortRef.value?.signal,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'text/event-stream'
    }
  })
}

const parseData = (data: string) => {
  const chunks = data.split('\n\n')
  chunks.forEach((chunk) => {
    if (chunk.trim() !== '') {
      const jsonStart = chunk.indexOf('data: ')
      if (jsonStart !== -1) {
        const jsonData = chunk.substring(jsonStart + 6)
        try {
          const parsedData = JSON.parse(jsonData)
          article.value += parsedData.char
        } catch (error) {
          console.error('Error parsing data:', error)
        }
      }
    }
  })
}

// 通过 fetch 方式请求 SSE 服务
// 支持 GET、POST等多种请求方法
const openSSE = async () => {
  abortRef.value = new AbortController()
  // const res = await getFetch()
  const res = await postFetch()
  const reader = res.body?.getReader()
  const decoder = new TextDecoder()

  while (reader) {
    const { done, value } = await reader.read()
    if (done) break
    parseData(decoder.decode(value))
  }
}

const closeSSE = () => {
  abortRef.value?.abort()
}
</script>
<style lang="less"></style>
