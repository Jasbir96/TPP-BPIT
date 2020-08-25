// console.log("Inside popup.js");
const button = document.querySelector(".btn");
const input = document.querySelector("input");
const ul = document.querySelector("ul");
// user input 
button.addEventListener("click", async function () {
    let toBeLocked = input.value;
    if (toBeLocked) {
        // send Site to background
        await sendTobackground(input.value);
        addToList(toBeLocked);
        // send mesage to background
        input.value = "";
    }
})
function sendTobackground(message) {
    return new Promise(function (resolve, reject) {
        chrome.runtime.sendMessage(message, function (response
        ) {
            // console.log("recieved from background.js")
            resolve(response);
        });
    })


}
//  when you will click on popup
// init => populate popup with data from  background
function populate() {
    let list = await sendTobackground("getlist");
    console.log(list);
    // 
    for (let i = 0; i < list.length; i++) {
        addToList(list[i].site);
        // www.facebook.com
    }
    // make request to background
    //  populate the list 
}
populate();
//  reintialize => bg request => populate list 
function addToList(toBeLocked) {
    let li = document.createElement("li");
    li.setAttribute("class", "list-group-item");
    li.innerHTML = `${toBeLocked} <i class="fas fa-times"></i>`;
    ul.appendChild(li);
    let i = li.querySelector("i");
    i.addEventListener("click", function () {
        // let isRemoved = removefromdb(i.parentNode.textContent);
        // console.log();
        // if (isRemoved) {
        // }
        i.parentNode.remove();
    })
}
// null, undefined ,false,0,""