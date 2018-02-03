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
This program reads in the Titanic training and uses pandas to learn



"""
__author__ = 'michaelwild'

import sys
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
# =============================================================


version = "0.01"
program = "Titanic with Pandas"

testmode = False

# =============================================================
# Main program begins here

print(program, " Version ", version)

print("Attempting to load train CSV file...")

tdf = pd.read_csv('train fixed.csv')

print("...Aligning data....")

#tdf = tdf.dropna()

tdf['Gender'] = tdf['Sex'].map({'female': 0, 'male': 1}).astype(int)

tdf['Embarked'] = tdf['Embarked'].fillna('N')

tdf['Port'] = tdf['Embarked'].map({'C': 1, 'S': 2, 'Q': 3, 'N': 4}).astype(int)

tdf['Ags'] = tdf['Ags'].fillna(35)

fare_means = tdf.pivot_table('Fare', index='Pclass', aggfunc='mean')
tdf['Fare'] = tdf[['Fare', 'Pclass']].apply(lambda x:
                            fare_means[x['Pclass']] if pd.isnull(x['Fare'])
                            else x['Fare'], axis=1)

tdf = tdf.drop(['Name', 'Ticket', 'Cabin', 'Sex', 'Embarked'], axis=1)




cols = tdf.columns.tolist()
cols = [cols[1]] + cols[0:1] + cols[2:]
tdf = tdf[cols]

train_data = tdf.values

print (train_data)

print("...Modeling data...")

model = RandomForestClassifier(n_estimators = 100)

model = model.fit(train_data[0:,2:], train_data[0:,0])

print("Attempting to load test CSV file...")

ttdf = pd.read_csv('test fixed.csv')

print("...Aligning data....")

#tdf = tdf.dropna()

ttdf['Gender'] = ttdf['Sex'].map({'female': 0, 'male': 1}).astype(int)

ttdf['Embarked'] = ttdf['Embarked'].fillna('N')

ttdf['Port'] = ttdf['Embarked'].map({'C': 1, 'S': 2, 'Q': 3, 'N': 4}).astype(int)

ttdf['Ags'] = ttdf['Ags'].fillna(35)

fare_means = ttdf.pivot_table('Fare', index='Pclass', aggfunc='mean')
ttdf['Fare'] = ttdf[['Fare', 'Pclass']].apply(lambda x:
                            fare_means[x['Pclass']] if pd.isnull(x['Fare'])
                            else x['Fare'], axis=1)

ttdf = ttdf.drop(['Name', 'Ticket', 'Cabin', 'Sex', 'Embarked'], axis=1)

#cols = ttdf.columns.tolist()
#cols = [cols[1]] + cols[0:1] + cols[2:]
#ttdf = ttdf[cols]

test_data = ttdf.values

print (test_data)

print("...Apply Model...")

output = model.predict(test_data[:,1:])

print("...Creating Final...")

result = np.c_[test_data[:,0].astype(int), output.astype(int)]
df_result = pd.DataFrame(result[:,0:2], columns=['PassengerId', 'Survived'])

df_result.to_csv('final pandas.csv', index=False)

print("End of line....")
