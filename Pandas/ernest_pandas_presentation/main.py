# -*- coding:latin1 -*-

# Omin212 Presentation
# G:\Visual WWW\Visual WWW Clients\Omni212 Freelance Instructor\Docs

# Preparing and Cleaning Data for Machine Learning - APPLY THIS PAPER AND UPDATE THIS CODE - VERY IMPORTANT BEFORE PUBLISHING!
# https://www.dataquest.io/blog/machine-learning-preparing-data/

import os
import sys
import datetime

import pandas as pd
import numpy as np

import config

def main():
    print("USING PANDAS LIBRARY FOR DATA MANIPULATION AND CLEANSING:")
    print()

    project_directory_path = os.path.dirname(sys.argv[0])  
    print("PROJECT DIRECTORY PATH:")
    print(project_directory_path)
    print()
     
    input_file_path = os.path.join(project_directory_path, config.INPUT_FILE_PATH)  
    print("INPUT FILE PATH:")
    print(input_file_path)
    print()
    
    output_file_path = os.path.join(project_directory_path, config.OUTPUT_FILE_PATH)  
    print("OUTPUT FILE PATH:")
    print(output_file_path)
    print()
    
    df_input_file = pd.read_csv(filepath_or_buffer=input_file_path, sep=",", encoding="latin1")    
    print("PANDAS DATA FRAME FOR INPUT FILE :")
    print(df_input_file)
    print()

    result = df_input_file.shape
    print("NUMBER OF ROWS AND COLUMNS:")
    print(result)
    print()
    
    print("FILE INFORMATION:")
    df_input_file.info()
    print()
        
    result = df_input_file.describe()
    print("SUMMARY DESCRIPTIVE STATS FOR NUMERICAL COLUMNS:")
    print(result)
    print()
    
    result = df_input_file["four"].value_counts()
    print("FREQUENCY DISTRIBUTION FOR CATEGORICAL COLUMN FOUR:")
    print(result)
    print()
    
    result = df_input_file["eight"].value_counts()
    print("FREQUENCY DISTRIBUTION FOR CATEGORICAL COLUMN EIGHT:")
    print(result)
    print()
    
    result = df_input_file.apply(lambda x: sum(x.isnull()), axis=0) 
    print("MISSING VALUES (NAN) BY COLUMNS:")
    print(result)
    print()
    
    result = df_input_file.duplicated()
    print("DUPLICATED ROWS:")
    print(result)       
    print()
    
    df_input_file = df_input_file.drop_duplicates(keep="first")
    print("DROP DUPLICATED ROWS AND KEEP THE FIRST:")
    print(df_input_file)       
    print()
    
    df_input_file = df_input_file.fillna(df_input_file.mean()["one":"two"], inplace=True)
    print("REPLACE NAN VALUES WITH THE MEAN VALUE IN COLUMNS ONE AND TWO:")
    print(df_input_file)       
    print()
    
    df_input_file = df_input_file.fillna(df_input_file.median()[:"three"], inplace=True)
    print("REPLACE NAN VALUES WITH THE MEDIAN VALUE IN COLUMN THREE:")
    print(df_input_file)       
    print()
    
    df_input_file["four"] = df_input_file["four"].fillna("club")    
    print("REPLACE NAN VALUES WITH THE 'CLUB' STRING IN COLUMN FOUR:")
    print(df_input_file)       
    print()    
    
    df_input_file["five"] = df_input_file["five"].fillna(True)
    print("REPLACE NAN VALUES WITH THE TRUE BOOLEAN IN COLUMN FIVE:")
    print(df_input_file)       
    print()      
    
    now = datetime.datetime.now().strftime("%m/%d/%Y")
    df_input_file["six"] = df_input_file["six"].fillna(str(now))
    df_input_file["six"] = pd.to_datetime(df_input_file["six"])    
    print("REPLACE NAN VALUES WITH THE CURRENT DATE IN COLUMN SIX:")
    print(df_input_file)       
    print()   
    
    df_input_file["seven"] = df_input_file["seven"].fillna("£0.0")
    print("REPLACE NAN VALUES WITH THE  £0.0 IN COLUMN SEVEN:")
    print(df_input_file)       
    print()   
    
    df_input_file["seven"] = df_input_file["seven"].map(lambda x: str(x)[1:])
    print("REMOVE THE FIRST CHARACTER (ENGLAND POUND SYMBOL) IN COLUMN SEVEN:")
    print(df_input_file)       
    print()   

    df_input_file["eight"].replace(to_replace=dict(BMC="BioMed Central", ACS="Amercian Chemical Society", BPS="Biophysical Society", CJS="Cadmus Journal Services", FM="Frontiers Media"), inplace=True)
    print("SUBSTITUTE THE ABBREVIATION IN COLUMN EIGHT:")
    print(df_input_file)       
    print()         
    
    x = df_input_file.drop(labels="eight", axis=1)
    print("X: LABELS (DataFrame)")
    print(x)
    print()    
    
    x = df_input_file.iloc[:, 0:6].values
    print("X: LABELS (Serie) ")
    print(x)
    print() 
    
    y = df_input_file["eight"]
    print("y: TARGET (DataFrame")
    print(y)
    print()   
    
    y = df_input_file.iloc[:, 7].values
    print("y: TARGET (Serie) ")
    print(y)
    print() 
                        
    df_input_file.to_csv(output_file_path, encoding="latin1")   
    print("THE OUTPUT FILE HAD BEEN CREATED SUCCESSFULLY:")
    print(output_file_path)
    print()   
    
if __name__ == '__main__':
    main()