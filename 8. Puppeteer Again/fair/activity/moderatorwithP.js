let puppeteer = require("puppeteer");
let cFile = process.argv[2];
let fs = require("fs");
(async function () {

  // browser create => icognito mode,fullscreen
  try {
    let data = await fs.promises.readFile(cFile);
    let { url, pwd, user } = JSON.parse(data);

    // launch browser
    let browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized"]
    });
    // tab
    let tabs = await browser.pages();
    let tab = tabs[0];
    // dom => html 
    //  browser=> 500ms request 
    // hk login page
    await tab.goto(url, { waitUntil: "networkidle0" });
    //check for the html   tag  to load
    // //  wait 
    await tab.waitForSelector("#input-1", { visible: true })
    // username inputbox
    await tab.type("#input-1", user, { delay: 100 });
    // password inputbox
    await tab.type("#input-2", pwd, { delay: 100 });
    // //  if click causes page change => you should always wait navigation as well as click promise to resolve
    // await tab.goto("https://www.google.com");
    await Promise.all([tab.click("button[data-analytics=LoginPassword]"), tab.waitForNavigation({ waitUntil: "networkidle0" })])
    // *****************Dashboard*************************************
    // dropdown click
    await tab.waitForSelector("a[data-analytics=NavBarProfileDropDown]", { visible: true });
    await tab.click("a[data-analytics=NavBarProfileDropDown]");
    // administartion
    await Promise.all(
      [tab.waitForNavigation({ waitUntil: "networkidle0" }),
      tab.click("a[data-analytics=NavBarProfileDropDownAdministration]"),])
    //**************************Manage Challenges ***************************/
    await tab.waitForSelector(".administration header", { visible: true })
    let mTabs = await tab.$$(".administration header ul li a");
    // admin page
    //  url => manage contest
    // url => manage challenges
    await Promise.all(
      [tab.waitForNavigation({ waitUntil: "networkidle0" }),
      mTabs[1].click("a[data-analytics=NavBarProfileDropDownAdministration]"),])
    //  getqELement(qidx)=> n number of question, p number of pages
    await handleSinglePageQuestion(tab, browser);
  } catch (err) {
    console.log(err);
  }
})();
// selenium
// Element.getAttribute("href")
// // 
// page.evaluate(function (element) {
//   return getAttribute("href");
// }, Element)
async function handleSinglePageQuestion(tab, browser) {
  await tab.waitForSelector(".backbone.block-center");
  let qoncPage = await tab.$$(".backbone.block-center ");
  let pArr = [];
  //  all question of that page
  for (let i = 0; i < qoncPage.length; i++) {
    let href = await tab.evaluate(function (elem) {
      return elem.getAttribute("href");
    }, qoncPage[i]);

    let newTab = await browser.newPage();
    // developer tools=> elem.getAttribute
    let mWillAddedPromisetocQ = handleSingleQuestion(newTab, "https://www.hackerrank.com" + href);
    pArr.push(mWillAddedPromisetocQ);
  }
  await Promise.all(pArr);
  // go to next page 
  await tab.waitForSelector(".pagination ul li");
  let paginationBtn = await tab.$$(".pagination ul li");

  let nxtBtn = paginationBtn[paginationBtn.length - 2];
  let className = await tab.evaluate(function (nxtBtn) {
    return nxtBtn.getAttribute("class");
  }, nxtBtn);
  if (className === "disabled") {
    return;
  } else {
    await Promise.all([nxtBtn.click(), tab.waitForNavigation({ waitUntil: "networkidle0" })]);
    await handleSinglePageQuestion(tab, browser);
  }
}

async function handleSingleQuestion(newTab, link) {
  await newTab.goto(link, { waitUntil: "networkidle0" });
  //  popup => save changes may not have been saved 
  await newTab.waitForSelector(".tag");
  await Promise.all([
    newTab.click("li[data-tab=moderators]"),
    newTab.waitForNavigation({ waitUntil: "networkidle0" })
  ])
  await newTab.waitForSelector("input[id=moderator]", { visible: true });
  await newTab.type("#moderator", "theamanthakur");
  await newTab.keyboard.press("Enter")
  await newTab.click(".save-challenge.btn.btn-green");
  await newTab.close();
}