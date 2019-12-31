// If variables are similiar to nouns, functions are similiar to verbs

function WhoAmI() {
    console.log("I'm the Mandalorian. This is the way");
}
WhoAmI();

// functions with parameters and arguments

function yodaReply(name) {  //parameter
    console.log("Save the world, you must, "  + name);
}
yodaReply("Baby Yoda"); //argument

// function with return statement

function secretFormula(num1, num2) {  
    return num1 + num2;
}
var result = secretFormula(7, 14)
console.log(result);

