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
        img.setAttribute("class", "upload-img")
        img.src = imgLink;
        textBox.appendChild(img);
    })
}
function downloadBoard() {
    //  create an anchor
    // e.preventDefault();
    let a = document.createElement("a");
    //  set filename to it's download attribute
    a.download = "file.png";
    //  convert board to url 
    let url = board.toDataURL("image/png;base64");
    //  set as href of anchor
    a.href = url;
    // click the anchor
    a.click();
    //  reload behaviour does not get triggerd
    a.remove();

}