# 练习

[寻找数组的中心索引](https://leetcode.cn/leetbook/read/array-and-string/yf47s/)

给你一个整数数组  nums ，请计算数组的 中心下标 。

数组 中心下标 是数组的一个下标，其左侧所有元素相加的和等于右侧所有元素相加的和。

如果中心下标位于数组最左端，那么左侧数之和视为 0 ，因为在下标的左侧不存在元素。这一点对于中心下标位于数组最右端同样适用。

如果数组有多个中心下标，应该返回 最靠近左边 的那一个。如果数组不存在中心下标，返回 -1 。

## 示例 1

```text
输入：nums = [1, 7, 3, 6, 5, 6]
输出：3
解释：
中心下标是 3 。
左侧数之和 sum = nums[0] + nums[1] + nums[2] = 1 + 7 + 3 = 11 ，
右侧数之和 sum = nums[4] + nums[5] = 5 + 6 = 11 ，二者相等。

```

## 思路

计算数组全部元素的和为 `total`, 当遍历到 `i` 元素时, 计算其左边所有元素和为 `left`, 则右侧元素之和为 `total- left - nums[i]`
因此当左右侧元素相等即为判断 `left = total- left - nums[i]`

## 题目

[1991. 找到数组的中间位置](https://leetcode.cn/problems/find-the-middle-index-in-array/)
