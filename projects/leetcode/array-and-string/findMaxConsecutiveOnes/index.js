// function findMaxConsecutiveOnes(nums) {
//   let result = 0
//   let slow = -1
//   for (let i = 0; i < nums.length; i++) {
//     if (nums[i] === 1) {
//       const sum = i - slow
//       result = sum > result ? sum : result
//     } else {
//       slow = i
//     }
//   }
//   return result
// }

// console.log(findMaxConsecutiveOnes([1, 0, 1, 1, 0, 1]))

function findMaxConsecutiveOnes(arr) {
  let result = 0
  let count = 0
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 1) {
      count++
      result = result >= count ? result : count
    } else {
      count = 0
    }
  }
  return result
}

export default findMaxConsecutiveOnes
