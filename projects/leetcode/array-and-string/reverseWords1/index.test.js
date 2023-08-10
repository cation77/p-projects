import { describe, test, expect } from 'vitest'
import reverseWords from './index'

describe('反转字符串中的单词 III', () => {
  test("Let's take LeetCode contest反转", () => {
    expect(reverseWords("Let's take LeetCode contest")).toBe(
      "s'teL ekat edoCteeL tsetnoc"
    )
  })

  test('God Ding反转', () => {
    expect(reverseWords('God Ding')).toBe('doG gniD')
  })
})
