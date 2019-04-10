/*
This problem was asked by Amazon.

Given an integer k and a string s, find the length of the longest substring that contains at most k distinct characters.

For example, given s = "abcba" and k = 2, the longest substring with k distinct characters is "bcb".
*/

'use strict'

/**
 * 找到最长的子串
 * @param {string} s 
 * @param {number} k
 * @returns {string} 
 */
function findLongest(s, k) {
  if (!s.length) return ''

  /**
   * 定义毛毛虫
   */
  class Meta {
    constructor() {
      /**
       * 字典，目前这段包含的字符和对应此字符的数量
       */
      this.dic = {}
      /**
       * 总长度，用于比较出最大结果
       */
      this.totalLen = 0
      /**
       * 字符个数，用于避免超出k
       */
      this.totalChar = 0
    }

    /**
     * 头是否可以向前移动到i
     * @param {number} i 字符串s的下标 
     * @returns {boolean}
     */
    canAdd(i) {
      if (this.totalChar < k) return true
      if (this.totalChar == k) {
        return !!this.dic[s[i]]
      }
      throw '不应当跑到这里'
    }

    /**
     * 头向前移动到i
     * @param {number} i 字符串s的下标 
     */
    add(i) {
      let char = s[i]
      this.totalLen++
      if (!this.dic[char]) {
        this.dic[char] = 1
        this.totalChar++
        return
      }
      this.dic[char]++
    }

    /**
     * 尾巴向前移动到i
     * @param {number} i 字符串s的下标 
     */
    remove(i) {
      let char = s[i]
      this.totalLen--
      this.dic[char]--
      if (!this.dic[char]) {
        this.totalChar--
      }
    }
  }

  //从头爬到尾
  let i = 0, j = 0, maxLen = 0, rtn = {}, meta = new Meta()
  while (i < s.length && j < s.length - k) {
    //如果头可以前进
    if (meta.canAdd(i)) {
      meta.add(i)
      i++
      //更新最大子串长度和区间
      if (meta.totalLen > maxLen) {
        rtn = { i, j }
        maxLen = meta.totalLen
      }
      continue
    }
    //否则移动尾巴
    meta.remove(j)
    j++
  }
  return s.substring(rtn.j, rtn.i)
}


console.log(findLongest('babaadcbaaaaaab', 2))


