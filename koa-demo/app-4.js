const Koa = require("koa");
const Router = require("@koa/router"); // 路由中间件

const app = new Koa();
const router = new Router();

router.get("/user/info", (ctx) => {
  ctx.body = "hello user";
});
router.post("/", (ctx) => {
  ctx.body = "hello koa post";
});

app.use(router.routes());

app.listen(4000, () => {
  console.log("Server is running at http://localhost:4000");
});
