# 练习

[反转字符串](https://leetcode.cn/leetbook/read/array-and-string/cacxi/)

编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 s 的形式给出。

不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。

## 示例 1

```text
输入：s = ["h","e","l","l","o"]
输出：["o","l","l","e","h"]
```

## 示例 2

```text
输入：s = ["H","a","n","n","a","h"]
输出：["h","a","n","n","a","H"]
```

## 思路

1. 双指针，left 为 0，right 为字符串数组长度-1
2. 判断边界，当 `left <= right` 时遍历，此时数组元素需要相互交换位置

## 题目

1. [344. 反转字符串](https://leetcode.cn/problems/reverse-string/)
