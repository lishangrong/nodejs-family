const fs = require("fs");
fs.writeFile("./a.text", "hello world", function (err) {
  console.log(err);
});
