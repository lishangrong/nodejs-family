// nodejs 在操作系统中执行javascript代码
// nodejs 运行在操作系统中，那么操作系统的一系列操作nodejs也可以执行
// 读取文件
const fs = require("fs");
// 读取文件内容
fs.readFile("./a.text", "utf8", function (err, data) {
  console.log(err);
  console.log(data);
});
