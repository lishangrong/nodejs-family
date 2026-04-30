const express = require("express");

// 加一个注释，用以说明，本项目代码可以任意定制更改
const app = express();

const PORT = process.env.PORT || 4000;

// 中间件 位置很关键，会在路由之前执行
app.use((req, res, next) => {
  console.log(`${req.method}, ${req.url}, ${Date.now()}`);
  next();
});

app.get("/", (req, res) => {
  res.send("/index");
});

app.get("/register", (req, res) => {
  res.send("/register");
});

app.get("/login", (req, res) => {
  res.send("/login");
});

// 挂载路由
// app.use('/api', router)

// 挂载统一处理服务端错误中间件
// app.use(errorHandler())

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
