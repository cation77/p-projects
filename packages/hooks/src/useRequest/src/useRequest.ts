import useRetryPlugin from './plugins/useRetryPlugin'
import useCachePlugin from './plugins/useCachePlugin'
import useAutoRunPlugin from './plugins/useAutoRunPlugin'
import usePollingPlugin from './plugins/usePollingPlugin'
import useDebouncePlugin from './plugins/useDebouncePlugin'
import useThrottlePlugin from './plugins/useThrottlePlugin'
import useLoadingDelayPlugin from './plugins/useLoadingDelayPlugin'
import useRefreshOnWindowFocusPlugin from './plugins/useRefreshOnWindowFocusPlugin'
import useRequestImplement from './useRequestImplement'
import type { Service, Options, Plugin } from './types'

function useRequest<TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  options: Options<TData, TParams>,
  plugins: Plugin<TData, TParams>[]
) {
  return useRequestImplement<TData, TParams>(service, options, [
    ...(plugins || []),
    useCachePlugin,
    useRetryPlugin,
    useAutoRunPlugin,
    usePollingPlugin,
    useThrottlePlugin,
    useDebouncePlugin,
    useLoadingDelayPlugin,
    useRefreshOnWindowFocusPlugin
  ] as Plugin<TData, TParams>[])
}

export default useRequest
