# 练习

[移动零](https://leetcode.cn/leetbook/read/array-and-string/c6u02/)

给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

请注意  ，必须在不复制数组的情况下原地对数组进行操作。

## 示例 1

```text
输入: nums = [0,1,0,3,12]
输出: [1,3,12,0,0]
```

## 示例 2

````text
输入: nums = [0]
输出: [0]
 ```

## 思路

1. 冒泡，让所有 0 移动到数组的末尾
2. 双指针，当 `nums[i]!=0` 时，我们交换 `nums[i]` 和 `nums[j]`

## 题目

1. [283. 移动零](https://leetcode.cn/problems/move-zeroes/solutions/)
````
