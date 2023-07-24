function twoSum(nums, target) {
  const len = nums.length - 1
  let left = 0
  let right = len
  while (left < right) {
    const sum = nums[left] + nums[right]
    if (target === sum) {
      return [left + 1, right + 1]
    } else if (target > sum) {
      left++
    } else if (target < sum) {
      right--
    }
  }
}

export default twoSum
// console.log(twoSum([2, 7, 11, 15], 9))
