function searchInsert(nums, target) {
  let left = 0
  let right = nums.length - 1
  while (left <= right) {
    const mid = (left + right) >> 1
    if (target === nums[mid]) {
      return mid
    } else if (target < nums[mid]) {
      right = mid - 1
    } else if (target > nums[mid]) {
      left = mid + 1
    }
  }
  return left
}

console.log(searchInsert([1, 3, 5, 6], 7))
