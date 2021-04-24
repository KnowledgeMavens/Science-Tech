class Solution:
    def numIdenticalPairs(self, nums: List[int]) -> int:
        
        #create counter
        visited = {}
        counter = 0
        
        #loop through nums
        for i in nums:        
            if i in visited:
                counter += visited[i]
                visited[i] += 1
            else:
                visited[i] = 1
        return counter