let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio");
console.log("Requesting file");
// mwb
request("https://www.espncricinfo.com/series/19322/scorecard/1187679", function(
  err,
  res,
  html
) {
  if (err == null && res.statusCode == 200) {
    console.log("Recived Html");
    parseHtml(html);
  } else if (res.statusCode == 404) {
    console.log("Page Not Found");
  } else {
    console.log(err);
    console.log(res.statusCode);
  }
});
function parseHtml(html) {
  console.log("Parsing Html");
  // html => convert $=> search
  let co = cheerio.load(html);

  let tableArr = co(".scorecard-section.bowling table tbody tr");
// number of bowlers

  let maxWicketTaker = "";
  let maxWickets = 0;
  for (let i = 0; i < tableArr.length; i++) {
    //  particular bowler column
    let tdArr = co(tableArr[i]).find("td");
    let wicket = co(tdArr[5]).html();
    
    let bowlerName = co(tableArr[i])
      .find("td a")
      .html();
    if (wicket > maxWickets) {
      maxWicketTaker = bowlerName;
      maxWickets = wicket;
    }
  }
  console.log(maxWicketTaker + " " + maxWickets);

  fs.writeFileSync("table.html", tableArr);
  // console.log(rows);
  console.log("File written to disk");
}
