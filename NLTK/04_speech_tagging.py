import nltk
from nltk.corpus import names
from nltk.tokenize import PunktSentenceTokenizer

train_text = names.raw("female.txt")
sample_text = names.raw("male.txt")

custom_sent_tokenizer = PunktSentenceTokenizer(train_text)

tokenized = custom_sent_tokenizer.tokenize(sample_text)

def process_content():
	try:
		for i in tokenized:
			words = nltk.word_tokenize(i)
			tagged = nltk.pos_tag(words)
			print(tagged)

	except Exception as e:
		print(str(e))

process_content()