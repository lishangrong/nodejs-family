const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/config.default");

// Bearer Token 认证中间件
exports.auth = async (ctx, next) => {
  const authorization = ctx.headers.authorization;

  if (!authorization) {
    ctx.status = 401;
    ctx.body = { error: "未提供认证令牌" };
    return;
  }

  // 验证 Bearer Token 格式
  const parts = authorization.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    ctx.status = 401;
    ctx.body = { error: "认证格式错误，请使用 Bearer Token" };
    return;
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, jwtSecret);
    ctx.state.user = decoded;
    await next();
  } catch (err) {
    ctx.status = 401;
    ctx.body = { error: "认证令牌无效或已过期" };
  }
};
