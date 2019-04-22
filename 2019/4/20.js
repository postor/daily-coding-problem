
/**
 * 寻找套利
 * @param {number[][]]} tradeRates 
 */
function findArbitrage(tradeRates) {
  return tradeRates.some((x, i) => x.some((y, j) => {
    if (i == j) return false // 自己对自己就不算了
    let used = tradeRates.map(a => a.map(b => false))
    used[i][j] = true
    return r(j, i, y, used)
  }))
  function r(current, target, cur = 1, used = []) {
    // 能套利了
    if (cur * tradeRates[current][target] > 1) return true
    // 已经跑回来了，放弃
    if (cur == target) return false
    // 还有机会
    return tradeRates[current].some((x, i) => {
      // 已经兑换过了，转圈了，放弃
      if (used[current][i]) return false
      // 继续递归
      let u = used.map(a => a.map(b => b))
      u[current][i] = true
      return r(i, target, cur * x, u)
    })
  }
}

// 从1兑换2=1，从2兑换0=2，从0兑换1=1，有套利路径
console.log(findArbitrage([
  [1, 1, 0.5],
  [1, 1, 1],
  [2, 1, 1]
]))


// 没有套利路径
console.log(findArbitrage([
  [1, 1, 1],
  [1, 1, 1],
  [1, 1, 1]
]))
