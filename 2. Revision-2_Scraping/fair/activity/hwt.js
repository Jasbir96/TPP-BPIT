let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio");
console.log("***sending Request***");

request("https://www.espncricinfo.com/series/19322/scorecard/1187683", function (err, res, html) {
  if (err === null && res.statusCode === 200) {
    // fs.writeFile("index.html", html, function () {
    //   console.log("Written file to disk");
    // })
    console.log("***Recieved Data****");
    fs.writeFileSync("scorecard.html", html);
    parseHtml(html)
  } else if (res.statusCode === 404) {
    console.log("Invalid URL");
  } else {
    console.log(err);
    console.log(res.statusCode);
  }
})
function parseHtml(html) {
  console.log("***parsing Html***")
  let d = cheerio.load(html);
  let bowlers = d(".scorecard-section.bowling table tbody tr");
  let maxWickets = 0;
  let maxWicketBowler = "";
  for (let i = 0; i < bowlers.length; i++) {
    let cbowlerName = d(d(bowlers[i]).find("td")[0]).text();
    let cwickets = d(d(bowlers[i]).find("td")[5]).text();
    // console.log(bowlerName + "  " + wickets)
    if (cwickets > maxWickets) {
      maxWickets = cwickets;
      maxWicketBowler = cbowlerName;
    }
  }
  console.log(maxWicketBowler+" "+maxWickets);
  // console.log("````````````````````````````````````````");


  // fs.writeFileSync("bowling.html", bowlingScoreCard);

  // let team1Bowlers = bowlingScoreCard[0];
  // let team2Bowlers = bowlingScoreCard[1];

}