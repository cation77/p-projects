function longestCommonPrefix(strs) {
  if (strs.length === 0) return ''
  let pre = ''
  const first = strs[0]
  for (let i = 0; i < first.length; i++) {
    if (strs.every((str) => str[i] === first[i])) {
      pre += first[i]
    } else {
      break
    }
  }
  return pre
}

// console.log(longestCommonPrefix(['flower', 'flow', 'flight']))
console.log(longestCommonPrefix(['dog', 'racecar', 'car']))
