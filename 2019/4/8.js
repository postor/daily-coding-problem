/**
 * 找到交叉点
 */
function findIntersection(a, b) {
  //找到a的尾巴和a长度 O(m)
  let cur = a, loopNodeCount = 1
  while (cur.next) {
    loopNodeCount++
    cur = cur.next
  }
  //把a做成环，会导致b也存在一段环，这段环就是a
  cur.next = a
  //使用两个游标分别对准b和b上第loopNodeCount个元素 O(m)
  let cur1 = b, cur2 = b
  for (let i = 0; i < loopNodeCount; i++) {
    cur2 = cur2.next
  }
  //两个游标同时前进，等到cur1进入环的时候会相遇，因为相差刚好为环长度
  //时间复杂度小于O(n)
  while (cur1 != cur2) {
    cur1 = cur1.next
    cur2 = cur2.next
  }
  //当他们相等的时候，就是那个交叉点
  return cur1
}

let inter = { value: 8, next: { value: 10 } }
let a = { value: 3, next: { value: 7, next: inter } }
let b = { value: 99, next: { value: 1, next: inter } }

console.log(findIntersection(a,b))