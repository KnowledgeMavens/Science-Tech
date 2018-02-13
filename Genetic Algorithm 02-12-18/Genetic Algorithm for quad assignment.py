import csv
import random
d = []
w = []
#read in the distances matrix
Reader1 = csv.reader(open("HospitalDistance.csv", "rb"), delimiter=",")
for row in Reader1:
    print (row)
    d.append(map(int, row))
#read in the flows matrix    
Reader2 = csv.reader(open("HospitalFlow.csv", "rb"), delimiter=",")
for row in Reader2:
    print (row)
    w.append(map(int, row))

########################################################################################    
#############This calculates the objective function#############
    
def objective(phi):
    OBJ = []
    Obj = 0
    i = 0
    while i < 19:   
        j = 0
        while j < 19:
            ##print('i,j', i,j)
            #pint('phi',phi)
            #print('phi[i][j]',phi[i],phi[j])
            #print(d[phi[i]][phi[j]])
            #print('w[i]w[j]',w[i][j])
            obj = w[i][j]*d[phi[i]][phi[j]]  ##notice you only need to
            Obj = Obj + obj
            j = j + 1
        i = i + 1    
    return[Obj]
#########################################################################################

##############This optimizes the original population using 2opt method###################
#####This is not part of genetic algorithm, but it is another sampling method############
def twoopt(phi):
    n = len(phi)

    #Calculate the objective function of the original chromosome
    StartingObj = objective(phi)
    BestNeighborObj = StartingObj
    BestNeighborPhi = phi

    #Generate all neighbors of the starting tour
    for i in range(0,n-1):
        for j in range(i+1,n):

            #Copy the starting chromosome
            NeighborPhi = phi[:] 

            #Swap two nucleotides and reverse the order of nucleotides between them.
            NeighborPhi[i:j] = phi[i:j][::-1] 

            #Calculate the length of neighbor chromosome.                                   
            length = objective(NeighborPhi)
            if length < BestNeighborObj:
                BestNeighborObj = length
                BestNeighborPhi = NeighborPhi

    #If the best neighbor chromosome is better than the starting chromosome, run another TwoOPT with this best neighbor as
    #the starting chromosome. Otherwise, the starting chromosome is the best you can get using 2OPT. 
    if BestNeighborObj < StartingObj:
        [BestObj, BestPhi] = twoopt(BestNeighborPhi)                                                                   
    else:
        [BestObj, BestPhi] = [StartingObj, phi]
        
    return [BestObj, BestPhi]     
#######################################################################################################
####################This section creates children from the original population#######################
def children(BestChromosome):
    n=len(BestChromosome)
    j = 0
    while j < n:   #mates individuals randomly n times
        a=int(random.uniform(0,n))#which chromosome we will take as parent1
        b=int(random.uniform(0,n))#which chromosome we will take as parent2
        i = 0
        while i < 10*n: #creates children and replaces one of the parents if the child is better 10*n times
            child=[]
            c=int(random.uniform(0,len(BestChromosome[0]))) #which of the 19 nucleotides to move from parent1
            d = BestChromosome[a].index(c)  #location of the nucleotide to be moved from parent 1
            e = BestChromosome[b].index(c)  #location of the same nucleotide in parent 2
            child.extend(BestChromosome[a])
            child.pop(d)
            child.insert(e,BestChromosome[a][d])    #each child is BestChromosome[a] with one nucleotide changed
            Obj=objective(child)
            Parent1Obj=objective(BestChromosome[a])
            Parent2Obj=objective(BestChromosome[b])
            if Obj < Parent1Obj: #a parent may be changed with a child if the child is better
                BestChromosome[a]=child
            else:
                if Obj < Parent2Obj:
                    BestChromosome[b]=child
            i = i + 1
        j = j + 1
    return[BestChromosome]
#######################################################################################################
######################This performs a mutation######################################################
def mutate(BestChromosome):
    n=len(BestChromosome[0])
    j = 0
    while j < len(BestChromosome): # this possibly mutates some or all members of the population  
        a=int(random.uniform(0,len(BestChromosome)))#which chromosome will we mutate
        i = 0
        while i < 19:    #this possibly mutates 19 out of the 19 nucleotides 
            mutant=[]
            c=int(random.uniform(0,len(BestChromosome[0]))) #which nucleotide to move
            d = BestChromosome[a].index(c)  #location of the nucleotide
            f=int(random.uniform(0,len(BestChromosome[0]))) #where to move nucleotide
            mutant.extend(BestChromosome[a])
            g = mutant.pop(d)
            mutant.insert(f,g)    #new mutant chromosome
            Obj=objective(mutant)
            OriginalObj=objective(BestChromosome[a])
            if Obj < OriginalObj: #the mutant only survives if it is better than the original
                BestChromosome[a]=mutant
                print ('mutant')
            i = i + 1
        j = j + 1
    return[BestChromosome]
#################################################################################################
####################After reading in the csv files, this is where the action starts############
generations = 0
BestObjective=[]
BestChromosome=[]
Obj=[]
while generations < 5:   ###you can have more than 5 generations if you like
    ######################### This generates populations#####################################
    print ('Generation '+ str(generations + 1))
    n=500 #n is the number of chromosomes (the population). You can make this smaller to run faster
    PHI=[]
    for k in range(n):
        R=range(19) ##our chromosomes contain 19 nucleotides
        l=0
        phi=[] ##phi[] is a list of chromosomes
        while l < 19: #########creates random sets of chromosomes
            a = int(random.uniform(0, len(R))) ####pick one of the nucleotides randomly
            phi.append(R.pop(a)) ###when you pick a nucleotide, you can't use it again, so remove it from the list
            l = l + 1
        OBJECTIVE=objective(phi) ###this calls the fucntion that calculates the objective function (calculates how good is the chromosome)
        Obj.append(OBJECTIVE) ### record in a list the objective functioin next to the chromosome
        PHI.append(phi)
    PHI.extend(BestChromosome) ###extend adds a list to a list. Append adds an element to a list
    Obj.extend(BestObjective)
    m = 0
    while m < len(PHI):   ##print the population with their corresponding objective functions
        print (PHI[m], Obj[m]) 
        m = m + 1
        
    ####################################################################################################
    ####################2-Opt optimization - this is not genetic algorithm##############################
    print ('2-Opt optimized population ' + str(generations + 1))
    BestChromosome=[]
    BestObjective=[]
    n = len(PHI)
    for member in range(n):
        [BestObj, BestPhi]=twoopt(PHI[member])  #this runs 2-Opt optimization
        BestChromosome.append(BestPhi)
        BestObjective.append(BestObj)
        print (BestPhi, BestObj)
    ####################################################################################################
    #########################This mates the population##################################################        
    BestPhi = children(BestChromosome)    #this creates children which turn into parents
    i = 0
    print ('Generation ' + str(generations + 1) + ' Children')
    while i < len(BestPhi[0]):
        BestObj = objective(BestPhi[0][i])
        print (BestPhi[0][i], BestObj)
        i = i + 1    
    #####################################################################################################
    ######################This calls the mutation#######################################################    
    BestChromosome = mutate(BestPhi[0])    #this creates children which turn into parents
    i = 0
    print ('Mutants '+ str(generations + 1))
    BestOBJ=[]
    while i < len(BestPhi[0]):
        BestObj = objective(BestChromosome[0][i])
        BestOBJ.append(BestObj)
        print (BestPhi[0][i], BestObj)
        i = i + 1
    ####################################################################################################
    #################This sorts the population and removes the worst ~50% (found by the median)#########
    print ('Best Chromosomes '+ str(generations +1))
    n=int(len(BestOBJ)/2) 
    A=zip(BestOBJ,BestPhi[0])
    A.sort()
    x=[x[1] for x in A]
    y=[y[0] for y in A]
    i = 0
    BestObjective=[]
    BestChromosome=[]
    while i < n:
        a = y.pop(0)
        b = x.pop(0)
        BestObjective.append(a)
        BestChromosome.append(b)
        print (BestObjective[i], BestChromosome[i])
        i = i + 1
    ####################################################################################################
    generations = generations + 1


        
