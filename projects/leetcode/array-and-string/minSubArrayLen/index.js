function minSubArrayLen(traget, nums) {
  let left = 0
  let right = 0
  let sum = 0
  let min = Number.MAX_SAFE_INTEGER
  while (right < nums.length) {
    sum += nums[right]
    while (sum >= traget) {
      min = Math.min(min, right - left + 1)
      sum -= nums[left]
      left++
    }
    right++
  }
  return min === Number.MAX_SAFE_INTEGER ? 0 : min
}

console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3]))

export default minSubArrayLen
