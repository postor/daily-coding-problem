/*
This problem was asked by Amazon.

There exists a staircase with N steps, and you can climb up either 1 or 2 steps at a time. Given N, write a function that returns the number of unique ways you can climb the staircase. The order of the steps matters.

For example, if N is 4, then there are 5 unique ways:

1, 1, 1, 1
2, 1, 1
1, 2, 1
1, 1, 2
2, 2
What if, instead of being able to climb 1 or 2 steps at a time, you could climb any number from a set of positive integers X? For example, if X = {1, 3, 5}, you could climb 1, 3, or 5 steps at a time.

*/
"use strict"
/**
 * 不同的走法数量
 * @param {number} n 
 * @param {number[]} can 
 * @returns {number}
 */
function uniqueSteps(n, can = [1, 2]) {
  let total = 0
  r()
  return total

  /**
   * 递归寻找可能的组合
   * @param {*} cur 当前can坐标
   * @param {*} used can坐标的使用次数记录
   * @param {*} curTotal 当前累加的数值
   */
  function r(cur = 0, used = Array(can.length).fill(0), curTotal = 0) {
    //寻找可能的组合
    for (let i = cur; i < can.length; i++) {
      //可以达成
      if (can[i] + curTotal == n) {
        used[i]++
        total += count(used)
        return
      }
      //已经超出
      if (can[i] + curTotal > n) break
      //尚未超出
      let newUsed = used.concat()
      newUsed[i]++
      r(i, newUsed, curTotal + can[i])
    }
  }

  /**
   * 根据使用的步数集合，计算不同步数间有顺序的组合
   * @param {number[]} used 
   * @returns {number}
   */
  function count(used) {
    let sum = 0, rtn = 1
    for (let i = 0; i < used.length; i++) {
      if (!used[i]) continue
      sum += used[i]
      rtn *= cxy(sum, used[i])
    }
    return rtn
  }

  /**
   * C x取y
   * @param {*} x 总数
   * @param {*} y 取出数
   */
  function cxy(x, y) {
    if (y > x - y) return cxy(x, x - y)
    let a = 1, b = 1
    for (let i = 0; i < y; i++) {
      b *= i + 1
      a *= x - i
    }
    return a / b
  }
}

// console.log(uniqueSteps(4))
// console.log(uniqueSteps(5, [1, 3, 5]))
/*
1,1,1,1,1
1,1,3
1,3,1
3,1,1
5
*/

// console.log(uniqueSteps(6, [1, 3, 5]))
/*
1,1,1,1,1,1
1,1,1,3
1,1,3,1
1,3,1,1
3,1,1,1
3,3
1,5
5,1
*/

console.log(uniqueSteps(6, [1, 2, 4]))
/*
1,1,1,1,1,1
1,1,1,1,2 ...共5个
1,1,2,2 ...共6个
2,2,2
1,1,4  ...共3个
2,4 ...共2个
*/