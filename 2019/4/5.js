/*
This problem was asked by Twitter.

You run an e-commerce website and want to record the last N order ids in a log. Implement a data structure to accomplish this, with the following API:

record(order_id): adds the order_id to the log
get_last(i): gets the ith last element from the log. i is guaranteed to be smaller than or equal to N.
You should be as efficient with time and space as possible.
*/

class LatestRecorder {
  constructor(n) {
    //申请空间为n的数组
    this.arr = Array(n).fill(0)
    //记录结束点
    this.end = 0
  }

  record(id) {
    //记录到结束点，并且结束点后移
    this.arr[this.end] = id
    this.end++

    //如果超出数组则回到开始
    if (this.end == this.arr.length) {
      this.end = 0
    }
  }
  
  get_last(i) {   
    //按规则算出第i个所在坐标并返回
    if (i <= this.end) {
      return this.arr[this.end - i]
    }
    return this.arr[this.arr.length + this.end - i]
  }
}

let recorder = new LatestRecorder(10)

for(let i=0;i<35;i++){
  recorder.record(i)
}

console.log(recorder.get_last(1)) //34
console.log(recorder.get_last(6)) //34-5