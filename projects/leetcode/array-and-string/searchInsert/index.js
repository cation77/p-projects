function searchInsert(nums, target) {
  let left = 0
  let right = nums.length - 1
  while (left <= right) {
    // const mid = (left + right) >> 1
    //数据范围0~255
    //假定left = 200;right = 250;
    //则left + right = 450 > 255，此时已经溢出了
    // 200 + (250-200)/2 = 225
    //此方法绝对不会溢出，最好写成这样
    const mid = left + Math.floor((right - left) / 2)
    if (target === nums[mid]) {
      return mid
    } else if (target < nums[mid]) {
      right = mid - 1
    } else if (target > nums[mid]) {
      left = mid + 1
    }
  }
  return left
}

console.log(searchInsert([1, 3, 5, 6], 7))

export default searchInsert
