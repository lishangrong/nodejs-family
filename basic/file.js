const fs = require("fs");
// 追加文件内容
// fs.readFile("./a.text", "utf8", function (err, data) {
//   // console.log(err);
//   // console.log(data);
//   if (!err) {
//     const newData = data + "\n" + 8888;
//     fs.writeFile("./a.text", newData, function (err) {
//       !err && console.log("写入成功");
//     });
//   }
// });

fs.appendFile("./a.text", "\n hello world", function (err) {
  console.log(err);
});
