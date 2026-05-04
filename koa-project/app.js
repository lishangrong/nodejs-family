const Koa = require("koa");
const cors = require("@koa/cors");
const { koaBody } = require("koa-body");
const router = require("./router");

const app = new Koa();
app.use(cors());
app.use(koaBody());
app.use(router.routes());

app.on("error", (err, ctx) => {
  console.log(err);
  ctx.body = "Server error: " + err;
});

app.listen(4000, () => {
  console.log("Server is running at http://127.0.0.1:4000");
});
