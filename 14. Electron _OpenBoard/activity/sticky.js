function createSticky() {
    // <div class="stickyPad">
    //     <div class="nav-bar">
    //         <div class="close"></div>
    //         <div class="minimize"></div>
    //     </div>
    //     <div class="textbox">
    //         <textarea name="" id="" cols="30" rows="10"></textarea></div>
    // </div>
    // create 
    let stickyPad = document.createElement("div");
    let navBar = document.createElement("div");
    let close = document.createElement("div");
    let minimize = document.createElement("div");
    let textbox = document.createElement("div");
    let textarea = document.createElement("textarea");
    //    add classes
    stickyPad.setAttribute("class", "stickyPad");
    navBar.setAttribute("class", "nav-bar");
    close.setAttribute("class", "close");
    minimize.setAttribute("class", "minimize");
    textbox.setAttribute("class", "textbox");
    // create subtree
    stickyPad.appendChild(navBar);
    stickyPad.appendChild(textbox);
    navBar.appendChild(minimize);
    navBar.appendChild(close);
    textbox.appendChild(textarea);

    // add subtree to page
    document.body.appendChild(stickyPad);



}