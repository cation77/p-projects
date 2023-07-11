import { useEffect, useRef } from 'react'
import useUnmount from '../../../useUnmount'
import subscribeFocus from '../utils/subscribeFocus'
import limit from '../utils/limit'
import type { Plugin } from '../types'

const useRefreshOnWindowFocusPlugin: Plugin<any, any[]> = (
  fetchInstance,
  { refreshOnWindowFocus, focusTimespan = 5000 }
) => {
  const unsubscribeRef = useRef<() => void>()

  const stopSubscribe = () => {
    unsubscribeRef.current?.()
  }

  useEffect(() => {
    if (refreshOnWindowFocus) {
      const limitRefresh = limit(
        fetchInstance.refresh.bind(fetchInstance),
        focusTimespan
      )
      unsubscribeRef.current = subscribeFocus(() => {
        limitRefresh()
      })
    }

    return () => {
      unsubscribeRef.current?.()
    }
  }, [refreshOnWindowFocus, focusTimespan])

  useUnmount(() => {
    stopSubscribe()
  })

  return {}
}

export default useRefreshOnWindowFocusPlugin
