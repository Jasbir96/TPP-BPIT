// npm init -y
// npm install selenium-webdriver chromedriver
require("chromedriver");
let fs = require("fs");
let swd = require("selenium-webdriver");
let credentialsFile = process.argv[2];
let metaDataFile = process.argv[3];
// let courseName = process.argv[4];
// browser build
let bldr = new swd.Builder();
// tab 
let driver = bldr.forBrowser("chrome").build();
// promise=> page open future 
// value =>value 
// pending
// depended=> 
// independent
let username, password, gModules;
// ************************************Login******************************************************
let credentialsWillBeReadPromise = fs.promises.readFile(credentialsFile);
credentialsWillBeReadPromise
  .then(function (credentials) {
    // buffer 
    credentials = JSON.parse(credentials);
    username = credentials.username
    password = credentials.password
    // login page
    let googlePageWillBeOpenedPromise = driver.get("https://pepcoding.com/login");
    return googlePageWillBeOpenedPromise;
  })
  .then(function () {
    // search email,password
    let emailWillBeSelectedPromise = driver.findElement(swd.By.css("input[type=email]"));
    let passwordWillBeSelectedPromise = driver.findElement(swd.By.css("input[type=password]"));
    // PromiseAll=> promiseArr=> promise=> 
    let combinedPromise = Promise.all([emailWillBeSelectedPromise, passwordWillBeSelectedPromise]);
    // console.log(emailWillBeSelectedPromise);
    // array promise => answer
    return combinedPromise;
  }).then(function (ElementsArray) {
    let emailWillBesendPromise = ElementsArray[0].sendKeys(username);
    let passwordWillBeSendPromise = ElementsArray[1].sendKeys(password);
    let combinedInputPromise = Promise.all([emailWillBesendPromise, passwordWillBeSendPromise]);
    return combinedInputPromise;
  }).then(function () {
    let submitBtnWillSelected = driver.findElement(swd.By.css("button[type=submit]"));
    return submitBtnWillSelected;
  }).then(function (submitbtn) {
    let submitBtnWillBeClickedPromise = submitbtn.click();
    return submitBtnWillBeClickedPromise;
  })


  // *******************************Home Page**********************************

  .then(function () {
    // you shouls always wait 
    let willWaitForResourceToLoad = driver.wait(swd.until.elementLocated(swd.By.css(".resource a")));
    return willWaitForResourceToLoad;
  })
  .then(function () {
    // resource card find
    let resourceanchorWillBeSelectedPromise = driver.findElement(swd.By.css(".resource a"))
    // click
    return resourceanchorWillBeSelectedPromise;
  }).then(function (resourcePageAnchor) {
    let rPageLinkPromise = resourcePageAnchor.getAttribute("href");
    return rPageLinkPromise;
    // resourcePage 
  }).then(function (rPagelink) {
    // console.log("Reached Courses page");
    // console.log(rPagelink);
    let NavigateToCourseListPage = driver.get(rPagelink);
    return NavigateToCourseListPage;
  })
  .then(function () {
    let siteOverlayWillBeSelectedPromise = driver.findElement(swd.By.css("#siteOverlay"));
    return siteOverlayWillBeSelectedPromise;
  })
  .then(function (soe) {
    let waitForOverlayToRemovePromise = driver.wait(swd.until.elementIsNotVisible(soe), 10000);
    return waitForOverlayToRemovePromise;
  })
  .then(function () {
    let courseWilBeLocatedPromise = driver.findElement(swd.By.css("#courseCard33"));
    return courseWilBeLocatedPromise;
  }).then(function (courseCard) {
    let courseCardWillBeClickedPromise = courseCard.click();
    return courseCardWillBeClickedPromise;
  })
  
  // ******************************************************* Moduleclick***************************************
  .then(function () {
    let lisTabToBeLocatedPromise = driver.wait(swd.until.elementsLocated(swd.By.css(".lis.tab")), 10000);
    lisTabToBeLocatedPromise
  }).
  then(function () {
    let ModulesWillBeSelectedPromise = driver.findElements(swd.By.css(".lis.tab"));
    return ModulesWillBeSelectedPromise;
  }).then(function (modules) {
    // console.log(modules);
    gModules = modules
    console.log(modules.length);
    let moduleTextPromiseArr = [];
    for (let i = 0; i < modules.length; i++) {
      let moduleNamePromise = modules[i].getText();
      moduleTextPromiseArr.push(moduleNamePromise);
    }
    let AllModuleNamesPromise = Promise.all(moduleTextPromiseArr);
    return AllModuleNamesPromise;
  }).then(function (AllModulesText) {
    let i;
    for (i = 0; i < AllModulesText.length; i++) {
      if (AllModulesText[i].includes("Dynamic Programming") == true) {
        break;
      }
    }
    let moduleWillBeclickedPromise = gModules[i].click();
    return moduleWillBeclickedPromise;
  })
  // ********************************************************Lecture**************************************
  // *******************************************************Question**************************************
.then(function () {
  //   read json file 
  let metaDataWillBeReadPromise = fs.promises.readFile(metaDataFile);
  return metaDataWillBeReadPromise;
})
  .then(function (metadata) {
    metadata = JSON.parse(metadata);
    let question = metadata[0];
    //   let WillOpenQuestionPagePromise = driver.get(question.url);
    //   return WillOpenQuestionPagePromise;
    // }).then(function () {
    //   console.log("Opened Question page");
    // })
    // list=> names ,
    // name => medata.json => question name
  }).catch(function (err) {
    console.log(err);
  })



function goToQuestionPage() {

  let lisTabToBeLocatedPromise = driver.wait(swd.until.elementsLocated(swd.By.css(".lis.tab")), 10000);
  lisTabToBeLocatedPromise.

    then(function () {
      let ModulesWillBeSelectedPromise = driver.findElements(swd.By.css(".lis.tab"));
      return ModulesWillBeSelectedPromise;
    }).then(function (modules) {
      // console.log(modules);
      gModules = modules
      console.log(modules.length);
      let moduleTextPromiseArr = [];
      for (let i = 0; i < modules.length; i++) {
        let moduleNamePromise = modules[i].getText();
        moduleTextPromiseArr.push(moduleNamePromise);
      }
      let AllModuleNamesPromise = Promise.all(moduleTextPromiseArr);
      return AllModuleNamesPromise;
    }).then(function (AllModulesText) {
      let i;
      for (i = 0; i < AllModulesText.length; i++) {
        if (AllModulesText[i].includes("Dynamic Programming") == true) {
          break;
        }
      }
      let moduleWillBeclickedPromise = gModules[i].click();
      return moduleWillBeclickedPromise;
    })
}



//  search email => input
//input email
//search password=> password
//input password
//search submit 
//press submit btn 




