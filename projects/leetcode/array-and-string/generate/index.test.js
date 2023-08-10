import { describe, test, expect } from 'vitest'
import generate from './index'

describe('杨辉三角', () => {
  test('1 生成「杨辉三角」', () => {
    expect(generate(1)).toEqual([[1]])
  })

  test('5 生成「杨辉三角」', () => {
    expect(generate(5)).toEqual([
      [1],
      [1, 1],
      [1, 2, 1],
      [1, 3, 3, 1],
      [1, 4, 6, 4, 1]
    ])
  })
})
