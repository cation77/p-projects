import { describe, test, expect } from 'vitest'
import removeDuplicates from './index'

describe('删除排序数组中的重复项', () => {
  test('[1,1,2]', () => {
    expect(removeDuplicates([1, 1, 2])).toBe(2)
  })

  test('[0,0,1,1,1,2,2,3,3,4]', () => {
    expect(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4])).toBe(5)
  })
})
