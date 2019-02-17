from nltk.stem import WordNetLemmatizer

#Lemmatizing - Improved method of stemming. Can also group root words for comparison.

lemmatizer = WordNetLemmatizer()

print(lemmatizer.lemmatize("better", pos="a"))
print(lemmatizer.lemmatize("best", pos="a"))
print(lemmatizer.lemmatize("run", pos="a"))
print(lemmatizer.lemmatize("run", pos="v"))