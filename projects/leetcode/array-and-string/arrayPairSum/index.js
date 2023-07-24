function arrayPairSum(nums) {
  nums.sort((a, b) => a - b)
  let result = 0
  for (let i = 0; i < nums.length; ) {
    result += nums[i]
    i += 2
  }
  return result
}

export default arrayPairSum
