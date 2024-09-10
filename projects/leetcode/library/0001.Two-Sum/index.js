function twoSum(nums, target) {
  const bucket = {}
  for (let i = 0; i < nums.length; i++) {
    const idx = bucket[target - nums[i]]
    if (idx) {
      return [idx, i]
    }
    bucket[nums[i]] = i
  }
  return []
}
