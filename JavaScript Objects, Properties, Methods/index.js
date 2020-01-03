let character = {
    firstname: "Mando",
    lastname: "lorian",
    type: "Antihero",
    film: "Disney+",
    rating: [4, 3, 2],
    fullname: function () {
        return "My name is" + " " + this.firstname + " " + this.lastname
    }
}

console.log(character.fullname());

//How to display mutiple properties ???
//console.log(character, ['name', 'type']);