// function moveZeroes(nums) {
//   for (let i = 0; i < nums.length; i++) {
//     let flag = false
//     for (let j = 0; j < nums.length - 1; j++) {
//       if (nums[j] === 0) {
//         flag = true
//         ;[nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
//       }
//     }
//     if (!flag) {
//       return nums
//     }
//   }
//   return nums
// }

function moveZeroes(nums) {
  let j = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      ;[nums[i], nums[j]] = [nums[j], nums[i]]
      j++
    }
  }
  return nums
}

// console.log(moveZeroes([1, 3, 0, 0, 12]))

export default moveZeroes
