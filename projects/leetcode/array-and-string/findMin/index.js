function findMin(nums) {
  let start = 0
  let end = nums.length - 1
  while (start < end) {
    // const mid = (end + start) >> 1
    const mid = left + Math.floor((right - left) / 2)
    if (nums[mid] < nums[end]) {
      end = mid
    } else {
      start = mid + 1
    }
  }
  return nums[start]
}

// console.log(findMin([3, 1, 2]))

export default findMin
