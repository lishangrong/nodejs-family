const Koa = require("koa");

const app = new Koa();

// 中间件 洋葱圈模式
app.use((ctx, next) => {
  console.log("one-1");
  next();
  console.log("one-2");
});

app.use((ctx, next) => {
  console.log("two-1");
  next();
  console.log("two-2");
});

app.use((ctx, next) => {
  console.log("three-1");
  next();
  console.log("three-2");
});

app.listen(4000, () => {
  console.log("Server is running at http://localhost:4000");
});
