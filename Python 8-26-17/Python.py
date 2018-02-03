''' Syntax documentation located at Python.org
Author Garrett Broughton 8-26-17'''
'''
#Order of operations or Operators
# (* /) (+ -)
50 * 2.1
10 + 10 * 10
(8 * 6 * (4 + 4))
(10 + ( 8 / 4)) * (9-3)

#Variables
Name = Garrett
print(Name)
NameText = "My Name Is"
print(NameText)
WhatIsMyName = Name
print(WhatIsMyName)

membercost = 100
fees = 10
members = 20
membercost * fees * members = revenue

#Strings or text or numbers in quotes
Name = "My name is Garrett"

#Triple quotes and nested quotes
"I'm a rock star"
'"How was your day" she asked?'
'''"he's a rock start", said the drummer'''

#Embedding variables within strings
print("My name is %s" % Garrett Broughton)
firstname = "Garrett"
lastname = "Broughton"
output = "My name is %s %s"
print("My name is %s" % name)
print(output % , name)
print(output % (firstname, lastname))

#Concatenations and multiplying strings
print("Hi" + " " + "My name is Garrett")
firstname = Garrett
lastname = Broughton
print(firstname + " " + lastname)
Banner = " " *50
print("Here are 50 spaces. %s" % Banner)

#Lists
Presentations = ["Presenation 1", "Presenation 2", "Presenation 3"]
print("Presenations")
print(Presenations[1])

#Subsets of lists
Agenda = ["Presenation 1", "Presenation 2", "Presenation 3"]
print(Agenda[0], Presenations[2])
print(Agenda[1:2])
print(Agenda[1:2])
numbers = [32, 234, 8, 90, 68]
print(numbers[-1])
numberstrings = ["Billy, 1", "Joesph", 7, "Fred", 43]
print(numberstrings[1:-1])

#Append and delete
food = [tacos, burritos, salad]
print(food)
del food[2]
print(food)
food.Append[veggies]
print(food)

#Combining lists or concatenation
main = [tacos, burritos, burgers]
veggies  = [salad, brocoli, pasta]
print(meat + vegetarian)
mainveggie = main + veggies
del main[2]
print(main)

#Tuples - Constant or unchangable variable
guests = [Joe, Bill, Joesph]
guests.append(members)
#Use brackets parentheses instead of brackets
members = ("Garrett")
members.append(Fred)

#Maps - Keys that point to object, similiar to lists
crypto = {"afk":"away from keyboard", "lol":"Laugh out Loud":"rtfol":"rolling on the floor laughing"}
print(crypto["lol"])
numbers = ["0", "1", "2"]
crypto["rtfol"] = "laughing"
print(crypto)
del crypto["rtfol"]
print(crypto)

#If statement
attendence = 5
if attendence < 10:
    print("You have low attendence")
    print("Join us every week")

#If else statement
attendence = 20
if attendence < 10:
    print("You have low attendence")
    print("Join us every week")
else:
    print("Congratulations, you have great attendence")

#If statement boolean  True or False logic
10 < 50
50 < 10
if 10 < 50:
    print("You're right")
if 10 > 50:
    print("You're right")
else:
    print("You're wrong")

attendence = 10
if age > 20:
    print("Our club has high attendence")
else:
    print("Our club has low attendence")

#Comparison operators ==, != , < , > , <=, >=
if 10 == 10:
    print("true")
if 10 != 50:
    print("true")
10 <= 50
    print("true")

#Elif statement
name = "Garrett"
if name == "Garrett":
    print("Welcome Garrett")
elif name == "Joespeh":
    print("Welcome Joespeh")
elif name == "Peter":
    print("Welcome Peter")
else:
    print("You're not welcome")

attendence = 20
if attendence >= 15 and attendence <25:
    print("We're a healthy club")
elif attendence > = 21:
    print("We're growing")
elif attendence >= 25:
    print("We should split our club")
else:
    print("We need to advertise")

#Multiple conditional within an if
attendence = 20
if attendence > 15 or attendence < 25:
    print("true")
attendence = 15
if attendence > 12 or attendence == 15 or attendence <20:
    print('Our club is healthy')

#Test if variable has a value
newmembership = None
if newmembership is None:
    print('We need to advertise')
else:
    print('our advertising is working')

#For loop and iterate through a list
members = ['Garrett', 'Fred', 'Billy']
for y in members:
    print("Welcome to our club %s" %y)

memberid = [ 2, 3, 4]
for y in memberid:
    print(y + 1)

#While loop
members = 10
while members < 20:
    print("The number of club members is %s" % score)
    print("You need more members, Let's recruit one")
    members = members + 1
    print(members)

#Nested if statement
members = 20
guests = 5
if members > 20:
    print("Our club is healthy")
    if guests >= 5:
        print("We are getting a lot of interest")
    else:
        print("We need more guests")
else:
    print("We need to convert more guests to members)

#Nested while loop
members = 5
guests = 10
while members < 10:
    print("We don't have enough members, Let's recruit one")
    members = members + 1
    while guests >= 10:
        print("You need convert guests to members")
        guests = guests - 1

#Nested for loop
members = ["Joespeh", "Bill", "Fred"]
for x in members:
    print(x)
    for i in range(4, 5):
        print(i)

#Defining functions
def clubname(datascience):
    print(datascience * 2)

def clubname(datascience):
    print(datascience * 2)
firstname = "data"
lastname = "science"
def concat(firstname, lastname):
    print(firstname + " " + lastname)

def ROI(a,b):
    print(a * ((b / 10) + 2))

#Variable scope for functions and priority
def total():
    members = 15
    print(members)
total()

#Taking user inputs with sys.stdin.readline()
import sys
def ROI():
    print("How much did you invest?")
    investment = int(sys.stdin.readline())
    print("What is your desired ROI?")
    ROI = int(sys.stdin.readline())
    ROI_amount = investnment * (ROI/100)
    print("Your ROI will be %s" % ROI_amount + " " + "amount")

#Numeric types - int and floatm
float is a decimal numbers
floored version of max value
20 // 6
Quotion or remainder, "use modulus"
20 % 6
Exponent
5 * * 2
5 * * 3
Division and modulus
divmod(20,6)

#Type Casting using int() float() and str()
float(20)
int("20")
float("20")
str(123.35)
print("Hello World" + str(15))
int("15") + 15
int(value) +15

#Indexing and negative indices
Presenation = "datascience"
print(Presenation[0])
print(Presenation[1])
print(Presenation[-4])

#Slicing strings
Presenation = "datascience"
print(Presenation[0])
print(Presenation[0:3])
print(Presenation[3:-2])

#Skipping characters when slicing strings
Presenation = "datascience"
print(Presenation[1:6:2])
print(Presenation[::-1])
epic = "hannah"
print(hannaha[::-1])

#Reverse string indices
Presenation = "datascience"
print(yo[::-2])
print(yo[4:0:-2])

#Methods -
Presenation = "Python!"
Presenation.find("o")
def cat(x):
    print(x)
cat(3)
Presenation.count("o")
Presenation.endswith("o")
Presenation.lower()
Presenation.upper()
Presenation.rstrip("!")
Presenation.lstrip
Presenation.replace("Python", "datascience")
Presenation = Presenation.title()

#List Methods
databases = ["mysql","mongo","dynamo","redshift,"]
databases.append("oracle")
print(databases)
databases.count("mongo")
language = ["python or R]
languages.append("javascript")
print(language)
languages.extend(databases)
databases.index("mongo")
databases.insert(4,"sqlserver")
print(databases)
databases.pop()
print(databases)
databases.remove("mongo")
databases.reverse()
print(databases)
integers = [ 1,500, 24, 9, 1000]
integeres.sort(integeres)

#Return
def members(name):
    return("Welcome %s" "You're now a member" % name)
welcome_message=(members("Garrett"))

#Parameter default values
def ROI(investment=50, ROI=10):
    return(investment * (ROI/100))
print(ROI(total=600))

#Pass
def members(name):
    pass
    return(name)
    print(members("Jill"))
x = 7
y = "Hello"
z = "Why not"

#Defining functions with an unknown
def members(*name):
    for x in name:
        print("welcome, %s" % x)
members("Garrett", "Billy", "Jacob")
'''
