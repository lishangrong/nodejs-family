const express = require("express");
const cors = require("cors"); // 跨域中间件
const morgan = require("morgan"); // 日志中间件
const router = require("./router");

const app = express();
// 解析请求体
app.use(express.json());
app.use(express.urlencoded());
// 静态资源服务
app.use(express.static("public"));
app.use(cors());
app.use(morgan("dev"));
app.use("/api/v1", router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
