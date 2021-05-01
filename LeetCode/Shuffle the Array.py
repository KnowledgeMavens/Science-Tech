class Solution(object):
    def shuffle(self, nums, n):
        """
        :type nums: List[int]
        :type n: int
        :rtype: List[int]
         """
        
        result = []
        
        for i in range(n):
            result.append(nums[i])
            result.append(nums[i+n])
        return result