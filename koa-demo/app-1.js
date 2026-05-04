const Koa = require("koa");

const app = new Koa();

app.use((ctx) => {
  console.log(ctx.req.method);
  console.log(ctx.req.url);
  ctx.body = "hello koa";
});

app.listen(4000, () => {
  console.log("Server is running at http://localhost:4000");
});
