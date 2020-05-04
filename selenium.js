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

(async function (credentials) {
  // buffer 

  // login page
  await driver.get("https://pepcoding.com");
  let script = `var p = document.createElement('div'); document.body.appendChild(p); p.innerHTML='<textarea id="w3mission" rows="4" cols="50">';p.style.height='100px'`;
  await driver.executeScript(script);
  let inputbox = await (await driver).findElement(swd.By.css("#w3mission"));
  driver.executeScript("arguments[0].style.height='100px'",inputbox);
  driver.executeScript("arguments[0].rows='10'",inputbox);

  await inputbox.sendKeys("smnvbmjhvbc");

})()

//  search email => input
//input email
//search password=> password
//input password
//search submit 
//press submit btn 




