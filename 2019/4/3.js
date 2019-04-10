/*
This problem was asked by Facebook.

Given a stream of elements too large to store in memory, 
pick a random element from the stream with uniform probability.
*/

/**
 * 获取数组的随机元素
 * @param {[]} arr 
 */
// function pickArrayRandom(arr) {
//   return arr[Math.floor(Math.random() * arr.length)]
// }
// console.log(pickArrayRandom([1, 2, 3, 4, 5]))

/**
 * 使用一个generator模拟一个很大的流
 * @param {number} max 大到有max个元素
 */
function* getNext(max) {
  for (let i = 1; i <= max; i++) {
    yield i
  }
}

/**
 * 从一个generator模拟的流中随机取出一个元素
 * @param {Generator} gen 
 */
function pickRandom(gen) {
  let rtn, i = 0
  while (true) {
    const { value, done } = gen.next()
    if (done) {
      return rtn
    }
    i++
    if (i == 1) {
      rtn = value
      continue
    }
    let posibility = (Math.random() * (i)) < 1
    if (posibility) {
      rtn = value
    }
  }
}

console.log(pickRandom(getNext(100)))