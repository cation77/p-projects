// [69. x 的平方根](https://leetcode.cn/problems/sqrtx/solutions/)

/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
  if (x < 2) return x
  let left = 1
  let right = x
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)
    if (x / mid === mid) {
      return mid
    } else if (x / mid < mid) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  return right
}

console.log(mySqrt(8))
