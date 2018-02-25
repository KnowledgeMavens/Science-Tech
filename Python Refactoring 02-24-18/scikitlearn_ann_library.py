
import os
import sys
import traceback
import time

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt 
import itertools

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neural_network import MLPClassifier    
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score

class ScikitLearnANNLibrary(object):

    def __init__(self, df_name):
        self.df_name1 = df_name;

                    
    def read_data(self, file_name, column_name=None, encoding_unicode=None):
        '''
        read data from a csv file
        :param file_name: csv file path and name
        :param column_name: csv file columns name
        :param encoding_unicode: csv file encoding unicode
        :return data frame
        '''
        df_file_name = None
        try:
            project_directory_path = os.path.dirname(sys.argv[0])  
            csv_file_path_name = os.path.join(project_directory_path, file_name)  
            if column_name is None:
                df_file_name = pd.read_csv(filepath_or_buffer=csv_file_path_name, sep=",", encoding=encoding_unicode)   
            else:
                df_file_name = pd.read_csv(filepath_or_buffer=csv_file_path_name, sep=",", names=column_name, encoding=encoding_unicode)               
        except Exception:
            self.print_exception_message()
        return df_file_name
    
    def show_file_information(self, df_name):
        '''
        show data file information
        :param df_name: data frame
        :return none
        '''
        try:
            print("FILE INFORMATION:")
            df_name.info()
            print()
        except Exception:
            self.print_exception_message()
                       
    def show_file_data(self, df_name):
        '''
        print data file
        :param df_name: data frame
        :return none
        '''
        try:
            print("FILE DATA:")
            print(df_name)
            print()
        except Exception:
            self.print_exception_message()
        
    def show_descriptive_statistics(self, df_name):
        '''
        show descriptive statistics for numerical labels (features)
        :param df_name: data frame
        :return none
        '''
        try:
            descriptive_statistics = df_name.describe().transpose()
            print("DESCRIPTIVE STATISTICS:")
            print(descriptive_statistics)
            print()
        except Exception:
            self.print_exception_message()
        
#         FOR CATEGORICAL COLUMNS WE NEED TO DO FREQUENCY DISTRIBUTION?
#         result = df_input_file["categorical"].value_counts()
    
    def select_label_target(self, df_name, target_column):
        '''
        select x label and y target data frames by target column
        :param df_name: data frame
        :param target_column: target column name
        :return x label and y target data frames
        '''
        try:
            X_label = df_name.drop(labels=target_column, axis=1)
            Y_target = df_name[target_column]            
        except Exception:
            self.print_exception_message()
        return X_label, Y_target
    
    def train_test_split_data(self, X_label, Y_target, test_size_percentage, random_state):       
        '''
        select x and y train and test data
        :param X_label: x label data frame
        :param Y_target: y label data frame
        :param test_size_percentage: test size in percentage (%)
        :param random_state: random state initial value
        return: x and y train and test data
        '''
        try:
            X_label_train, X_label_test, Y_target_train, Y_target_test = train_test_split(X_label, Y_target, test_size=test_size_percentage/100, stratify=Y_target, random_state=random_state)
        except Exception:
            self.print_exception_message()
        return X_label_train, X_label_test, Y_target_train, Y_target_test
    
    def standard_scaler_data(self, X_label_train, X_label_test):
        '''
        select x label train and test scaled
        :param X_label_train: x label train data frame
        :param X_label_test: x label test data frame
        :return x label train and test scaled
        '''
        try:
            scaler = StandardScaler()
            scaler.fit(X_label_train)
            X_label_train_scaled = scaler.transform(X_label_train)
            X_label_test_scaled = scaler.transform(X_label_test)
        except Exception:
            self.print_exception_message()
        return X_label_train_scaled, X_label_test_scaled
 
    def training_model(self, X_label_train_scaled, Y_label_train, hidden_layer_neuron_sizes, activation_function, solver_optimization, maximum_iteration, random_state):        
        '''
        create and fit the multi-layer perceptron classifier (model)
        :param X_label_train_scaled: x label train scaled
        :param Y_label_train: y label train
        :param hidden_layer_neuron_sizes: hidden layer neuron sizes
        :param activation_function: activation function
        :param solver_optimization: solver optimization
        :param maximum_iteration: maximum iteration
        :param random_state: random state initial value
        :return multi-layer perceptron classifier (model)
        '''
        try:
            mlp_classifier = MLPClassifier(hidden_layer_sizes=hidden_layer_neuron_sizes, activation=activation_function, solver=solver_optimization, max_iter=maximum_iteration, random_state=random_state)
            mlp_classifier.fit(X_label_train_scaled, Y_label_train)
        except Exception:
            self.print_exception_message()
        return mlp_classifier    
    
    def predicting_model(self, mlp_classifier, X_label_test_scaled):
        '''
        select y target predicted data frame
        :param mlp_classifier: multi-layer perceptron classifier 
        :param X_label_test_scaled: x label test scaled
        :return y target predicted
        '''
        try:
            Y_target_predicted = mlp_classifier.predict(X_label_test_scaled)
        except Exception:
            self.print_exception_message()
        return Y_target_predicted
    
    def evaluating_model(self, Y_target_test, Y_target_predicted):
        '''
        print confusion matrix, classification report and accuracy score values
        :param Y_target_test: y target test
        :param Y_target_predicted: y target predicted
        :return none
        '''
        try:
            confusion_matrix_value = confusion_matrix(Y_target_test, Y_target_predicted)
            print("CONFUSION MATRIX:")
            print(confusion_matrix_value)
            print()
            
            classification_report_result = classification_report(Y_target_test, Y_target_predicted)        
            print('CLASSIFICATION REPORT:')
            print(classification_report_result)
            print()        
    
            accuracy_score_value = accuracy_score(Y_target_test, Y_target_predicted) * 100
            accuracy_score_value = float("{0:.2f}".format(accuracy_score_value))
            print("ACCURACY SCORE:")        
            print( "{} %".format(accuracy_score_value))
            print()
        except Exception:
            self.print_exception_message()
    
#     def plot_confusion_matrix(confusion_matrix, y_class, plot_title, plot_y_label, plot_x_label, normalize=False):
#         """
#         plot the confusion matrix.
#         :param confusion_matrix: confusion matrix value
#         :param y_class: target unique class name
#         :param plot_title: plot title
#         :param plot_y_label: plot y label
#         :param plot_x_label: plot x label
#         :param normalize: default to false
#         :return: None
#         """
#         try:
#             plt.figure()
#             plt.imshow(confusion_matrix, interpolation='nearest', cmap=plt.cm.Blues)
#             plt.title(plot_title)
#             plt.colorbar()
#             tick_marks = np.arange(len(y_class))
#             plt.xticks(tick_marks, y_class, rotation=45)
#             plt.yticks(tick_marks, y_class)
#             if normalize:
#                 confusion_matrix = confusion_matrix.astype('float') / confusion_matrix.sum(axis=1)[:, np.newaxis]
#                 print("NORMALIZED CONFUSION MATRIX")
#             else:
#                 print('CONFUSION MATRIX WITHOUT NORMALIZATION')    
#             thresh = confusion_matrix.max() / 2.
#             for i, j in itertools.product(range(confusion_matrix.shape[0]), range(confusion_matrix.shape[1])):
#                 plt.text(j, i, confusion_matrix[i, j],
#                          horizontalalignment="center",
#                          color="white" if confusion_matrix[i, j] > thresh else "black")
#             plt.ylabel(plot_y_label)
#             plt.xlabel(plot_x_label)
#             plt.tight_layout()    
#             plt.show()
#         except Exception as ex:
#             print( "An error occurred: {}".format(ex))   

    def print_exception_message(self, message_orientation="horizontal"):
        """
        print full exception message
        :param message_orientation: horizontal or vertical
        :return none
        """
        try:
            exc_type, exc_value, exc_tb = sys.exc_info()            
            file_name, line_number, procedure_name, line_code = traceback.extract_tb(exc_tb)[-1]       
            time_stamp = " [Time Stamp]: " + str(time.strftime("%Y-%m-%d %I:%M:%S %p")) 
            file_name = " [File Name]: " + str(file_name)
            procedure_name = " [Procedure Name]: " + str(procedure_name)
            error_message = " [Error Message]: " + str(exc_value)        
            error_type = " [Error Type]: " + str(exc_type)                    
            line_number = " [Line Number]: " + str(line_number)                
            line_code = " [Line Code]: " + str(line_code) 
            if (message_orientation == "horizontal"):
                print( "An error occurred:{};{};{};{};{};{};{}".format(time_stamp, file_name, procedure_name, error_message, error_type, line_number, line_code))
            elif (message_orientation == "vertical"):
                print( "An error occurred:\n{}\n{}\n{}\n{}\n{}\n{}\n{}".format(time_stamp, file_name, procedure_name, error_message, error_type, line_number, line_code))
            else:
                pass                    
        except Exception:
            pass