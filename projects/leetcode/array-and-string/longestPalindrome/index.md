# 练习

[最长回文子串](https://leetcode.cn/leetbook/read/array-and-string/conm7/)

给你一个字符串 s，找到 s 中最长的回文子串。

如果字符串的反序与原始字符串相同，则该字符串称为回文字符串。

## 示例 1

```text
输入：s = "babad"
输出："bab"
解释："aba" 同样是符合题意的答案。
```

## 示例 2

```text
输入：s = "cbbd"
输出："bb"
```

## 思路

1. 中心扩展法，判断回文，由内向外延展比较
2. 需要注意有 2 种回文格式：奇数串和偶数串回文

## 题目

1. [5. 最长回文子串](https://leetcode.cn/problems/longest-palindromic-substring/)
