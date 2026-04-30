const express = require("express");
const router = require("./router");
const videoRouter = require("./router/video");

// 加一个注释，用以说明，本项目代码可以任意定制更改
const app = express();

// app.all("/xx", (req, res) => {
//   res.send("xx");
// });

// 正则表达式路由 us?er, us+er
// app.get("/us+er", (req, res) => {
//   res.send(`${req.method} --- ${req.url}`);
// });

// 路由参数传递与获取
// app.get("/user/:id/video/:vid", (req, res) => {
//   console.log(req.params);
//   res.send(`${req.method} --- ${req.url}`);
// });

// 路由链式调用
app
  .use("/user", (req, res) => {
    // res.send("/user");
    // res.download();
    // res.end();
    // res.json()
    // res.redirect()
    // res.render()
    // res.sendStatus()
    res.status(200).json({ message: "hello express" });
  })
  .post("/video", (req, res) => {
    res.send("/video");
  });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
