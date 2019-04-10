/**

This problem was asked by Google.

A unival tree (which stands for "universal value") is a tree where all nodes under it have the same value.

Given the root to a binary tree, count the number of unival subtrees.

For example, the following tree has 5 unival subtrees:

   0
  / \
 1   0
    / \
   1   0
  / \
 1   1

 */

/**
 * 树节点结构
 */
class TreeNode {
  constructor(v = 0, l = null, r = null) {
    this.value = v
    this.left = l
    this.right = r
  }

  /**
   * 是否是单值的
   */
  isUni() {
    //如果存在左孩子
    if (this.left) {
      //如果值不和自己相等
      if (this.left.value != this.value) {
        return false
      }
      //如果孩子不是单值
      if (!this.left.isUni()) {
        return false
      }
    }
    //右孩子相同处理
    if (this.right) {
      if (this.right.value != this.value) {
        return false
      }
      if (!this.right.isUni()) {
        return false
      }
    }
    //没有孩子，或所有孩子都符合
    return true
  }
}

/**
 * 计算单值子树的个数
 * @param {TreeNode} root 
 * @returns {number}
 */
function findSubUniTreeCount(root) {
  let total = 0
  r(root)
  return total

  /**
   * 递归遍历树的所有节点
   * 发现单值子树就累加total
   * @param {TreeNode} node 
   */
  function r(node) {
    if (node.isUni()) {
      total++
    }
    if (node.left) {
      r(node.left)
    }
    if (node.right) {
      r(node.right)
    }
  }
}


let root = new TreeNode(0,
  new TreeNode(1),
  new TreeNode(0,
    new TreeNode(1,
      new TreeNode(1),
      new TreeNode(1)
    ),
    new TreeNode(0)
  )
)

console.log(findSubUniTreeCount(root))