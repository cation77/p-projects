function reverseWords(s) {
  const split = s.split(' ')
  for (let i = 0; i < split.length; i++) {
    split[i] = split[i].split('').reverse().join('')
  }
  return split.join(' ')
}
// console.log("s'teL ekat edoCteeL tsetnoc")

export default reverseWords
