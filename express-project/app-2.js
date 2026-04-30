const express = require("express");

// 加一个注释，用以说明，本项目代码可以任意定制更改
const app = express();

const PORT = process.env.PORT || 4000;

// 基本中间件使用方法1
// app.use((req, res, next) => {})
// app.get('/user', (req, res, next) => {})

// 中间件使用方法2
app.get(
  "/user",
  (req, res, next) => {
    console.log(req.method);
    next();
  },
  (req, res, next) => {
    console.log(666);
    res.send("user");
    next();
  },
);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
