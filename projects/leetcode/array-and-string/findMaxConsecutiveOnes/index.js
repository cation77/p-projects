function findMaxConsecutiveOnes(nums) {
  let result = 0
  let slow = -1
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 1) {
      const sum = i - slow
      result = sum > result ? sum : result
    } else {
      slow = i
    }
  }
  return result
}

// console.log(findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1]))

export default findMaxConsecutiveOnes
