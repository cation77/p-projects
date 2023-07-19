function merge(nums) {
  nums.sort((a, b) => a[0] - b[0])
  const result = []
  for (let i = 0; i < nums.length; i++) {
    const last = result.at(-1)
    const target = nums[i]
    if (last) {
      if (target[0] <= last[1]) {
        last[0] = Math.min(last[0], target[0])
        last[1] = Math.max(last[1], target[1])
      } else if (target[0] > last[1]) {
        result.push(target)
      }
    } else {
      result.push(target)
    }
  }
  return result
}

console.log(
  merge([
    [1, 3],
    [2, 6],
    [8, 10],
    [15, 18]
  ])
)
