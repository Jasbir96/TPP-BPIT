let root = {
  data: "d10",
  children: [
    {
      data: "d20",
      children: [
        {
          data: "d50",
          children: []
        },
        {
          data: "d60",
          children: []
        }
      ]
    }, {
      data: "d30",
      children: [{
        data: "d70",
        children: []
      }]
    }, {
      data: "d40",
      children: [
        {
          data: "d80",
          children: []
        }, {
          data: "d90",
          children: []
        }
      ]
    }]
}
// display 
function viewGtree(node) {
  //  d10=> d20,d30,d40
  let meNMyFamily = node.data + "=>"
  for (let i = 0; i < node.children.length; i++) {
    let child = node.children[i];
    meNMyFamily = meNMyFamily + child.data + ", ";
  }
  console.log(meNMyFamily)
  // children order
  for (let i = 0; i < node.children.length; i++) {
    let child = node.children[i];
    viewGtree(child);
  }
}
viewGtree(root);