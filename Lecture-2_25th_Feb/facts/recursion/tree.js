// let obj = {
//   name: "Jasbir",
//   lastName: "Singh",
//   address: {
//     city: "Delhi",
//     state: "Delhi"
//   },
//   age:22,
//   subjects:["WT","CD","CN","OS","DBMS"]
// };
// console.log(obj.address.state)
// console.log(obj.subjects[3]);
let root = {
  data: 10,
  children: [
    {
      data: 20,
      children: [
        { data: 50, children: [] },
        {
          data: 60,
          children: []
        }
      ]
    },
    {
      data: 30,
      children: [
        { data: 70, children: [] },
        {
          data: 80,
          children: [
            { data: 110, children: [] },
            { data: 120, children: [] }
          ]
        },
        { data: 90, children: [] }
      ]
    },
    {
      data: 40,
      children: [
        {
          data: 100,
          children: []
        }
      ]
    }
  ]
};
console.log(root.children[0].data);
// 10=>
// 10=>20,
//10=>20,30
//10=>20,30,40,
function displayGtree(node) {
  let menmyCh = node.data + "=>";
  for (let i = 0; i < node.children.length; i++) {
    menmyCh = menmyCh + node.children[i].data + ",";
  }
  console.log(menmyCh);
  for (let i = 0; i < node.children.length; i++) {
    let child = node.children[i];
    displayGtree(child);
  }
}
displayGtree(root);
