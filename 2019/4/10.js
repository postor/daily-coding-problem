/*
This problem was asked by Microsoft.

Given a dictionary of words and a string made up of those words (no spaces), return the original sentence in a list. If there is more than one possible reconstruction, return any of them. If there is no possible reconstruction, then return null.

For example, given the set of words 'quick', 'brown', 'the', 'fox', and the string "thequickbrownfox", you should return ['the', 'quick', 'brown', 'fox'].

Given the set of words 'bed', 'bath', 'bedbath', 'and', 'beyond', and the string "bedbathandbeyond", return either ['bed', 'bath', 'and', 'beyond] or ['bedbath', 'and', 'beyond'].
*/

/**
 * 找到句子构成
 * @param {string[]} words 
 * @param {string} str 
 */
function findConstruction(words, str) {
  let rtn = null
  r()
  return rtn
  /**
   * 
   * @param {number} i 
   * @param {string[]} seqence 
   */
  function r(i = 0, seqence = []) {
    //有一个结果就停止，节约运算
    if (rtn) return
    //有结果
    if (i == str.length) {
      rtn = seqence
      return
    }
    //尝试所有词，如果匹配则递归尝试
    words
      .filter(word => match(i, word))
      .forEach(word => r(i + word.length, [...seqence, word]))
  }


  /**
   * 从str第i个下标开始匹配word
   * @param {number} i 
   * @param {string} word 
   */
  function match(i, word) {
    for (let j = 0; j < word.length; j++) {
      if (str[i + j] !== word[j]) return false
    }
    return true
  }
}

console.log(findConstruction(['quick', 'brown', 'the', 'fox'], "thequickbrownfox"))
console.log(findConstruction(['bed', 'bath', 'bedbath', 'and', 'beyond'], "bedbathandbeyond"))