/**
 * 在matrix中从start到end的最小步数
 * 使用动态规划，直接规划好到整个地图的
 * 过程中遇到了结束点，则返回结束点的最小步数
 * @param {boolean[][]} matrix 
 * @param {number[]} start 
 * @param {number[]} end 
 * @returns {number}
 */
function stepCount(matrix, start, end) {
  //如果终点被挡住，快速放弃
  const [ex, ey] = end
  if (matrix[ex][ey]) return null
  //动态规划的最小步数表
  let dp = matrix.map(x => x.map(y => Number.MAX_SAFE_INTEGER))
  //排队表，避免走的远的往回走，从近处往远走才是最小步数，初始化起始点为最小步数0
  let queue = [[start, 0]]
  //开始循环
  while (queue.length) {
    let [point, steps] = queue.shift()
    let [x, y] = point
    //被挡住了
    if (matrix[x][y]) continue
    //之前计算过了
    if (dp[x][y] != Number.MAX_SAFE_INTEGER) continue
    //尚未计算过，赋值
    if (x == ex && y == ey) return steps
    dp[x][y] = steps
    //计算周边的点
    if (x > 0) {
      queue.push([[x - 1, y], steps + 1])
    }
    if (x < matrix.length - 1) {
      queue.push([[x + 1, y], steps + 1])
    }
    if (y > 0) {
      queue.push([[x, y - 1], steps + 1])
    }
    if (y < matrix[x].length - 1) {
      queue.push([[x, y + 1], steps + 1])
    }
  }
  //最后也没有遇到结束点
  return null
}

const t = true, f = false
console.log(stepCount(
  [[f, f, f, f],
  [t, t, f, t],
  [f, f, f, f],
  [f, f, f, f]]
  , [3, 0], [0, 0]))