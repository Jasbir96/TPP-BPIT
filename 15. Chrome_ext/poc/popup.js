const button = document.querySelector("button");
button.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log(tabs);
        chrome.tabs.sendMessage(tabs[0].id, "message from popup")
    })
})

