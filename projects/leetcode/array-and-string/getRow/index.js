// 第一版、未优化，从杨辉三角生成
function getRow1(rowIndex) {
  const ret = []
  for (let i = 0; i <= rowIndex; i++) {
    const rowList = [1]
    for (let j = 1; j < i; j++) {
      const preRow = ret[i - 1]
      rowList[j] = preRow[j - 1] + preRow[j]
    }
    if (i > 0) {
      rowList.push(1)
    }
    ret.push(rowList)
  }
  return ret[rowIndex]
}

// 第二版、滚动数组，保留上一行，优化空间复杂度
function getRow2(rowIndex) {
  let pre = []
  for (let i = 0; i <= rowIndex; i++) {
    const cur = []
    for (let j = 0; j <= i; j++) {
      if (j === 0 || j === i) {
        cur[j] = 1
      } else {
        cur[j] = pre[j - 1] + pre[j]
      }
    }
    pre = cur
  }
  return pre
}

// 第三版、只用一个数组，倒着计算，；利用计算第 i 项时，第 i - 1 还是上一行的值
function getRow3(rowIndex) {
  const row = new Array(rowIndex + 1).fill(0)
  row[0] = 1
  for (let i = 1; i <= rowIndex; i++) {
    for (let j = i; j > 0; j--) {
      row[j] += row[j - 1]
    }
  }
  return row
}

// 第四版、利用数学公式线性递推。同一行的相邻组合数的关系 C(n,m) = C(n,m−1) × (n−m+1)/m

function getRow(rowIndex) {
  const row = new Array(rowIndex + 1).fill(0)
  row[0] = 1
  for (let i = 1; i <= rowIndex; i++) {
    row[i] = row[i - 1] * ((rowIndex - i + 1) / i)
  }
  return row
}
// console.log(getRow(10))

export default getRow
