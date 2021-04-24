from itertools import combinations
st,n = map(str(input().split()))
n=int(n)
m=combinations_with_replacement(sorted(st),n)
for i in m:
    print("".join(i))