import { describe, test, expect } from 'vitest'
import moveZeroes from './index'

describe('移动零', () => {
  test('[0,1,0,3,12]移动零', () => {
    expect(moveZeroes([0, 1, 0, 3, 12])).toEqual([1, 3, 12, 0, 0])
  })

  test('[0]移动零', () => {
    expect(moveZeroes([0])).toEqual([0])
  })
})
