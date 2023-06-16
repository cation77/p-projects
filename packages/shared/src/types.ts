export type Fn<T extends unknown[]> = <Arguments extends T, ReturnType>(
  ...args: Arguments
) => ReturnType | void

export type ITimeout = ReturnType<typeof setTimeout> | null
