import { useRef } from 'react'
import type { Plugin, Timeout } from '../types'
import useUpdateEffect from '../../../useUpdateEffect'
import isDocumentVisible from '../utils/isDocumentVisible'
import subscribeReVisible from '../utils/subscribeReVisible'

const usePollingPlugin: Plugin<any, any[]> = (
  fetchInstance,
  { pollingInterval, pollingWhenHidden = true, pollingErrorRetryCount = -1 }
) => {
  const timerRef = useRef<Timeout>()
  const unsubscribeRef = useRef<() => void>()
  const countRef = useRef<number>(0)

  const stopPolling = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    unsubscribeRef.current?.()
  }

  useUpdateEffect(() => {
    if (!pollingInterval) {
      stopPolling()
    }
  }, [pollingInterval])

  if (!pollingInterval) {
    return {}
  }

  return {
    onBefore: () => {
      stopPolling()
    },
    onError: () => {
      countRef.current += 1
    },
    onSuccess: () => {
      countRef.current = 0
    },
    onFinally: () => {
      if (
        pollingErrorRetryCount === -1 ||
        (pollingErrorRetryCount !== -1 &&
          countRef.current <= pollingErrorRetryCount)
      ) {
        timerRef.current = setTimeout(() => {
          if (!pollingWhenHidden && !isDocumentVisible()) {
            unsubscribeRef.current = subscribeReVisible(() => {
              fetchInstance.refresh()
            })
          } else {
            fetchInstance.refresh()
          }
        }, pollingInterval)
      } else {
        countRef.current = 0
      }
    },
    onCancel: () => {
      stopPolling()
    }
  }
}

export default usePollingPlugin
