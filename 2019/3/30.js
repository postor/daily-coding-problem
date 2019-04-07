/*
This problem was asked by Twitter.

Implement an autocomplete system. That is, given a query string s and a set of all possible query strings, return all strings in the set that have s as a prefix.

For example, given the query string de and the set of strings [dog, deer, deal], return [deer, deal].

Hint: Try preprocessing the dictionary into a more efficient data structure to speed up queries
*/

class Dic {
  constructor() {
    this.index = {}
  }

  /**
   * 添加一个单词
   * @param {string} w 
   */
  addWord(w) {
    let t = this.index
    for (let i = 0; i < w.length; i++) {
      let k = w[i]
      if (!t[k]) {
        t[k] = {
          results: []
        }
      }
      t[k].results.push(w)
      t = t[k]
    }
  }

  /**
   * 获取候选
   * @param {string} s
   * @returns {string[]} 
   */
  getCandidates(s) {
    let t = this.index
    for (let i = 0; i < s.length; i++) {
      let k = s[i]
      if (!t[k]) {
        return []
      }
      t = t[k]
    }
    return t.results
  }
}


/**
 * 自动补全
 * @param {string} prefix 
 * @param {string[]} dictionary 
 */
function autocomplete(prefix, dictionary) {
  let dic = new Dic()
  dictionary.forEach(x => dic.addWord(x))
  return dic.getCandidates(prefix)
}

console.log(autocomplete('de', ['dog', 'deal', 'deer']))

