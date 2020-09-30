const search = document.querySelector(".search");
const input = document.querySelector("input");
const p = document.querySelector(".p-entry");
const fEntry = document.querySelector(".f-entry");
const rEntry = document.querySelector(".r-entry");
let d = document;

search.addEventListener("click", function (e) {
    e.preventDefault();
    // 
    populateProfile(input.value);
    populateFollowers(input.value);
    console.log("request send")
})
async function populateProfile(id) {
    // data user 
    let { data } = await axios.get(`api/v1/users/${id}`);
    console.log(data);
    let user = data.user;
    let { email_id, handle } = user;
    p.innerHTML = `<p>Email: ${email_id}</p><p>handle: ${handle}</p>`
}

async function populateFollowers(id) {
    // data
    let { data } = await axios.
    get(`api/v1/users/fr/${id}`);
    console.log(data);
    // all followers
    let arr = data.message;
    for (let i = 0; i < arr.length; i++) {

        let followerObj = arr[i];
        
        let div = AddToUI(followerObj);

        if (followerObj.is_pending) {
            rEntry.appendChild(div);
            let p = document.createElement("p");
            p.innerText = "Accept : Reject"
            div.appendChild(p);
        } else {
            // img 
            // handle
            fEntry.appendChild(div);
        }
    }
}
function AddToUI(followerObj) {
    let div = d.createElement("div");
    let img = document.createElement("img");
    let handleSpan = d.createElement("span");
    handleSpan.textContent = followerObj.handle;
    img.src = followerObj.p_img_url == null ? "default.png" :
     followerObj.p_img_url;
    img.height="40";
    div.appendChild(img);
    div.appendChild(handleSpan);
    return div;
}