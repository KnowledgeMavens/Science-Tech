#!/usr/bin/env python
"""
    Copyright 2017 by Michael Wild (alohawild)
    
    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at
        http://www.apache.org/licenses/LICENSE-2.0
        
    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

==============================================================================
This program reads in the Titanic train set and tries to create a function
to determine survivors, read in the test set, and create a final version
 


"""
__author__ = 'michaelwild'

import sys
import csv
import numpy as np
#import os
#import traceback
#import time

def randomChange():
    
    return ((np.random.uniform()* 2) -1)
#    return ((np.random.uniform()* 1) -0)

def randomCoef(coef):
    
    return (np.random.randint(len(coef)))

def theMeasure(train,coef):
    
    for row in train:
        resultsValue = 0.0
        x = 0
        for coefValue in coef:
            resultsValue = coefValue*row[x] + resultsValue
            x = x + 1
        row.append(resultsValue)
       
    return
            
def thePrize(train):
    
    previousTotal = 0.0
    newTotal = 0.0
    
    for row in train:
    
        newValue = row[len(row) - 1] # New value at end of list
        previous = row[len(row) - 2] # Old value next value
        survived = row[len(row) - 4] # Survived two more in
        previousTotal = previousTotal + abs(previous-survived)
        newTotal = newTotal + abs(newValue - survived)
  
    theChoice = (newTotal<previousTotal)
    
    for row in train:
        if (theChoice):
            del row[len(row) - 2]
        else:
            del row[len(row) - 1]
        
    return (theChoice)

def theResults(train):
    
    right = 0
    
    for row in train:
    
        finalValue = row[len(row) - 1] # Final set has value at end
        survived = row[len(row) - 3] # Survived is here
        
        if (abs(finalValue -survived)< 0.5):
            right = right + 1
 
    return (right)

def alignData(row):
     
    # if any cabin value then it is good
    if (row['Cabin']):
        cabinValue = 0.0
    else:
        cabinValue = 1.0

    # force to logical value 'Is not male?'        
    if ((row['Sex'] == 'male')):
        sexValue = 0.0
    else:
        sexValue = 1.0

    # try to force age to value        
    try:
        ageValue = int(row['Ags']) / 100.0
    except:
        ageValue = 0.0
        
    # try to force age to value        
    try:
        fareValue = (row['Fare']) / 1000.0
    except:
        fareValue = 0.0

    if ((row['Pclass']=='1')):
        classValue = 1.0
    else:
        if ((row['Pclass']=='2')): 
               classValue = 0.5
        else:
               classValue = 0.0


    alignRow = [
                    cabinValue, # A
                    sexValue, #B
                    ageValue, #C
                    fareValue, #D
                    classValue #E

                   ]
    
    return(alignRow)


"""
#=============================================================================
"""

version = "1.01"
program = "Train"

testMode = False

"""
==============================================================================
The main program begins here


"""

print(program," Version ", version)

print("Training File being processed....")

passengerList = []

try:
    csvFile = open('train fixed.csv', encoding='utf-8')

except IOError:
    print("Can't open file")
    sys.exit(1)

reader = csv.DictReader(csvFile)

for row in reader:
    if (testMode):
       print(row['PassengerId'], row['Name'])
    passengerList.append(row)
csvFile.close()
    
if (testMode):
   print(passengerList)
   
print("Training File loaded....")
   
# Now that we have the data lets create a working set
print("Making working set....")

trainingList = []

for row in passengerList:
    
    trainingLine = []
    trainingLine = alignData(row);
    
    #Just made it easier to use        
    if ((row['Survived'] == '1')):
        survivedValue = 1.0
    else:
        survivedValue = 0.0
        
    trainingLine.append(survivedValue)
    trainingLine.append(row['PassengerId'])
    
    trainingList.append(trainingLine)   

if (testMode):
   print(trainingList)
   
""" 
Our assumption is that this formula is good:
    a*cabinValue + b*sexValue + c*ageValue .... => survived chances
    
    where a,b,c ... are real number between -1 and 1, uniformly distibuted
    
This is a silly assumption but it is worth a random walk

We will start with random values for a, b, c, ... and then randomly change one
value and test if the results are better. 
"""

# Create coef vales that count the same as data, i.e -2 length of row in 
# training list
row = trainingList[1]
coefValues = []
for i in range(0, (len(row)-2)):
    coefValues.append(randomChange())

if (testMode):
   print(coefValues)

print("Working set made....")

walking = 15001 #loop -1 this value

print("Running Epochs" )           

theMeasure(trainingList,coefValues) # create initial values
previousRight = -1

for i in range(1, walking):

    if (testMode):
        print(trainingList)
   
    changeValues = coefValues.copy()
    changeValues[randomCoef(coefValues)] = randomChange()
    theMeasure(trainingList,changeValues) # add new values to list
    if (thePrize(trainingList)): # now check them and rebuild list to match
        coefValues = changeValues.copy()
        print("Epoch = ",i)     
        print("Change!:",coefValues) 
    
    right = theResults(trainingList)
    if not(previousRight==right):   
        percentRight = 100 * (right / len(trainingList))
        print("Number right :",right," Percent:", percentRight)
        previousRight = right
                
percentRight = 100 * (right / len(trainingList))
print("Number right :",right," Percent:", percentRight)


print("Final Values:")
print(coefValues)           

print("Test File being processed....")

#testMode = True

passengerTestList = []

try:
    csvFile = open('test fixed.csv', encoding='utf-8')

except IOError:
    print("Can't open file")
    sys.exit(1)

reader = csv.DictReader(csvFile)

for row in reader:
    if (testMode):
       print(row['PassengerId'], row['Name'])
    passengerTestList.append(row)
csvFile.close()
    
if (testMode):
   print(passengerTestList)
   
print("Test File loaded....")

#testMode = True

finalAnswer = []

for row in passengerTestList:
    
    testLine = alignData(row)
    x = 0
    resultsValue = 0.0
    for coefValue in coefValues:
        resultsValue = coefValue*testLine[x] + resultsValue
        x = x + 1
    if (resultsValue > 0.5):
        finalSurvived = '1'
    else:
        finalSurvived = '0'
    finalLine = [row['PassengerId'], finalSurvived]
    if (testMode):
       print(finalLine) 
    finalAnswer.append(finalLine)
  
print("Writing out final answer!")   
    
try:
    finalFile = open('final answer.csv', encoding='utf-8', mode='w')

except IOError:
    print("Can't open file")
    sys.exit(1)   

finalFile.write('PassengerId,Survived\n')
for row in finalAnswer:
    finalFile.write(row[0])
    finalFile.write(',')
    finalFile.write(row[1])
    finalFile.write('\n')
    
finalFile.close()

print("End of Line...")