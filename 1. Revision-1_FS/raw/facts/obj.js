// key :value pair
// JSON 
let cap = {
  name: "Steve",
  lastName: "Rogers",
  age: 45,
  friends: ["peter", "bruce", "tony"],
  address: {
    state: "New York",
    region: "Manhatten"
  },
  isAvenger: true
}
function updateCap(prop, val) {
  cap[prop] = val
}
updateCap("address", "slovakia");
updateCap("name", "bucky");
// get
// console.log(cap.name);
// console.log(cap.friends[1]);
// console.log(cap.address.state);
// console.log(cap);
// set
// cap.movies = ["civil War", "First Avenger", "Avengers"]; 
// // update
// cap.age=46;
// // delete
// delete cap.isAvenger;
console.log(cap);

// console.log(cap.key);
