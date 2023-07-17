import { computed, ref } from 'vue'
import type { ComputedRef, MaybeRef, Ref } from 'vue'
import { MaybeComputedRef } from '../utils'

export function resolveRef<T>(r: MaybeComputedRef<T>): ComputedRef<T>
export function resolveRef<T>(r: MaybeRef): Ref<T>
export function resolveRef<T>(r: T): Ref<T>
export function resolveRef<T>(r: MaybeComputedRef<T>) {
  return typeof r === 'function' ? computed<T>(r as any) : ref(r)
}
