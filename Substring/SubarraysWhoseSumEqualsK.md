




这时间的复杂度事O(n2)，通过遍历起点，固定终点，然后再在里面进行遍历每一个数值，让他们进行相加得到一个和，判断这个和等不等于k，如果等于，就将count加一，最后循环完饭回count

class Solution:
    def subarraySum(self, nums: List[int], k: int) -> int:
        n=len(nums)
        count=0
        for start in range(n):
            sum=0
            for end in range(start,n):
                sum+=nums[end]
                if sum == k:
                    count+=1
        return count

这个的思路是通过发现每一个数都可以通过当前的前缀和-前一个数的前缀和得到，那么一个数组i到j的和，就可以通过j的前缀和减去（i-1）的前缀和得到，那么我们通过存储一个hash表，将之前算过的前缀和放进去，当算到下一个的时候，如果发现下一个的前缀和减去k得到的值有存在于hash表的话，那就说明确实存在数组的和能够得到k

class Solution:
    def subarraySum(self, nums: List[int], k: int) -> int:
        prefix_sum = 0
        count = 0
        hashmap = {0: 1}

        for num in nums:
            prefix_sum += num
            
            if prefix_sum - k in hashmap:
                count += hashmap[prefix_sum - k]

            hashmap[prefix_sum] = hashmap.get(prefix_sum, 0) + 1

        return count