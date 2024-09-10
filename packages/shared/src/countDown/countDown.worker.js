postMessage({
  type: 'ready',
  data: 'count down is ready in worker'
})

let interval = null
let count = 0

function start(timeout = 1000) {
  interval = setInterval(() => {
    postMessage({
      type: 'next',
      data: ++count
    })
  }, timeout)
}

function stop() {
  if (interval) {
    clearInterval(interval)
    interval = null
    count = 0
  }
}

self.addEventListener('message', (event) => {
  const { type, data } = event.data
  switch (type) {
    case 'start':
      start(data)
      break
    case 'stop':
      stop()
      break
    default:
      break
  }
})
