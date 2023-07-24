function reverseString(strs) {
  let left = 0
  let right = strs.length - 1
  while (left <= right) {
    ;[strs[left], strs[right]] = [strs[right], strs[left]]
    left++
    right--
  }
  return strs
}

export default reverseString
