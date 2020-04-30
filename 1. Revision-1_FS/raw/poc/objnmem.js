function memchecker(obj) {
  // obj.newProp = "this property was updated by obj but the refernce was"
  obj = { newProp: "this property was updated by obj but the refernce was" }
}
let myobj = { name: "myobj" };
memchecker(myobj)
console.log(myobj);