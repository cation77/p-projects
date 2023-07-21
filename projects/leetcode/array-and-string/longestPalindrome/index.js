function longestPalindrome(str) {
  if (str.length <= 1) return str
  let result = ''
  for (let i = 0; i < str.length; i++) {
    const temp = getPalindrome(str, i, i)
    const temp1 = getPalindrome(str, i, i + 1)
    if (temp.length > result.length) {
      result = temp
    }
    if (temp1.length > result.length) {
      result = temp1
    }
  }
  return result
}

function getPalindrome(str, left, right) {
  while (left >= 0 && right < str.length && str[left] === str[right]) {
    left--
    right++
  }
  // 跳出循环时，str[left] !== str[right] 或 left < 0 或 right > str.length
  // 此时对 left 和 right 多减了1
  // 因此需要对 left + 1
  return str.slice(left + 1, right)
}

console.log(longestPalindrome('cbbd'))
