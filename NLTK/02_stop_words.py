from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

#Stop Words - Filler words not as useful in data analysis (and, of, the)

example_sentence = "This is an example showing stop word filtration"
stop_words = set(stopwords.words("english"))

words = word_tokenize(example_sentence)

filtered_sentence = []

for w in words:
	if w not in stop_words:
		filtered_sentence.append(w)

print(filtered_sentence)

