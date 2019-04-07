/*
Given an array of integers and a number k, where 1 <= k <= length of the array, compute the maximum values of each subarray of length k.

For example, given array = [10, 5, 2, 7, 8, 7] and k = 3, we should get: [10, 7, 8, 8], since:

10 = max(10, 5, 2)
7 = max(5, 2, 7)
8 = max(2, 7, 8)
8 = max(7, 8, 7)
Do this in O(n) time and O(k) space. You can modify the input array in-place and you do not need to store the results. You can simply print them out as you compute them.
*/

'use strict'
/**
 * 子数组最大值
 * @param {number[]} arr 
 * @param {number} k
 * @returns {number[]} 
 */
function maxK(arr, k) {
  //窗口，保持k大小用于记录最大值（只记录坐标）
  let w = []

  //遍历arr，遍历到k之前只去记录最大值
  for (let i = 0; i < k; i++) {
    //如果窗口右侧有比新的值还小的都可以扔掉
    //比如3,4,5陆续进入后面的比较只有5有用，3,4都可以扔掉
    while (w.length && arr[i] >= arr[w[w.length - 1]]) {
      w.pop()
    }
    //推入新的下标
    w.push(i)
  }

  //遍历arr，遍历到k之后除了记录还需要输出最大值和排除不需要比较的坐标
  for (let i = k; i < arr.length; i++) {
    //输出，最左侧就是最大的，因为如果不是会被扔掉
    console.log(arr[w[0]])
    //每次只考虑k长度的子数组，比i-k还小的不属于这段，需扔掉
    while (w.length && w[0] <= i - k) {
      w.shift()
    }
    //记录，和比k小那段一样，扔掉比新值还小的
    while (w.length && arr[i] >= arr[w[w.length - 1]]) {
      w.pop()
    }
    w.push(i)
  }
  //最后一段的最大值输出
  console.log(arr[w[0]])
}

maxK([10, 5, 2, 7, 8, 7], 3)