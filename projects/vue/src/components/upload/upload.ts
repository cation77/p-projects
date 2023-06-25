import { getCurrentInstance, onUnmounted, reactive } from 'vue'
import UploadWorker from './worker.ts?worker'
import type { IResult, IUploadMessageEvent } from './types'

type IUseUpload = [IResult, (file: File, chunkSize: number) => void]

const useUpload = (): IUseUpload => {
  const result = reactive<IResult>({
    percentage: 0,
    hash: '',
    fileChunks: []
  })
  const worker = new UploadWorker()

  if (getCurrentInstance()) {
    onUnmounted(() => {
      worker.terminate()
    })
  }

  const handleMessage = (message: IUploadMessageEvent) => {
    const { percentage = 0, hash = '', fileChunks = [] } = message.data
    result.percentage = percentage
    if (percentage === 100) {
      result.percentage = 100
      result.hash = hash
      result.fileChunks = fileChunks
    }
  }

  const upload = (file: File, chunkSize: number) => {
    console.log('run upload', file, worker.postMessage)
    worker.postMessage({ file, chunkSize })
    worker.onmessage = handleMessage
  }

  return [result, upload]
}

export default useUpload
