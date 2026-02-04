
class Solution(object):
    def twoSum(self, nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: List[int]
        """
        result={}
        for i,num in enumerate(nums):
            need=target-num
            if need in result:
        #if need in result:这里不能够换成if need in nums，因为如果你有一个数组[3，3]，那么如果target=6的话，由于nums一开始就包含了need=3，它就会返回自身也就是会输出结果[0，0]，而通过字典result的话，那么你第一次循环的时候由于result里面是空的所以他找不到need=3
                return[result[need],i]
            result[num]=i





学习到的点：
enumerate是python的一个内置函数可以用来返回一个包含计数的元组
seasons = ['Spring', 'Summer', 'Fall', 'Winter']
list(enumerate(seasons))
运行上面这两行代码之后结果输出：[(0, 'Spring'), (1, 'Summer'), (2, 'Fall'), (3, 'Winter')]

哈希表进行匹配的时候是通过key来匹配的value，result[num]=i，那么result里面的内容就是{num:i}