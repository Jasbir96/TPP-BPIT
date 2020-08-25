const button = document.querySelector("button");
button.addEventListener("click", function () {
    // callback based 
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // console.log(tabs);
        chrome.tabs.sendMessage(tabs[0].id, "message from popup", function sendResponse(message) {
            console.log(message)
        })
    })
})