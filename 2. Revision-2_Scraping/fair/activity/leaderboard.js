let request = require("request");
let fs = require("fs");
let cheerio = require('cheerio')
console.log("Before");
// request => data 
let leaderBoard = [] , gcount = 0;;
request(`https://www.espncricinfo.com/scores/series/19322`, function (err, res, html) {
  if (err === null && res.statusCode === 200) {
    // fs.writeFile("index.html", html, function () {
    //   console.log("Written file to disk");
    // })
    // fs.writeFileSync("index.html", html);
    parseSeries(html);
  } else if (res.statusCode === 404) {
    console.log("Invalid URL");
  } else {
    console.log(err);
    console.log(res.statusCode);
  }
})
// series => filter => match request 
// 1-> link -> request
function parseSeries(html) {
  // parsing series page
  let d = cheerio.load(html);
  let cards = d(".cscore.cscore--final.cricket.cscore--watchNotes")
  //  console.log(cards.length);
  //  cards=> type => ODI/T20 
  for (let i = 0; i < cards.length; i++) {
    let matchType = d(cards[i]).find(".cscore_info-overview").html();
    //  console.log(matchType);
    let test = matchType.includes("ODI") || matchType.includes("T20");
    if (test === true) {
      // console.log(matchType)
      // anchors => href => manually request 
      // cscore_buttonGroup ul li a.html
      // html ,text ,attr,find 
      let anchor = d(cards[i]).find(".cscore_buttonGroup ul li a").attr("href");
      //https://www.espncricinfo.com/series/12234/scorecard/12345
      let matchLink = `https://www.espncricinfo.com${anchor}`;

      goToMatchPage(matchLink);
      // 8 => request
    }
    // console.log("``````````````````````````````````````````");
  }
}
// page request  // 
// link => request 
function goToMatchPage(MatchLink) {
  gcount++;
  console.log("request for" + gcount);
  request(MatchLink, function (err, res, html) {
    if (err == null && res.statusCode == 200) {
      // console.log(`File ${count} saved to disk`);
      // fs.writeFileSync(`match${count}.html`, html);
      handleMatch(html);
      gcount--;
      console.log(gcount);
      if (gcount == 0) {
        console.table(leaderBoard);
      }
      // count--;
    } else if (res.statusCode == 404) {
      console.log("Invalid URL");
    } else {
      console.log(err);
      console.log(res.statusCode);
    }
  })
}

// cscore cscore--final cricket  cscore_info-overview
//  handleMatch 
// html=> team,format ,runs,name
function handleMatch(html) {
  const d = cheerio.load(html);
  //batsman ,runs ,format ,teams
  // format 
  let format = d(".cscore.cscore--final.cricket .cscore_info-overview").html();
  format = format.includes("ODI") ? "ODI" : "T20";
  // team
  let teams = d(".sub-module.scorecard h2");
  let innings = d(".sub-module.scorecard");
  // console.log(format);
  for (let i = 0; i < innings.length; i++) {
    // console.log(d(teams[i]).text())
    let batsManRows = d(innings[i]).find(".scorecard-section.batsmen .flex-row .wrap.batsmen");
    // console.log(batsManRows.length);
    let team = d(teams[i]).text();
    for (let br = 0; br < batsManRows.length; br++) {
      let batsMan = d(batsManRows[br]);
      let batsManName = batsMan.find(".cell.batsmen").text();
      let batsManRuns = batsMan.find(".cell.runs").html();
      handlePlayer(format, team, batsManName, batsManRuns);
      // batsman name  cell batsmen
      // , run cell runs
      // console.log(batsManInfo);
    }
    // console.log("****************");
  }
  // console.log("###############################");
}
// player 
// console.log("After");
// leaderboaard
function handlePlayer(format, team, batsManName, batsManRuns) {
  // batsman => 
  batsManRuns = Number(batsManRuns);
  for (let i = 0; i < leaderBoard.length; i++) {
    let pObj = leaderBoard[i];
    if (pObj.Name == batsManName && pObj.Team == team && pObj.Format === format) {
      pObj.Runs += batsManRuns;
      return;
    }
  }
  let obj = {
    Runs: batsManRuns,
    Format: format,
    Team: team,
    Name: batsManName
  }

  leaderBoard.push(obj);
  // 1. First Time=>create new
  // 2 Existing runs increase 
}