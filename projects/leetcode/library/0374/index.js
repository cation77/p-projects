// [374. 猜数字大小](https://leetcode.cn/problems/guess-number-higher-or-lower/description/)

/**
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * var guess = function(num) {}
 */

/**
 * @param {number} n
 * @return {number}
 */
var guessNumber = function (n) {
  let start = 0
  let end = n
  while (start <= end) {
    const mid = start + ((end - start) >> 1)
    const flag = guess(mid)
    if (flag === 0) {
      return mid
    } else if (flag === 1) {
      start = mid + 1
    } else {
      end = mid - 1
    }
  }
  return end
}
