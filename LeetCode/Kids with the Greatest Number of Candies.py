class Solution(object):
    def kidsWithCandies(self, candies, extraCandies):
        """
        :type candies: List[int]
        :type extraCandies: int
        :rtype: List[bool]
        """
        list = []
        most_candy = max(candies)
        
        for i in range(len(candies)):
            if candies[i] + extraCandies >= most_candy:
                list.append(True)
            else:
                list.append(False)
        return list