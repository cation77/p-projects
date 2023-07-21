# 练习

[实现 strStr](https://leetcode.cn/leetbook/read/array-and-string/cm5e2/)
给你两个字符串  haystack 和 needle ，请你在 haystack 字符串中找出 needle 字符串的第一个匹配项的下标（下标从 0 开始）。如果  needle 不是 haystack 的一部分，则返回   -1 。

## 示例 1

```text
输入：haystack = "sadbutsad", needle = "sad"
输出：0
解释："sad" 在下标 0 和 6 处匹配。
第一个匹配项的下标是 0 ，所以返回 0 。
```

## 示例 2

```text
输入：haystack = "leetcode", needle = "leeto"
输出：-1
解释："leeto" 没有在 "leetcode" 中出现，所以返回 -1 。 
```

## 思路

### 暴力法

文本串 S, 模式串 P, 文本串匹配 i 位置, 模式串匹配 j 位置

1. 当前字符匹配成功，则继续匹配下一个字符, `i++; j++`
2. 当失配，则文本串回退 `i = i - j + 1; j = 0`. 相当于每次匹配失败, 都需要回溯 i 位置

### KMP

## 题目

1. [28. 找出字符串中第一个匹配项的下标](https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/solution/)
