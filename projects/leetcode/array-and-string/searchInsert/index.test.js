import { describe, test, expect } from 'vitest'
import searchInsert from './index'

describe('搜索插入位置', () => {
  test('target为5，在[1,3,5,6]的位置应为2', () => {
    expect(searchInsert([1, 3, 5, 6], 5)).toBe(2)
  })

  test('target为2，在[1,3,5,6]的位置应为1', () => {
    expect(searchInsert([1, 3, 5, 6], 2)).toBe(1)
  })

  test('target为7，在[1,3,5,6]的位置应为4', () => {
    expect(searchInsert([1, 3, 5, 6], 7)).toBe(4)
  })
})
