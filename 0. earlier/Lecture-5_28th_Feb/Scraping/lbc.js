// https://www.espncricinfo.com/series/19322/commentary/1187679
let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio");
console.log("Requesting file");
// loc
let seriesId = process.argv[2];
let commentaryId = process.argv[3];
request(
  `https://www.espncricinfo.com/series/${seriesId}/commentary/${commentaryId}`,
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
  console.log("Parsing Html");
  // html => convert $=> search
  let co = cheerio.load(html);
  let lastCommentary = co(".item-wrapper .description").html();
  fs.writeFileSync("commentary.html", lastCommentary);
}
