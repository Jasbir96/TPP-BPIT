let imgInput = document.querySelector("#acceptImg");
function uploadFile() {
    // dialog box
    imgInput.click();
    imgInput.addEventListener("change", function () {
        let imgObj = imgInput.files[0];
        // console.log(imgObj);
        let imgLink = URL.createObjectURL(imgObj);
        let textBox = createBox();
        let img = document.createElement("img");
        img.setAttribute("class","upload-img")
        img.src = imgLink;
        textBox.appendChild(img);
    })
}
