import { unref } from 'vue'
import type { AnyFn, MaybeComputedRef } from '../utils'

export function resolveUnref<T>(r: MaybeComputedRef<T>): T {
  return typeof r === 'function' ? (r as AnyFn)() : unref(r)
}
