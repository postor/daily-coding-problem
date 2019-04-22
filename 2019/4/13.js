class TreeNode {
  constructor(value, parent = null, left = null, right = null) {
    //树基本结构
    this.value = value
    this.left = left
    this.right = right
    //--额外结构
    //父节点
    this.parent = parent
    //锁住标志
    this.locked = false
    //被锁住的孩子（包含孙子重孙子等）个数
    this.lockedChildCount = 0
  }

  is_locked() {
    return this.locked
  }
  //加锁，只有while处向上遍历
  //最多遍历完整深度，符合题目要求
  lock() {
    //如果有孩子被锁住就不能加锁
    if (this.lockedChildCount) return false
    //没有孩子被锁住则可以加锁
    this.locked = true
    //加锁后通知所有上层（父亲，爷爷，曾祖父等...)
    let t = this.parent
    while (t) {
      //多了一个被锁住的孩子
      t.lockedChildCount++
      t = t.parent
    }
    //通知完毕，返回true
    return true
  }
  //解锁，和lock类似
  unlock() {
    if (this.lockedChildCount) return false
    this.locked = false
    let t = this.parent
    while (t) {
      t.lockedChildCount--
      t = t.parent
    }
    return true
  }

  //为了方便构造树结构额外添加的方法
  static fromObj(node, parent = null) {
    if (!node) return null
    let n = new TreeNode(node.value, parent)
    n.left = TreeNode.fromObj(node.left, n)
    n.right = TreeNode.fromObj(node.right, n)
    return n
  }
}

let t1 = TreeNode.fromObj({
  value: 'root',
  left: {
    value: 'left',
    left: {
      value: 'left-left'
    }
  },
  right: {
    value: 'right',
    left: {
      value: 'right-left'
    },
    right: {
      value: 'right-right'
    }
  }
})
//                   root
//                 /      \
//              left        right
//               /        /       \
//        left-left   right-left  right-right

console.log(t1.left.left.lock())
// true， 'left-left'是个叶子，可以被锁住

console.log(t1.left.lock())
// false，'left'的孩子'left-left'被锁住，所以不能加锁

console.log(t1.right.lock())
// true 'right' 的没有被加锁的孩子

console.log(t1.right.left.lock())
// true 'right-right' 的没有被加锁的孩子

console.log(t1.right.unlock())
// false 'right' 的孩子 'right-right' 已加锁，所以无法解锁
