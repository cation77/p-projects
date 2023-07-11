import { useMemo } from 'react'
import useRequest from '../useRequest'
import useMemoizedFn from '../useMemoizedFn'
import type {
  Data,
  PaginationOptions,
  PaginationResult,
  Params,
  Service
} from './types'

const usePagination = <TData extends Data, TParams extends Params>(
  service: Service<TData, TParams>,
  options: PaginationOptions<TData, TParams> = {}
) => {
  const { defaultCurrent = 1, defaultPageSize = 10, ...rest } = options

  const result = useRequest(service, {
    // @ts-ignore
    defaultParams: [{ current: defaultCurrent, pageSize: defaultPageSize }],
    refreshDepsAction: () => {
      changeCurrent(1)
    },
    ...rest
  })

  const { current = 1, pageSize = defaultPageSize } = result.params[0] || {}
  const total = result.data?.total || 0
  const totalPage = useMemo(
    () => Math.ceil(total / pageSize),
    [total, pageSize]
  )

  const onChange = (c: number, p: number) => {
    let toCurrent = c <= 0 ? 1 : c
    const toPageSize = p <= 0 ? 1 : p
    const tempToTalPage = Math.ceil(total / toPageSize)
    if (toCurrent > tempToTalPage) {
      toCurrent = Math.max(1, tempToTalPage)
    }
    const [oldPaginationParams = {}, ...restParams] = result.params || []
    result.run(
      // @ts-ignore
      {
        ...oldPaginationParams,
        current: toCurrent,
        pageSize: toPageSize
      },
      ...restParams
    )
  }

  const changeCurrent = (c: number) => {
    onChange(c, pageSize)
  }

  const changePageSize = (p: number) => {
    onChange(current, p)
  }

  return {
    ...result,
    pagination: {
      current,
      pageSize,
      total,
      totalPage,
      onChange: useMemoizedFn(onChange),
      changeCurrent: useMemoizedFn(changeCurrent),
      changePageSize: useMemoizedFn(changePageSize)
    }
  } as PaginationResult<TData, TParams>
}

export default usePagination
