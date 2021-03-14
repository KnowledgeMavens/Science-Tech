import requests
import json

book = ""
verse = ""
url = "http://getbible.net/json?passage="
end = "&raw=true"

def specific_bible():
    global book
    try:
        book = input("What Book are you searching?").capitalize()
        chapter = input("What Chapter are you searching?")
        verse = input("What verse are you searching?")
        url_response = url + book + chapter + ":" + verse + end + "&version=asv"
        response = requests.get(url_response).json()
        verse_upper = response["book"][0]["chapter"]
        verse_lower = verse_upper[verse]["verse"]
        print(verse_lower)
    except KeyError:
        print("Check spelling and try again.")
    except json.decoder.JSONDecodeError:
        print("Check the chapter in " + book + ".")

def search_bible():
    global book, verse
    try:
        book = input("What book are you searching?").capitalize()
        chapter = input("What Chapter do you want to see all the verses?")
        verse_int = 1
        while True:
            verse = str(verse_int)
            url_response = url + book + chapter + ":" + verse + end + "&version=asv"
            response = requests.get(url_response).json()
            verse_upper = response["book"][0]["chapter"]
            verse_lower = verse_upper[verse]["verse"]
            print("Verse " + verse + ":" + verse_lower)
            verse_int = verse_int + 1
    except KeyError:
        print("End of chapter")
    except json.decoder.JSONDecodeError:
        print("That's all the verses in " + book + ".") 

#specific_bible()
search_bible()

