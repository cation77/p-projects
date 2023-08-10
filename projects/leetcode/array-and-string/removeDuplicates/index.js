function removeDuplicates(nums) {
  let cur = 0
  for (let i = 1; i < nums.length; i++) {
    if (nums[cur] !== nums[i]) {
      cur++
      nums[cur] = nums[i]
    }
  }
  return cur + 1
}

// console.log(removeDuplicates([1, 1, 2]))

export default removeDuplicates
