import { describe, test, expect } from 'vitest'
import arrayPairSum from './index'
describe('数组拆分 I', () => {
  test('[1,4,3,2]最大总和为 4', () => {
    expect(arrayPairSum([1, 4, 3, 2])).toBe(4)
  })

  test('[6,2,6,5,1,2]最大总和为 9', () => {
    expect(arrayPairSum([6, 2, 6, 5, 1, 2])).toBe(9)
  })
})
