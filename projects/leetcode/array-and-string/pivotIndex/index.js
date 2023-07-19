function pivotIndex(nums) {
  const total = nums.reduce((a, b) => a + b)
  let left = 0
  for (let i = 0; i < nums.length; i++) {
    if (left === total - left - nums[i]) {
      return i
    }
    left += nums[i]
  }
  return -1
}

console.log(pivotIndex([1, 2, 3]))
