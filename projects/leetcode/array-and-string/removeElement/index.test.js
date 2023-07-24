import { describe, test, expect } from 'vitest'
import removeElement from './index'

const pickEles = (nums, val) => {
  const arr = nums.filter((e) => e !== val)
  const fil = Array(nums.length - arr.length).fill(val)
  return [...arr, ...fil]
}
describe('移除元素', () => {
  test('[3,2,2,3]移除元素值3', () => {
    const nums = [3, 2, 2, 3]
    const val = 3
    expect(removeElement(nums, val)).toEqual(pickEles(nums, val))
  })

  test('[0, 1, 2, 2, 3, 0, 4, 2]移除元素值2', () => {
    const nums = [0, 1, 2, 2, 3, 0, 4, 2]
    const val = 2
    expect(removeElement(nums, val)).toEqual(pickEles(nums, val))
  })
})
