let imgInput = document.querySelector("#acceptImg");
function uploadFile() {
    // dialog box
    imgInput.click();
    imgInput.addEventListener("change", function () {
        let imgObj = imgInput.files[0];
        // console.log(imgObj);
        let imgLink = URL.createObjectURL(imgObj);
        let img = document.createElement("img");
        img.src = imgLink;
        document.body.appendChild(img);
    })
}
