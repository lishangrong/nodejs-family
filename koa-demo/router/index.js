const Router = require("@koa/router"); // 路由中间件
const router = new Router({ prefix: "/api/v1" });

router.get("/user", (ctx) => {
  // ctx.throw(500, "errmsg");
  // JSON.parse("ddd");

  ctx.body = "hello usersss";
});
router.get("/video/:id/:age", (ctx) => {
  console.log(ctx.params);

  ctx.body = "hello video";
});
router.post("/user", (ctx) => {
  console.log(ctx.request.body);
  ctx.body = "post user";
});

module.exports = router;
