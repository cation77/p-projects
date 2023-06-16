export interface LimitFunction {
  readonly activeCount: number

  readonly pendingCount: number

  clearQueue: () => void

  <Arguments extends unknown[], ReturnType>(
    fn: (...arguments: Arguments) => Promise<ReturnType> | ReturnType,
    ...arguments: Arguments
  ): Promise<ReturnType>
}

export default function pLimit(concurrency: number): LimitFunction