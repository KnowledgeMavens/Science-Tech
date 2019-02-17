from nltk.corpus import gutenberg
from nltk.tokenize import sent_tokenize

#Corpora - Large text such as journals, dictionaries, encyclopedias, etc

sample = gutenberg.raw("bible-kjv.txt")

tok = sent_tokenize(sample)

print(tok[5:15])

