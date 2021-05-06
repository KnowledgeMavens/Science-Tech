class Solution:
    def maximumWealth(self, accounts: List[List[int]]) -> int:
        maxWealth = 0
        for i in range(len(accounts)):
            totalWealth = sum(accounts[i])
            maxWealth = max(maxWealth,totalWealth)
        return maxWealth