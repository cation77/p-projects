import { describe, test, expect } from 'vitest'
import findMaxConsecutiveOnes from './index'

describe('最大连续1的个数', () => {
  test('[1,1,0,1,1,1]最大连续 1 的个数是 3', () => {
    expect(findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1])).toBe(3)
  })

  test('[1,0,1,1,0,1]最大连续 1 的个数是 2', () => {
    expect(findMaxConsecutiveOnes([1, 0, 1, 1, 0, 1])).toBe(2)
  })
})
