function generate(numRows) {
  const result = []
  for (let i = 0; i < numRows; i++) {
    const rowList = [1]
    for (let j = 1; j < i; j++) {
      const preRow = result[i - 1]
      rowList[j] = preRow[j - 1] + preRow[j]
    }
    if (i > 0) {
      rowList.push(1)
    }
    result.push(rowList)
  }
  return result
}

// console.log(generate(5))
// [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]

export default generate
