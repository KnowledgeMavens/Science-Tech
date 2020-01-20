// What is a regex? A regular expression allows you to search and/or replace numbers, strings, 
//Examples of when would you use regex? Search/replace, creating usernames, user input. 

/*
//Example 1 - find a string
let myString = "Hello, World!";
let myRegex = /Hello/;
let result = myRegex.test(myString); 
console.log(result)
  
.02
*/

//Example 2 - Positive and Negative Lookahead
let sampleWord = "astronaut";
let pwRegex = /^(?=\w{6})(?=\D+\d{2})/;
let result = pwRegex.test(sampleWord);
console.log(result);

/*

^       Beginning of String
?=      postive look ahead
\w      word CharacterData
{6}     number of occurances
\D+     character not a digit i.e ABC
\d      digit i.e. 0-9

//Example 3 - Restrict Possible Usernames

let username = "JackOfAllTrades";
let userCheck = /^[a-z]([0-9][0-9]+|[a-z]+\d*)$/i;
let result = userCheck.test(username);

^ - beginning of pattern
[a-z] - first character is a letter
[0-9][0-9]+ - ends with two or more numbers
| - or
[a-z]+ - has one or more letters next
\d* - and ends with zero or more numbers
$ - end of input
i - ignore case of input
*/