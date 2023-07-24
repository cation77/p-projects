import { describe, test, expect } from 'vitest'
import minSubArrayLen from './index'

describe('长度最小的子数组', () => {
  test('数组[2,3,1,2,4,3]和为7，长度最小的子数组', () => {
    expect(minSubArrayLen(7, [2, 3, 1, 2, 4, 3])).toBe(2)
  })

  test('数组[1,4,4]和为4，长度最小的子数组', () => {
    expect(minSubArrayLen(4, [1, 4, 4])).toBe(1)
  })

  test('数组[1,1,1,1,1,1,1,1]和为11，长度最小的子数组', () => {
    expect(minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1])).toBe(0)
  })
})
