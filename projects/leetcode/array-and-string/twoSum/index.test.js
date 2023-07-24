import { describe, test, expect } from 'vitest'
import twoSum from './index'
describe('两数之和 II - 输入有序数组', () => {
  test('[2,7,11,15]中元素和为9的位置', () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([1, 2])
  })

  test('[2,3,4]中元素和为6的位置', () => {
    expect(twoSum([2, 3, 4], 6)).toEqual([1, 3])
  })

  test('[-1,0]中元素和为-1的位置', () => {
    expect(twoSum([-1, 0], -1)).toEqual([1, 2])
  })
})
