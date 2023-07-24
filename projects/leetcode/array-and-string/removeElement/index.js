function removeElement(nums, val) {
  let next = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      ;[nums[next], nums[i]] = [nums[i], nums[next]]
      next++
    }
  }
  return nums
}

// console.log(removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2))

export default removeElement
