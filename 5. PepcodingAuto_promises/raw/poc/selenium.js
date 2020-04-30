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

let username, password;
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
  // implicit wait 
  .then(function () {
    let WillBeSetPromise = driver.manage().setTimeouts({
      implicit: 10000
    })
    return WillBeSetPromise;
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
  // resources page => list courses
  .then(willWaitForOverlay)
  .then(function () {
    let courseWilBeLocatedPromise = driver.findElement(swd.By.css("#courseCard33"));
    return courseWilBeLocatedPromise;
  }).then(function (courseCard) {
    let courseCardWillBeClickedPromise = courseCard.click();
    return courseCardWillBeClickedPromise;
  })

  .then(function () {
    //   read json file 
    let metaDataWillBeReadPromise = fs.promises.readFile(metaDataFile);
    return metaDataWillBeReadPromise;
  })
  .then(function (metadata) {
    metadata = JSON.parse(metadata);
    let question = metadata[0];
    let willWaitToBenavigatedToQnPg = goToQuestionPage(question);
    return willWaitToBenavigatedToQnPg;
    // driver.quit();
  }).catch(function (err) {
    console.log(err);
  })

function goToQuestionPage(question) {
// resource page 
  return new Promise(function (resolve, reject) {
    let waitPromise = willWaitForOverlay();
    waitPromise
      .then(function () {
        let willClickModule = navigationHelper(question.module, ".lis.tab");
        return willClickModule;
      }).then(willWaitForOverlay)
      .then(function () {
        let willClickLecture = navigationHelper(question.lecture, ".collection-item");
        return willClickLecture;
      }).then(willWaitForOverlay)
      .then(function () {
        let willClickQuestion = navigationHelper(question.problem, ".collection-item");
        return willClickQuestion;
      }).then(function () {
        resolve();
      }).catch(function () {
        reject();
      })
  })

}
 
function willWaitForOverlay() {
  let waitTillPromiseIsDismissed = new Promise(function (resolve, reject) {
    //  let us assume done is working
    // search overlay 
    let waitForsoe = driver.wait(swd.until.elementLocated(swd.By.css("#siteOverlay")));
    waitForsoe.then(function () {
      let siteOverlayWillBeSelectedPromise = driver.findElement(swd.By.css("#siteOverlay"));
      return siteOverlayWillBeSelectedPromise
    })
      .then(function (soe) {
        let waitForOverlayToRemovePromise = driver.wait(swd.until.elementIsNotVisible(soe), 10000);
        return waitForOverlayToRemovePromise;
      }
      ).then(function () {
        resolve();
      }).catch(function (err) {
        reject(err);
      })
    //wait 
  })
  return waitTillPromiseIsDismissed
}
function navigationHelper(nameToBeSelected, selector) {
  let gElements
  return new Promise(function (resolve, reject) {
    let ModulesWillBeSelectedPromise = driver.findElements(swd.By.css(selector));
    ModulesWillBeSelectedPromise
      .then(function (modules) {
        // console.log(modules);
        gElements = modules
        console.log(modules.length);
        let moduleTextPromiseArr = [];
        for (let i = 0; i < modules.length; i++) {
          let moduleNamePromise = modules[i].getText();
          moduleTextPromiseArr.push(moduleNamePromise);
        }
        let AllModuleNamesPromise = Promise.all(moduleTextPromiseArr);
        return AllModuleNamesPromise;
      })
      .then(function (AllModulesText) {
        let i;
        for (i = 0; i < AllModulesText.length; i++) {
          if (AllModulesText[i].includes(nameToBeSelected) == true) {
            break;
          }
        }
        let moduleWillBeclickedPromise = gElements[i].click();
        return moduleWillBeclickedPromise;
      }).then(function () {
        resolve();
      }).catch(function (err) {
        reject(err);
      })
  })




}
//  search email => input
//input email
//search password=> password
//input password
//search submit 
//press submit btn 


