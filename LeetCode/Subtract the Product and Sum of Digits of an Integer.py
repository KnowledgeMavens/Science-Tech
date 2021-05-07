class Solution:
    def subtractProductAndSum(self, n: int) -> int:
        prodTotal = 1
        sumTotal = 0
        numbers = str(n)
    
        #loop through numbers and multiple each i and set to prodTotal, and sum of each i           set to sumTotal
        for i in numbers:
            prodTotal *= int(i)
            sumTotal += int(i)
        #subtract result of prodTotal from result of sumTotal
        return prodTotal - sumTotal