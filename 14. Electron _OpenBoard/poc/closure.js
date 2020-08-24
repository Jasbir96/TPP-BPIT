// function outer(x) {
//     console.log("Inside outer");
//     return function inner(y) {
//         console.log("Inside inner");
//         console.log(x + y);
//     }
// };
// let ref = outer(5);
// ref(10);
function getFirstName(firstName) {
    return function getLastName(lastName) {
        return firstName + " " + lastName;
    }
}
// to implement generic authorization
let firstNameGetter = getFirstName("Steve");
// d,kjnas,jv,nvsdbf
let fullName = firstNameGetter("Rogers");
console.log(fullName);