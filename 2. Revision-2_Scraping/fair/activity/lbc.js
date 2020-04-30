let request = require("request");
let fs = require("fs");
let cheerio = require('cheerio')
console.log("Before");
// request => data 
request(`https://www.espncricinfo.com/series/19322/commentary/1187683`, function (err, res, html) {
  if (err === null && res.statusCode === 200) {
    // fs.writeFile("index.html", html, function () {
    //   console.log("Written file to disk");
    // })
    // fs.writeFileSync("index.html", html);
    parseHtml(html);
  } else if (res.statusCode === 404) {
    console.log("Invalid URL");
  } else {
    console.log(err);
    console.log(res.statusCode);
  }
})
// html => html 
// text=> text => print 
// cheerio array => index => function => cheerio 
// html => parse => library 
function parseHtml(html) {
  // document.querySelector=> $
  console.log("`````````````````````````````````````````````````````````");
  let d = cheerio.load(html);
  let itemWrapper = d(".item-wrapper .description");
  let text = d(itemWrapper[0]).text();
  // let text = headings.text();
  console.log(text);
}
console.log("After");