let countDownWorker: Worker

function setWorker(call: (data: number) => void, timeout = 1000) {
  countDownWorker = new Worker('countDown.worker.js')

  countDownWorker.addEventListener('error', (e) => {
    console.error('error', e)
  })

  countDownWorker.addEventListener('messageerror', (e) => {
    console.log('messageerror', e)
  })

  countDownWorker.addEventListener('message', (e) => {
    const { type, data } = e.data
    if (type === 'next') {
      call(data)
    }
    if (type === 'ready') {
      console.log('ready', data)
    }
  })

  countDownWorker.postMessage({ type: 'start', data: timeout })
  return countDownWorker
}

function clearWoker() {
  countDownWorker.terminate()
}

const down = (count: number) => {
  return 100 - count
}
setWorker(down)
