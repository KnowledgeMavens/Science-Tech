def checker():
    sub = set(map(int, input().split()))
    if sub.issubset(a):
        if len(a) == len(sub):
            l.append(0)
        else:
            l.append(1)
    else:
        l.append(0)

a = set(map(int, input().split()))
n = int(input())
l = []
for i in range(n):
    checker()
if all(l) == 1:
    print(True)
else:
    print(False)