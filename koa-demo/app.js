const Koa = require("koa");
const { koaBody } = require("koa-body");
const router = require("./router");

const app = new Koa();

app.use(koaBody());
app.use(router.routes());

// 全局错误处理中间件
app.on("error", (err, ctx) => {
  console.log(err);
  ctx.body = err.message;
  ctx.status = err.status || 500;
});

app.listen(4000, () => {
  console.log("Server is running at http://localhost:4000");
});
