// 暴力解法
function strStr1(haystack, needle) {
  const sLen = haystack.length
  const pLen = needle.length

  let i = (j = 0)
  while (i < sLen && j < pLen) {
    if (haystack[i] === needle[j]) {
      i++
      j++
    } else {
      i = i - j + 1
      j = 0
    }
  }
  if (j === pLen) {
    return i - j
  }
  return -1
}

function strStr(haystack, needle) {
  const sLen = haystack.length
  const pLen = needle.length
  for (let i = 0; i <= sLen - pLen; i++) {
    let j
    for (j = 0; j < pLen; j++) {
      if (needle[j] !== haystack[i + j]) {
        break
      }
    }
    if (j === pLen) {
      return i
    }
  }
  return -1
}

console.log(strStr('leetcode', 'etco'))
