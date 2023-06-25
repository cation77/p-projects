---
title: 大文件上传
---

## 上传文件功能

1. 格式校验，UI 框架支持，可省略
2. 文件切片，对于超大文件，需要作切片处理
3. 断点续传，文件上传期间传输中断，再次联接可以继续上传
4. 文件秒传，校验文件 hash 是否相同
5. 上传进度条

### 文件切片

由于 javascript 是单线程, 处理大文件切片, 计算过程会大量占用主线程, 可以通过 `Web Worker` 创建多线程解决主线程占用问题

```ts
// upload.ts
import myWorker from './worker.ts?worker'
const workerInstance = new myWorker()
workerInstance.postMessage({ file, chunkSize })
workerInstance.onmessage = (message) => {
  // ...
}
```

```ts
// worker.ts
import SparkMD5 from 'spark-md5'
self.onmessage = (message) => {
  // chunkSize: 分片大小
  const { file, chunkSize } = message.data
  const chunks = Math.ceil(file.size / chunkSize)
  let currentChunk = 0
  // 通过 SparkMD5 获取文件的 hash
  const spark = new SparkMD5.ArrayBuffer()
  // 借助 FileReader 读取每个分片
  const reader = new FileReader()

  reader.onload = function (e) {
    const chunk = e.target.result
    // 每个分片的 Buffer
    spark.append(chunk)
    currentChunk++
    if (currentChunk < chunks) {
      loadNext()
    } else {
      const hash = spark.end()
      self.postMessage({ hash })
    }
  }

  reader.onerror = function () {
    console.log('file read error')
  }

  const loadNext = () => {
    const start = currentChunk * chunkSize
    const end = start + chunkSize > file.size ? file.size : start + chunkSize
    const chunk = file.slice(start, end)
    reader.readAsArrayBuffer(chunk)
  }

  loadNext()
}
```

### 断点续传

根据获取的文件 hash 去服务器查询是否存有当前文件

1. 已存在，且文件已上传成功，直接返回前端上传成功，实现秒传
2. 已存在，有一部分分片上传失败，返回前端已上传成功的切片，前端根据返回的切片数据，计算未上传的剩余切片，实现断点续传
3. 不存在，则开始上传，由于分片一般较多，需要注意并发控制一次性上传请求数量，可以借助 `p-limit` 控制并发量

## vue worker

vue SFC 加载 worker, vite 已默认支持加载 worker 文件, worker 代码风格可以保持一致
在需要引入 worker 时, import 文件路径增加 `?worker` 尾缀, vite 会自动处理

```js
import myWorker from './worker.ts?worker'
const workerInstance = new myWorker()
```

## 参考

1. [实现一个大文件切片上传+断点续传](https://juejin.cn/post/7110121072032219166)
2. [实现一个大文件上传和断点续传](https://juejin.cn/post/6844904046436843527)
3. [实现大文件上传](https://juejin.cn/post/7177045936298786872)
4. [文件上传](https://juejin.cn/post/6980142557066067982)
5. [JS File Downloader Libraries](https://www.dunebook.com/javascript-file-downloader/)
