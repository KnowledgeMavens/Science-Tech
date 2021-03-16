a=input()
A=set(map(int,input().split()))

for i in range(int(input())):  
    b=input().split()
    B=set(map(int,input().split()))
    if(b[0] == "intersection_update"):
        A.intersection_update(B)
    elif(b[0] == "update"):
        A.update(B)
    elif(b[0] == "symmetric_difference_update"):
        A.symmetric_difference_update(B)
    elif(b[0] == "difference_update"):
        A.difference_update(B) 
print(sum(A))