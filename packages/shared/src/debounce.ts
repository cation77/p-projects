import type { ITimeout, Fn } from './types'

function debounce<T extends unknown[]>(fn: Fn<T>, deplay = 200) {
  let timeout: ITimeout = null
  const debounced = (...args: T) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      fn.apply(undefined, args)
      timeout = null
    }, deplay)
  }
  debounced.cancel = () => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = null
  }
  return debounced
}

export default debounce
