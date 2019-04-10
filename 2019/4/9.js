/* 
Given an array of time intervals (start, end) for classroom lectures (possibly overlapping), find the minimum number of rooms required.

For example, given [(30, 75), (0, 50), (60, 150)], you should return 2.
*/

/**
 * 找到所需教室的数量
 * @param {[][]} arr 讲课时间段的序列 
 */
function howMany(arr) {
  //一旦有时间交叉，则需要增加教室，问题转换为找交叉
  if (!arr.length) return 0
  //先给讲课时间排序
  arr.sort((a, b) => a[0] - b[0])
  //教室列表
  let classrooms = [
    [] //第一个教室，数组元素表示教室中排布
  ]
  //遍历查看是否有重叠
  arr.forEach(([start, end]) => {
    for (let i = 0; i < classrooms.length; i++) {
      //如果没有上节课直接排到教室课表
      let room = classrooms[i]
      if (!room.length) {
        room.push([start, end])
        return
      }
      //如果最后一堂课和这个课不冲突，直接排入课表
      let lastLecture = room[room.length - 1]
      if (lastLecture[1] < start) {
        room.push([start, end])
        return
      }
      //冲突了，则尝试下一个教室
      continue
    }
    //所有教室都冲突，排到一个新教室
    classrooms.push([[start, end]])
  })
  //返回教室的数量
  return classrooms.length
}

console.log(howMany([[30, 75], [0, 50], [60, 150]]))