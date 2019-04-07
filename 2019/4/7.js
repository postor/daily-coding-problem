
/*
A builder is looking to build a row of N houses that can be of K different colors. He has a goal of minimizing cost while ensuring that no two neighboring houses are of the same color.

Given an N by K matrix where the nth row and kth column represents the cost to build the nth house with kth color, return the minimum cost which achieves this goal. 
*/

/**
 * 给街上的房子涂漆
 * @param {number[][]} matrix 房子和涂色的价格表
 * @returns {number[]} 每个房子对应的色号
 */
function paintPlan(matrix) {
  //缓存结果
  let cache = {}

  let rtns = matrix.map((x, k) => r(0, k))
  rtns.sort((a, b) => a[0] - b[0])
  return rtns[0]

  /**
   * 递归找最佳方案
   * @param {number} i 房号 
   * @param {number} k 色号
   */
  function r(i, k) {
    //如果有缓存，从缓存取
    if (cache[i] && cache[i][k]) {
      return cache[i][k]
    }

    //如果是最后一个房子和指定的颜色，直接返回结果
    if (i == matrix[k].length - 1) {
      return [matrix[k][i], [k]]
    }

    //找到后面可选的最低成本
    let lowest
    for (let j = 0; j < matrix.length; j++) {
      //邻近房子只能选择不同色的
      if (j != k) {
        let rtn = r(i + 1, j)
        if (!lowest || lowest[0] > rtn[0]) {
          lowest = rtn
        }
      }
    }
    //把本步骤的成本和颜色选择加到结果中，并缓存起来
    let t = [matrix[k][i] + lowest[0], [k, ...lowest[1]]]
    if (!cache[i]) {
      cache[i] = {}
    }
    cache[i][k] = t
    return t
  }
}


let [cost, colors] = paintPlan([
  [7, 3, 8, 6, 1, 2],
  [5, 6, 7, 2, 4, 3],
  [10, 1, 4, 9, 7, 6],
])
console.log(cost, colors)

//结果应为  [1, 0, 2, 1, 0, 1] 
//最小总花费 18