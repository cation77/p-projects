function reverseWords(str) {
  const strs = []
  let buf = ''
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== ' ') {
      buf += str[i]
    } else {
      if (buf) {
        strs.push(buf)
      }
      buf = ''
    }
  }
  if (buf) {
    strs.push(buf)
  }
  return reverse(strs).join(' ')
}

function reverse(arr) {
  const len = arr.length
  if (len <= 1) return arr
  let begin = 0
  let end = len - 1
  while (begin <= end) {
    const temp = arr[end]
    arr[end] = arr[begin]
    arr[begin] = temp
    begin++
    end--
  }
  return arr
}

function reverseWords(str) {
  return str
    .trim()
    .split(' ')
    .filter((s) => s.trim()) // 不使用 map，因为分割出来的字符子串，可能存在空格组成的字符串，trim后需要过滤掉
    .reverse()
    .join(' ')
}

console.log(reverseWords('"EPY2giL"'))
