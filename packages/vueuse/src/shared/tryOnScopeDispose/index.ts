import { getCurrentScope, onScopeDispose } from 'vue'
import type { Fn } from '../utils'

export function tryOnScopeDispose(fn: Fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn)
    return true
  }
  return false
}
