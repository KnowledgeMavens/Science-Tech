//What is a Data Structure

//Easy: Use an Array to Store a Collection of Data
let yourArray = ['one', 2, 'three', true, false, undefined, null]
console.log(yourArray);
/*
//Medium: Combine Arrays with the Spread Operator

function spreadOut() {
  let fragment = ['to', 'code'];
  let sentence = ['learning', ...fragment, 'is', 'fun'];
  return sentence;
}
console.log(spreadOut());


// Difficult: Check if Object has a Property

let users = {
  Alan: {
    age: 27,
    online: true
  },
  Jeff: {
    age: 32,
    online: true
  },
  Sarah: {
    age: 48,
    online: true
  },
  Ryan: {
    age: 19,
    online: true
  }
};

function isEveryoneHere(obj) {
if (
  obj.hasOwnProperty('Alan') &&
  obj.hasOwnProperty('Jeff') &&
  obj.hasOwnProperty('Sarah') &&
  obj.hasOwnProperty('Ryan')
) return true; {
return false;
}
}
console.log(isEveryoneHere(users));
*/