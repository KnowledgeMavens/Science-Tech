group = int(input())
rooms = list(map(int, input().split()))
a = set()
b = set()
for i in rooms:
    if i not in a:
        a.add(i)
        b.add(i)
    else:
        b.discard(i)
print(b.pop())
#tst
