// What is an object? stores properties i.e. Macbook
// What is a property? attributes i.e. CPU, Memory, GPU, Storage
// What is a method? actions i.e. email, make videos, code

// Example 1 - Properties 
let laptop = "What is your favorite laptop?";
//console.log(tablet); //Other examples .pop, .shift, .split, splice

// Example 2 - Objects + Methods
let macbook = {  //Object
    brand: "Apple",  //Properties
    CPU: "i9 8th gen",
    Memory: "32GB Mem",
    GPU: "8GB GPU",
    StorageTB: ["1TB", "2TB", "4TB"],
    specs: function () {  //Method
        return "This macbook has" + " " + this.CPU + ", " + this.Memory + ", " + this.StorageTB[0]
    }
}
//console.log(macbook.specs());

// Example 3 - Display mutiple properties
console.log(macbook.brand, macbook.StorageTB[2]);