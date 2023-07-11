import { useRef } from 'react'
import { Plugin } from '../types'
import { setCache, getCache } from '../utils/cache'
import { CachedData } from '../utils/cache'
import { trigger, subscribe } from '../utils/cacheSubscribe'
import useCreation from '../../../useCreation'
import useUnmount from '../../../useUnmount'
import { getCachePromise, setCachePromise } from '../utils/cachePromise'

const useCachePlugin: Plugin<any, any[]> = (
  fetchInstance,
  {
    cacheKey,
    cacheTime = 5 * 60 * 1000,
    staleTime = 0,
    setCache: customSetCache,
    getCache: customGetCache
  }
) => {
  const unSubscribeRef = useRef<() => void>()
  const currentPromiseRef = useRef<Promise<any>>()

  const _setCache = (key: string, cachedData: CachedData) => {
    if (customSetCache) {
      customSetCache(cachedData)
    } else {
      setCache(key, cacheTime, cachedData)
    }
    trigger(key, cachedData.data)
  }

  const _getCache = (key: string, params: any[] = []) => {
    if (customGetCache) {
      return customGetCache(params)
    }
    return getCache(key)
  }

  useCreation(() => {
    if (!cacheKey) {
      return
    }
    const cacheData = _getCache(cacheKey)
    if (cacheData && Object.hasOwnProperty.call(cacheData, 'data')) {
      fetchInstance.state.data = cacheData.data
      fetchInstance.state.params = cacheData.params
      if (
        staleTime === -1 ||
        new Date().getTime() - cacheData.time <= staleTime
      ) {
        fetchInstance.state.loading = false
      }
    }

    unSubscribeRef.current = subscribe(cacheKey, (data) => {
      fetchInstance.setState({ data })
    })
  }, [])

  useUnmount(() => {
    unSubscribeRef.current?.()
  })

  if (!cacheKey) {
    return {}
  }

  return {
    onBefore: (params) => {
      const cacheData = _getCache(cacheKey, params)
      if (!cacheData || !Object.hasOwnProperty.call(cacheData, 'data')) {
        return {}
      }
      if (
        staleTime === -1 ||
        new Date().getTime() - cacheData.time <= staleTime
      ) {
        return {
          loading: false,
          data: cacheData?.data,
          error: undefined,
          returnNow: true
        }
      } else {
        return {
          data: cacheData?.data,
          error: undefined
        }
      }
    },
    onRequest: (service, args) => {
      let servicePromise = getCachePromise(cacheKey)
      if (servicePromise && servicePromise !== currentPromiseRef.current) {
        return { servicePromise }
      }
      servicePromise = service(...args)
      currentPromiseRef.current = servicePromise
      setCachePromise(cacheKey, servicePromise)
      return { servicePromise }
    },
    onSuccess: (data, params) => {
      if (cacheKey) {
        unSubscribeRef.current?.()
        _setCache(cacheKey, {
          data,
          params,
          time: new Date().getTime()
        })
        unSubscribeRef.current = subscribe(cacheKey, (d) => {
          fetchInstance.setState({ data: d })
        })
      }
    },
    onMutate: (data) => {
      if (cacheKey) {
        unSubscribeRef.current?.()
        _setCache(cacheKey, {
          data,
          params: fetchInstance.state.params,
          time: new Date().getTime()
        })
        unSubscribeRef.current = subscribe(cacheKey, (d) => {
          fetchInstance.setState({ data: d })
        })
      }
    }
  }
}

export default useCachePlugin
