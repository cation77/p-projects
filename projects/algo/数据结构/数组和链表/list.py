# 初始化列表
# 无初始值
nums1: list[int] = []
# 有初始值
nums: list[int] = [1, 2, 3, 4, 5]

# 访问元素
num: int = nums[1]  # 访问索引 1 处的元素

# 更新元素
nums[1] = 0  # 将索引 1 处的元素更新为 0

# 清空列表
nums.clear()

# 在尾部添加元素
nums.append(1)
nums.append(3)
nums.append(2)
nums.append(5)
nums.append(4)

# 在中间插入元素
nums.insert(3, 6)  # 在索引 3 处插入数字 6

# 删除元素
nums.pop(3)  # 删除索引 3 处的元素

# 通过索引遍历列表
count = 0
for i in range(len(nums)):
    count += nums[i]

# 直接遍历列表元素
for num in nums:
    count += num

# 拼接两个列表
nums1: list[int] = [6, 8, 7, 10, 9]
nums += nums1  # 将列表 nums1 拼接到 nums 之后

# 排序列表
nums.sort()  # 排序后，列表元素从小到大排列


class MyList:
    def __init__(self):
        self._capacity: int = 10
        self._size: int = 0
        self._arr: list[int] = [0] * self._capacity
        self._extend_ratio: int = 2

    def size(self) -> int:
        return self._size

    def capacity(self) -> int:
        return self._capacity

    def get(self, index: int) -> int:
        if index < 0 or index >= self._size:
            raise IndexError("Index out of range")
        return self._arr[index]

    def set(self, num: int, index: int):
        if index < 0 or index >= self._size:
            raise IndexError("Index out of range")
        self._arr[index] = num
        self._size += 1

    def add(self, num: int):
        if self.size() == self.capacity():
            self.extend_capacity()
        self._arr[self._size] = num
        self._size += 1
