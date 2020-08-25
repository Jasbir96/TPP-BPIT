let blockedSites = [];
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(request);
        blockedSites.push(request);
        console.log(blockedSites)
        // console.log(sender);
        // if (request.greeting == "hello") {
        //     console.log("Recieved from popup");
        // }
        sendResponse("Hello from content");
        //  check every second
        // relplaceImg()
    })