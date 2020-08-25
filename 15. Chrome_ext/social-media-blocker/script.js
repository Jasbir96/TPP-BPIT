// console.log("Inside popup.js");
const button = document.querySelector(".btn");
const input = document.querySelector("input");
const ul = document.querySelector("ul");
button.addEventListener("click", async function () {
    let toBeBLocked = input.value;
    if (toBeBLocked) {
        // send Site to background
        await sendTobackground(input.value);
        let li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.innerHTML = `${toBeBLocked} <i class="fas fa-times"></i>`;
        ul.appendChild(li);
        let i = li.querySelector("i");
        i.addEventListener("click", function () {
            // let isRemoved = removefromdb(i.parentNode.textContent);
            // console.log();
            // if (isRemoved) {
                // }
                    i.parentNode.remove();
        })
        // send mesage to background
        input.value = "";
    }
})
function sendTobackground(message) {
    return new Promise(function (resolve, reject) {
        chrome.runtime.sendMessage(message, function (response) {
            // console.log("recieved from background.js")
            resolve(true);
        });
    })


}