import type { ITimeout, Fn } from './types'

function throttle<T extends unknown[]>(fn: Fn<T>, delay = 200) {
  let pre = 0
  let timeout: ITimeout = null
  const throttled = (...args: T) => {
    const now = new Date().getTime()
    if (now - pre > delay) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      fn.apply(self, args)
      pre = now
    } else if (!timeout) {
      timeout = setTimeout(() => {
        pre = new Date().getTime()
        fn.apply(self, args)
        timeout = null
      }, delay)
    }
  }
  throttled.cancel = () => {
    if (timeout) {
      clearTimeout(timeout)
    }
    pre = 0
    timeout = null
  }
  return throttled
}

export default throttle
