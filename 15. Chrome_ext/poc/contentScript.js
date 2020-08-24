// console.log("Mai content se ayaa");
// 
let imgPaths = [
    "images/img-1.jpg",
    "images/img-2.jpg",
    "images/img-3.jpg",
    "images/img-4.jpg",
    "images/img-5.jpeg"
];
let aIP = document.querySelectorAll("img");
for (let i = 0; i < aIP.length; i++) {
    let idx = Math.floor(Math.random() * imgPaths.length);
    let fullPath = chrome.extension.getURL(imgPaths[idx]);
    console.log(fullPath);
    aIP[i].src = fullPath;
}