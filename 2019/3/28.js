/*
This problem was asked by Airbnb.

Given a list of integers, write a function that returns the largest sum of non-adjacent numbers. Numbers can be 0 or negative.

For example, [2, 4, 6, 2, 5] should return 13, since we pick 2, 6, and 5. [5, 1, 1, 5] should return 10, since we pick 5 and 5.

Follow-up: Can you do this in O(N) time and constant space?

解法思路

        2   4   6   2   5   
cur  0  2   4   8   6   13   cur[i]=max(last[i-1]+num[i],last[i-1])
last 0  0   2   4   8   8    last[i]=max(last[i-1],cur[i-1])

cur表示到这个下标(i)的最大值
last表示到前一个下标(i-1)的最大值


      2   4   0   0   5   
cur   2   4   2   4   9  
last  0   2   4   4   6


      5   1   1   5    
cur   5   1   6   10    
last  0   5   5   6  

      2   4   1   1   5   
cur   2   4   3   5   9  
last  0   2   4   4   6

*/


/**
 * 计算非连续最大和
 * @param {number[]} nums 
 * @returns {number}
 */
function maxNonAdjacentSum(nums) {
  //全局最大值
  let max = 0
  //pair=[cur[i-1],last[i-1]]
  let pair = [0, 0]
  for (let i = 0; i < nums.length; i++) {
    //nums[i]正值，选取
    if (nums[i] > 0) {
      let [a, b] = pair
      let cur = b + nums[i]
      //更新最大值
      if (cur > max) {
        max = cur
      }
      pair = [cur, Math.max(a, b)]
      continue
    }
    //nums[i]<=0不选取
    let [a, b] = pair
    pair = [b, Math.max(a, b)]
  }
  return max
}

console.log(maxNonAdjacentSum([2, 4, 6, 2, 5]))
console.log(maxNonAdjacentSum([5, 1, 1, 5]))