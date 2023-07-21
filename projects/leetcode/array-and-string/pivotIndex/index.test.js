import { describe, test, expect } from 'vitest'
import pivotIndex from './index'

describe('寻找数组的中心索引', () => {
  test('[1, 7, 3, 6, 5, 6]中心下标是 3', () => {
    expect(pivotIndex([1, 7, 3, 6, 5, 6])).toBe(3)
  })

  test('[1, 2, 3]中心下标不存在', () => {
    expect(pivotIndex([1, 2, 3])).toBe(-1)
  })

  test('[2, 1, -1]中心下标是 0', () => {
    expect(pivotIndex([2, 1, -1])).toBe(0)
  })
})
