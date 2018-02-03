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

============================================================================================================
This program reads in the Titanic train or test set for the Kaggle Titanic 
contest

Had issue with 0x1D in data so brought set into EXCEL and resaved data. Issue 
gone.


"""
__author__ = 'michaelwild'

import sys
import csv
#import os
#import traceback
#import time

version = "0.01"
program = "Test Titanic"

testMode = True

"""
============================================================================================================
The main program begins here


"""

print(program," Version ", version)

print("File being processed....")

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
    
if (testMode):
   print(passengerList)

print("End of Line...")