class Solution(object):
    def runningSum(self, nums):
        """
        :type nums: List[int]
        :rtype: List[int]
        """
        
        counter = 0
        list = []
        
        for i in nums:
            counter = i + counter
            list.append(counter)
        return(list)