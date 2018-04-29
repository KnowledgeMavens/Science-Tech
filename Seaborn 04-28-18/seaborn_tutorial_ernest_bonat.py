
# seaborn: statistical data visualization
# https://seaborn.pydata.org/

import numpy as np
import pandas as pd
from scipy import stats  
import matplotlib.pyplot as plt
import seaborn as sns

def main():
    
#     WHY SEABORN FOR DATA SCIENCE PROJECTS:
#     1. SPECIFIC DEVELOPED FOR STATISTICAL GRAPHICS
#     2. VERY EASY TO CODE - COUPLE OF LINES OF CODE
    
#     SIN PLOT
#     flip = 1
#     x = np.linspace(0, 14, 100)
#     for i in range(1, 7):
#         plt.plot(x, np.sin(x + i * .5) * (7 - i) * flip)
#     plt.show()
    
#     BOXPLOT STYLE
#     sns.set_style("whitegrid")
#     data = np.random.normal(size=(20, 6)) + np.arange(6) / 2
#     sns.boxplot(data=data)
#     plt.show()
    
#     VIOLIN PLOT
#     sns.set_style("whitegrid")
#     data = np.random.normal(size=(20, 6)) + np.arange(6) / 2
#     f, ax = plt.subplots()
#     sns.violinplot(data=data)
#     plt.show()

#     UNIVARIATE DISTRIBUTIONS        
#     x = np.random.normal(size=100)
#     sns.distplot(x)
#     plt.show()
    
#     HISTOGRAMS
#     x = np.random.normal(size=100)
#     sns.distplot(x, kde=False, rug=True);
#     plt.show()
    
#     FITTING PARAMETRIC DISTRIBUTIONS
#     x = np.random.gamma(6, size=200)
#     sns.distplot(x, kde=False, fit=stats.gamma)
#     plt.show()
    
#     SCATTER PLOTS
#     mean, cov = [0, 1], [(1, .5), (.5, 1)]
#     data = np.random.multivariate_normal(mean, cov, 1000)
#     df = pd.DataFrame(data, columns=["x", "y"])
#     sns.jointplot(x="x", y="y", data=df);
#     plt.show()
    
#     HEXBIN PLOTS
#     mean, cov = [0, 1], [(1, .5), (.5, 1)]
#     x, y = np.random.multivariate_normal(mean, cov, 1000).T
#     with sns.axes_style("white"):
#         sns.jointplot(x=x, y=y, kind="hex", color="k");
#     plt.show()
    
#     KERNEL DENSITY (JOINT PLOT)
#     mean, cov = [0, 1], [(1, .5), (.5, 1)]
#     x, y = np.random.multivariate_normal(mean, cov, 1000).T
#     data = np.random.multivariate_normal(mean, cov, 1000)
#     df = pd.DataFrame(data, columns=["x", "y"])
#     sns.jointplot(x="x", y="y", data=df, kind="kde")
#     plt.show()
    
#      KERNEL DENSITY (KDE PLOT)
#     mean, cov = [0, 1], [(1, .5), (.5, 1)]
#     data = np.random.multivariate_normal(mean, cov, 1000)
#     df = pd.DataFrame(data, columns=["x", "y"])
#     f, ax = plt.subplots(figsize=(6, 6))
#     sns.kdeplot(df.x, df.y, ax=ax)
#     sns.rugplot(df.x, color="g", ax=ax)
#     sns.rugplot(df.y, vertical=True, ax=ax)
#     plt.show()
    
#     PAIRWISE RELATIONSHIPS PLOTS
#     iris = sns.load_dataset("iris")
#     sns.pairplot(iris)
#     plt.show()
    
#     HEATMAP PLOTS
#     mean, cov = [0, 1], [(1, .5), (.5, 1)]
#     data = np.random.multivariate_normal(mean, cov, 1000)
#     df = pd.DataFrame(data, columns=["x", "y"])
#     sns.heatmap(df.corr(), annot=True, fmt=".2f")
#     plt.show()
    
#     HEATMAP PLOTS  (IRIS DATA CORRELATION)
    iris = sns.load_dataset("iris")
    sns.heatmap(iris.corr(), annot=True, fmt=".2f")
    plt.show()
    
if __name__ == '__main__':
    main()