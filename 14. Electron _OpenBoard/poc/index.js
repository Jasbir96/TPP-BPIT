// find
let body = document.querySelector("body");
// create
let p = document.createElement("p");
p.innerHTML = "<a>Hello</a>";
p.innerText = "Dynamically added Para";
// styling
p.style.backgroundColor = "red";
// add as children to a node
body.appendChild(p);
let createBtn = document.querySelector(".click-btn");
// to add event listener
createBtn.addEventListener("click", function () {
    let ul = document.querySelector("ul");
    let input = document.querySelector("input");
    let li = document.createElement("li");
    li.innerText = input.value;
    ul.appendChild(li);
    // input/select
    input.value = "";
    // alert("btn was clicked");
})

