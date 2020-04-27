// https://www.espncricinfo.com/series/19322/commentary/1187679
let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio");
console.log("Requesting file");
// loc

let seriesId = process.argv[2];
// summary page
request(
  `https://www.espncricinfo.com/scores/series/${seriesId}/`,

  function(err, res, html) {
    if (err == null && res.statusCode == 200) {
      console.log("Recived Html");
      parseHtml(html);
    } else if (res.statusCode == 404) {
      console.log("Page Not Found");
    } else {
      console.log(err);
      console.log(res.statusCode);
    }
  }
);



function parseHtml(html) {

  // console.log("Parsing Html");
  // // html => convert $=> search
  let co = cheerio.load(html);
  // element selectors 
  // let h1Arr=co("h1");
  // //  for(let i=0;i<h1Arr.length;i++){
  // //    console.log(co(h1Arr[i]).html())
  // //  }




// // cards
  let cardsHtml = co(".cscore.cscore--final.cricket.cscore--away-winner.cscore--watchNotes");

  for (let i = 0; i < cardsHtml.length; i++) {
    // filter ODI,T20
    let format = co(cardsHtml[i])
      .find(".cscore_info-overview")
      .html();
   let ans= format.includes("T20I") || format.includes("ODI");
   if(ans){    
  let  url= co(cardsHtml[i]).find(".cscore_list a").attr("href");
let completeUrl=  "https://www.espncricinfo.com"+url;
console.log(completeUrl);
}
  }
  // fs.writeFileSync("summary.html", cardsHtml);
  console.log("File written to disk");
}
