//Examples Problems from FreeCodeCamp.org - Customized for sharing
//What is a Data Structure - a list of objects or an array, or nouns
/*
//Easy: Use an Array to Store a Collection of Data
let Array = ['name', 7, true, false, undefined, null]
console.log(Array);


//Medium: Combine Arrays with the Spread Operator

function arrayOne() {
  let segment = ['you', 'for'];
  let statement = ['thank', ...segment, 'watching', 'data structures'];
  return statement;
}
console.log(arrayOne());

*/
// Difficult: Check if Object has a Property

let people = {
  Tom: {
    language: 'JavaScript',
    available: true
  },
  Alice: {
    language: 'Python',
    available: true
  },
  Larry: {
    language: 'Scala',
    available: true
  },
  Melinda: {
    language: 'golang',
    available: true
  }
};

function availableHelp(property) {
if (
  property.hasOwnProperty(Tom.language[JavaScript]) &&
  property.hasOwnProperty('Alice') &&
  property.hasOwnProperty('Larry') &&
  property.hasOwnProperty('Melinda')
) return true; {
return false;
}
}
console.log(availableHelp(people));
