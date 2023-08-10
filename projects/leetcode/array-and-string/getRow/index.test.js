import { describe, test, expect } from 'vitest'
import getRow from './index'

describe('杨辉三角II', () => {
  test('杨辉三角」3', () => {
    expect(getRow(3)).toEqual([1, 3, 3, 1])
  })

  test('「杨辉三角」4', () => {
    expect(getRow(4)).toEqual([1, 4, 6, 4, 1])
  })
})
