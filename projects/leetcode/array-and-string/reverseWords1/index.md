# 练习

[反转字符串中的单词 III](https://leetcode.cn/leetbook/read/array-and-string/c8su7/)

给定一个字符串 s ，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。

## 示例 1

```text
输入：s = "Let's take LeetCode contest"
输出："s'teL ekat edoCteeL tsetnoc"
```

## 示例 2

```text
输入： s = "God Ding"
输出："doG gniD"
```

## 思路

由于 javascript 字符串不可变。利用 `split` 方法把字符串转成数组，进行切割反转

## 题目

1. [557. 反转字符串中的单词 III](https://leetcode.cn/problems/reverse-words-in-a-string-iii/description/)
