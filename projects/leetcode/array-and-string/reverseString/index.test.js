import { describe, test, expect } from 'vitest'
import reverseString from './index'

describe('反转字符串', () => {
  test('["h","e","l","l","o"]反转', () => {
    expect(reverseString(['h', 'e', 'l', 'l', 'o'])).toEqual([
      'o',
      'l',
      'l',
      'e',
      'h'
    ])
  })

  test('["H","a","n","n","a","h"]反转', () => {
    expect(reverseString(['H', 'a', 'n', 'n', 'a', 'h'])).toEqual([
      'h',
      'a',
      'n',
      'n',
      'a',
      'H'
    ])
  })
})
