const Koa = require("koa");

const app = new Koa();

app.use(async (ctx, next) => {
  if (ctx.path === "/") {
    ctx.body = "hello koa";
  } else if (ctx.path === "/user/info") {
    ctx.body = "hello user";
  }
});

app.listen(4000, () => {
  console.log("Server is running at http://localhost:4000");
});
