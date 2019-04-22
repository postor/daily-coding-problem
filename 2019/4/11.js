/**
This problem was asked by Google.

You are given an M by N matrix consisting of booleans that represents a board. Each True boolean represents a wall. Each False boolean represents a tile you can walk on.

Given this matrix, a start coordinate, and an end coordinate, return the minimum number of steps required to reach the end coordinate from the start. If there is no possible path, then return null. You can move up, left, down, and right. You cannot move through walls. You cannot wrap around the edges of the board.

For example, given the following board:

[[f, f, f, f],
[t, t, f, t],
[f, f, f, f],
[f, f, f, f]]
and start = (3, 0) (bottom left) and end = (0, 0) (top left), the minimum number of steps required to reach the end is 7, since we would need to go through (1, 2) because there is a wall everywhere else on the second row.
*/

/**
 * define true and false
 */
const t = true
const f = false
/**
 * 计算在迷宫中从start走到end的最短步数
 * @param {boolean[][]} matrix 迷宫定义
 * @param {number[]} start 起始点
 * @param {number[]} end 结束点
 * @returns
 */
function stepCount (matrix, start, end) {
  const [ex, ey] = end
  const [sx, sy] = start
  // 终点被挡住了或者起点被挡住了
  if (matrix[ex][ey]) return null
  if (matrix[sx][sy]) return null
  // 结果缓存
  let cache = matrix.map(x => x.map(y => Number.MAX_SAFE_INTEGER))
  cache[ex][ey] = 0
  // 可能还要反向计算一次
  let reverse = []
  // 从end开始向周围扩展计算
  let distance = 1
  while (true) {
    let outRange = []
    for (let i = 0; i <= distance; i++) {
      let j = distance - i
      outRange.push(test(ex + i, ey + j))
      outRange.push(test(ex - i, ey - j))
    }
    if (outRange.every(x => x)) {
      break
    }
    for (let i = reverse.length - 1; i >= 0; i--) {
      let [x, y] = reverse[i]
      test(x, y, false)
    }
    if (cache[sx][sy] !== Number.MAX_SAFE_INTEGER) {
      return cache[sx][sy]
    }
    distance++
  }
  return null

  /**
   * 计算指定位置的最小步数，从内向外
   * @param {*} x
   * @param {*} y
   */
  function test (x, y, push = true) {
    // 超出matrix
    if (x < 0 || x >= matrix.length) return true
    if (y < 0 || y >= matrix[x].length) return true
    // 被挡住了
    if (matrix[x][y]) return
    // 计算四周的最小值
    let min = Math.min(
      getCache(x + 1, y),
      getCache(x - 1, y),
      getCache(x, y + 1),
      getCache(x, y - 1)
    )
    if (min !== Number.MAX_SAFE_INTEGER) {
      cache[x][y] = min + 1
    }
    if (min === Number.MAX_SAFE_INTEGER && push) {
      reverse.push([x, y])
    }

    /**
     * 从缓存读取最小值，超出范围使用MAX_SAFE_INTEGER填充
     * @param {*} x
     * @param {*} y
     */
    function getCache (x, y) {
      if (x < 0 || x >= matrix.length) return Number.MAX_SAFE_INTEGER
      if (y < 0 || y >= matrix[x].length) return Number.MAX_SAFE_INTEGER
      return cache[x][y]
    }
  }
}

console.log(stepCount([
  [f, f, f, f],
  [t, t, f, t],
  [f, f, f, f],
  [f, f, f, f]],
[3, 0], [0, 0]))
// 7
