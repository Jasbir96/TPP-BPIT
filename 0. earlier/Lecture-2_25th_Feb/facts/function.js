function myfn(parameter1,parameter2) {
  console.log(parameter1+" "+parameter2);
  console.log("myfn was called");
  console.log(arguments);

}
myfn("abc", "another param", "third param");
