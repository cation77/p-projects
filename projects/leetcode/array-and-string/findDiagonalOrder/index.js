function findDiagonalOrder(matrix) {
  if (matrix.length === 0) return []
  const row = matrix.length // 矩阵行
  const column = matrix[0].length // 矩阵列
  const diagonal = row + column - 1 // 对角线数
  const result = []
  let r = (c = 0)
  for (let i = 0; i < diagonal; i++) {
    // 对角线上的元素下标之和为 i
    if (i % 2 === 0) {
      // 对角线编号0或者偶数，对角线向右上遍历
      for (let j = r; j >= i - c; j--) {
        result.push(matrix[j][i - j])
      }
    } else {
      // 对角线向左下遍历
      for (let j = c; j >= i - r; j--) {
        result.push(matrix[i - j][j])
      }
    }
    r = r >= row - 1 ? row - 1 : r + 1
    c = c >= column - 1 ? column - 1 : c + 1
  }
  return result
}

console.log(
  findDiagonalOrder([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12]
  ])
)
