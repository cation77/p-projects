# 练习

[长度最小的子数组](https://leetcode.cn/leetbook/read/array-and-string/c0w4r/)

给定一个含有  n  个正整数的数组和一个正整数 target 。

找出该数组中满足其和 ≥ target 的长度最小的 连续子数组  [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。

## 示例 1

```text
输入：target = 7, nums = [2,3,1,2,4,3]
输出：2
解释：子数组 [4,3] 是该条件下的长度最小的子数组。
```

## 示例 2

```text
输入：target = 4, nums = [1,4,4]
输出：1
```

## 示例 3

```text
输入：target = 11, nums = [1,1,1,1,1,1,1,1]
输出：0
```

## 思路

涉及连续子数组的问题，我们通常有三种思路：滑动窗口、前缀和、二分查找，其中前缀和需要额外的 O(N)空间，二分查找时间复杂度常为 O(NlogN)，滑动窗口时间复杂度为 O(N)，优先采用滑动窗口

1. 滑动窗口

## 题目

1. [209. 长度最小的子数组](https://leetcode.cn/problems/minimum-size-subarray-sum/solution/)
