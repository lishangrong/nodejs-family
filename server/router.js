const url = require("url");
const fs = require("fs");
const controller = require("./controller");
module.exports = (req, res) => {
  if (req.method === "GET") {
    const reqUrl = url.parse(req.url, true);
    console.log(reqUrl.query.id);
    if (req.url == "/") {
      controller.index(res);
    } else {
      fs.readFile("./_R0W8200.jpg", (err, data) => {
        res.end(data);
      });
    }
  } else if (req.method === "POST") {
    console.log("ppp");
    var data = "";
    req.on("data", (d) => {
      data += d;
    });
    req.on("end", () => {
      controller.user(require("querystring").parse(data), res);
    });
  }
};
