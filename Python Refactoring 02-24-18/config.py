
# FILE_NAME = "wine_data.csv"
# COLUMN_NAME = ["Cultivator", "Alchol", "Malic_Acid", "Ash", "Alcalinity_of_Ash", "Magnesium","Total_phenols", "Falvanoids", "Nonflavanoid_phenols", "Proanthocyanins", "Color_intensity", "Hue", "OD280", "Proline"]
# TARGET_COLUMN_NAME = "Cultivator"

FILE_NAME = "iris_data.csv"
COLUMN_NAME=None
TARGET_COLUMN_NAME = "class"

# FILE_NAME = "balance_scale.csv"
# COLUMN_NAME = None
# TARGET_COLUMN_NAME = "Class Name"

# FILE_NAME = "final_titanic_data_michael_ernest.csv"
# COLUMN_NAME=None
# TARGET_COLUMN_NAME = "Survived"

# FILE_NAME = "pima_indians_diabetes.csv"
# COLUMN_NAME=None
# TARGET_COLUMN_NAME = "Class"

PERCENT_TEST_SIZE = 30
HIDDEN_LAYER_NEURON_SIZES = (100, 100, 100)
ACTIVATION_FUNCTION = "relu"
SOLVER_OPTIMIZATION = "adam"
MAXIMUM_ITERATION = 1000
RANDOM_STATE = 1

# List of Python standard encodings (https://docs.python.org/3/library/codecs.html#standard-encodings))
ENCODING_LATIN1="latin1"