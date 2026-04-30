const express = require("express");
const router = require("./router");
const videoRouter = require("./router/video");

// 加一个注释，用以说明，本项目代码可以任意定制更改
const app = express();

// 应用级别的中间件: 第一个参数是路径前缀
app.use("/user", router);
app.use("/video", videoRouter);

// 所有路由都没有匹配到时，返回404
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});
// 错误处理中间件
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("server error");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
