import { ComputedRef, MaybeRef, Ref } from 'vue'

export type Fn = () => void

export type AnyFn = (...args: any[]) => any

export type MaybeReadonlyRef<T> = (() => T) | ComputedRef

export type MaybeComputedRef<T> = MaybeReadonlyRef<T> | MaybeRef<T>

export interface Stoppable<StartFnArgs extends any[] = any[]> {
  isPending: Readonly<Ref<boolean>>
  stop: Fn
  start: (...args: StartFnArgs) => void
}

export type ElementOf<T> = T extends (infer E)[] ? E : never

export type ShallowUnwrapRef<T> = T extends Ref<infer P> ? P : T
