import { useEffect, useRef } from 'react'
import type { Plugin } from '../types'
import { throttle } from 'lodash-es'
import type { DebouncedFunc, ThrottleSettings } from 'lodash-es'

const useThrottlePlugin: Plugin<any, any[]> = (
  fetchInstance,
  { throttleLeading, throttleTrailing, throttleWait }
) => {
  const throttledRef = useRef<DebouncedFunc<any>>()
  const options: ThrottleSettings = {}
  if (throttleLeading !== undefined) {
    options.leading = throttleLeading
  }
  if (throttleTrailing !== undefined) {
    options.trailing = throttleTrailing
  }

  useEffect(() => {
    if (throttleWait) {
      const _originAsync = fetchInstance.runAsync.bind(fetchInstance)

      throttledRef.current = throttle(
        (callback: () => void) => {
          callback()
        },
        throttleWait,
        options
      )

      fetchInstance.runAsync = (...args) => {
        return new Promise((resolve, reject) => {
          _originAsync(...args)
            .then(resolve)
            .catch(reject)
        })
      }

      return () => {
        throttledRef.current?.cancel()
        fetchInstance.runAsync = _originAsync
      }
    }
  }, [throttleWait, throttleTrailing, throttleLeading])

  if (!throttleWait) {
    return {}
  }

  return {
    onCancel: () => {
      throttledRef.current?.cancel()
    }
  }
}

export default useThrottlePlugin
