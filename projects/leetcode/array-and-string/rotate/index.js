/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
function rotate(matrix) {
  const len = matrix.length
  // 对角线折叠
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < i; j++) {
      ;[matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
    }
  }
  // 镜像翻转
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len / 2; j++) {
      ;[matrix[i][j], matrix[i][len - j - 1]] = [
        matrix[i][len - j - 1],
        matrix[i][j]
      ]
    }
  }
  return matrix
}

console.log(
  rotate([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ])
)
