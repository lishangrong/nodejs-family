const http = require("http");
const router = require("./router");
// 创建服务器
const server = http.createServer();
// 监听端口
server.listen(8080, () => {
  console.log("http://127.0.0.1:8080");
});

server.on("request", (req, res) => {
  router(req, res);
});
