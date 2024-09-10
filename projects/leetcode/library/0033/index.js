// [33. 搜索旋转排序数组](https://leetcode.cn/problems/search-in-rotated-sorted-array/description/)

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let start = 0
  let end = nums.length - 1
  while (start <= end) {
    const mid = start + ((end - start) >> 1)
    if (nums[mid] === target) {
      return mid
    } else if (nums[start] <= nums[mid]) {
      if (target < nums[mid] && target >= nums[start]) {
        end = mid - 1
      } else {
        start = mid + 1
      }
    } else {
      if (target <= nums[end] && target > nums[mid]) {
        start = mid + 1
      } else {
        end = mid - 1
      }
    }
  }
  return -1
}

console.log(search([4, 5, 6, 7, 0, 1, 2], 0))
