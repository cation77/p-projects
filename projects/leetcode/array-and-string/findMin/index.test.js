import { describe, test, expect } from 'vitest'
import findMin from './index'

describe('寻找旋转排序数组中的最小值', () => {
  test('[3,4,5,1,2]旋转', () => {
    expect(findMin([3, 4, 5, 1, 2])).toBe(1)
  })

  test('[4,5,6,7,0,1,2]旋转', () => {
    expect(findMin([4, 5, 6, 7, 0, 1, 2])).toBe(0)
  })
  test('[11,13,15,17]旋转', () => {
    expect(findMin([11, 13, 15, 17])).toBe(11)
  })
})
